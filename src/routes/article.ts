import express from 'express';
import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../controllers/articleController';

const router = express.Router();

router.route('/').get(getAllArticles).post(createArticle)
router.route('/:id').get(getArticleById).put(updateArticle).delete(deleteArticle)

export default router;
