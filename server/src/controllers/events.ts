import { Request, Response } from "express";

import { getEvents } from "../services/ticketMasterApi-service";
import { getUserLocationByIp } from "../services/ipApi-service";

import dotenv from "dotenv";
dotenv.config();

export const getLocalEvents = async (req: Request, res: Response) => {
  try {
    const ip = req.ip ?? "";
    const location = await getUserLocationByIp(
      process.env.NODE_ENV === "development" ? "" : ip
    );

    const events = await getEvents({ city: location?.city });

    res.json({ events });
  } catch (error) {
    console.error("Error fetching local events", error);
    res.status(500).json({ message: "Failed to fetch local events" });
  }
};
