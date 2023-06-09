import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { RootContext } from "../context/RootContext";
import toast from 'react-hot-toast';
import Head from 'next/head'
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter()
  const { register, handleSubmit } = useForm();
  const { LOGIN, setUser, user } = useContext(RootContext)
  const [errors, setErrors] = useState(null)
  const redirect = router.pathname === router.asPath ? '/dashboard' : router.asPath

  const handleLogin = (data) => {
    LOGIN(data)
      .then(res => {
        setUser(res.data.user)
        toast.success('Login success')
        router.push(redirect)
        setErrors(null)
      })
      .catch(err => { console.log(err); toast.error(err.data?.message?.type); setErrors(err.data?.message) })
  }
  const backgroundClass = classNames("bg-[url('https://i.ibb.co/hRKMMLH/Rectangle.png')] max-h-screen bg-no-repeat bg-center bg-cover bg-fixed");
  const formClass = classNames("relative bg-[#000000b0] w-[80%] md:w-[40%] lg:w-[25%] text-white mx-auto mt-20 lg:mt-32 py-10 px-5 rounded shadow-2xl");
  const loginButton = classNames("bg-[#627FF4] w-full py-1 my-3 rounded-sm hover:bg-slate-300 hover:text-[#627FF4] hover:font-bold");
  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>
      <div className={backgroundClass}>
        <div className="py-20">
          <div className={formClass}>
            <FaUserAlt className="absolute top-[-10%] left-[40%] text-7xl bg-[#627FF4] px-5 rounded-full" />
            <h1 className="text-center py-5 text-xl">Login </h1>
            <div className="text-left px-5">
              <form className="text-left" onSubmit={handleSubmit(handleLogin)}>
                <div className="py-2">
                  <p className="text-left text-slate-200 text-[15px] font-normal">
                    Email :
                  </p>
                  <input
                    {...register("username")}
                    className={`w-full border-b-2  focus:outline-none font-light text-slate-300 text-[14px] bg-[#00000000] ${errors?.username ? 'border-red-600 text-red-400' : null}`}
                    // className={` w-full border-b-2  focus:outline-none font-light text-slate-300 text-[14px] bg-[#00000000] `}
                    type="text"
                  />
                  {errors?.username && <p className="text-red-600 text-[14px]  mb-[5px] text-right">{errors?.type}</p>}

                </div>
                <div className="py-2">
                  <p className="text-left text-slate-200 text-[15px] font-normal">
                    Password :
                  </p>
                  <input
                    {...register("password")}
                    className={`w-full border-b-2  focus:outline-none font-light text-slate-300 text-[14px] bg-[#00000000] ${errors?.password ? 'border-red-600 text-red-400' : null}`}
                    type="password"
                  />
                  {errors?.password && <p className="text-red-600 text-[14px]  mb-[5px] text-right">{errors?.type}</p>}

                </div>
                <button type="submit" className={`${loginButton}`}>
                  Login
                </button>
              </form>
              <div className="text-center">
                <Link
                  className="text-[#627ff4] align-center font-normal text-lg"
                  href="/recovery"
                >
                  <h5 className="hover:text-white">Forget password?</h5>
                </Link>
              </div>
              <p className="text-slate-300 text-sm text-center">
                Dont have an account ?
                <Link
                  href="/register"
                  className="text-[#627ff4] pl-2 hover:text-white"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
