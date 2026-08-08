import Link from "next/link";
import DatasetViewer from "./DatasetViewer";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DatasetViewerPage({
  params,
}: Props) {
  const { id } = await params;

  const res = await fetch(
    `http://localhost:3001/datasets/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load dataset");
  }

  const dataset = await res.json();

  const fileName =
    dataset.originalName ||
    dataset.filePath.split("/").pop() ||
    "";

  const fileUrl =
    `http://localhost:3001${dataset.filePath}`;

  return (
    <div>
      <Link
        href="/dashboard/datasets"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-violet-600"
      >
        ← Back to Datasets
      </Link>

      <h2 className="text-2xl font-bold text-slate-800">
        {dataset.name}
      </h2>

      {dataset.description && (
        <p className="mt-2 text-slate-500">
          {dataset.description}
        </p>
      )}

      <div className="mt-8">
        <DatasetViewer
          fileUrl={fileUrl}
          fileName={fileName}
        />
      </div>
    </div>
  );
}