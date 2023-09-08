import prisma from '../../../config/prismaClient'

import {
    NextResponse
} from 'next/server';
import {
    headers
} from "next/headers";
const jwt = require('jsonwebtoken');


export async function POST(req) {
    const headersList = headers();
    const referer = await headersList.get("authorization");
    let tokenid
            if (referer && referer.startsWith('Bearer')) {
                tokenid = referer.split(' ')[1]
                console.log("token",tokenid);
                try {
                    const jwtid = await jwt.verify(tokenid, "ewijoewjoiejfojewjfoewjfofoj")
                    console.log("jwtid",jwtid);
                    if (jwtid) {
                        const user = await prisma.nextUser.findUnique({
                            where: {
                              email: jwtid.email,
                            },
                            select: {
                              id: true,
                              firstname: true,
                              lastname: true,
                              Verify: true,
                              email: true,
                              createdAt: true,
                              updatedAt: true,
                             
                            },
                          });
                        if (user) {
                            if (user.Verify == true) {
                                return NextResponse.json({
                                    status: "success",
                                    user: user 
                                });
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
                            message: `Unautherized User `
                        });
                    }     
                } catch (error) {
                    console.log("------------------------------------");
                    console.log("error",error.message);
                    console.log("------------------------------------");
                    return NextResponse.json({
                        status: "Failed",
                        message: `Unautherized User `
                    });
                }
                      
            } else {
                return NextResponse.json({
                    status: "Failed",
                    message: `Unautherized User`
                });
            }
        }
