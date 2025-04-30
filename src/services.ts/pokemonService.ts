import { useQuery } from "@tanstack/react-query"
import type { Pokemon } from "@/types/pokemon";

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
