import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../config/api";

const rawBaseQuery = fetchBaseQuery({ baseUrl: API_BASE_URL });

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: retry(rawBaseQuery, { maxRetries: 3 }),
  endpoints: () => ({}),
});
