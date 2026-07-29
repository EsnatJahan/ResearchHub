-- CreateTable
CREATE TABLE "Paper" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "pdfPath" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Paper_pkey" PRIMARY KEY ("id")
);
