"use client"
import { BsTrash } from "react-icons/bs";
import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation'

const Chatdata = ({data}) => {
  const [Data, setData] = useState(data)  
  const [check, setcheck] = useState(" ")
  const [loader, setloader] = useState(false);
  const router = useRouter();

  useEffect(() => {
    userid()
  }, [Data]);


        const userid = async () => {
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
          const user = data.user.id
        setcheck(user)
        setloader(true)
        } else if (data.status === "Notverifyed") {
       router.push("/Verify")
        } else{
       router.push("/Login")
        }
      } else {
       router.push("/Login")
      }
    }
    
    const cancel = async (item) => {
      console.log(item);
      try {
        const res =await fetch('http://localhost:3000/Dashboard/api/', {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           id:item.id
         }),
       });
       const data1 = await res.json();
      console.log("data", data1);
      setData((prevData) => prevData.filter((e) => e.id !== data1.id));
      console.log(Data);
      } catch (error) {
       console.log("error",error);
      }
     };

    return (
      <>      
      {loader ? (
        <>{Data.filter((item1) => item1.nextUserId && item1.nextUserId.includes(check)).map((item, index) => {
          return (
            <div className="my-4 flex w-[100%] dark:bg-slate-950 bg-cyan-500 hover:bg-cyan-300 text-slate-200 hover:text-cyan-800 dark:hover:text-slate-950 dark:hover:bg-sky-900 dark:text-sky-900cursor-pointer" key={item.id}>
          <p className="py-2 px-6  text-3xl  dark:text-slate-950 font-semibold text-slate-50 dark:bg-slate-800 bg-cyan-700 text-center justify-center w-[10%]">{index+1}</p>
          <p className="my-1  text-3xl py-1 pl-5 w-[80%] cursor-pointer" onClick={() => router.push(`/NewChat/${item.name}`)}>{item.name}</p> 
          <p  className="w-[auto]  py-3 px-6 cursor-pointer  text-3xl  text-red-800 dark:bg-slate-800 bg-cyan-700 text-center justify-center  border-slate-900 dark:hover:bg-zinc-900 hover:bg-cyan-400 hover:text-red-600" 
          onClick={() => cancel(item)}
          ><BsTrash /></p>  
        </div>
          )
        })}
        </>
      ) : (
        <>
        <br/>
        <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-slate-950 dark:border-blue-500"></div>
      </div></>
        
      )}
     
      </>     
)
}

export default Chatdata
