"use client"
import { useRouter } from 'next/navigation'
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { useState } from 'react';
import Footer from '../(components)/footer/Footer'


export default function Home() {

  

  const [firstname, setfirstname] = useState<string>("")
  const [lastname, setlastname] = useState<string>("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const router = useRouter();
  const [error, seterror] = useState("")
  const [backerror, setbackerror] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setloader] = useState(true);




  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const onSubmitHandler = async (event: any) => {
    event.preventDefault();
    if (!firstname || !email || !password || !lastname) {
      seterror("This field is requried")
    } else {
      try {
        setloader(false)
        const res = await fetch('http://localhost:3000/Signup/api/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ firstname, lastname, email, password }),
        })
        const data = await res.json();
        if (data.status == "success") {
          await localStorage.setItem("token", data.token)
          await localStorage.setItem("HashDigits", data.HashDigits)
          router.push('/Verify')
        } else if (data.status == "Failed") {
          setbackerror(data.message)
        } else {
          setbackerror("Something went wrong at connecting api")
        }
      } catch (e) {
        console.log("------------------1-----------------");
        console.log(e);
        console.log("------------------------------------");
      } finally {
        setloader(true)
      }
    }
  }

  return (
    <>
      <div className="flex my-3 justify-center h-auto">
        <div className="dark:bg-slate-900 bg-slate-100  lg:w-[50%] md:w-[70%] sm:w-[90%]  py-8 rounded-lg drop-shadow-2xl shadow-red-500">
          <p className="text-4xl dark:text-sky-900 text-slate-50 text-center mb-6 dark:bg-slate-950 bg-cyan-700 py-2">Create an Account</p>
          <br />
          <form className="lg:mx-[15%] md:mx-[10%] sm:mx-[5%]">
      <div className="flex flex-col">
        <label htmlFor="firstName" className="dark:text-slate-400 text-slate-900 mb-2 text-xl">First name</label>
        <input
          type="text"
          id="firstName"
          placeholder="First name..."
          value={firstname}
          onChange={(e) => setfirstname(e.target.value)}
          className="pl-2 w-full dark:text-slate-400 text-slate-900 bg-neutral-200 text-2xl border-[3px] dark:border-sky-950 border-sky-500 rounded-md dark:bg-slate-950 my-2 focus:outline-none focus:border-blue-900 py-1"
        />
        {!firstname && <p className='text-red-500 text-center'>{error}</p>}
      </div>
      <br />
      <div className="flex flex-col">
        <label htmlFor="lastName" className="dark:text-slate-400 text-slate-900 mb-2 text-xl">Last name</label>
        <input
          type="text"
          id="lastName"
          placeholder="Last name..."
          value={lastname}
          onChange={(e) => setlastname(e.target.value)}
          className="pl-2 w-full dark:text-slate-400 text-slate-900 bg-neutral-200 text-2xl border-[3px] dark:border-sky-950 border-sky-500 rounded-md dark:bg-slate-950 my-2 focus:outline-none focus:border-blue-900 py-1"
        />
        {!lastname && <p className='text-red-500 text-center'>{error}</p>}
      </div>
      <br />
      <div className="flex flex-col">
        <label htmlFor="email" className="dark:text-slate-400 text-slate-900 mb-2 text-xl">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Email..."
          value={email}
          onChange={(e) => setemail(e.target.value)}
          className="pl-2 w-full dark:text-slate-400 text-slate-900 bg-neutral-200 text-2xl border-[3px] dark:border-sky-950 border-sky-500 rounded-md dark:bg-slate-950 my-2 focus:outline-none focus:border-blue-900 py-1"
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
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="pl-2 w-full dark:text-slate-400 text-slate-900 bg-neutral-200 text-2xl border-[3px] dark:border-sky-950 border-sky-500 rounded-md dark:bg-slate-950 my-2 focus:outline-none focus:border-blue-900 py-1"
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
        {!password && <p className='text-red-500 text-center'>{error}</p>}
      </div>
      <br />

      {loader ? (
        <div className="flex justify-center">
          <button
            type="submit"
            onClick={onSubmitHandler}
            className="dark:hover:border-blue-900 hover:border-slate-50 border-[3px] dark:border-sky-950 rounded-md my-2 py-3 px-7 dark:bg-slate-400 bg-cyan-500 dark:hover:text-blue-700 hover:text-slate-50 text-2xl font-medium text-slate-950 hover:bg-blue-500 dark:hover:bg-gray-950"
          >
            Create an Account
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-slate-950 dark:border-blue-500"></div>
        </div>
      )}
      <p className='text-red-500 text-center'>{backerror}</p>
      <p className='text-sky-700 text-center mt-2'>Already have an Account?<span className='cursor-pointer dark:text-sky-300 text-sky-900 font-semibold' onClick={() => router.push('/Login')}> Sign In</span></p>
    </form>
        </div>
      </div>
      <Footer/>
    </>
  )
}
