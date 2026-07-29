"use client";

import { useEffect, useState } from "react";

import PaperCard from "@/components/PaperModal";
import AddPaperModal from "@/components/AddPaperModal";

type Paper = {
  id: number;
  title: string;
  pdfPath: string;
  note?: string;
};

export default function PapersPage() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  async function fetchPapers() {
    try {
      const res = await fetch("http://localhost:3001/papers");

      const data = await res.json();

      console.log(JSON.stringify(data, null, 2));

      setPapers(data);
    } catch (err) {
      console.error(err);
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
            Manage your research paper collection.
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
        <div className="rounded-xl bg-white p-10 text-center shadow">
          Loading papers...
        </div>
      ) : papers.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-16 text-center">

          <h2 className="text-xl font-semibold">
            No Papers Yet
          </h2>

          <p className="mt-2 text-slate-500">
            Upload your first research paper.
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="mt-6 rounded-xl bg-violet-600 px-5 py-3 text-white hover:bg-violet-700"
          >
            Upload Paper
          </button>

        </div>
      ) : (
        <div className="grid gap-6">

          {papers.map((paper) => (
            <PaperCard
              key={paper.id}
              paper={paper}
            />
          ))}

        </div>
      )}

    </div>
  );
}