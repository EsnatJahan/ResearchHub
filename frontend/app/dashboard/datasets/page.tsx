import DatasetActions from "./DatasetActions";
import DatasetList from "./DatasetList";

type Dataset = {
  id: number;
  name: string;
  description?: string;
  filePath: string;
  createdAt: string;
};

export default async function DatasetsPage() {
  const res = await fetch(
    "http://localhost:3001/datasets",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load datasets");
  }

  const datasets: Dataset[] =
    await res.json();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Datasets
          </h2>

          <p className="mt-2 text-slate-500">
            Manage datasets used in your research projects.
          </p>
        </div>

        <DatasetActions />
      </div>

      <div className="mt-8">
        <DatasetList datasets={datasets} />
      </div>
    </div>
  );
}