const request = require("supertest");
const mockingoose = require("mockingoose");
const express = require("express");
const Article = require("../api/articles/articles.schema");
const User = require("../api/users/users.model");
const articlesRouter = require("../api/articles/articles.router");
const authMiddleware = require("../middlewares/auth");

const app = express();
app.use(express.json());
// Middleware pour moquer req.io
app.use((req, res, next) => {
  req.io = {
    emit: jest.fn()
  };
  next();
});
app.use("/api/articles", articlesRouter);

jest.mock("../middlewares/auth", () => jest.fn((req, res, next) => {
  req.user = { _id: "66473c461cf0923c764e94e7", role: "admin" };
  next();
}));

describe("Articles API", () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it("should create an article", async () => {
    const articleData = {
      user: '66473c461cf0923c764e94e7',
      status: "draft"
    };

    mockingoose(Article).toReturn(articleData, "save");

    const response = await request(app)
      .post("/api/articles")
      .send(articleData);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe(articleData.status);
  });

  it("should update an article", async () => {
    const articleId = "60c72c315f1b2c001c8e4e1e";
    const updateData = {
      status: "published"
    };

    mockingoose(Article).toReturn(updateData, "findOneAndUpdate");

    const response = await request(app)
      .put(`/api/articles/${articleId}`)
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(updateData.status);
  });

  it("should delete an article", async () => {
    const articleId = "60c72c315f1b2c001c8e4e1e";

    mockingoose(Article).toReturn(null, "deleteOne");

    const response = await request(app)
      .delete(`/api/articles/${articleId}`);

    expect(response.status).toBe(204);
  });
});
