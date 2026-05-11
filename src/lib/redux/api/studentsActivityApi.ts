import { baseApi } from "./baseApi";
import type { StudentActivitiesSuccessResponse } from "./types/activity";

export const studentsActivityApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getStudentActivities: build.query<StudentActivitiesSuccessResponse, void>({
      query: () => ({
        url: "/students/activity",
      }),
    }),
  }),
});

export const { useGetStudentActivitiesQuery } = studentsActivityApi;
