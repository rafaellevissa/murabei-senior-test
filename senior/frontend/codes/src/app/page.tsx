import { FilterBar } from "@/components/FilterBar";
import { DocumentTable } from "@/components/DocumentTable";

export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Document Finder</h1>
      <FilterBar />
      <DocumentTable />
    </main>
  );
}
