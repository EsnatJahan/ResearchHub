export default function ProjectNotesPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold">
        Notes
      </h2>

      <p className="mt-2 text-slate-500">
        Notes, ideas, tasks, and observations for this project.
      </p>

      <div className="mt-8 rounded-xl border border-dashed border-slate-300 p-12 text-center">
        <p className="text-slate-500">
          No notes added to this project yet.
        </p>
      </div>
    </div>
  );
}