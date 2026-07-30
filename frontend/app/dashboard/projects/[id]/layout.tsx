import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectLayout({
  children,
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
    <div className="p-8">

      <Link
        href="/dashboard/projects"
        className="text-violet-600 hover:underline"
      >
        ← Back to Projects
      </Link>

      <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm">

        <h1 className="text-3xl font-bold">
          {project.name}
        </h1>

        <p className="mt-2 text-slate-500">
          {project.description || "No description"}
        </p>

        <div className="mt-8 border-b">

          <nav className="flex gap-8">

            <Link
              href={`/dashboard/projects/${id}`}
              className="border-b-2 border-transparent py-4 font-medium hover:border-violet-600 hover:text-violet-600"
            >
              Overview
            </Link>

            <Link
              href={`/dashboard/projects/${id}/papers`}
              className="border-b-2 border-transparent py-4 font-medium hover:border-violet-600 hover:text-violet-600"
            >
              Papers
            </Link>

            <Link
              href={`/dashboard/projects/${id}/datasets`}
              className="border-b-2 border-transparent py-4 font-medium hover:border-violet-600 hover:text-violet-600"
            >
              Datasets
            </Link>

            <Link
              href={`/dashboard/projects/${id}/resources`}
              className="border-b-2 border-transparent py-4 font-medium hover:border-violet-600 hover:text-violet-600"
            >
              Resources
            </Link>

            <Link
              href={`/dashboard/projects/${id}/notes`}
              className="border-b-2 border-transparent py-4 font-medium hover:border-violet-600 hover:text-violet-600"
            >
              Notes
            </Link>

            <Link
              href={`/dashboard/projects/${id}/results`}
              className="border-b-2 border-transparent py-4 font-medium hover:border-violet-600 hover:text-violet-600"
            >
              Results
            </Link>

          </nav>

        </div>

        <div className="mt-8">
          {children}
        </div>

      </div>

    </div>
  );
}