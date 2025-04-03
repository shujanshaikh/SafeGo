import { locationSchema } from "@repo/common";
import { Router } from "express";
import prisma from "@repo/db";
import { middleware } from "../middleware";

export const locationRouter = Router();

locationRouter.post("/location", middleware, async (req, res) => {
   try {
    const parsedData = locationSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({
            message: "Invalid Data"
        })
        return
    }

    const location = await prisma.location.create({
        data : {
            locationA: parsedData.data.locationA,
            locationB: parsedData.data.locationB,
            userId: req.userId
        }
    })

    res.status(200).json({
        message: "Location Created Successfully",
        location
    })
   } catch (error) {
    console.log(error)
    res.status(500).json({
        message: "Internal Server Error"
    })
   }
});


locationRouter.get("/locations", middleware, async (req, res) => {
    try {
        const locations = await prisma.location.findMany({
            where: {
                userId: req.userId
            }
        })
        res.status(200).json({
            message: "Locations Found Successfully",
            locations
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
});