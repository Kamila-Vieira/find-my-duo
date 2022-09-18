import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import { convertHourStringToMinutes } from "../utils/convertHourStringToMinutes";
import { convertMinutesToHourString } from "../utils/convertMinutesToHourString";

const prisma = new PrismaClient({
  log: ["query"],
});

class GameController {
  async listGames(_: Request, response: Response) {
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
  }

  async saveNewAd(request: Request, response: Response) {
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
  }

  async listAdsByGame(request: Request, response: Response) {
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
  }

  async getDiscordByAdd(request: Request, response: Response) {
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
  }
}

export default GameController;
