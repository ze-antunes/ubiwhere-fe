import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import type { Earthquake } from "../types/Earthquake";

export function useEarthquakes(offset: number, limit: number) {
  return useQuery({
    queryKey: ["earthquakes", offset],
    queryFn: async () => {
      const res = await api.get(`/earthquakes?offset=${offset}&limit=${limit}`);
      return res.data;
    },
    enabled: offset >= 0 && limit > 0
  });
}

export function useEarthquakeDetails(id: string) {
  return useQuery({
    queryKey: ["earthquake", id],
    queryFn: async () => {
      const response = await api.get<Earthquake>(`/earthquakes/${id}`);
      return response.data;
    },
    enabled: !!id // only run if there is an id
  });
}
