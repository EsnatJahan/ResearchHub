"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Paper = {
  id: number;
  title: string;
  note?: string;
  pdfPath: string;
  createdAt: string;
};

type Props = {
  projectId: string;
};

export default function AddExistingPaper({
  projectId,
}: Props) {
  const router = useRouter();

  const [papers, setPapers] = useState<Paper[]>([]);
  const [selectedPaper, setSelectedPaper] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadPapers() {
      try {
        const res = await fetch(
          "http://localhost:3001/papers"
        );

        if (!res.ok) {
          throw new Error();
        }

        const data = await res.json();

        setPapers(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadPapers();
  }, []);

  async function handleAdd() {
    if (!selectedPaper) {
      alert("Please select a paper.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:3001/projects/${projectId}/papers/${selectedPaper}`,
        {
          method: "POST",
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      alert("Paper added to project!");

      setSelectedPaper("");

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to add paper.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 rounded-xl border bg-slate-50 p-6">

      <h3 className="text-lg font-semibold">
        Add Existing Paper
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Select a paper from your main Papers collection.
      </p>

      <div className="mt-4">
        <select
          value={selectedPaper}
          onChange={(e) =>
            setSelectedPaper(e.target.value)
          }
          className="w-full rounded-lg border bg-white p-3"
        >
          <option value="">
            Select a paper
          </option>

          {papers.map((paper) => (
            <option
              key={paper.id}
              value={paper.id}
            >
              {paper.title}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAdd}
        disabled={loading}
        className="mt-4 rounded-lg bg-violet-600 px-5 py-2 font-medium text-white hover:bg-violet-700 disabled:opacity-50"
      >
        {loading
          ? "Adding..."
          : "Add to Project"}
      </button>

    </div>
  );
}