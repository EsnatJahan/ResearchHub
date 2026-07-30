"use client";

import { useState } from "react";
import { Upload, FileText, X } from "lucide-react";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function AddPaperModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleUpload() {
    if (!title.trim()) {
      toast.error("Please enter paper title.");
      return;
    }

    if (!pdfFile) {
      toast.error("Please choose a PDF.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("note", note);

      if (pdfFile) {
        formData.append("pdf", pdfFile);
      }

      const res = await fetch("http://localhost:3001/papers", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error();
      }

      toast.success("Paper uploaded successfully!");

      setTitle("");
      setNote("");
      setPdfFile(null);

      onSuccess();
      onClose();

    } catch (err) {
      console.error(err);
      toast.error("Upload failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-2xl">

        <h2 className="mb-6 text-2xl font-bold">
          Add Research Paper
        </h2>

        <div className="space-y-5">

          <input
            className="w-full rounded-xl border p-3"
            placeholder="Paper title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {!pdfFile ? (
            <label
              htmlFor="pdf-upload"
              className="flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-violet-300 bg-violet-50 p-10 transition hover:bg-violet-100"
            >
              <Upload
                size={42}
                className="mb-3 text-violet-600"
              />

              <p className="font-semibold">
                Click to choose PDF
              </p>

              <p className="text-sm text-slate-500">
                PDF only
              </p>

              <input
                id="pdf-upload"
                hidden
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  if (e.target.files?.length) {
                    setPdfFile(e.target.files[0]);
                  }
                }}
              />
            </label>
          ) : (
            <div className="flex items-center justify-between rounded-xl border border-green-300 bg-green-50 p-4">

              <div className="flex items-center gap-3">

                <FileText className="text-green-700" />

                <div>

                  <p className="font-medium">
                    {pdfFile.name}
                  </p>

                  <p className="text-sm text-slate-500">
                    {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>

                </div>

              </div>

              <button
                onClick={() => setPdfFile(null)}
                className="rounded-full p-2 hover:bg-red-100"
              >
                <X className="text-red-600" />
              </button>

            </div>
          )}

          <textarea
            rows={4}
            className="w-full rounded-xl border p-3"
            placeholder="Note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <div className="flex justify-end gap-3">

            <button
              onClick={onClose}
              className="rounded-xl bg-gray-200 px-5 py-2"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              onClick={handleUpload}
              className="rounded-xl bg-violet-600 px-5 py-2 text-white hover:bg-violet-700"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}