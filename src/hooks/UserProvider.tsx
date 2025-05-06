import { createContext, useState } from "react";
import type {Dispatch, PropsWithChildren, SetStateAction} from "react";
import type { User } from "@/types/User";

export interface AuthContextInterface {
  user: User,
  remember: boolean,
  setUser: Dispatch<SetStateAction<User>>,
  setRemember: Dispatch<SetStateAction<boolean>>,
}
const storedUser = window.localStorage.getItem('user')
let defaultUser = { username: null, userid: null, token: null}
if (storedUser) {
  defaultUser = JSON.parse(storedUser)
}

const defaultState = {
  user: defaultUser,
  remember: false,
  setUser: (_user: User) => {},
  setRemember: (_value: boolean) => false,
} as AuthContextInterface

export const AuthContext = createContext<AuthContextInterface>(defaultState);

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User>(defaultUser)
  const [remember, setRemember] = useState<boolean>(false)

  return (
    <AuthContext.Provider value={{ user, remember, setUser, setRemember }}>
      { children }
    </AuthContext.Provider>
  )
}