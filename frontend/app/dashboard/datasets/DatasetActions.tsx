"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  onAdded?: () => void;
};

export default function DatasetActions({
  onAdded,
}: Props) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");
  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!name || !file) {
      alert(
        "Please enter a dataset name and select a file."
      );
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append(
        "description",
        description
      );
      formData.append("file", file);

      const res = await fetch(
        "http://localhost:3001/datasets",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to create dataset"
        );
      }

      alert("Dataset added successfully!");

      setName("");
      setDescription("");
      setFile(null);

      setShowForm(false);
      router.refresh();
      onAdded?.();
    } catch (error) {
      console.error(error);
      alert("Failed to add dataset.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="rounded-lg bg-violet-600 px-5 py-2 font-medium text-white hover:bg-violet-700"
        >
          + Add Dataset
        </button>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-xl border bg-slate-50 p-6"
        >
          <h3 className="text-lg font-semibold">
            Add Dataset
          </h3>

          {/* Name */}
          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium">
              Dataset Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Enter dataset name"
              className="w-full rounded-lg border bg-white p-3"
            />
          </div>

          {/* Description */}
          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Describe the dataset"
              className="w-full rounded-lg border bg-white p-3"
            />
          </div>

          {/* File */}
          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium">
              Dataset File
            </label>

            <input
              type="file"
              onChange={(e) =>
                setFile(
                  e.target.files?.[0] || null
                )
              }
              className="w-full rounded-lg border bg-white p-3"
            />
          </div>

          {/* Buttons */}
          <div className="mt-5 flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-violet-600 px-5 py-2 font-medium text-white hover:bg-violet-700 disabled:opacity-50"
            >
              {loading
                ? "Adding..."
                : "Add Dataset"}
            </button>

            <button
              type="button"
              onClick={() =>
                setShowForm(false)
              }
              className="rounded-lg border border-slate-300 bg-white px-5 py-2 font-medium text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}