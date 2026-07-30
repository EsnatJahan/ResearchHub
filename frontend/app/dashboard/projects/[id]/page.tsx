type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectOverview({
  params,
}: Props) {
  const { id } = await params;

  const res = await fetch(
    `http://localhost:3001/projects/${id}`,
    {
      cache: "no-store",
    }
  );

  const project = await res.json();

  return (
    <div>

      <h2 className="text-2xl font-bold">
        Overview
      </h2>

      <div className="mt-6 grid grid-cols-2 gap-6">

        <div className="rounded-xl border p-6">

          <p className="text-sm text-slate-500">
            Created
          </p>

          <p className="mt-2 font-semibold">
            {new Date(project.createdAt).toLocaleDateString()}
          </p>

        </div>

        <div className="rounded-xl border p-6">

          <p className="text-sm text-slate-500">
            Last Updated
          </p>

          <p className="mt-2 font-semibold">
            {new Date(project.updatedAt).toLocaleDateString()}
          </p>

        </div>

      </div>

      <div className="mt-8 rounded-xl border p-6">

        <h3 className="text-lg font-semibold">
          Description
        </h3>

        <p className="mt-3 whitespace-pre-wrap text-slate-600">
          {project.description || "No description provided."}
        </p>

      </div>

      <div className="mt-8">

        <h3 className="mb-4 text-lg font-semibold">
          Project Statistics
        </h3>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">

          <div className="rounded-xl bg-violet-50 p-6">
            <p className="text-sm text-slate-500">
              Papers
            </p>

            <p className="mt-2 text-3xl font-bold">
              0
            </p>
          </div>

          <div className="rounded-xl bg-violet-50 p-6">
            <p className="text-sm text-slate-500">
              Datasets
            </p>

            <p className="mt-2 text-3xl font-bold">
              0
            </p>
          </div>

          <div className="rounded-xl bg-violet-50 p-6">
            <p className="text-sm text-slate-500">
              Resources
            </p>

            <p className="mt-2 text-3xl font-bold">
              0
            </p>
          </div>

          <div className="rounded-xl bg-violet-50 p-6">
            <p className="text-sm text-slate-500">
              Notes
            </p>

            <p className="mt-2 text-3xl font-bold">
              0
            </p>
          </div>

          <div className="rounded-xl bg-violet-50 p-6">
            <p className="text-sm text-slate-500">
              Results
            </p>

            <p className="mt-2 text-3xl font-bold">
              0
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}