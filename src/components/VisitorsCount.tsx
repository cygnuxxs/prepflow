"use client";

import { formatIndianCount, getLabel } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

const VisitorsCount = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchVisitorsCount = async () => {
      try {
        const response = await fetch("/api/visitors", { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: Failed to fetch visitors count`);
        }

        const data: unknown = await response.json();
        if (
          typeof data !== "object" ||
          data === null ||
          !("activeCount" in data) ||
          typeof data.activeCount !== "number"
        ) {
          throw new Error("Invalid response format: count is not a number");
        }

        if (isMounted) {
          setCount(data.activeCount);
        }
      } catch (error) {
        console.error("Failed to fetch visitors count:", error);
      }
    };

    void fetchVisitorsCount();

    return () => {
      isMounted = false;
    };
  }, []);

  const displayCount = count === null ? "—" : formatIndianCount(count);
  const countLabel = count === null ? "Visitors count unavailable" : `${count} ${getLabel(count)}`;

  return (
    <span className="text-xs px-2 py-1 w-full text-start font-medium text-muted-foreground flex items-center gap-4">
      Visitors
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <span className="text-primary font-bold text-xl">{displayCount}</span>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>{countLabel}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </span>
  );
};

export default VisitorsCount;
