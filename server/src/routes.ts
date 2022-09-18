import express, { Router } from "express";
import GameController from "./controllers/GameController";

const routes: Router = express.Router();

const { listGames, saveNewAd, listAdsByGame, getDiscordByAdd } = new GameController();

routes.get("/", (_, response) => {
  return response.json({ message: "Bem vindo (a)" });
});

routes.get("/games", listGames);
routes.post("/games/:id/ads", saveNewAd);
routes.get("/games/:id/ads", listAdsByGame);
routes.get("/ads/:id/discord", getDiscordByAdd);

export default routes;
