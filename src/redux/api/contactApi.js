import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://contact-app.mmsdev.site/api/v1",
  }),
  tagTypes: ["contacts"],
  endpoints: (builder) => ({
    getContact: builder.query({
      query: (token) => ({
        url: "/contact",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["contacts"],
    }),
    createContact: builder.mutation({
      query: ({ token, contact }) => ({
        url: "/contact",
        method: "POST",
        body: contact,
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["contacts"],
    }),
    updateContact: builder.mutation({
      query: ({ token, contact, id }) => ({
        url: `/contact/${id}`,
        method: "PUT",
        body: contact,
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["contacts"],
    }),
    deleteContact: builder.mutation({
      query: ({ id, token }) => ({
        url: `/contact/${id}`,
        method: "DELETE",
        body: id,
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["contacts"],
    }),
    getSingleContact: builder.query({
      query: ({ id, token }) => ({
        url: `/contact/${id}`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["contacts"],
    }),
  }),
});

export const {
  useGetContactQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
  useGetSingleContactQuery,
  useUpdateContactMutation,
} = contactApi;
