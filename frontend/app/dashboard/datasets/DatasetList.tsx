"use client";

import { useRouter } from "next/navigation";

type Dataset = {
  id: number;
  name: string;
  description?: string;
  filePath: string;
  createdAt: string;
};

type Props = {
  datasets: Dataset[];
};

export default function DatasetList({
  datasets,
}: Props) {
  const router = useRouter();

  async function deleteDataset(
    id: number,
    name: string
  ) {
    const confirmed = window.confirm(
      `Delete "${name}"?\n\nThis will also delete the uploaded dataset file.`
    );

    if (!confirmed) {
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3001/datasets/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        const message = await res.text();

        console.error(
          "Delete dataset failed:",
          res.status,
          message
        );

        alert("Failed to delete dataset.");
        return;
      }

      alert("Dataset deleted successfully.");

      router.refresh();
    } catch (error) {
      console.error(
        "Delete dataset error:",
        error
      );

      alert(
        "Could not connect to the backend."
      );
    }
  }

  if (datasets.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 p-12 text-center">
        <p className="text-slate-500">
          No datasets added yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {datasets.map((dataset) => (
        <div
          key={dataset.id}
          className="rounded-xl border bg-white p-5 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                {dataset.name}
              </h3>

              {dataset.description && (
                <p className="mt-2 text-sm text-slate-600">
                  {dataset.description}
                </p>
              )}

              <p className="mt-2 text-xs text-slate-400">
                Added on{" "}
                {new Date(
                  dataset.createdAt
                ).toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-2">
              
              <a
                href={`/dashboard/datasets/${dataset.id}`}
                className="rounded-lg border border-violet-200 px-4 py-2 text-sm font-medium text-violet-700 hover:bg-violet-50"
              >
                Open File
              </a>

              <button
                onClick={() =>
                  deleteDataset(
                    dataset.id,
                    dataset.name
                  )
                }
                className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}