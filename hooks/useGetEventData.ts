"use client";

import { useEffect } from "react";
import type { IEvent } from "../model/event";
import httpService from "../utils/httpService";
import { useEventDetail } from "@/global/useEventDetails";
import { useParams } from "next/navigation";
import { toast } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";

const useGetEventData = () => {
  const { updateEvent } = useEventDetail((state) => state);
  const { id } = useParams();

  const query = useQuery<IEvent>({
    queryKey: ["event", id],
    queryFn: async () => {
      const res = await httpService.get(`/events/${id}`);
      return res.data.event;
    },
    enabled: !!id,
  });

  // ✅ Handle success (update Zustand store)
  useEffect(() => {
    if (query.data) {
      updateEvent(query.data);
    }
  }, [query.data, updateEvent]);

  // ✅ Handle error (toast)
  useEffect(() => {
    if (query.error) {
      const error: any = query.error;
      toast.danger(error?.response?.data || "Something went wrong");
    }
  }, [query.error]);

  return {
    data: query.data,
    isLoading: query.isLoading,
    isRefetching: query.isRefetching,
  };
};

export default useGetEventData;