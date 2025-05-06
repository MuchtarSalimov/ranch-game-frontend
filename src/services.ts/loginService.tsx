import {  useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios";
import { toast } from "sonner";
import { useContext } from "react";
import type { AxiosError  } from "axios";
import type { LoginInfo } from "@/types/User";
import { AuthContext } from "@/hooks/UserProvider";

export const baseURL = 'http://localhost:3001/api';

export function useSignup() {
  return useMutation({
    mutationFn: async ({ username, password } : LoginInfo) => await axios.post(`${baseURL}/auth/signup`,
      {
        username,
        password
      }),
      onError: (error: AxiosError) => {
        if (error instanceof Error) {
          toast.error(`error: ${error.message}`)
        } else {
          toast.error('account creation failed')
        }
      },
      onSuccess: (_data) => {
        // const { username, userid, token } = data.data.body; 
        toast.success(`account created`)
      },
  })
}

export function useLogin() {
  const { remember, setUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ username, password } : LoginInfo) => await axios.post(`${baseURL}/auth/login`,
      {
        username,
        password
      }),
      onError: (error: AxiosError) => {
        if (error instanceof Error) {
          toast.error(`error: ${error.message}`)
        } else {
          toast.error('login failed')
        }
      },
      onSuccess: (data) => {
        const { username, userid, token } = data.data; 
        setUser({ username, userid, token })
        if (remember) {
          window.localStorage.setItem('user', JSON.stringify({ username, userid, token}))
        }
        queryClient.invalidateQueries({
          queryKey: ['pokemon', 'pokeballs', 'pokebox']
        })
        toast.success(`login successful`)
      },
  })
}