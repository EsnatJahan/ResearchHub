"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  projectId: string;
};

export default function AddProjectPaper({
  projectId,
}: Props) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!title || !file) {
      alert("Please enter a title and select a PDF.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("note", note);
      formData.append("pdf", file);

      const res = await fetch(
        `http://localhost:3001/projects/${projectId}/papers`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add paper");
      }

      alert("Paper added successfully!");

      setTitle("");
      setNote("");
      setFile(null);

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to add paper.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 rounded-xl border bg-slate-50 p-6"
    >
      <h3 className="text-lg font-semibold">
        Add Paper
      </h3>

      <div className="mt-4">
        <label className="mb-2 block text-sm font-medium">
          Paper Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter paper title"
          className="w-full rounded-lg border bg-white p-3"
        />
      </div>

      <div className="mt-4">
        <label className="mb-2 block text-sm font-medium">
          PDF
        </label>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(e.target.files?.[0] || null)
          }
          className="w-full rounded-lg border bg-white p-3"
        />
      </div>

      <div className="mt-4">
        <label className="mb-2 block text-sm font-medium">
          Note
        </label>

        <textarea
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Optional note about this paper"
          className="w-full rounded-lg border bg-white p-3"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-5 rounded-lg bg-violet-600 px-5 py-2 font-medium text-white hover:bg-violet-700 disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Paper"}
      </button>
    </form>
  );
}