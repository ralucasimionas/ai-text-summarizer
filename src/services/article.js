import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rapidApiKey = import.meta.env.VITE_RAPID_API_KEY;

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "'https://article-extractor-and-summarizer.p.rapidapi.com/",
    prepareHeader: (headers) => {
      headers.set(
        "X-RapidAPI-Host",
        "article-extractor-and-summarizer.p.rapidapi.com"
      );
      headers.set("X-RapidAPI-Key", rapidApiKey);
      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) =>
        `summarize?url=${encodeURIComponent(
          params.articleUrl
        )}&length=3&raw=true`,
      headers: {
        "Content-Type": "application/json",
      },
      validateStatus: (response, result) =>
        response.status === 200 && !result.isError,
    }),
  }),
});

export const { useLazyGetSummaryQuery } = articleApi;
