import prisma from '../../../config/prismaClient'

import {
    NextResponse
} from 'next/server';
import {
    headers
} from "next/headers";
const jwt = require('jsonwebtoken');


export async function PUT(req) {
    const headersList = headers();
    const referer = await headersList.get("authorization");
    const {chatbot} = await req.json();
    let tokenid
            if (referer && referer.startsWith('Bearer')) {
                tokenid = referer.split(' ')[1]
                const jwtid = await jwt.verify(tokenid, "ewijoewjoiejfojewjfoewjfofoj")
                const user = await prisma.nextUser.findUnique({
                    where: {
                      email: jwtid.email,
                    },
                    include: {
                        newChat: true,
                      },   
                  })
                if (user) {
                    if (user.Verify == true) {
                        if (chatbot) {
                            const matchingChat = user.newChat.find((nc) => nc.name === chatbot);
                            if (matchingChat) {
                                try {
                                   
                                      return NextResponse.json({
                                        status: "success",
                                        id: matchingChat.id,
                                      });  
                                } catch (error) {
                                    console.log("error",error.message);
                                }
                              
                            } else {
                              return NextResponse.json({
                                status: "Failed",
                                message: `This Chatbot is not created by this user`,
                               
                              });
                            }
                        } else {
                            return NextResponse.json({
                                status: "Failed",
                                message: "Fill the requried field"
                            });
                        }
                       
                    } else {
                        return NextResponse.json({
                            status: "Notverifyed",
                            message: "Email is not Verified"
                        });
                    }
                } else {
                    return NextResponse.json({
                        status: "registored",
                        message: "Email is not registored"
                    });
                }
                
            } else {
                return NextResponse.json({
                    status: "Failed1",
                    message: `Unautherized User`
                });
            }
        }

export async function POST(req) {
    const headersList = headers();
    const referer = await headersList.get("authorization");
    const {question,chatbot} = await req.json();
    let tokenid
            if (referer && referer.startsWith('Bearer')) {
                tokenid = referer.split(' ')[1]
                console.log(tokenid);
                const jwtid = await jwt.verify(tokenid, "ewijoewjoiejfojewjfoewjfofoj")
                
                console.log("jwtid", jwtid);
                const user = await prisma.nextUser.findUnique({
                    where: {
                      email: jwtid.email,
                    },
                    include: {
                        newChat: true,
                      },   
                  })
                  console.log("user",user);
                if (user) {
                    if (user.Verify == true) {
                        if (chatbot  && question) {
                            const matchingChat = user.newChat.find((nc) => nc.name === chatbot);
                            if (matchingChat) {
                                try {
                                    // const options = {
                                    //     method: "POST",
                                    //     headers: {
                                    //       "Authorization": `Bearer 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`,
                                    //       "Content-Type": "application/json",
                                    //     },
                                    //     body: JSON.stringify({
                                    //       model: "gpt-3.5-turbo", // Add the model parameter here
                                    //       messages: [{ role: "user", content: question }],
                                    //       max_tokens: 100,
                                    //     }),
                                    //   };
                                    //   const response = await fetch('https://api.openai.com/v1/models/', options)
                                    //   const data = await response.json();
                                    //   console.log(data);
                                    // //   const answer=data.choices[0].message.content
                                    console.log("matchingChat",matchingChat);
                                    const conversation = await prisma.Converstion.create({
                                        data: {
                                        answer:"this is muhammad adan atif",
                                        question: question,
                                        newChatId: matchingChat.id,
                                        },
                                      });
                          
                                      console.log("conversation",conversation);

                                      return NextResponse.json({
                                        status: "success",
                                        user: conversation,
                                      });  
                                } catch (error) {
                                    console.log("error",error.message);
                                }
                              
                            } else {
                              return NextResponse.json({
                                status: "Failed",
                                message: "This Chatbot is not created for this user",
                              });
                            }
                        } else {
                            return NextResponse.json({
                                status: "Failed",
                                message: "Fill the requried field"
                            });
                        }
                       
                    } else {
                        return NextResponse.json({
                            status: "Notverifyed",
                            message: "Email is not Verified"
                        });
                    }
                } else {
                    return NextResponse.json({
                        status: "Failed",
                        message: "Email is not registored"
                    });
                }
                
            } else {
                return NextResponse.json({
                    status: "Failed",
                    message: `Unautherized User`
                });
            }
        }
