import { useEffect, useRef, useState } from "react";
import type { Terminal } from "@xterm/xterm";
import { useTerminalStore } from "@/store/terminalStore";
import {
  createInputHandler,
  createKeyHandler,
  displayWelcomeMessage,
  displayStoppedMessage,
} from "@/lib/terminalUtils";

interface UseTerminalIOOptions {
  terminal: Terminal | null;
  getTerminal?: () => Terminal | null;
}

export function useTerminalIO({ terminal, getTerminal }: UseTerminalIOOptions) {
  const inputBufferRef = useRef<string>("");
  const inputDisposableRef = useRef<{ dispose: () => void } | null>(null);
  const keyDisposableRef = useRef<{ dispose: () => void } | null>(null);
  const [lastProcessedIndex, setLastProcessedIndex] = useState(0);

  const {
    status,
    setStatus,
    outputBuffer,
    startWebSocket,
    stopWebSocket,
    sendInput,
    clearOutputBuffer,
  } = useTerminalStore();

  // Helper to get the current terminal
  const getCurrentTerminal = () => {
    return getTerminal ? getTerminal() : terminal;
  };

  // Reset local lastProcessedIndex and clear terminal when outputBuffer is cleared
  useEffect(() => {
    const term = getCurrentTerminal();
    if (outputBuffer.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLastProcessedIndex(0);
      // Clear the terminal when buffer is cleared (handles hidden terminals)
      if (term) {
        term.clear();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outputBuffer.length]);

  // Write outputBuffer to terminal (only new messages)
  useEffect(() => {
    const term = getCurrentTerminal();
    if (term && outputBuffer.length > lastProcessedIndex) {
      for (let i = lastProcessedIndex; i < outputBuffer.length; i++) {
        term.write(outputBuffer[i].data);
      }
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLastProcessedIndex(outputBuffer.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terminal, outputBuffer, lastProcessedIndex]);

  // Setup input handlers
  const setupInputHandlers = (term: Terminal) => {
    inputBufferRef.current = "";
    inputDisposableRef.current?.dispose();
    keyDisposableRef.current?.dispose();

    const inputHandler = createInputHandler(
      term,
      inputBufferRef,
      sendInput
    );
    inputDisposableRef.current = term.onData(inputHandler);

    const keyHandler = createKeyHandler(term, sendInput);
    keyDisposableRef.current = term.onKey(keyHandler);
  };

  // Cleanup input handlers
  const cleanupInputHandlers = () => {
    inputDisposableRef.current?.dispose();
    inputDisposableRef.current = null;
    keyDisposableRef.current?.dispose();
    keyDisposableRef.current = null;
    inputBufferRef.current = "";
  };

  // Run code execution
  const run = (code: string, language: string) => {
    const term = getCurrentTerminal();
    console.log("[useTerminalIO] run called - status:", status, "terminal:", term);
    if (status !== "idle") {
      console.warn("[useTerminalIO] Cannot run: status is not idle, current status:", status);
      return;
    }
    if (!term) {
      console.error("[useTerminalIO] Cannot run: terminal is null/undefined");
      return;
    }

    console.log("[useTerminalIO] Starting execution for language:", language);
    clearOutputBuffer();
    term.clear();
    displayWelcomeMessage(term);

    startWebSocket(code, language);
    setupInputHandlers(term);
  };

  // Stop code execution
  const stop = () => {
    stopWebSocket();
    const term = getCurrentTerminal();
    if (term) {
      displayStoppedMessage(term);
    }
    cleanupInputHandlers();
    setStatus("idle");
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupInputHandlers();
    };
  }, []);

  return {
    run,
    stop,
    status,
  };
}
