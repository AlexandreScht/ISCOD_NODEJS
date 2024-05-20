const Article = require("./articles.schema");

class ArticleService {
  async createArticle(data) {
    const article = new Article(data);
    return article.save();
  }

  async updateArticle(id, data) {
    return Article.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteArticle(id) {
    return Article.deleteOne({ _id: id });
  }

  async getArticlesByUser(userId) {
    return Article.find({ user: userId }).populate({
      path: 'user',
      select: '-password'
    });
  }
}

module.exports = new ArticleService();
