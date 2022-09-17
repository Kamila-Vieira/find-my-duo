import express from "express";
import cors from "cors";

import { PrismaClient } from "@prisma/client";
import { convertHourStringToMinutes } from "./utils/convertHourStringToMinutes";
import { convertMinutesToHourString } from "./utils/convertMinutesToHourString";

const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient({
  log: ["query"],
});

app.get("/games", async (_, response) => {
  try {
    const games = await prisma.game.findMany({
      include: {
        _count: {
          select: {
            ads: true,
          },
        },
      },
    });

    return response.json(games);
  } catch (_) {
    return response.status(400).json({
      error: {
        message: "Ocorreu um erro desconhecido",
      },
    });
  }
});

app.post("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;
  const body: any = request.body;

  if (!body) return;

  try {
    const ad = await prisma.ad.create({
      data: {
        gameId,
        name: body.name,
        yearsPlaying: body.yearsPlaying,
        discord: body.discord,
        weekDays: body.weekDays.join(","),
        hourStart: convertHourStringToMinutes(body.hourStart),
        hourEnd: convertHourStringToMinutes(body.hourEnd),
        useVoiceChannel: body.useVoiceChannel,
      },
    });

    return response.status(201).json(ad);
  } catch (_) {
    return response.status(400).json({
      error: {
        message: "Ocorreu um erro ao tentar criar o anúncio",
      },
    });
  }
});

app.get("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;

  try {
    const ads = await prisma.ad.findMany({
      select: {
        id: true,
        name: true,
        weekDays: true,
        useVoiceChannel: true,
        yearsPlaying: true,
        hourStart: true,
        hourEnd: true,
      },
      where: {
        gameId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return response.json(
      ads.map((ad) => ({
        ...ad,
        weekDays: ad.weekDays.split(","),
        hourStart: convertMinutesToHourString(ad.hourStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd),
      }))
    );
  } catch (_) {
    return response.status(400).json({
      error: {
        message: "Ocorreu um erro desconhecido",
      },
    });
  }
});

app.get("/ads/:id/discord", async (request, response) => {
  const adId = request.params.id;

  try {
    const ad = await prisma.ad.findUniqueOrThrow({
      select: {
        discord: true,
      },
      where: {
        id: adId,
      },
    });
    return response.json({
      discord: ad.discord,
    });
  } catch (err) {
    const error = new Error(err as any);
    if (error.message.includes("NotFoundError")) {
      return response.status(404).json({
        error: {
          message: "Discord não encontrado",
        },
      });
    }
    return response.status(400).json({
      error: {
        message: "Ocorreu um erro desconhecido",
      },
    });
  }
});

app.listen(3333);
