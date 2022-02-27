const express = require("express");
const blogRouter = express.Router();
const axios = require("axios");
const { response } = require("express");
const NodeCache = require("node-cache");

const API_URL = "https://api.hatchways.io/assessment/blog/posts";
const myCache = new NodeCache(); //Caching

// Route 1: GET ping response
blogRouter.get("/api/ping", (req, res) => {
  return res.status(200).json({ success: true });
});

// Route 2: GET blog posts
blogRouter.get("/api/posts", (req, res) => {
  const { tag, sortBy, direction } = req.query;
  if (!tag) {
    return res.status(400).json({ error: "Tags parameter is required" });
  }
  if (
    (sortBy === "id" || "reads" || "likes" || "popularity") &&
    (direction === "asc" || "desc")
  ) {
    axios
      .get(`${API_URL}?tag=${tag}&sortBy=${sortBy}&direction=${direction}`)
      .then((response) => {
        const blogPosts = response.data;
        myCache.set("blogPost", blogPosts); //Caching
        return res.status(200).json(blogPosts);
      })
      .catch((err) => console.log(err));
  } else {
    return res.status(400).json({ error: "sortBy parameter is invalid" });
  }
});

module.exports = blogRouter;
