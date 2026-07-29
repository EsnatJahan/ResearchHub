"use client";

import {
  FileText,
  Pencil,
  Trash2,
  StickyNote,
} from "lucide-react";

type Paper = {
  id: number;
  title: string;
  pdfPath: string;
  note?: string;
};

type Props = {
  paper: Paper;
};

export default function PaperCard({ paper }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">

      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <div className="rounded-xl bg-violet-100 p-3">
            <FileText
              className="text-violet-700"
              size={26}
            />
          </div>

          <div>

            <a
              href={`http://localhost:3001${paper.pdfPath}`}
              target="_blank"
              className="text-lg font-semibold text-violet-700 hover:underline"
            >
              {paper.title}
            </a>

            <p className="mt-1 text-sm text-slate-500">
              Research Paper
            </p>

          </div>

        </div>

        <button
          className="rounded-lg p-2 text-red-500 transition hover:bg-red-100"
        >
          <Trash2 size={20} />
        </button>

      </div>

      <div className="mt-6">

        {paper.note ? (
          <div className="rounded-xl bg-slate-50 p-4">

            <div className="mb-2 flex items-center gap-2">

              <StickyNote
                size={18}
                className="text-violet-600"
              />

              <span className="font-semibold">
                Note
              </span>

            </div>

            <p className="text-slate-700">
              {paper.note}
            </p>

            <button
              className="mt-4 flex items-center gap-2 rounded-lg bg-violet-100 px-4 py-2 text-violet-700 transition hover:bg-violet-200"
            >
              <Pencil size={16} />
              Edit Note
            </button>

          </div>
        ) : (
          <button
            className="rounded-lg border border-dashed border-violet-300 px-4 py-3 text-violet-600 transition hover:bg-violet-50"
          >
            + Add Note
          </button>
        )}

      </div>

    </div>
  );
}