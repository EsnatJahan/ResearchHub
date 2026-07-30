"use client";

import { useEffect, useState } from "react";
import ProjectTitle from "@/components/projects/ProjectTitle";
import AddProjectModal from "@/components/projects/AddProjectModal";

type Project = {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  async function fetchProjects() {
    try {
      const res = await fetch("http://localhost:3001/projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Projects
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your research projects.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-700"
        >
          + New Project
        </button>
      </div>

      <AddProjectModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchProjects}
      />

      {loading ? (
        <div className="rounded-xl bg-white p-10 text-center shadow">
          Loading...
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-16 text-center">

          <h2 className="text-xl font-semibold">
            No Projects Yet
          </h2>

          <p className="mt-2 text-slate-500">
            Create your first research project.
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="mt-6 rounded-xl bg-violet-600 px-5 py-3 text-white hover:bg-violet-700"
          >
            Create Project
          </button>

        </div>
      ) : (
        <div className="grid gap-6">
           {projects.map((project) => (
              <ProjectTitle
                key={project.id}
                project={project}
              />
            ))}
        </div>
      )}
    </div>
  );
}