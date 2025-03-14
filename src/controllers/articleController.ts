import { Request, Response } from "express";
import Article, { IArticle } from '../models/article'

// Helper function to format response
const formatArticle = (article: IArticle) => ({
  id: article._id,
  title: article.title,
  content: article.content,
  author: article.author,
  createdAt: article.createdAt,
});

// /api/v1/articles GET
export const getAllArticles = async (req: Request, res: Response): Promise<void> => {
  try {
    const articles: IArticle[] = await Article.find().populate('author', 'username email')
    res.status(200).json({
      message: 'success',
      size: articles.length,
      articles: articles.map(formatArticle)
    })
  } catch (err) {
    res.status(500).json({
      message: 'Server Error',
      err 
    })
  }
}

// /api/v1/articles/:id GET
export const getArticleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const article: IArticle | null = await Article.findById(req.params.id)
    if (!article) {
      res.status(404).json({message: 'No article found'})
      return
    }
    res.status(200).json({
      message: 'success',
      article: formatArticle(article)
    })
  } catch (err) {
    res.status(500).json({
      message: 'Service Error',
      err
    })
  }
}

// /api/v1/articles POST
export const createArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, author } = req.body
    const newArticle: IArticle = new Article({ title, content, author })
    await newArticle.save()
    res.status(201).json({
      message: 'success',
      article: formatArticle(newArticle)
    })
  } catch (err) {
    res.status(500).json({
      message: 'Server Error',
      err
    })
  }
}

// /api/v1/articles/:id PUT
export const updateArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedArticle: IArticle | null = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedArticle) {
      res.status(404).json({ message: 'Article not found' });
      return;
    }
    res.status(200).json(formatArticle(updatedArticle));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// /api/v1/articles DELETE
export const deleteArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedArticle: IArticle | null = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle) {
      res.status(404).json({ message: 'Article not found' });
      return;
    }
    res.status(204).json({});
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};