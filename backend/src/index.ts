import express from "express";
import cors from "cors";
import db from "./lib/datasource";
import authRoutes from "./routes/auth.routes";
import articlesRoutes from "./routes/article.routes";
import categoriesRoutes from "./routes/categorie.routes";
import * as dotenv from "dotenv";
import { authMiddleware } from "./lib/auth.middleware";

dotenv.config();

export interface Payload {
  email: string;
}

const app = express();
const PORT = 4000;

app.use(
  "/",
  cors<cors.CorsRequest>({
    origin: "http://localhost:8080",
    credentials: true,
  }),
  express.json()
);

// Middleware global pour authentification
app.use(authMiddleware);

// Initialiser la base de données
db.initialize()
  .then(() => {

    app.use(authRoutes, articlesRoutes, categoriesRoutes);

    // Démarrer le serveur
    app.listen(PORT, () => {
      console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erreur lors de la connexion à la base de données:", error);
  });
