import { baseApi } from "../../../shared/api/baseApi";
import type { ListResponse } from "../../../shared/api/types";
import type { Skill, SkillsParams } from "../model/types";

export const skillApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSkills: build.query<ListResponse<Skill>, SkillsParams>({
      query: ({ page = 1, limit = 5, specializations } = {}) => ({
        url: "/skills",
        params: {
          page,
          limit,
          ...(specializations ? { specializations } : {}),
        },
      }),
    }),
  }),
});

export const { useGetSkillsQuery } = skillApi;
