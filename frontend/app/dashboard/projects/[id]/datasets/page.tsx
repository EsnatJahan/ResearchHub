export default function ProjectDatasetsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold">
        Datasets
      </h2>

      <p className="mt-2 text-slate-500">
        Datasets associated with this project.
      </p>

      <div className="mt-8 rounded-xl border border-dashed border-slate-300 p-12 text-center">
        <p className="text-slate-500">
          No datasets added to this project yet.
        </p>
      </div>
    </div>
  );
}