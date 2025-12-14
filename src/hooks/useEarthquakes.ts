import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import type { Earthquake } from "../types/Earthquake";

// Hook to fetch a list of earthquakes
export function useEarthquakes(offset: number, limit: number) {
  return useQuery({
    queryKey: ["earthquakes", offset],
    queryFn: async () => {
      const res = await api.get(`/earthquakes?offset=${offset}&limit=${limit}`);
      return res.data;
    },
    placeholderData: (previousData) => previousData,
    enabled: offset >= 0 && limit > 0
  });
}

// Hook to fetch details of a specific earthquake by ID
export function useEarthquakeDetails(id: string) {
  return useQuery({
    queryKey: ["earthquake", id],
    queryFn: async () => {
      const response = await api.get<Earthquake>(`/earthquakes/${id}`);
      return response.data;
    },
    enabled: !!id, // only run if there is an id
    placeholderData: (previousData) => previousData
  });
}
