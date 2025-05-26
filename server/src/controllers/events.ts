import { Request, Response } from "express";

import { getEvents } from "../services/ticketMasterApi-service";
import { getUserLocationByIp } from "../services/ipApi-service";

import dotenv from "dotenv";

dotenv.config();

export const getLocalEvents = async (req: Request, res: Response) => {
  try {
    const {
      keyword,
      classificationName,
      startDateTime,
      endDateTime,
      sort,
      size,
      page,
    } = req.query;

    const ip =
      req.headers["x-forwarded-for"]?.toString().split(",")[0] || req.ip;
    const location = await getUserLocationByIp(
      process.env.NODE_ENV === "development" ? "" : ip
    );

    const events = await getEvents({
      city: location?.city,
      keyword: keyword as string,
      classificationName: classificationName as string,
      startDateTime: startDateTime as string,
      endDateTime: endDateTime as string,
      sort: sort as string,
      size: size ? parseInt(size as string) : 10,
      page: page ? parseInt(page as string) : 0,
      unit: "miles",
      radius: "100",
    });

    res.json({ events });
  } catch (error) {
    console.error("Error fetching local events:", error);
    res.status(500).json({ message: "Failed to fetch local events" });
  }
};
