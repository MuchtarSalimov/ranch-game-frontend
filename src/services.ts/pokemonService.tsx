import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios";
import { toast } from "sonner";
import { useContext } from "react";
import type { AxiosError, AxiosRequestConfig } from "axios";
import type { Pokemon } from "@/types/pokemon";
import time from "@/lib/time"; 
import { AuthContext } from "@/hooks/UserProvider";

export const baseURL = 'http://localhost:3001/api';

export function usePokeBox() {
  const { user } = useContext(AuthContext)
  return useQuery({
    queryKey: ['pokebox'],
    queryFn: async (): Promise<Array<Pokemon>> => {
      const response = await axios.get(`${baseURL}/users/${user.userid}/pokemon`,

      )
      return await response.data
    },
  })
}

export function usePokeBallCount() {
  const { user } = useContext(AuthContext)
  return useQuery({
    queryKey: ['pokeballs'],
    queryFn: async (): Promise<number> => {
      const response = await axios.get(`${baseURL}/users/${user.userid}/pokeballs`)
      return await response.data
    },
    refetchInterval: time.HOUR 
  })
}

export function useCatchPokemon() {
  const { user } = useContext(AuthContext)
  const config = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  }
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({pokedex_number}: {pokedex_number: number}) => { return axios.put(`${baseURL}/users/1/pokemon/${pokedex_number}`, undefined, config as AxiosRequestConfig) },
    onError: (error: AxiosError) => {
      if (error instanceof Error) {
        toast.error('an error occurred')
      } else {
        toast.error('unknown error')
      }
    },
    onSuccess: (data) => {
      toast.success(JSON.stringify(data.data.body))
      queryClient.invalidateQueries({
        queryKey: ['pokeballs']
      })
    },
  })
}