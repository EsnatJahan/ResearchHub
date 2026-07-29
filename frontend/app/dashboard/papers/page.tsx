"use client";

import { useEffect, useState } from "react";

import PaperModal from "@/components/PaperModal";
import AddPaperModal from "@/components/AddPaperModal";

type Paper = {
  id: number;
  title: string;
  pdfPath: string;
  note?: string;
  createdAt: string;
};

export default function PapersPage() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  async function fetchPapers() {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:3001/papers", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Unable to fetch papers.");
      }

      const data = await res.json();

      setPapers(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load papers.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPapers();
  }, []);

  return (
    <div className="p-8">

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Research Papers
          </h1>

          <p className="mt-2 text-slate-500">
            Manage all research papers in one place.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-700"
        >
          + Add Paper
        </button>

      </div>

      <AddPaperModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchPapers}
      />

      {loading ? (
        <div className="flex justify-center py-24">

          <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet-600 border-t-transparent"></div>

        </div>
      ) : papers.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center shadow">

          <h2 className="text-2xl font-bold">
            No Research Papers
          </h2>

          <p className="mt-2 text-slate-500">
            Upload your first paper to begin building your research library.
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="mt-6 rounded-xl bg-violet-600 px-6 py-3 text-white transition hover:bg-violet-700"
          >
            Upload Paper
          </button>

        </div>

      ) : (

        <div className="grid gap-6">

          {papers.map((paper) => (
            <PaperModal
              key={paper.id}
              paper={paper}
              onDelete={fetchPapers}
              onUpdate={fetchPapers}
            />
          ))}

        </div>

      )}

    </div>
  );
}