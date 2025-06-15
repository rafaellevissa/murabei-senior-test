export const baseUrl = process.env.API_BASE_URL ?? (() => { throw new Error("API_BASE_URL não definida") })();
