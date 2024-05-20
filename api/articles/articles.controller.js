const ArticleService = require("./articles.service");
const NotFoundError = require("../../errors/not-found");
const UnauthorizedError = require("../../errors/unauthorized");

class ArticlesController {
  async create(req, res, next) {
    try {
      const { body: data } = req
      const article = await ArticleService.createArticle(data);
      req.io.emit("article:create", article);
      res.status(201).json(article);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { user: { role }, params: { id }, body: data} = req
      if (role !== "admin") {
        throw new UnauthorizedError();
      }
      const article = await ArticleService.updateArticle(id, data);
      if (!article) {
        throw new NotFoundError();
      }
      req.io.emit("article:update", article);
      res.json(article);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const { user: { role }, params: { id }} = req
      if (role !== "admin") {
        throw new UnauthorizedError();
      }
      await ArticleService.deleteArticle(id);
      req.io.emit("article:delete", { id });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ArticlesController();
