"use client"
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation'
import Footer from '../(components)/footer/Footer'

export default function Home() {
 
  const [error, seterror] = useState("")
  const [verification, setVerification] = useState('');
  const inputsRef = useRef([]);
  const [backerror, setbackerror] = useState("")
  const [loader, setloader] = useState(true);
  const router = useRouter();



  const handleVerificationChange = (e, index) => {
    const inputValue = e.target.value;
    const formattedValue = inputValue.replace(/[^0-9]/g, '').slice(0, 1); // Limit the input to a single digit

    setVerification((prevVerification) => {
      const updatedVerification = prevVerification.split('');
      updatedVerification[index] = formattedValue;

      const joinedVerification = updatedVerification.join('');

      if (index < 5 && formattedValue) {
        inputsRef.current[index + 1].focus(); // Move focus to the next input
      }

      return joinedVerification;
    });
  };


  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !verification[index] && index > 0) {
      inputsRef.current[index - 1].focus(); // Move focus to the previous input when Backspace is pressed and the current input is empty
    }
  };
  const onSubmitHandler = async(event) => {
    event.preventDefault();
    if (verification.length === 6) {
      try{
        setloader(false)
        const HashDigits = await localStorage.getItem("HashDigits");
        const tokenid = await localStorage.getItem("token")
      const res = await fetch('http://localhost:3000/Verify/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${tokenid}`, 
        },
        body: JSON.stringify({ verification,HashDigits}),
      })
      const data = await res.json();
      if (data.status == "success") {
        console.log("user",data.user)
       await  localStorage.removeItem("HashDigits");
        router.push('/')
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
    } else {
      seterror('Please fill in all six digits.');
    }
  };



  return (
    <>
    <div className='h-screen'>
      <div className="flex my-3 justify-center h-auto">
        <div className="dark:bg-slate-900 bg-slate-100 lg:w-[50%] md:w-[70%] sm:w-[90%] py-8 rounded-lg drop-shadow-2xl shadow-red-500">
          <p className="text-4xl dark:text-sky-900 text-slate-50 text-center mb-6 dark:bg-slate-950 bg-cyan-700 py-2">
            Verification Code
          </p>
          <br />
          <>
          <form className="lg:mx-[15%] md:mx-[10%] sm:mx-[5%] flex gap-3 text-center justify-center">
            {Array.from({ length: 6 }).map((_, index) => (
              <div className="flex flex-col" key={index}>
                <input
                  type="text"
                  ref={(el) => (inputsRef.current[index] = el)}
                  value={verification[index] || ''}
                  onChange={(e) => handleVerificationChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="pl-2 w-[3rem] dark:text-slate-400 text-slate-900 bg-neutral-200 text-2xl border-[3px] dark:border-sky-950 border-sky-500 rounded-md dark:bg-slate-950 my-2 focus:outline-none focus:border-blue-900 py-1"
                  maxLength={1}
                />
              </div>
            ))}
            <br />
        </form>
        <p className='text-red-500 text-center'>{error}</p>    
        <br />
   
          
            {loader ? (
      <div className="flex justify-center w-full">
      <button
       onClick={onSubmitHandler}
        className="dark:hover:border-blue-900 hover:border-slate-50 border-[3px] dark:border-sky-950 rounded-md my-2 py-3 px-7 dark:bg-slate-400 bg-cyan-500 dark:hover:text-blue-700 hover:text-slate-50 text-2xl font-medium text-slate-950 hover:bg-blue-500 dark:hover:bg-gray-950"
      >
        Verify
      </button>
      <br/>
    </div> 
       ) : (
         <div className="flex justify-center items-center">
         <div className="animate-spin rounded-full h-8 w-8 border-4 border-slate-950 dark:border-blue-500"></div>
       </div>
       )}
            <p className='text-red-500 text-center'>{backerror}</p>

            </>
        </div>
      </div>
      </div>
      <Footer/>
    </>
  );
}

