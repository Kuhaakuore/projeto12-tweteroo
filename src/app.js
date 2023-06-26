import express from "express";
import cors from "cors";

// Config variables
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;

// Data variables
const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
  const user = req.body;
  if (typeof user.username !== "string" || typeof user.avatar !== "string")
    return res.status(400).send("Todos os campos são obrigatórios!");
  if (!user.username.trim() || !user.avatar.trim())
    return res.status(400).send("Todos os campos são obrigatórios!");
  users.push(user);
  res.send("OK");
});

app.post("/tweets", (req, res) => {
  const tweet = req.body;
  console.log(typeof tweet.username);
  if (typeof tweet.username !== "string" || typeof tweet.tweet !== "string")
    return res.status(400).send("Todos os campos são obrigatórios!");
  if (!tweet.username.trim() || !tweet.tweet.trim())
    return res.status(400).send("Todos os campos são obrigatórios!");
  if (!users.find((user) => user.username === tweet.username))
    return res.send("UNAUTHORIZED");
  tweets.push(tweet);
  res.send("OK");
});

app.get("/tweets", (req, res) => {
  const userTweets = [];
  for (let i = tweets.length - 1; i >= 0; i--) {
    if (userTweets.length === 10) break;
    const userTweet = {
      username: tweets[i].username,
      avatar: users.find((user) => user.username === tweets[i].username).avatar,
      tweet: tweets[i].tweet,
    };
    userTweets.push(userTweet);
  }
  res.send(userTweets);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
