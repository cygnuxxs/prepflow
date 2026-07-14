"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PlusCircle,
  Trash2,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  GripVertical
} from "lucide-react";
import ProblemsCombobox from "./ProblemsCombobox";
import { addSheets } from "@/actions/adminActions";
import { toast } from "sonner";

const DRAFT_KEY = "dsa-sheet-draft";

const EMPTY_ENTRY = () => ({ id: crypto.randomUUID(), category: "", problems: [] as string[] });

interface CategoryEntry {
  id: string;
  category: string;
  problems: string[];
}

interface DraftData {
  carouselName: string;
  entries: CategoryEntry[];
  lastSaved: string;
}

const CarouselForm: React.FC = () => {
  const [carouselName, setCarouselName] = useState("");
  const [entries, setEntries] = useState<CategoryEntry[]>([EMPTY_ENTRY()]);
  const [draftStatus, setDraftStatus] = useState<"saved" | "saving" | "unsaved">("unsaved");
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isInitialMount = useRef(true);

  // Load draft from localStorage on mount
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(DRAFT_KEY);
      if (savedDraft) {
        const draft: DraftData = JSON.parse(savedDraft);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCarouselName(draft.carouselName);
        setEntries(draft.entries.length > 0 ? draft.entries : [EMPTY_ENTRY()]);
        setLastSaved(draft.lastSaved);
        setDraftStatus("saved");
        toast.success("Draft restored", {
          description: `Last saved: ${new Date(draft.lastSaved).toLocaleString()}`,
        });
      }
    } catch (error) {
      console.error("Failed to load draft:", error);
    }
    isInitialMount.current = false;
  }, []);

  // Auto-save draft to localStorage when data changes (debounced 1s)
  useEffect(() => {
    if (isInitialMount.current) return;

    const saveTimeout = setTimeout(() => {
      setDraftStatus("saving");
      try {
        const now = new Date().toISOString();
        const draft: DraftData = { carouselName, entries, lastSaved: now };
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
        setLastSaved(now);
        setDraftStatus("saved");
      } catch (error) {
        console.error("Failed to save draft:", error);
        toast.error("Failed to save draft");
      }
    }, 1000);

    return () => clearTimeout(saveTimeout);
  }, [carouselName, entries]);

  const resetForm = useCallback(() => {
    setCarouselName("");
    setEntries([EMPTY_ENTRY()]);
    setLastSaved(null);
    setDraftStatus("unsaved");
  }, []);

  const clearDraft = useCallback(() => {
    localStorage.removeItem(DRAFT_KEY);
    resetForm();
    toast.success("Draft cleared");
  }, [resetForm]);

  // Generic handler for updating a single field on an entry
  const handleEntryChange = useCallback(<K extends keyof CategoryEntry>(
    id: string,
    field: K,
    value: CategoryEntry[K]
  ) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry))
    );
  }, []);

  const handleAddEntry = useCallback(() => {
    setEntries((prev) => [...prev, EMPTY_ENTRY()]);
  }, []);

  const handleRemoveEntry = useCallback((id: string) => {
    setEntries((prev) => (prev.length > 1 ? prev.filter((e) => e.id !== id) : prev));
  }, []);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      await addSheets(formData);
      localStorage.removeItem(DRAFT_KEY);
      resetForm();
      toast.success("Sheet created successfully!");
    } catch (error) {
      console.error("Failed to create sheet:", error);
      toast.error("Failed to create sheet");
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalProblems = entries.reduce((acc, entry) => acc + entry.problems.length, 0);
  const filledCategories = entries.filter((e) => e.category.trim()).length;

  return (
    <form className="space-y-6" action={handleSubmit}>
      {/* Draft Status Bar */}
      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border">
        <div className="flex items-center gap-2">
          {draftStatus === "saved" ? (
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          ) : draftStatus === "saving" ? (
            <Save className="h-4 w-4 text-muted-foreground animate-pulse" />
          ) : (
            <AlertCircle className="h-4 w-4 text-orange-500" />
          )}
          <span className="text-sm text-muted-foreground">
            {draftStatus === "saved" && lastSaved
              ? `Draft saved ${new Date(lastSaved).toLocaleTimeString()}`
              : draftStatus === "saving"
              ? "Saving draft..."
              : "Unsaved changes"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {filledCategories} categories
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {totalProblems} problems
          </Badge>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearDraft}
            className="h-7 text-xs text-muted-foreground hover:text-destructive"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Clear
          </Button>
        </div>
      </div>

      {/* Sheet Name Input */}
      <div className="space-y-2">
        <label htmlFor="carouselName" className="text-sm font-medium">Sheet Name</label>
        <Input
          id="carouselName"
          placeholder="e.g., Striver's SDE Sheet, Top 150 Interview Problems"
          value={carouselName}
          onChange={(e) => setCarouselName(e.target.value)}
          name="carouselName"
          required
          className="text-base"
        />
      </div>

      {/* Categories Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Categories &amp; Problems</span>
          <span className="text-xs text-muted-foreground">Add problems to each category</span>
        </div>

        <div className="space-y-4 max-h-[calc(100vh-10rem)] overflow-y-auto pr-2">
          {entries.map((entry, index) => (
            <div
              key={entry.id}
              className="group relative p-4 bg-muted/30 border rounded-lg space-y-3 transition-all hover:border-primary/20"
            >
              {/* Category Header */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <GripVertical className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab" />
                  <Badge variant="outline" className="text-xs font-normal">
                    {index + 1}
                  </Badge>
                </div>
                <Input
                  placeholder="Category name (e.g., Arrays, Strings, Trees)"
                  value={entry.category}
                  className="bg-background flex-1"
                  onChange={(e) => handleEntryChange(entry.id, "category", e.target.value)}
                  required
                  name={`category-${index}`}
                />
                {entries.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleRemoveEntry(entry.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Problems Combobox */}
              <div className="pl-8">
                <ProblemsCombobox
                  placeholder="Search and add problems..."
                  onChange={(selected) => handleEntryChange(entry.id, "problems", selected)}
                  initialSlugs={entry.problems}
                  categoryIndex={index}
                />
                {entry.problems.length > 0 && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {entry.problems.length} problem{entry.problems.length !== 1 ? "s" : ""} added
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Category Button */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full border-dashed"
          onClick={handleAddEntry}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Another Category
        </Button>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || !carouselName.trim() || totalProblems === 0}
      >
        {isSubmitting ? (
          <>
            <Save className="mr-2 h-4 w-4 animate-spin" />
            Creating Sheet...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Save Sheet
          </>
        )}
      </Button>
    </form>
  );
};

export default CarouselForm;
