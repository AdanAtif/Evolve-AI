"use client"
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import Footer from '../(components)/footer/Footer'


export default function Home() {

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [error, seterror] = useState("")
  const router = useRouter();
  const [loginError, setLoginError] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setloader] = useState(true);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmitHandler = async (event: any) => {
    event.preventDefault();
    if (!email || !password) {
      seterror("This field is requried")
    } else {
      try {
        setloader(false)
        const res = await fetch('http://localhost:3000/Login/api/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })
        const data = await res.json();
        if (data.status == "success") {
          localStorage.setItem("token", data.token)
          router.push('/')
        } else if (data.status == "Failed") {
          setLoginError(data.message)
        } else {
          setLoginError("Something went wrong at connecting api")
        }
      } catch (e) {
        console.log("------------------------------------");
        console.log(e);
        console.log("------------------------------------");
      } finally {
        setloader(true)
      }
    }
  }

  return (
    <>
    <div className='h-screen'>
      <div className="flex my-3 justify-center h-auto">
        <div className="dark:bg-slate-900 bg-slate-100  lg:w-[50%] md:w-[70%] sm:w-[90%]  py-8 rounded-lg drop-shadow-2xl shadow-red-500">
          <p className="text-4xl dark:text-sky-900 text-slate-50 text-center mb-6 dark:bg-slate-950 bg-cyan-700 py-2">Sign In</p>
          <p className='text-center pr-2  text-sky-600 darK:text-sky-300  text-sm' >To access our Artifical Intelligance Chatbot you need to SignIn</p>
          <br />
          <form className="lg:mx-[15%] md:mx-[10%] sm:mx-[5%]" onSubmit={onSubmitHandler}>
            <div className="flex flex-col">
              <label htmlFor="email" className="dark:text-slate-400 text-slate-900 mb-2 text-xl">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email..."
                className="pl-2 w-full dark:text-slate-400 text-slate-900 bg-neutral-200 text-2xl border-[3px] dark:border-sky-950 border-sky-500 rounded-md dark:bg-slate-950 my-2 focus:outline-none focus:border-blue-900 py-1"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              {!email && <p className='text-red-500 text-center'>{error}</p>}
            </div>
            <br />
            <div className="flex flex-col relative">
              <label htmlFor="password" className="dark:text-slate-400 text-slate-900 mb-2 text-xl">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Password..."
                  className="pl-2 w-full dark:text-slate-400 text-slate-900 bg-neutral-200 text-2xl border-[3px] dark:border-sky-950 border-sky-500 rounded-md dark:bg-slate-950 my-2 focus:outline-none focus:border-blue-900 py-1"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
                <div className="absolute right-2 top-2">
                  {showPassword ? (
                    <RiEyeFill
                      size={24}
                      className="dark:text-slate-400 text-slate-900 cursor-pointer mt-2"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <RiEyeOffFill
                      size={24}
                      className="dark:text-slate-400 text-slate-900  cursor-pointer mt-2"
                      onClick={togglePasswordVisibility}
                    />)}
                </div>
              </div>
              <p className='text-right pr-2 cursor-pointer text-sky-600 dark:hover:text-sky-300 hover:text-sky-900  text-sm' onClick={() => router.push('/Resetlink')}>Forgot Password ?</p>
              {!password && <p className='text-red-500 text-center pt-1'>{error}</p>}
            </div>
            <br />
            {loader ? (

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="dark:hover:border-blue-900 hover:border-slate-50 border-[3px] dark:border-sky-950 rounded-md my-2 py-3 px-7 dark:bg-slate-400 bg-cyan-500 dark:hover:text-blue-700 hover:text-slate-50 text-2xl font-medium text-slate-950 hover:bg-blue-500 dark:hover:bg-gray-950"
                >
                  Login
                </button>
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-slate-950 dark:border-blue-500"></div>
              </div>
            )}

            <p className='text-red-500 text-center'>{loginError}</p>
            <p className='text-sky-700 text-center mt-2'>Create an account?<span className='cursor-pointer dark:text-sky-300 text-sky-900 font-semibold' onClick={() => router.push('/Signup')}> Sign Up</span></p>
          </form>
        </div>
      </div>
      </div>
      < Footer/>
    </>
  )
}
