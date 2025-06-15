"use client";

import { useFilterStore } from "@/lib/store";
import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import { Card } from "@/components/ui/card";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { buildSearchParams, truncateText } from "@/lib/utils";

interface Document {
  id: number;
  author: string;
  title: string;
  biography: string;
}

export function DocumentTable() {
  const { filters } = useFilterStore();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
   const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const pageSize = 10;
   const pageCount = Math.ceil(total / pageSize);

  const fetchDocuments = useCallback(
    debounce(async (currentFilters: typeof filters, currentPage: number) => {
      setLoading(true);
      setError(null);
      try {
        const query = buildSearchParams(currentFilters);
        const url = `/api/documents?page=${currentPage + 1}${query ? `&${query}` : ""}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Erro ao buscar documentos");

        const json = await res.json();

        const data: Document[] = json.data;
        setDocuments(data);
        setTotal(json.total);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    fetchDocuments(filters, page);
    return () => {
      fetchDocuments.cancel();
    };
  }, [filters, page, fetchDocuments]);

  const columns: ColumnDef<Document>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "title",
      header: "Títle",
      cell: ({ getValue }) => {
        const title = getValue<string>() ?? "";
        return truncateText(title, 30);
      },
    },
    {
      accessorKey: "author",
      header: "Autor",
      cell: ({ getValue }) => {
        const author = getValue<string>() ?? "";
        return truncateText(author, 30);
      },
    },
    {
      accessorKey: "biography",
      header: "Biografia",
      cell: ({ getValue }) => {
        const bio = getValue<string>() ?? "";
        return truncateText(bio, 30);
      },
    },
  ];
  const table = useReactTable({
    data: documents,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount,
    state: {
      pagination: {
        pageIndex: page,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater({ pageIndex: page, pageSize });
        setPage(newState.pageIndex);
      } else {
        setPage(updater.pageIndex);
      }
    },
  });

  return (
    <Card className="p-4 mt-4">
      {loading && <div className="text-sm text-muted-foreground">Carregando...</div>}
      {error && <div className="text-sm text-red-500">Erro: {error}</div>}
      {!loading && !error && (
        <>
          <div className="overflow-auto rounded-md border">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-muted">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        className="px-4 py-2 text-left font-semibold"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map(row => (
                    <tr
                      key={row.id}
                      className="odd:bg-muted/50 even:bg-background"
                    >
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="px-4 py-2 align-top">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length} className="text-center py-4">
                      Nenhum documento encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-xs text-muted-foreground">
              Página {page + 1} de {pageCount}
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(prev => Math.max(prev - 1, 0))}
                disabled={page === 0}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(prev => Math.min(prev + 1, pageCount - 1))}
                disabled={page >= pageCount - 1}
              >
                Próxima
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}
