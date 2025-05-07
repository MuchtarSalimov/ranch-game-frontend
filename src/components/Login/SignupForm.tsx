import { toast } from "sonner";
import { Button } from "@mui/material";
import { useContext } from "react";
import { useForm } from "react-hook-form"
import { SignupContext } from "./index";
import type {SubmitHandler} from "react-hook-form";
import "./style.css"
import { useSignup } from "@/services.ts/loginService";


type Inputs = {
  username: string
  password: string
  password2: string
}

export function SignupForm() {
  const signupMutation = useSignup();
  const { isSignup, setIsSignup } = useContext(SignupContext)

  // register, handleSubmit, watch, formState: { errors },

  const {
    register, handleSubmit, watch, formState: { errors },
    } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = ({ username, password, password2 }) =>{
    // call service to login and get token
    if (password !== password2) {
      toast.error('passwords do not match')
    } else {
      signupMutation.mutate({ username, password });
      setIsSignup(false);
    }
  }

  console.log(watch("username")) // watch input value by passing the name of it
  // console.log(watch("password")) // watch input value by passing the name of it
  // console.log(watch("remember")) // watch input value by passing the name of it

  return (
    <form className={"bg-gray-900 flex flex-col h-[calc(100vh-80px)] w-full items-center p-8 gap-2 text-gray-200"} onSubmit={handleSubmit(onSubmit)}>
      <h3>Create Account</h3>
      {/* register your input into the hook by invoking the "register" function */}
      <input className={"bg-gray-200 text-black p-1"} placeholder="username" {...register("username", { required: true })}  />
      <input className={"bg-gray-200 text-black p-1"} type="password" placeholder="password" {...register("password", { required: true })} />
      <input className={"bg-gray-200 text-black p-1"} type="password" placeholder="confirm password" {...register("password2", { required: true })} />
      {/* errors will return when field validation fails  */}
      <input className="rounded-sm text-white bg-sky-800 border-gray-200 border-1 p-1" type="submit" value="Submit"/>
      <div className="h-10"/>
        <p className="text-xs">don't have an account? &nbsp;
        </p>
        <Button onClick={()=> setIsSignup(!isSignup)} variant="outlined" size="small" color="inherit">log in</Button>
    </form>
  )
}