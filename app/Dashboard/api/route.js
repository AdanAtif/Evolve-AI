import prisma from '../../../config/prismaClient'

import {
    NextResponse
} from 'next/server';
import {
    headers
} from "next/headers";
const jwt = require('jsonwebtoken');

export async function PUT(req) {   
    const {id}= await req.json();
if (id) {
    try { 
                // Delete the conversations
                await prisma.Converstion.deleteMany({
                    where: {
                        newChatId: id
                    }
                });
                // Delete the newChat entity
                const result = await prisma.newChat.delete({
                    where: {
                        id: id
                    }
                });
        return NextResponse.json({
            status: "success",
            result: result 
        });
    } catch (error) {
        console.log('=========error======2=====================');
        console.log(error);
        console.log('====================================');
        return NextResponse.json({
            status: "Failed",
            message: error
        });
    } 
} else {
    return NextResponse.json({
        status: "Failed",
        message: "Someting went wrong"
    });
}
   
}
export async function POST(req) {
    const headersList = headers();
    const referer = await headersList.get("authorization");
    const {chatbot} = await req.json();
    let tokenid
            if (referer && referer.startsWith('Bearer')) {
                tokenid = referer.split(' ')[1]
                const jwtid = await jwt.verify(tokenid, "ewijoewjoiejfojewjfoewjfofoj")
                console.log("jwtid", jwtid);
                const user = await prisma.nextUser.findUnique({
                    where: {
                      email: jwtid.email,
                    },
                  })
                if (user) {
                    if (user.Verify == true) {
                        if (chatbot) {
                            try {
                                const Newchat = await prisma.newChat.create({
                                    data: {
                                        name:chatbot,
                                        nextUserId:user.id,
                                    }
                                })   
                            
                                    return NextResponse.json({
                                        status: "success",
                                        user: chatbot 
                                    });   
                            } catch (error) {
                                return NextResponse.json({
                                    status: "Failed",
                                    message: "You can not create 2 chatbot with same name"
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
