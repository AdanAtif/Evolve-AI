import { sendEmail } from '@/app/(components)/sendEmail/SendEmail';
import prisma from '../../../config/prismaClient'



import {
    NextResponse
} from 'next/server';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



export async function POST(req) {
    try {
        const {
            firstname,
            lastname,
            email,
            password
        } = await req.json();
        if (firstname && lastname && email && password) {
            const user = await prisma.nextUser.findUnique({
                where: {
                  email: email,
                },
              })
            if (!user) {
                const salt = await bcrypt.genSalt(10) //wefjwepjfwefojowej
                const Hashpassword = await bcrypt.hash(password, salt)//dfjrehh1lkewh3hhr4

                 await prisma.nextUser.create({
                    data: {
                        firstname,
                        lastname,
                        email,
                        password: Hashpassword,
                    }
                })
                const saveduser = await prisma.nextUser.findUnique({
                    where: {
                      email: email,
                    },
                  })
                const token = await jwt.sign({
                    email: saveduser.email,
                    firstname: saveduser.firstname,
                    lastname: saveduser.lastname,
                    Verify: saveduser.Verify
                }, "ewijoewjoiejfojewjfoewjfofoj")

                const Digits = (100000 + Math.floor(Math.random() * 900000)).toString();
                const HashDigits = await bcrypt.hash(Digits, salt)
                const emaildata = {
                    to: saveduser.email,
                    subject: "Verification Evolve AI",
                    text: `this is your verification code for our website ${Digits}`,
                  }
                sendEmail(emaildata.to,email.subject,emaildata.text)
                    console.log("Digits",Digits);
                return NextResponse.json({
                    status: "success",
                    token: token,
                    HashDigits: HashDigits
                });
            } else {
                return NextResponse.json({
                    status: "Failed",
                    message: "Email already exists"
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