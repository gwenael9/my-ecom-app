import { Request, Response } from "express";
import { ArticleService } from "../services/article.service";

const articleService = new ArticleService();

export class ArticleController {
  // récupérer tous les articles
  static async getAllArticles(req: Request, res: Response): Promise<void> {
    try {
      const articles = await articleService.getAllArticles();
      res.status(200).json(articles);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des articles." });
    }
  }

  // récupérer les articles d'un utilisateur
  static async getArticlesByUser(req: Request, res: Response) {
    const userId = req.params.userId;

    if (!userId) {
      res.status(400).json({ message: "ID utilisateur non valide." });
    }

    try {
      const articles = await articleService.getArticlesByUser(userId);
      res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({
        message:
          "Erreur lors de la récupération des articles de l'utilisateur.",
      });
    }
  }

  // récupéré un article par id
  static async getArticleById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const article = await articleService.getArticleById(parseInt(id));
      res.status(200).json(article);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  // création d'un article
  static async createArticle(req: Request, res: Response) {
    const user = req.user;

    const { title, description, size, price, etat, categorieId } = req.body;

    if (!user) {
      res.status(400).json({ message: "Utilisateur inconnu" });
      return;
    }

    try {
      const articles = await articleService.createArticle({
        title,
        description,
        size,
        price,
        etat,
        categorieId,
        userId: user.id,
      });
      res.status(201).json(articles);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  static async deleteArticle(req: Request, res: Response) {
    const user = req.user;
    const { id: articleId } = req.params;

    if (!user) {
      res.status(400).json({ message: "Utilisateur non valide." });
      return;
    }

    try {
      await articleService.deleteArticle(parseInt(articleId), user.id);
      res.status(200).json({ message: "L'article a bien été supprimé."})
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}
