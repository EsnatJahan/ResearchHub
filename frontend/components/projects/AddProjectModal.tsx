"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FolderPlus } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function AddProjectModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleCreate() {
    if (!name.trim()) {
      toast.error("Project name is required.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:3001/projects",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            description,
          }),
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      toast.success("Project created successfully!");

      setName("");
      setDescription("");

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create project.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">

        <div className="mb-6 flex items-center gap-3">

          <div className="rounded-xl bg-violet-100 p-3">
            <FolderPlus
              size={28}
              className="text-violet-700"
            />
          </div>

          <div>

            <h2 className="text-2xl font-bold">
              New Project
            </h2>

            <p className="text-slate-500">
              Create a research project.
            </p>

          </div>

        </div>

        <div className="space-y-5">

          <div>

            <label className="mb-2 block font-medium">
              Project Name
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Enter project name"
              className="w-full rounded-xl border p-3 outline-none focus:border-violet-500"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Description
            </label>

            <textarea
              rows={5}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Optional description..."
              className="w-full rounded-xl border p-3 outline-none focus:border-violet-500"
            />

          </div>

          <div className="flex justify-end gap-3">

            <button
              onClick={onClose}
              className="rounded-xl bg-slate-200 px-5 py-3 hover:bg-slate-300"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              onClick={handleCreate}
              className="rounded-xl bg-violet-600 px-5 py-3 text-white hover:bg-violet-700"
            >
              {loading
                ? "Creating..."
                : "Create Project"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}