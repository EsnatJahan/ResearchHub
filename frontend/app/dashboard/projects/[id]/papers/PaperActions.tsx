"use client";

import { useState } from "react";

import AddProjectPaper from "./AddProjectPaper";
import AddExistingPaper from "./AddExistingPaper";

type Props = {
  projectId: string;
};

export default function PaperActions({
  projectId,
}: Props) {
  const [showNew, setShowNew] = useState(false);
  const [showExisting, setShowExisting] = useState(false);

  function showNewForm() {
    setShowNew(true);
    setShowExisting(false);
  }

  function showExistingForm() {
    setShowExisting(true);
    setShowNew(false);
  }

  function cancel() {
    setShowNew(false);
    setShowExisting(false);
  }

  return (
    <div className="mt-6">
      {/* Buttons */}
      {!showNew && !showExisting && (
        <div className="flex gap-3">
          <button
            onClick={showNewForm}
            className="rounded-lg bg-violet-600 px-5 py-2 font-medium text-white hover:bg-violet-700"
          >
            + Add New Paper
          </button>

          <button
            onClick={showExistingForm}
            className="rounded-lg border border-violet-600 px-5 py-2 font-medium text-violet-700 hover:bg-violet-50"
          >
            + Add Existing Paper
          </button>
        </div>
      )}

      {/* New Paper Form */}
      {showNew && (
        <div>
          <AddProjectPaper projectId={projectId} />

          <button
            onClick={cancel}
            className="mt-3 rounded-lg border border-slate-300 bg-white px-5 py-2 font-medium text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Existing Paper Form */}
      {showExisting && (
        <div>
          <AddExistingPaper projectId={projectId} />

          <button
            onClick={cancel}
            className="mt-3 rounded-lg border border-slate-300 bg-white px-5 py-2 font-medium text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}