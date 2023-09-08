import prisma from '../../../config/prismaClient'
import {
    NextResponse
} from 'next/server';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


export async function POST(req) {
    try {
        const {
            email,
            password
        } = await req.json();
        if (email && password) {
            const user = await prisma.nextUser.findUnique({
                where: {
                    email: email,
                },
            })
            if (user) {
                if (user.Verify == true) {
                    const match = await bcrypt.compare(password, user.password)
                    if ((user.email == email) && match) {

                        const token = await jwt.sign({
                            email: user.email,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            Verify: user.Verify
                        }, "ewijoewjoiejfojewjfoewjfofoj")
                        return NextResponse.json({
                            status: "success",
                            token: token,
                        });
                    } else {
                        return NextResponse.json({
                            status: "Failed",
                            message: "Email or Password is Invaild"
                        });
                    }
                } else {
                    return NextResponse.json({
                        status: "Failed",
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
                message: "please fill all the fiels"
            });
        }
    } catch (error) {
        console.log('=========error==========================');
        console.log(error);
        console.log('====================================');
        return NextResponse.json({
            status: "Failed",
            message: "Somthing went wrong at server"
        });
    }
}