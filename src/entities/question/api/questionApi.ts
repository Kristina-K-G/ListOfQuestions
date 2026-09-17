import { baseApi } from "../../../shared/api/baseApi";
import type { ListResponse } from "../../../shared/api/types";
import type { PublicQuestionsParams, Question } from '../model/types'

export const questionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPublicQuestions: build.query<ListResponse<Question>, PublicQuestionsParams>({
      query: ({
        page = 1,
        limit = 10,
        specializationId,
        skills,
        complexity,
        rate,
        title,
      } = {}) => ({
        url: "/questions/public-questions",
        params: {
          page,
          limit,
          ...(specializationId ? { specializationId } : {}),
          ...(skills?.length ? { skills } : {}),
          ...(complexity?.length ? { complexity } : {}),
          ...(rate?.length ? { rate } : {}),
          ...(title ? { title } : {}),
        },
      }),
    }),
    getPublicQuestionsById: build.query<Question, string | number>({
      query: (id) => `/questions/public-questions/${id}`,
    }),
  }),
});

export const { useGetPublicQuestionsQuery, useGetPublicQuestionsByIdQuery } =
  questionApi;
