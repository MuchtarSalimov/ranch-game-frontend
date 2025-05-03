import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import type { Pokemon } from "@/types/pokemon";
import time from "@/lib/time"; 

export const baseURL = 'http://localhost:3001/api';

const userid = 1;

export function usePokeBox() {
  return useQuery({
    queryKey: ['pokebox'],
    queryFn: async (): Promise<Array<Pokemon>> => {
      const response = await axios.get(`${baseURL}/users/${userid}/pokemon`)
      return await response.data
    },
  })
}

export function usePokeBallCount() {
  return useQuery({
    queryKey: ['pokeballs'],
    queryFn: async (): Promise<number> => {
      const response = await axios.get(`${baseURL}/users/${userid}/pokeballs`)
      return await response.data
    },
    refetchInterval: time.HOUR 
  })
}

export function useCatchPokemon() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({pokedex_number}: {pokedex_number: number}) => { return axios.put(`${baseURL}/users/1/pokemon/${pokedex_number}`) },
    onError: (error: AxiosError) => {
      if (error instanceof Error) {
        toast.error('an error occurred')
      } else {
        toast.error('unknown error')
      }
    },
    onSuccess: (data) => {
      console.log(data)
      toast.success(JSON.stringify(data.data.body))
      queryClient.invalidateQueries({
        queryKey: ['pokeballs']
      })
    },
  })
}