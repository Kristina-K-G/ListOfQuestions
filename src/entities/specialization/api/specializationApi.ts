import { baseApi } from "../../../shared/api/baseApi";
import type { ListResponse } from "../../../shared/api/types";
import type { Specialization, SpecializationsParams } from "../model/types";

export const specializationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSpecializations: build.query<
      ListResponse<Specialization>,
      SpecializationsParams
    >({
      query: ({ page = 1, limit = 5 } = {}) => ({
        url: "/specializations",
        params: { page, limit },
      }),
    }),
  }),
});

export const { useGetSpecializationsQuery } = specializationApi;
