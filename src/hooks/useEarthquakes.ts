import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

export function useEarthquakes(offset: number, limit: number) {
    return useQuery({
      queryKey: ["earthquakes", offset],
      queryFn: async () => {
        const res = await api.get(`/earthquakes?offset=${offset}&limit=${limit}`);
        return res.data;
        },
      enabled: offset >= 0 && limit > 0,
    });
}

export function useEarthquakeDetails(id: string) {
  return useQuery({
    queryKey: ["earthquake-details", id],
    queryFn: async () => {
      const res = await api.get(`/earthquakes/${id}`);
      return res.data;
    },
    enabled: !!id // only run the query if there is an id
  });
}