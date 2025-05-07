import {   createContext, useState  } from "react";
import "./style.css"
import { SignupForm } from "./SignupForm";
import { LoginForm } from "./loginForm";
import type { Dispatch, SetStateAction} from "react";

export interface SignupContextInterface {
  isSignup: boolean,
  setIsSignup: Dispatch<SetStateAction<boolean>>,
}

const defaultState = {
  isSignup: false,
  setIsSignup: (_value: boolean) => false,
} as SignupContextInterface

export const SignupContext = createContext<SignupContextInterface>(defaultState);

export function Login() {
  const [isSignup, setIsSignup] = useState(false);
  
  return (
    <SignupContext.Provider value={{ isSignup, setIsSignup }}>
      { isSignup ? <SignupForm />: <LoginForm/> }
    </SignupContext.Provider>
  )
}