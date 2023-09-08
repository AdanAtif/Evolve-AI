"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Conversiondata = ({ data, chatbot }) => {
  const [Data, setData] = useState(data);
  const [loader, setLoader] = useState(false);
  const [filterid, setFilterId] = useState('');
  const router = useRouter();

  const [backerror, setbackerror] = useState('');
  const [question, setQuestion] = useState('');
  const [loader1, setLoader1] = useState(true);

  useEffect(() => {
    Conversion();
  }, [Data]);

  const Conversion = async () => {
    const tokenid = await localStorage.getItem('token');
    if (tokenid) {
      const res = await fetch('http://localhost:3000/NewChat/api/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${tokenid}`,
        },
        body: JSON.stringify({ chatbot }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setFilterId(data.id);
        setLoader(true);
      } else if (data.status === 'Notverifyed') {
        router.push('/Verify');
      } else if (data.status === 'registored') {
        router.push('/Login');
      } else if (data.status === 'Failed1') {
        router.push('/Login');
      } else {
        setbackerror(data.message);
        setLoader(false);
      }
    } else {
      router.push('/Login');
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!question) {
      setbackerror('The question is required');
    } else {
      try {
        setLoader1(false);
        const tokenid = await localStorage.getItem('token');
        if (tokenid) {
          const res = await fetch('http://localhost:3000/NewChat/api/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${tokenid}`,
            },
            body: JSON.stringify({ question, chatbot }),
          });
          const data = await res.json();
          if (data.status === 'success') {
            console.log('user', data.user);
            setData([...Data, data.user]);
            setLoader1(true);
            setQuestion('');
          } else if (data.status === 'Notverifyed') {
            router.push('/Verify');
            setLoader1(true);
          } else if (data.status === 'Failed') {
            setbackerror(data.message);
          } else {
            setbackerror('Something went wrong when connecting to the API');
          }
        } else {
          router.push('/Login');
          setLoader1(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '90vh',
        }}
      >
        <div
          style={{
            flex: '1',
            overflowY: 'auto',
            maxHeight: '90%',
          }}
        >
          <p className="bg-cyan-700 text-slate-50 text-center uppercase dark:text-slate-900 text-4xl px-5 py-3 dark:bg-slate-500  w-full font-medium">
            {chatbot}
          </p>
          <br />

          {loader ? (
            <div className="lg:mx-8 dark:border-blue-700 border-slate-50 border-[3px]">
              <div className="h-[100%] m-3 border-[3px] dark:border-blue-700 border-color-300">
                {Data.filter((item1) => item1.newChatId && item1.newChatId.includes(filterid)).length === 0 ? (
                  <div className="flex justify-center items-center h-[60vh]">
                    <p className="text-slate-50 capitalize text-[1.5rem] dark:text-cyan-500">
                      Ask any question you like
                    </p>
                  </div>
                ) : (
                  Data.filter((item1) => item1.newChatId && item1.newChatId.includes(filterid)).map((item, index) => {
                    return (
                      <div className="h-[90%]" key={item.id}>
                        <div className="flex w-[100%] m-2">
                          <p className="w-[10%] lg:py-2 md:py-1 sm:py-0 px-4 dark:bg-slate-700 bg-cyan-700 text-slate-50 text-center dark:text-blue-500 font-medium lg:text-lg md:text-md sm:text-sm">
                            No.{index + 1}
                          </p>
                          <p className="px-4 lg:py-2 md:py-1 sm:py-0 text-l  w-[90%] mr-3 text-[1.5rem]  bg-gradient-to-r from-teal-500 to-cyan-600 dark:from-slate-800 dark:to-slate-600 text-slate-50 dark:text-cyan-300 capitalize hover:uppercase">
                            {item.question}
                          </p>
                        </div>
                        <div className="flex w-[100%] m-2">
                          <p className="w-[10%] px-4 lg:py-2 md:py-1 sm:py-0 dark:bg-slate-900 bg-cyan-400 text-cyan-700 capitalize text-center dark:text-blue-500 font-medium lg:text-lg md:text-md sm:text-sm">
                            Ans
                          </p>
                          <p className="px-4 lg:py-2 md:py-1 sm:py-0 text-l hover:capitalize bg-gradient-to-r from-cyan-700 to-teal-600 text-cyan-300 dark:bg-slate-950 dark:text-teal-600 w-[90%] dark:from-slate-800 dark:to-gray-900 mr-3 text-[1rem]">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-[60vh]">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-slate-950 dark:border-blue-500"></div>
            </div>
          )}
        </div>

        <div style={{ flex: 'none', height: '10%' }}>
          <form onSubmit={onSubmitHandler} className="flex mx-3 h-full">
            <input
              type="text"
              placeholder="Ask a question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-[90%] pl-4 dark:text-slate-400 text-2xl border-[3px] dark:border-sky-950 rounded-l-md dark:bg-slate-950 bg-slate-50 my-2 focus:border-cyan-800 border-cyan-300 text-cyan-600 focus:outline-none dark:focus:border-blue-900 py-1 border-r-0"
            />

            {loader1 ? (
              <button
                type="submit"
                className="dark:hover:border-blue-900 w-[10%] border-[3px] dark:border-sky-950 rounded-r-md border-l-0 my-2 py-1 dark:bg-slate-700 dark:hover:text-blue-700 text-2xl b-2 font-medium bg-cyan-500 text-zinc-700 border-cyan-300 hover:border-cyan-800 hover:bg-cyan-300 hover:text-blue-400 dark:text-blue-950 dark:hover:bg-gray-950"
              >
                Enter
              </button>
            ) : (
              <button className="dark:hover:border-blue-900 w-[10%] border-[3px] dark:border-sky-950 rounded-r-md border-l-0 my-2 py-1 dark:bg-slate-700 bg-cyan-500 text-zinc-700 border-cyan-700 hover:border-blue-400 hover:bg-cyan-300 hover:text-blue-400 dark:hover:text-blue-700 text-2xl b-2 font-medium dark:text-blue-950 dark:hover:bg-gray-950">
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-slate-950 dark:border-blue-500"></div>
                </div>
              </button>
            )}
          </form>
          <p className="text-red-500 text-center">{backerror}</p>
        </div>
      </div>
    </>
  );
};

export default Conversiondata;

