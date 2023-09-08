"use client"
import {useState } from 'react';
import { useRouter } from 'next/navigation'

const Button = () => {
  const [loader, setloader] = useState(true);
  const router = useRouter();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setloader(false)
    try {
      const tokenid = await localStorage.getItem("token");
      if (tokenid) {
        const res = await fetch("http://localhost:3000/authurization/api/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenid}`,
          },
          body: JSON.stringify({}),
        });
        const data = await res.json();
        if (data.status === "success") {
          router.push("/Dashboard")
          setloader(true);
        } else if (data.status === "Notverifyed") {
          router.push("/Verify")
          setloader(true);
        } else {
          router.push("/Login");
          setloader(true)
        } 
      } else {
        router.push("/Login");
        setloader(true);
      }
    } catch (error) {
      console.log("------------------------------------");
      console.log(error);
      console.log("------------------------------------");
    } finally {
    }
  };


  return (
    <>
    {loader ? <button className="py-1 px-6 border-cyan-600 border-[0.4rem] font-semibold text-slate-950 rounded-[2.5rem] text-[1.3rem] hover:bg-cyan-500 hover:text-white hover:border-cyan-500" onClick={onSubmitHandler}>Get Started</button>
    :
     <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-slate-950 dark:border-blue-500"></div>
        </div>
    }
    </>
  )
}

export default Button