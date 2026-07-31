"use client";

import { useRouter } from "next/navigation";

type Paper = {
  id: number;
  title: string;
  note?: string;
  pdfPath: string;
  createdAt: string;
};

type ProjectPaper = {
  projectId: number;
  paperId: number;
  paper: Paper;
};

type Props = {
  projectId: string;
  papers: ProjectPaper[];
};

export default function ProjectPaperList({
  projectId,
  papers,
}: Props) {
  const router = useRouter();

  async function removePaper(paperId: number) {
    const confirmed = window.confirm(
      "Remove this paper from the project?\n\nThe paper will remain in the main Papers section."
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/projects/${projectId}/papers/${paperId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const message = await response.text();

        console.error(
          "Remove paper failed:",
          response.status,
          message
        );

        alert("Failed to remove paper from project.");
        return;
      }

      alert("Paper removed from project.");

      router.refresh();
    } catch (error) {
      console.error("Remove paper error:", error);
      alert(
        "Could not connect to the backend."
      );
    }
  }

  if (papers.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 p-12 text-center">
        <p className="text-slate-500">
          No papers added to this project yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {papers.map((item) => (
        <div
          key={item.paperId}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <a
                href={`http://localhost:3001${item.paper.pdfPath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-violet-700 hover:underline"
              >
                {item.paper.title}
              </a>

              <p className="mt-1 text-sm text-slate-500">
                Added on{" "}
                {new Date(
                  item.paper.createdAt
                ).toLocaleDateString()}
              </p>

              {item.paper.note && (
                <p className="mt-3 whitespace-pre-wrap text-sm text-slate-600">
                  {item.paper.note}
                </p>
              )}
            </div>

            <button
              onClick={() =>
                removePaper(item.paperId)
              }
              className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}