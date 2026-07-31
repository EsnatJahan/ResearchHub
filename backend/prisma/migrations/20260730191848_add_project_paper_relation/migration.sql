-- CreateTable
CREATE TABLE "ProjectPaper" (
    "projectId" INTEGER NOT NULL,
    "paperId" INTEGER NOT NULL,

    CONSTRAINT "ProjectPaper_pkey" PRIMARY KEY ("projectId","paperId")
);

-- AddForeignKey
ALTER TABLE "ProjectPaper" ADD CONSTRAINT "ProjectPaper_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectPaper" ADD CONSTRAINT "ProjectPaper_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Paper"("id") ON DELETE CASCADE ON UPDATE CASCADE;
