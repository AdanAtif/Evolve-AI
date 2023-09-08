"use client"
import { useState } from 'react';
import Footer from '../(components)/footer/Footer'

export default function Home() {

  const [email, setemail] = useState("")
  const [error, seterror] = useState("")
  const [backerror, setbackerror] = useState('')
  const [loader, setloader] = useState(true);

  const onSubmitHandler = async (event:any) => {
    event.preventDefault();
    if (!email) {
      seterror('Please fill the field properly')
    } else {
      try {
        setloader(false)
        const res = await fetch('http://localhost:3000/Resetlink/api/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        })
        const data = await res.json();
        if (data.status == "success") {      
          setbackerror("Verication link has been Sent to your Email")
        } else if(data.status == "Failed") {
          setbackerror(data.message)
        }  else{
          setbackerror("Something went wrong at connecting api")
        } 
      } catch (e) {
        console.log("------------------1-----------------");
        console.log(e);
        console.log("------------------------------------");
      }finally{
        setloader(true)
      }
    } 
    }
  return (
    <>
      <div className="flex my-3 justify-center h-auto">
        <div className="dark:bg-slate-900 bg-slate-100  lg:w-[50%] md:w-[70%] sm:w-[90%]  py-8 rounded-lg drop-shadow-2xl shadow-red-500">
          <p className="text-4xl dark:text-sky-900 text-slate-50 text-center mb-6 dark:bg-slate-950 bg-cyan-700 py-2">Reset Password</p>
          
          <form className="lg:mx-[15%] md:mx-[10%] sm:mx-[5%]">
      <div className="flex flex-col">
        <p className='text-center pr-2  text-sky-600 darK:text-sky-300  text-sm' >To reset your password we will sent an link on your</p>
        <p className='text-center pr-2  text-sky-600  text-sm' >email for verification</p>
        <br />
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
      
      {loader ? (
     <div className="flex justify-center">
     <button
       type="submit"
       onClick={onSubmitHandler}
       className="dark:hover:border-blue-900 hover:border-slate-50 border-[3px] dark:border-sky-950 rounded-md my-2 py-3 px-7 dark:bg-slate-400 bg-cyan-500   dark:hover:text-blue-700 hover:text-slate-50 text-2xl font-medium text-slate-950 hover:bg-blue-500 dark:hover:bg-gray-950"
     >
       Email Verification
     </button>       
   </div>
       ) : (
         <div className="flex justify-center items-center">
         <div className="animate-spin rounded-full h-8 w-8 border-4 border-slate-950 dark:border-blue-500"></div>
       </div>
       )}
      <p className='text-red-500 text-center'>{backerror}</p>
    </form>
        </div>
      </div>
      <Footer/>
    </>
  )
}
