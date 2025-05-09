import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios";
import { toast } from "sonner";
import { useContext } from "react";
import type { AxiosError, AxiosRequestConfig } from "axios";
import type { Pokemon } from "@/types/pokemon";
import { AuthContext } from "@/hooks/UserProvider";

export const baseURL = 'http://localhost:3001/api';

export function usePokeBox() {
  const { user } = useContext(AuthContext)
  const config = {
    headers: {
      'Authorization': `Bearer ${user.token}`,
    }
  }
  return useQuery({
    queryKey: ['pokebox'],
    queryFn: async (): Promise<Array<Pokemon>> => {
      const response = await axios.get(`${baseURL}/users/${user.userid}/pokemon`,
        config as AxiosRequestConfig
      )
      return await response.data
    },
    enabled: user.userid !== null,
  })
}

export function useWildPokemon() {
  const { user } = useContext(AuthContext)
  const config = {
    headers: {
      'Authorization': `Bearer ${user.token}`,
    }
  }
  return useQuery({
    queryKey: ['wild'],
    queryFn: async (): Promise<Array<Pokemon>> => {
      const response = await axios.get(`${baseURL}/users/${user.userid}/wild`,
        config as AxiosRequestConfig
      )
      return await response.data
    },
    enabled: user.userid !== null
  })
}

export function usePokeBallCount() {
  const { user } = useContext(AuthContext)
  const config = {
    headers: {
      'Authorization': `Bearer ${user.token}`,
    }
  }
  return useQuery({
    queryKey: ['pokeballs'],
    queryFn: async (): Promise<number> => {
      const response = await axios.get(`${baseURL}/users/${user.userid}/pokeballs`,
        config as AxiosRequestConfig
      )
      return await response.data
    },
    enabled: user.userid !== null
  })
}

export function useCatchPokemon() {
  const { user } = useContext(AuthContext)
  const config = {
    headers: {
      'Authorization': `Bearer ${user.token}`,
    }
  }
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({pokedex_number}: {pokedex_number: number}) => { return axios.put(`${baseURL}/users/${user.userid}/pokemon/${pokedex_number}`, undefined, config as AxiosRequestConfig) },
    onError: (error: AxiosError) => {
      if (error instanceof Error) {
        toast.error('an error occurred')
      } else {
        toast.error('unknown error')
      }
    },
    onSuccess: (data) => {
      console.log(data.data)
      toast.success(data.data)
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.every((key) => 
            ['pokeballs', 'pokebox'].includes(key as string)
        )
      });
    },
  })
}