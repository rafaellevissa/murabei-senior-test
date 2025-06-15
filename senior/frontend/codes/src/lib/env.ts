export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? (() => { throw new Error("NEXT_PUBLIC_API_BASE_URL não definida") })();
