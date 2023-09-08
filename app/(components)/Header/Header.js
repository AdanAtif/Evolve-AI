"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from "react-icons/Ai";
import Image from 'next/image';
import { redirect } from 'next/navigation'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loader, setLoader] = useState(true);
  const [loader1, setLoader1] = useState(true);
  const [user, setUser] = useState({});
  const router = useRouter();
  const [showPopover, setShowPopover] = useState(false);
  const [popoverMessage, setPopoverMessage] = useState('');
  const [popoverButtonLabel, setPopoverButtonLabel] = useState('');
  const [popoverButtonAction, setPopoverButtonAction] = useState('');

  useEffect(() => {
    onSubmitHandler();
    
  }, []);

  const onSubmitHandler = async () => {
    try {
      const tokenid = await localStorage.getItem('token');
      if (tokenid) {
        const res = await fetch('http://localhost:3000/authurization/api/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${tokenid}`,
          },
          body: JSON.stringify({}),
        });
        const data = await res.json();
        if (data.status === 'success') {
          setUser(data.user);
          setLoader(false);
        } else if (data.status === 'Notverifyed') {
          setLoader1(false)
          setPopoverMessage("You need to be Verified to access this page");
          setPopoverButtonLabel('Verify');
          setPopoverButtonAction('/Verify');
          setLoader(false);
        } else if (data.status === 'Failed') {
        setLoader1(false)
          setPopoverMessage("You need to Login to access this page");
          setPopoverButtonLabel('Login');
          setPopoverButtonAction('/Login');
          setLoader(false);
        } else {
          setLoader1(false)
          setLoader(false);
          alert("Something went wrong at the server")
        }
      } else {
        setLoader1(false)
        setPopoverMessage("You need to Login to access this page");
        setPopoverButtonLabel('Login');
        setPopoverButtonAction('/Login');
        setLoader(false);
      }
    } catch (error) {
      console.log('------------------------------------');
      console.log(error);
      console.log('------------------------------------');
    }
  };

  const handlePopoverButtonClick = (action) => {
    router.push(action);
  };
  const logout = async() => {
    setLoader(true)
   await localStorage.removeItem("token");
    router.push("/")
    setLoader(false)
    
  };
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap
       bg-gradient-to-r from-teal-600 to-cyan-800 dark:from-slate-800 dark:to-slate-600 text-slate-50 dark:text-cyan-300 p-4">
        <div className="flex items-center flex-shrink-0 text-slate-50 dark:text-cyan-300  mr-6 cursor-pointer">
          <Image
            className="border-2  dark:border-slate-300 border:rounded-full rounded-full"
            src="/favicon.ico"
  alt="Logo" width={40} height={40}/>
          <span className="font-semibold text-3xl hover:uppercase  tracking-tight ml-2 text-slate-50 dark:text-blue-50  ">
            Evole AI
          </span>
        </div>
        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 cursor-pointer border rounded text-gray-900 dark:text-slate-50 border-gray-400 hover:text-gray hover:border-gray"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">View Cart</span>
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0zm0 6h20v2H0zm0 6h20v2H0z" fillRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full block flex-grow lg:flex lg:items-center lg:w-auto`}>
          <div className="text-sm lg:flex-grow">
            <span  className="block mt-4 text-[1.15rem]  lg:inline-block lg:mt-0 text-slate-300 dark:text-cyan-600 hover:dark:text-cyan-500  hover:text-gray-50 pt-2 cursor-pointer mr-4" onClick={() => router.push('/')}>  Home</span>
            <span className="block mt-4 text-[1.15rem]  lg:inline-block lg:mt-0 text-slate-300 dark:text-cyan-600 hover:dark:text-cyan-500  hover:text-gray-50 pt-2 cursor-pointer mr-4" onClick={() => {
                if (loader) return;
                if (!loader1) {
                  setShowPopover(true);
                } else {
                  router.push('/Dashboard');
                }
              }} > Dashboard</span>
            <span  className="block mt-4 text-[1.15rem]  lg:inline-block lg:mt-0 text-slate-300 dark:text-cyan-600 hover:dark:text-cyan-500  hover:text-gray-50 pt-2 cursor-pointer mr-4" onClick={() => router.push('/Aboutus')}> Aboutus  </span>
            {loader ? ( <></>) : (
              <>
              {loader1 && (<span className="block mt-4 text-[1.15rem]  lg:inline-block lg:mt-0 text-slate-300 dark:text-cyan-600 hover:dark:text-cyan-500  hover:text-gray-50 pt-2 cursor-pointer mr-4" onClick={logout}> Logout </span>)} </>)}
          </div>
          <div className="flex items-center">
            {loader ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-slate-950 dark:border-blue-500"></div>
              </div>
            ) : (
              <>
                {loader1 ? (
                  <span className="block mt-4 text-[1.15rem] capitalize hover:uppercase  lg:inline-block lg:mt-0 text-slate-300 dark:text-cyan-600 hover:dark:text-cyan-500  hover:text-gray-50 pt-2 cursor-pointer mr-4">{user.firstname} {user.lastname} </span>
                ) : (
                  <span className="text-[1.25rem] text-slate-300 dark:text-cyan-600 hover:dark:text-cyan-500  hover:text-gray-50 cursor-pointer"><h1 onClick={() => router.push('/Login')}>Sign in</h1></span>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
      {showPopover && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-800 max-w-sm mx-auto rounded-md shadow-md p-6">
      <div className="flex justify-between items-center">
        <p className="dark:text-white text-cyan-500 text-2xl text-center font-semibold">Message</p>
        <div className="cursor-pointer" onClick={() => setShowPopover(!showPopover)}>
          <AiOutlineClose className="dark:text-white text-2xl" />
        </div>
      </div>
      <div className="flex justify-center items-center flex-grow mb-4">
        <p className="text-red-300 text-center">{popoverMessage}</p>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md text-lg"
          onClick={() => {handlePopoverButtonClick(popoverButtonAction),setShowPopover(!showPopover)}}
        >
          {popoverButtonLabel}
        </button>
      </div>
    </div>
  </div>
)}



    </>
  );
};

export default Header;
