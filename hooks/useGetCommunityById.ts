"use client";

import { useEffect } from "react";
import httpService from "../utils/httpService";
import type { ICommunity } from "../model/community";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "@heroui/react";

const useGetCommunityById = (index?: string) => {
  const params = useParams();

  const id = (params?.id as string) || undefined;
  const communityId = index ?? id;

  const query = useQuery<ICommunity>({
    queryKey: ["communities-by-id", communityId],
    queryFn: async () => {
      const res = await httpService.get(`/communities/${communityId}`);
      return res?.data?.community;
    },
    enabled: !!communityId,
  });

  // ✅ Handle error (v5 way)
  useEffect(() => {
    if (query.error) {
      const error: any = query.error;
      toast.danger(error?.response?.data || "Something went wrong");
    }
  }, [query.error]);

  return {
    isLoading: query.isLoading,
    isRefetching: query.isRefetching,
    data: query.data,
  };
};

export default useGetCommunityById;