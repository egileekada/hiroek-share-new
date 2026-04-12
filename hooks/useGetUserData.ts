"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import httpService from "@/utils/httpService";
import { toast } from "@heroui/react";

import type { IParnter } from "../model/user";

interface EventData {
  [date: string]: any;
}

/**
 * ===============================
 * 1. GET USER DATA (BY PARAM ID)
 * ===============================
 */
export const useUserData = () => {
  const { id } = useParams();

  const query = useQuery({
    queryKey: ["userdata", id],
    queryFn: async () => {
      const res = await httpService.get(`/event-partners/${id}`);
      return res.data.eventPartner as IParnter;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (query.error) {
      const err: any = query.error;
      toast.danger(err?.response?.data);
    }
  }, [query.error]);

  return query;
};

/**
 * ===============================
 * 2. GET CURRENT USER
 * ===============================
 */
export const useCurrentUser = () => {
  const userId =
    typeof window !== "undefined"
      ? sessionStorage.getItem("userId")
      : null;

  const query = useQuery({
    queryKey: ["current-user", userId],
    queryFn: async () => {
      const res = await httpService.get(`/users/${userId}`);
      return res.data.user as IParnter;
    },
    enabled: !!userId,
  });

  useEffect(() => {
    if (query.error) {
      const err: any = query.error;
      toast.danger(err?.response?.data);
    }
  }, [query.error]);

  return query;
};

/**
 * ===============================
 * 3. GET CURRENCY DATA
 * ===============================
 */
export const useCurrencyData = () => {
  const query = useQuery({
    queryKey: ["currency-data"],
    queryFn: async () => {
      const res = await httpService.get(`/donations/currency-quote`);
      return res.data.quotes;
    },
  });

  useEffect(() => {
    if (query.error) {
      const err: any = query.error;
      toast.danger(err?.response?.data);
    }
  }, [query.error]);

  return query;
};

/**
 * ===============================
 * 4. GET EVENT SCHEDULE
 * ===============================
 */
export const useEventData = () => {
  const { id } = useParams();

  const query = useQuery({
    queryKey: ["event-schedule", id],
    queryFn: async () => {
      const res = await httpService.get(
        `/event-partners/event-schedule/${id}`
      );
      return res.data.events as EventData;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (query.error) {
      const err: any = query.error;
      toast.danger(err?.response?.data);
    }
  }, [query.error]);

  return query;
};

/**
 * ===============================
 * 5. GET EVENT BY DATE
 * ===============================
 */
export const useEventDataByDate = () => {
  const [internalId, setInternalId] = useState<string>("");
  const [month, setMonth] = useState<Date | undefined>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const query = useQuery({
    queryKey: ["event-by-date", internalId, month?.toISOString()],
    queryFn: async () => {
      const res = await httpService.get(
        `/event-partners/event-schedule/${internalId}/${format(
          month ?? new Date(),
          "yyyy-MM"
        )}`
      );
      return res.data.events;
    },
    enabled: !!internalId && !!month,
  });

  useEffect(() => {
    if (query.error) {
      const err: any = query.error;
      toast.danger(err?.response?.data);
    }
  }, [query.error]);

  return {
    ...query,
    internalId,
    setInternalId,
    month,
    setMonth,
    showModal,
    setShowModal,
  };
};