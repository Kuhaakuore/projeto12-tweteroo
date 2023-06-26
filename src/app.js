import cors from "cors";
import express from "express";

// Config variables
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;
const MESSAGE = "Todos os campos são obrigatórios!";

// Data variables
const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
  const user = req.body;
  if (typeof user.username !== "string" || typeof user.avatar !== "string")
    return res.status(400).send(MESSAGE);
  if (!user.username.trim() || !user.avatar.trim())
    return res.status(400).send(MESSAGE);
  users.push(user);
  return res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
  const { user } = req.headers;
  const tweet = {
    username: user,
    tweet: req.body.tweet,
  };
  if (typeof tweet.username !== "string" || typeof tweet.tweet !== "string")
    return res.status(400).send(MESSAGE);
  if (!tweet.username.trim() || !tweet.tweet.trim())
    return res.status(400).send(MESSAGE);
  if (!users.find((user) => user.username === tweet.username))
    return res.status(401).send("UNAUTHORIZED");
  tweets.push(tweet);
  return res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
  const page = parseInt(req.query.page);
  const userTweets = [];
  if (page || page === 0) {
    if (page < 1) return res.status(400).send("Informe uma página válida!");
    const initialIndex = tweets.length - 1 - (page - 1) * 10;
    for (let i = initialIndex; i >= 0; i--) {
      if (userTweets.length === 10) break;
      const userTweet = {
        username: tweets[i].username,
        avatar: users.find((user) => user.username === tweets[i].username)
          .avatar,
        tweet: tweets[i].tweet,
      };
      userTweets.push(userTweet);
    }
    return res.send(userTweets);
  }
  for (let i = tweets.length - 1; i >= 0; i--) {
    if (userTweets.length === 10) break;
    const userTweet = {
      username: tweets[i].username,
      avatar: users.find((user) => user.username === tweets[i].username).avatar,
      tweet: tweets[i].tweet,
    };
    userTweets.push(userTweet);
  }
  return res.send(userTweets);
});

app.get("/tweets/:USERNAME", (req, res) => {
  const username = req.params.USERNAME;
  const userTweets = [];
  for (let i = tweets.length - 1; i >= 0; i--) {
    if (tweets[i].username === username) {
      const userTweet = {
        username: tweets[i].username,
        avatar: users.find((user) => user.username === tweets[i].username)
          .avatar,
        tweet: tweets[i].tweet,
      };
      userTweets.push(userTweet);
    }
  }
  return res.send(userTweets);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
