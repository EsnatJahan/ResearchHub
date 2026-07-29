"use client";

import { useState } from "react";
import PaperCard from "@/components/papercard";

type Paper = {
  id: number;
  title: string;
  pdfPath: string;
  note?: string;
};

export default function PapersPage() {
  const [papers, setPapers] = useState<Paper[]>([]);

  const [title, setTitle] = useState("");
  const [pdfPath, setPdfPath] = useState("");
  const [note, setNote] = useState("");

  const [showForm, setShowForm] = useState(false);

  async function handleAddPaper() {
    try {
      const res = await fetch("http://localhost:3001/papers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          pdfPath,
          note,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add paper");
      }

      const newPaper: Paper = await res.json();

      setPapers((prev) => [...prev, newPaper]);

      setTitle("");
      setPdfPath("");
      setNote("");

      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Failed to add paper.");
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1
        className="text-3xl font-bold cursor-pointer"
        onClick={() => alert("Heading clicked")}
      >
        Papers
      </h1>
        <button
          onClick={() => setShowForm(true)}
          className="rounded-lg bg-violet-600 px-5 py-2 text-white hover:bg-violet-700"
        >
          + Add Paper
        </button>
      </div>

      {showForm && (
        <div className="mt-6 rounded-xl border bg-white p-6 shadow">
          <div className="space-y-4">
            <input
              className="w-full rounded border p-2"
              placeholder="Paper Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              className="w-full rounded border p-2"
              placeholder="PDF Path"
              value={pdfPath}
              onChange={(e) => setPdfPath(e.target.value)}
            />

            <textarea
              className="w-full rounded border p-2"
              placeholder="Note"
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <div className="flex gap-3">
              <button
                onClick={handleAddPaper}
                className="rounded-lg bg-green-600 px-4 py-2 text-white"
              >
                Save
              </button>

              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg bg-gray-400 px-4 py-2 text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 space-y-4">
        {papers.map((paper) => (
          <PaperCard key={paper.id} paper={paper} />
        ))}
      </div>
    </div>
  );
}