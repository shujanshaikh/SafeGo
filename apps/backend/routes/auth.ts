import { Router } from "express";
import { SigninSchema, SignupSchema } from "@repo/common";
import prisma from "@repo/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
    console.log(req.body)
  try {
    const parsedData = SignupSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({
            message: "Invalid Data"
        })
        return
    }

    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);
    const user = await prisma.user.create({
        data: {
            email: parsedData.data.email,
            password: hashedPassword
        }
    })
    console.log(user)
    res.status(201).json({
        message: "User Created Successfully",
        user: user.id
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
        message: "Internal Server Error"
    })
  }
});


authRouter.post("/signin", async (req, res) => {
    try {
        const parsedData = SigninSchema.safeParse(req.body);
        if (!parsedData.success) {
            res.status(400).json({
                message: "Invalid Data"
            })
            return
        }

        const user = await prisma.user.findUnique({
            where: {
                email: parsedData.data.email,
            }
        })

        if (!user) {
            res.status(401).json({
                message: "Invalid Credentials"
            })
            return
        }

        const isPasswordValid = await bcrypt.compare(parsedData.data.password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({
                message: "Invalid Credentials"
            })
            return
        }
        const token = jwt.sign({
            userId: user.id,
            email: user.email,
        }, JWT_SECRET)


        console.log(token)
        res.status(200).json({
            message: "User Signed In Successfully",
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

});