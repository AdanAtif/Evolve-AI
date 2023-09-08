"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation'


export default function DashBoardfrom() {

  const [chatbot, setchatbot] = useState("")
  const [error, seterror] = useState("")
  const [backerror, setbackerror] = useState("")
  const [loader, setloader] = useState(true);
  const router = useRouter();
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const tokenid = await localStorage.getItem("token");
    setloader(false)
    if (!chatbot) {
      seterror("Name of the Chatbot is requried")
      setloader(true)
    }else if(chatbot.length < 4){
      seterror("You need at least 4 Character name")
      setloader(true)

    } else if (tokenid) {
      try {
        const res = await fetch('http://localhost:3000/Dashboard/api/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${tokenid}`,
          },
          body: JSON.stringify({ chatbot }),
        })
        const data = await res.json();
        if (data.status == "success") {
          router.push(`/NewChat/${chatbot}`)
          setloader(true)
        }  else if (data.status == "Notverifyed") {
          setbackerror(data.message)
          setloader(true)
        }else if (data.status == "Failed") {
          setbackerror(data.message)
          setloader(true)
        } else {
          setbackerror("Something went wrong at connecting api")
          setloader(true)

        }
      } catch (e) {
        console.log("------------------1-----------------");
        console.log(e);
        console.log("------------------------------------");
      }
    } else {
      router.push("/Login")
      setloader(true)
    }
  }
  return (
    <>
      <form onSubmit={onSubmitHandler} className="flex mx-3">
        <input
          type="text"
          value={chatbot}
          placeholder="Create a new chatbot..."
          
          className="w-[80%] pl-4 dark:text-slate-400 text-2xl  border-[3px] dark:border-sky-950  rounded-l-md dark:bg-slate-950 bg-slate-50 my-2 focus:border-cyan-500 border-cyan-700 text-cyan-600 focus:outline-none dark:focus:border-blue-900 py-1 border-r-0"
          onChange={(e) => {
            const input = e.target.value.replace(/\s/g, ''); // Remove spaces
            const restrictedInput = input.replace(/[^a-zA-Z0-9]/g, ''); // Restrict to alphanumeric characters
            const maxLengthInput = restrictedInput.slice(0, 20); // Limit to a maximum of 20 characters
            const finalInput = maxLengthInput.length < 4 ? maxLengthInput : maxLengthInput.slice(0, 14); // Limit to a minimum of 4 characters
            setchatbot(finalInput);
          }}
        />
        {loader ? (
          <button type="submit"
            className=" dark:hover:border-blue-900  w-[20%] border-[3px] dark:border-sky-950 rounded-r-md  border-l-0 my-2 py-1 dark:bg-slate-700 bg-cyan-500 text-zinc-700  border-cyan-700 hover:border-blue-400 hover:bg-cyan-300 hover:text-blue-400 dark:hover:text-blue-700 text-2xl b-2 font-medium dark:text-blue-950 dark:hover:bg-gray-950"
          >Create</button>
        ) : (
          <button 
            className=" dark:hover:border-blue-900  w-[20%] border-[3px]
             dark:border-sky-950 rounded-r-md  border-l-0 my-2 py-1 dark:bg-slate-700
              bg-cyan-500 text-zinc-700  border-cyan-700 hover:border-blue-400 hover:bg-cyan-300 hover:text-blue-400
               dark:hover:text-blue-700 text-2xl b-2 font-medium dark:text-blue-950 dark:hover:bg-gray-950"
          >
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-slate-950 dark:border-blue-500"></div>
            </div>
          </button>
        )}

      </form>
      <p className='text-red-500 text-center'>{error}</p>
      <p className='text-red-500 text-center'>{backerror}</p>
    </>
  )
}
