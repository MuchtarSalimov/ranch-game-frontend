import { useQuery } from "@tanstack/react-query"
import type { Pokemon } from "@/types/pokemon";
import time from "@/lib/time"; 

const baseURL = 'http://localhost:3001/api';

const userid = 1;

export function usePokeBox() {
  return useQuery({
    queryKey: ['pokebox'],
    queryFn: async (): Promise<Array<Pokemon>> => {
      const response = await fetch(`${baseURL}/users/${userid}/pokemon`)
      return await response.json()
    },
  })
}

export function usePokeBallCount() {
  return useQuery({
    queryKey: ['pokeballs'],
    queryFn: async (): Promise<number> => {
      const response = await fetch(`${baseURL}/users/${userid}/pokeballs`)
      return await response.json()
    },
    refetchInterval: time.HOUR 
  })
}
