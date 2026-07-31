import PaperActions from "./PaperActions";
import ProjectPaperList from "./ProjectPaperList";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectPapersPage({
  params,
}: Props) {
  const { id } = await params;

  const res = await fetch(
    `http://localhost:3001/projects/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load project");
  }

  const project = await res.json();

  const papers = project.papers || [];

  return (
    <div>
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Papers
        </h2>

        <p className="mt-2 text-slate-500">
          Research papers associated with this project.
        </p>
      </div>

      {/* Add Paper Buttons / Forms */}
      <PaperActions projectId={id} />

      {/* Papers */}
      <div className="mt-8">
        <ProjectPaperList
          projectId={id}
          papers={papers}
        />
      </div>
    </div>
  );
}