import express from 'express'; 
import cors from 'cors';

// Config variables
const app = express();
app.use(cors());
app.use(express.json())
const PORT = 5000;

// Data variables
const users = [];

app.post("/sign-up", (req, res) => {
    const user = req.body;
    users.push(user);
    res.send("OK");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));