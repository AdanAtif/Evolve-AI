import prisma from '../../config/prismaClient'
import DashBoardfrom from '../(components)/dashBoardfrom/DashBoardfrom';
import Chatdata from '../(components)/Chatdata/Chatdata';
import Footer from '../(components)/footer/Footer'

export default async function Home() {

      const data = await prisma.newChat.findMany()
   
  return (
    <>
    
    <div className='h-screen'>
      <div className="flex my-3 justify-center h-auto">
        <div className="dark:bg-slate-900 bg-slate-100  lg:w-[50%] md:w-[70%] sm:w-[90%]  py-8 rounded-lg drop-shadow-2xl shadow-red-500">
          <p className="text-4xl dark:text-sky-900 text-slate-50 text-center mb-6 dark:bg-slate-950 bg-cyan-700 py-2" >Create a new Chatbot</p> 
        <DashBoardfrom/>
        <p className='text-center pr-2  text-sky-600 darK:text-sky-300  text-sm' >The Chatbot name should be in the range of 4 to 14 letter and no Spacing is allowed</p>
        <Chatdata data={data}/>
      </div>  
        </div>
    </div>
    <Footer/>
    </>
  )
}
