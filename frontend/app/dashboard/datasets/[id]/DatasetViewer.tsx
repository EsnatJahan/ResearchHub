"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import mammoth from "mammoth";

type DocxViewerProps = {
  fileUrl: string;
};

function DocxViewer({
  fileUrl,
}: DocxViewerProps) {
  const [html, setHtml] = useState("");
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadDocx() {
      try {
        setLoading(true);
        setError(null);

        const response =
          await fetch(fileUrl);

        if (!response.ok) {
          throw new Error(
            "Failed to load Word document"
          );
        }

        const arrayBuffer =
          await response.arrayBuffer();

        const result =
          await mammoth.convertToHtml({
            arrayBuffer,
          });

        setHtml(result.value);

        if (result.messages.length > 0) {
          console.warn(
            "Word conversion messages:",
            result.messages
          );
        }
      } catch (err) {
        console.error(err);

        setError(
          "Could not load this Word document."
        );
      } finally {
        setLoading(false);
      }
    }

    loadDocx();
  }, [fileUrl]);

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        <p className="text-slate-500">
          Loading Word document...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="text-red-600">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <div className="border-b px-6 py-4">
        <h3 className="text-lg font-semibold text-slate-800">
          Dataset Preview
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Word document
        </p>
      </div>

      <div
        className="prose max-w-none overflow-auto p-8"
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </div>
  );
}

type JsonViewerProps = {
  fileUrl: string;
};

function JsonViewer({
  fileUrl,
}: JsonViewerProps) {
  const [data, setData] =
    useState<unknown>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadJson() {
      try {
        const response =
          await fetch(fileUrl);

        if (!response.ok) {
          throw new Error(
            "Failed to load JSON"
          );
        }

        const json =
          await response.json();

        setData(json);
      } catch (err) {
        console.error(err);

        setError(
          "Could not load this JSON file."
        );
      } finally {
        setLoading(false);
      }
    }

    loadJson();
  }, [fileUrl]);

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        <p className="text-slate-500">
          Loading JSON...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="text-red-600">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <div className="border-b px-6 py-4">
        <h3 className="text-lg font-semibold text-slate-800">
          Dataset Preview
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          JSON
        </p>
      </div>

      <pre className="max-h-[650px] overflow-auto bg-slate-950 p-6 text-sm leading-6 text-slate-100">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

type TextViewerProps = {
  fileUrl: string;
};

function TextViewer({
  fileUrl,
}: TextViewerProps) {
  const [text, setText] = useState("");
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadText() {
      try {
        const response =
          await fetch(fileUrl);

        if (!response.ok) {
          throw new Error(
            "Failed to load text file"
          );
        }

        const content =
          await response.text();

        setText(content);
      } catch (err) {
        console.error(err);

        setError(
          "Could not load this text file."
        );
      } finally {
        setLoading(false);
      }
    }

    loadText();
  }, [fileUrl]);

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        <p className="text-slate-500">
          Loading text file...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="text-red-600">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <div className="border-b px-6 py-4">
        <h3 className="text-lg font-semibold text-slate-800">
          Dataset Preview
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Text file
        </p>
      </div>

      <pre className="max-h-[650px] overflow-auto whitespace-pre-wrap bg-slate-950 p-6 text-sm leading-6 text-slate-100">
        {text}
      </pre>
    </div>
  );
}

type ExcelViewerProps = {
  fileUrl: string;
};

