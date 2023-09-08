import Conversiondata from '@/app/(components)/conversiondata/Conversiondata';
import prisma from '../../../config/prismaClient'



export default async function Home({params}) {

  const chatbot= params.chatbot;
  const data = await prisma.Converstion.findMany()

  return (
    <><Conversiondata data={data} chatbot={chatbot}/></>)}
