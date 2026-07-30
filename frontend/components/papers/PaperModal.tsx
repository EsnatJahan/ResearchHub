"use client";

import { useState } from "react";
import {toast } from "sonner";
import ConfirmModal from "../ConfirmModal";
import {
  FileText,
  Pencil,
  StickyNote,
  Trash2,
  Save,
  X,
} from "lucide-react";

type Paper = {
  id: number;
  title: string;
  pdfPath: string;
  note?: string;
  createdAt: string;
};

type Props = {
  paper: Paper;
  onDelete: () => void;
  onUpdate: () => void;
};

export default function PaperModal({
  paper,
  onDelete,
  onUpdate,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [note, setNote] = useState(paper.note || "");
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRemoveNoteModal, setShowRemoveNoteModal] = useState(false);

  async function handleDelete() {
    

    try {
      const res = await fetch(
        `http://localhost:3001/papers/${paper.id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      toast.success("Paper deleted successfully!");

      onDelete();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete paper.");
    }
  }

  async function saveNote() {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:3001/papers/${paper.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            note,
          }),
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      setEditing(false);

      toast.success("Note updated successfully!");

      onUpdate();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update note.");
    } finally {
      setLoading(false);
    }
  }

  async function removeNote() {
  try {
    setLoading(true);

    const res = await fetch(
      `http://localhost:3001/papers/${paper.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          note: "",
        }),
      }
    );

    if (!res.ok) {
      throw new Error();
    }

    setNote("");

    toast.success("Note removed successfully!");

    onUpdate();

  } catch (err) {
    console.error(err);
    toast.error("Failed to remove note.");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <div className="rounded-xl bg-violet-100 p-3">
            <FileText
              size={28}
              className="text-violet-700"
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
              {new Date(
                paper.createdAt
              ).toLocaleDateString()}
            </p>

          </div>

        </div>

        <button
        onClick={() => setShowDeleteModal(true)}
        className="rounded-lg p-2 text-red-500 hover:bg-red-100"
        >
        <Trash2 size={20} />
        </button>

      </div>

      <div className="mt-6 rounded-xl bg-slate-50 p-4">

        <div className="mb-3 flex items-center gap-2">

          <StickyNote
            size={18}
            className="text-violet-600"
          />

          <span className="font-semibold">
            Note
          </span>

        </div>

        {editing ? (
          <>
            <textarea
              rows={4}
              value={note}
              onChange={(e) =>
                setNote(e.target.value)
              }
              className="w-full rounded-lg border p-3"
            />

            <div className="mt-4 flex gap-3">

                <button
                    onClick={saveNote}
                    disabled={loading}
                    className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white"
                >
                    <Save size={16} />
                    {loading ? "Saving..." : "Save"}
                </button>

                <button
                    onClick={() => {
                    setEditing(false);
                    setNote(paper.note || "");
                    }}
                    className="flex items-center gap-2 rounded-lg bg-gray-300 px-4 py-2"
                >
                    <X size={16} />
                    Cancel
                </button>

            </div>
          </>
        ) : (
          <>
            <p className="whitespace-pre-wrap text-slate-700">
              {paper.note || "No note added yet."}
            </p>

            <div className="mt-4 flex gap-3">

                <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-2 rounded-lg bg-violet-100 px-4 py-2 text-violet-700 hover:bg-violet-200"
                >
                    <Pencil size={16} />
                    {paper.note ? "Edit Note" : "Add Note"}
                </button>

                
                {paper.note && (
                <button
                    onClick={() => setShowRemoveNoteModal(true)}
                    className="rounded-lg bg-red-100 px-4 py-2 text-red-600 hover:bg-red-200"
                >
                    Remove Note
                </button>
                )}
            </div>
          </>
        )}

      </div>

      <ConfirmModal
        open={showDeleteModal}
        title="Delete Paper"
        message={`Are you sure you want to delete "${paper.title}"? This action cannot be undone.`}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={async () => {
            setShowDeleteModal(false);
            await handleDelete();
        }}
      />
     <ConfirmModal
        open={showRemoveNoteModal}
        title="Remove Note"
        message="Are you sure you want to remove this note?"
        onCancel={() => setShowRemoveNoteModal(false)}
        onConfirm={async () => {
            setShowRemoveNoteModal(false);
            await removeNote();
        }}
       />

    </div>
  );
}