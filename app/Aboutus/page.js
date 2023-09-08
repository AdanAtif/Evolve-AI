import Image from 'next/image';
import Footer from '../(components)/footer/Footer'

export default function Home() {
    return (
        <>
            
                <div className="h-100 bg-cover bg-center p-20 flex flex-col items-center justify-center rounded-b-lg" style={{ backgroundImage: 'url(/e.jpeg)' }}>
                    <h1 className="text-3xl font-bold mb-6 text-center text-slate-900">About Our Chatbot</h1>
                    <p className="text-lg mb-6 w-full md:w-1/2 text-center text-stone-800 font-semibold">
                        Welcome to our chatbot, your friendly and knowledgeable virtual assistant! Our chatbot is built using the OpenAI ChatGPT API, a powerful language model that enables us to provide accurate and helpful responses to a wide range of questions.
                    </p>
                </div>
                <div className="h-100 bg-cover bg-center flex flex-col md:flex-row items-center justify-center pt-8">
                    <div className="md:w-1/2 pl-4">
                        <h2 className="text-2xl font-bold mb-6  text-cyan-900 dark:text-cyan-300 ">How Does It Work?</h2>
                        <p className="text-sm mb-6 w-full md:w-4/5 text-cyan-50 font-semibold dark:text-cyan-700">
                            Our chatbot leverages the cutting-edge capabilities of the OpenAI ChatGPT API to understand and generate human-like responses. It has been trained on an extensive dataset, allowing it to answer questions across various domains and topics. Whether you need information, assistance, or just want to engage in a conversation, our chatbot is here to help!
                        </p>
                        <h2 className="text-2xl font-bold mb-6  text-cyan-900 dark:text-cyan-300 ">What Can It Do?</h2>
                        <p className="text-sm mb-6 w-full md:w-4/5 text-cyan-50 font-semibold dark:text-cyan-700">
                        Our chatbot is designed to be a versatile conversational agent capable of answering questions on a wide range of subjects. Whether you're seeking general knowledge, need advice, or want to explore specific topics, our chatbot will strive to provide accurate and insightful responses.                
                        </p>
                    </div>
                    <div className="md:w-1/2">
                        <Image src="/c.jpg" alt="Logo" width={500} height={500} className="w-full rounded-md" />
                    </div>
                </div>
            <Footer/>
        </>
    );
};








