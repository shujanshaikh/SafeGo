import type { NextFunction , Request , Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export function middleware(req : Request, res : Response, next : NextFunction) {
   try {
    const headers = req.headers["authorization"]
    const token = headers?.split(" ")[1]
    if (!token) {
        res.status(401).json({
            message: "Unauthorized"
        })
        return
    }
    const decoded = jwt.verify(token, JWT_SECRET) as {userId : string}
    if (!decoded || !decoded.userId) {
        res.status(401).json({
            message: "Unauthorized"
        })
        return
    }
    req.userId = decoded.userId
    next()
   } catch (error) {
    res.status(401).json({
        message: "Unauthorized"
    })
   }
}