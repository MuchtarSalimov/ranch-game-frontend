import {  useForm } from "react-hook-form"
import { useContext } from "react";
import { Button } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import { SignupContext } from "./index";
import type {SubmitHandler} from "react-hook-form";
import "./style.css"
import { AuthContext } from "@/hooks/UserProvider";
import { useLogin } from "@/services.ts/loginService";

type Inputs = {
  username: string
  password: string
  remember: boolean
}

export function LoginForm() {
  const { setRemember } = useContext(AuthContext);
  const { isSignup, setIsSignup } = useContext(SignupContext)
  const loginMutation = useLogin()

  const {
    register, handleSubmit, watch, formState: { errors },
    } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = ({ username, password, remember }) =>{
    // call service to login and get token
    loginMutation.mutate({ username, password })
    setRemember(!!remember)
  }


  console.log(watch("username")) // watch input value by passing the name of it
  // console.log(watch("password")) // watch input value by passing the name of it
  // console.log(watch("remember")) // watch input value by passing the name of it

  return (
    <div>
      <form className={"bg-gray-900 flex flex-col h-[calc(100vh-80px)] w-full items-center p-8 gap-2 text-gray-200"} onSubmit={handleSubmit(onSubmit)}>
        <h3>Login</h3>
        {/* register your input into the hook by invoking the "register" function */}
        <input className={"bg-gray-200 text-black p-1"} placeholder="username" {...register("username", { required: true })}  />
        <input className={"bg-gray-200 text-black p-1"} type="password" placeholder="password" {...register("password", { required: true })} />
        <div className="flex flex-row gap-2">
          <input type="checkbox" { ...register("remember")}/>
          <p>remember me</p>
        </div>
        {/* errors will return when field validation fails  */}
        <div className="relative">
          <LoginIcon sx={{ position: 'absolute', height: '20px', top: '10px', left:'6px'}}/>
          <input className="h-10 w-26 rounded-sm text-white bg-sky-800 border-gray-200 border-1 p-1" type="submit" value=' login'/>
        </div>
        <div className="h-10"/>
        <p className="text-xs">don't have an account? &nbsp;
        </p>
        <Button onClick={()=> setIsSignup(!isSignup)} variant="outlined" size="small" color="inherit">sign up</Button>
      </form> 
    </div>
  )
}