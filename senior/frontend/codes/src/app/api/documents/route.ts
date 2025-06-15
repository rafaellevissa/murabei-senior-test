import { NextRequest, NextResponse } from "next/server";
import { baseUrl } from "@/lib/env";
import { buildFilterQuery } from "@/lib/filters";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const recordSearchParams = Object.fromEntries(searchParams.entries());

    const page = recordSearchParams.page ?? "1";
    const page_size = recordSearchParams.page_size ?? "10";

    const filtersOnly = { ...recordSearchParams };
    delete filtersOnly.page;
    delete filtersOnly.page_size;

    const filtersQuery = buildFilterQuery(filtersOnly);

    const query = `page=${page}&page_size=${page_size}${filtersQuery ? `&${filtersQuery}` : ""}`;

    const flaskUrl = new URL(`${baseUrl}/books?${query}`);

    console.log("Fetching from Flask API:", flaskUrl.toString(), recordSearchParams);

    const res = await fetch(flaskUrl.toString());
    if (!res.ok) {
      return NextResponse.json({ error: "Erro ao buscar documentos" }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Erro na requisição" }, { status: 500 });
  }
}
