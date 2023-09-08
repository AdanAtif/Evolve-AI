import prisma from '../../../config/prismaClient'
import { NextResponse } from 'next/server';
const {
    sendEmail
  } = require("../../(components)/sendEmail/SendEmail.js");
const jwt = require('jsonwebtoken');

export async function POST(req) {
    const {email}=await req.json()
    console.log("email",email);
    if (email) {
        const user = await prisma.nextUser.findUnique({
            where: {
              email: email,
            },
          })
          if (user) {
            const token = jwt.sign({ userid: user.id }, "nwekkenkewneknkenkwnown" ,)
            const link = `http://localhost:3000/Changepassword/${token}`
            console.log(link);
            // const emaildata = {
            //     to: user.email,
            //     subject: "Reset Password",
            //     text: `To reset password the <a herf=${link}>Click here</a>`,
            //   }
            //   sendEmail(emaildata.to, emaildata.subject, emaildata.text);
              
              return NextResponse.json({
                status: "success",
                link: link,
            });
          } else {
            return NextResponse.json({
                status: "Failed",
                message: "Email is not registored"
            });
          }
    } else {
        return NextResponse.json({
            status: "Failed",
            message: "please fill all the fields"
        });
    }















    // try { 
    //     const {input}= await req.json();
    //     const result = await prisma.nexttodo.create({
    //         data :{
    //         input,
    //     }
    //     })
    //     return NextResponse.json(result);
    // } catch (error) {
    //     console.log('=========error=======1===================');
    //     console.log(error);
    //     console.log('====================================');
    //     return NextResponse.json({
    //         error: "something went wrong",
    //         input:input,
    //     });
    // }
}