import express from 'express'; 
import cors from 'cors';

// Config variables
const app = express();
app.use(cors());
app.use(express.json())
const PORT = 5000;

// Data variables
const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
    const user = req.body;
    users.push(user);
    res.send("OK");
});

app.post("/tweet", (req, res) => {
    const tweet = req.body;
    if(!users.find(user => user.username === tweet.username)) return res.send("UNAUTHORIZED");
    tweets.push(tweet);
    res.send("OK");
});

app.get("/tweets", (req, res) => {
    const userTweets = [];
    for (let i = tweets.length - 1; i >= 0; i--) {
        if (userTweets.length === 10) break;
        const userTweet = {
            username: tweets[i].username,
            avatar: users.find(user => user.username === tweets[i].username).avatar,
            tweet: tweets[i].tweet
        }
        userTweets.push(userTweet);
    }
    res.send(userTweets);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));