function ExcelViewer({
  fileUrl,
}: ExcelViewerProps) {
  const [rows, setRows] = useState<
    string[][]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadExcel() {
      try {
        setLoading(true);
        setError(null);

        const response =
          await fetch(fileUrl);

        if (!response.ok) {
          throw new Error(
            "Failed to load Excel file"
          );
        }

        const arrayBuffer =
          await response.arrayBuffer();

        const workbook =
          XLSX.read(arrayBuffer, {
            type: "array",
          });

        // Use the first worksheet
        const firstSheetName =
          workbook.SheetNames[0];

        const worksheet =
          workbook.Sheets[
            firstSheetName
          ];

        const data =
          XLSX.utils.sheet_to_json<
            string[]
          >(worksheet, {
            header: 1,
            defval: "",
          });

        setRows(data);
      } catch (err) {
        console.error(err);

        setError(
          "Could not load this Excel file."
        );
      } finally {
        setLoading(false);
      }
    }

    loadExcel();
  }, [fileUrl]);

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        <p className="text-slate-500">
          Loading Excel file...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="text-red-600">
          {error}
        </p>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        <p className="text-slate-500">
          This Excel file is empty.
        </p>
      </div>
    );
  }

  const header = rows[0];
  const body = rows.slice(1);

  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <div className="border-b px-6 py-4">
        <h3 className="text-lg font-semibold text-slate-800">
          Dataset Preview
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {body.length} rows ·{" "}
          {header.length} columns ·{" "}
          Sheet: {fileUrl}
        </p>
      </div>

      <div className="max-h-[650px] overflow-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-slate-100">
            <tr>
              {header.map(
                (column, index) => (
                  <th
                    key={index}
                    className="whitespace-nowrap border-b px-4 py-3 text-left font-semibold text-slate-700"
                  >
                    {column ||
                      `Column ${index + 1}`}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {body.map(
              (row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-slate-50"
                >
                  {header.map(
                    (_, columnIndex) => (
                      <td
                        key={columnIndex}
                        className="whitespace-nowrap border-b px-4 py-3 text-slate-600"
                      >
                        {row[
                          columnIndex
                        ] ?? ""}
                      </td>
                    )
                  )}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type PythonViewerProps = {
  fileUrl: string;
};

function PythonViewer({
  fileUrl,
}: PythonViewerProps) {
  const [code, setCode] = useState("");
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadCode() {
      try {
        const response =
          await fetch(fileUrl);

        if (!response.ok) {
          throw new Error(
            "Failed to load Python file"
          );
        }

        const content =
          await response.text();

        setCode(content);
      } catch (err) {
        console.error(err);

        setError(
          "Could not load this Python file."
        );
      } finally {
        setLoading(false);
      }
    }

    loadCode();
  }, [fileUrl]);

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        <p className="text-slate-500">
          Loading Python file...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="text-red-600">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <div className="border-b px-6 py-4">
        <h3 className="text-lg font-semibold text-slate-800">
          Dataset Preview
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Python source code
        </p>
      </div>

      <pre className="max-h-[700px] overflow-auto bg-slate-950 p-6 text-sm leading-6 text-slate-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}



type Props = {
  fileUrl: string;
  fileName: string;
};

type CsvRow = {
  [key: string]: string;
};

export default function DatasetViewer({
  fileUrl,
  fileName,
}: Props) {
  const extension =
    fileName.split(".").pop()?.toLowerCase() || "";

  const [rows, setRows] = useState<CsvRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (extension !== "csv") {
      return;
    }

    async function loadCsv() {
      try {
        setLoading(true);
        setError(null);

        console.log("Trying to load:", fileUrl);

        const response = await fetch(fileUrl);

        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error("Failed to load CSV");
        }

        const text = await response.text();

        Papa.parse<CsvRow>(text, {
          header: true,
          skipEmptyLines: true,

          complete: (results) => {
            if (results.errors.length > 0) {
              console.warn(
                "CSV parsing warnings:",
                results.errors
              );
            }

            const data = results.data;

            setRows(data);

            if (data.length > 0) {
              setColumns(
                Object.keys(data[0])
              );
            }

            setLoading(false);
          },

          error: (parseError: Error) => {
            console.error(parseError);

            setError(
              "Could not read this CSV file."
            );

            setLoading(false);
          },
        });
      } catch (err) {
        console.error(err);

        setError(
          "Could not load this dataset."
        );

        setLoading(false);
      }
    }

    loadCsv();
  }, [fileUrl, extension]);

  /*
   * CSV
   */
  if (extension === "csv") {
    if (loading) {
      return (
        <div className="rounded-xl border bg-white p-8 text-center">
          <p className="text-slate-500">
            Loading dataset...
          </p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <p className="text-red-600">
            {error}
          </p>
        </div>
      );
    }

    if (rows.length === 0) {
      return (
        <div className="rounded-xl border bg-white p-8 text-center">
          <p className="text-slate-500">
            This dataset is empty.
          </p>
        </div>
      );
    }

    return (
      <div className="overflow-hidden rounded-xl border bg-white">
        {/* Viewer header */}
        <div className="border-b px-6 py-4">
          <h3 className="text-lg font-semibold text-slate-800">
            Dataset Preview
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {rows.length} rows · {columns.length} columns
          </p>
        </div>

        {/* Table */}
        <div className="max-h-[650px] overflow-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead className="sticky top-0 z-10 bg-slate-100">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column}
                    className="whitespace-nowrap border-b px-4 py-3 text-left font-semibold text-slate-700"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-slate-50"
                >
                  {columns.map((column) => (
                    <td
                      key={column}
                      className="whitespace-nowrap border-b px-4 py-3 text-slate-600"
                    >
                      {row[column]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  /*
   * PDF
   */
  if (extension === "pdf" || extension === "pptx" || extension === "ppt") {
  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <div className="border-b px-6 py-4">
        <h3 className="text-lg font-semibold text-slate-800">
          Dataset Preview
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          PDF document
        </p>
      </div>

      <iframe
        src={fileUrl}
        title="PDF Viewer"
        className="h-[750px] w-full"
      />
    </div>
  );
}

  /*
   * JSON
   */
  if (extension === "json") {
    return (
      <JsonViewer fileUrl={fileUrl} />
    );
  }

  /*
   * TXT
   */
  if (extension === "txt" || extension === "log") {
    return <TextViewer fileUrl={fileUrl} />;
  }

  if (extension === "docx") {
  return <DocxViewer fileUrl={fileUrl} />;
}

  /*
   * Python
   */
  if (extension === "py" || extension === "ipynb") {
    return <PythonViewer fileUrl={fileUrl} />;
  }

  /*
   * Excel
   */
  if (
    extension === "xlsx" ||
    extension === "xls"
  ) {
    return <ExcelViewer fileUrl={fileUrl} />;
  } 
  /*
   * ZIP
   */
  if (extension === "zip") {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        <p className="text-slate-500">
          ZIP files cannot be previewed.
        </p>

        <a
          href={fileUrl}
          download
          className="mt-4 inline-block rounded-lg bg-violet-600 px-5 py-2 text-sm font-medium text-white hover:bg-violet-700"
        >
          Download ZIP
        </a>
      </div>
    );
  }

  /*
   * Unsupported
   */
  return (
    <div className="rounded-xl border bg-white p-8 text-center">
      <p className="text-slate-500">
        This file type cannot be previewed.
      </p>

      <a
        href={fileUrl}
        download
        className="mt-4 inline-block rounded-lg bg-violet-600 px-5 py-2 text-sm font-medium text-white hover:bg-violet-700"
      >
        Download File
      </a>
    </div>
  );
}