import prisma from '../../../config/prismaClient'

import {
    NextResponse
} from 'next/server';
import {
    headers
} from "next/headers";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

export async function POST(req, ) {
    const headersList = headers();
    const {
        password_confirmation,
        passworda
    } = await req.json();
    const referer = await headersList.get("authorization");
    let tokenid
    if (password_confirmation && passworda) {
        if (password_confirmation == passworda) {
            if (referer && referer.startsWith('Bearer')) {
                tokenid = referer.split(' ')[1]
                const jwtid = await jwt.verify(tokenid, "nwekkenkewneknkenkwnown")
                console.log("jwtid", jwtid);
                if (jwtid.userid) {
                    try {
                        const salt = await bcrypt.genSalt(10)
                        const newHashPassword = await bcrypt.hash(passworda, salt)
                        const result = await prisma.nextUser.update({
                            where: {
                                id: jwtid.userid
                            },
                            data: {
                                password: newHashPassword,
                            }
                        })
                        return NextResponse.json({
                            status: "success",
                            message: `password has been updated`
                        });
                    } catch (error) {
                        console.log('=========error=======1===================');
                        console.log(error);
                        console.log('====================================');
                        return NextResponse.json({
                            status: "Failed",
                            message: `somthing went wrong at the server ${error}`
                        });
                    }
                } else {
                    return NextResponse.json({
                        status: "Failed",
                        message: `jwt doesn't match`
                    });
                }
            } else {
                return NextResponse.json({
                    status: "Failed",
                    message: `Unautherized User`
                });
            }
        } else {
            return NextResponse.json({
                status: "Failed",
                message: `password and confrim password do not match`
            });
        }
    } else {
        return NextResponse.json({
            status: "Failed",
            message: `Please fill all the required fields`
        });
    }
}