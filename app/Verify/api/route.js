import prisma from '../../../config/prismaClient'
import {
    NextResponse
} from 'next/server';
import { headers } from "next/headers";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
export async function POST(req) {
    const headersList = headers();
        const {
            verification,
            HashDigits
        } = await req.json();
        const referer =await headersList.get("authorization");
       let tokenid
if (verification && HashDigits) {
    if (referer && referer.startsWith('Bearer')) {
        tokenid = referer.split(' ')[1]
         console.log(tokenid);
    const match = await bcrypt.compare(verification,HashDigits)
         if (match) {
            try {
                const user = await jwt.verify(tokenid, "ewijoewjoiejfojewjfoewjfofoj")
                console.log("user",user);
            const result = await prisma.nextUser.update({
                where: {
                    email: user.email
                },
                data: {
                    Verify:true,
                }
              })
              console.log("result",result);
              return NextResponse.json({
                status: "success",
                user: result,
            });
            } catch (error) {
                console.log("-----------------------------");
                console.log("error",error);
                console.log("-----------------------------");
            }
           
         } else {
            return NextResponse.json({
                status: "Failed",
                message: "Verification code is in valid"
            });
         }
     }else{
        return NextResponse.json({
            status: "Failed",
            message: "Unautherized User"
        });
     }
   
} else {
    return NextResponse.json({
        status: "Failed",
        message: "Please Fill the Field"
    });
}
}