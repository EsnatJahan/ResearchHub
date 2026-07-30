"use client";

import Link from "next/link";
import { FolderKanban, ChevronRight } from "lucide-react";

type Project = {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
};

type Props = {
  project: Project;
};

export default function ProjectTitle({
  project,
}: Props) {
  return (
    <Link href={`/dashboard/projects/${project.id}`}>
      <div
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
          transition
          hover:-translate-y-1
          hover:shadow-lg
          cursor-pointer
        "
      >
        <div className="flex items-start justify-between">
          <div className="flex gap-4">

            <div className="rounded-xl bg-violet-100 p-3">
              <FolderKanban
                size={30}
                className="text-violet-700"
              />
            </div>

            <div>

              <h2 className="text-xl font-semibold">
                {project.name}
              </h2>

              <p className="mt-2 text-slate-500">
                {project.description ||
                  "No description"}
              </p>

              <p className="mt-4 text-sm text-slate-400">
                Created on{" "}
                {new Date(
                  project.createdAt
                ).toLocaleDateString()}
              </p>

            </div>

          </div>

          <ChevronRight
            className="text-slate-400"
            size={24}
          />
        </div>
      </div>
    </Link>
  );
}