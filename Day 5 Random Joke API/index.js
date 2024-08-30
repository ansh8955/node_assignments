const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

const jokes =[
    { "joke": "Why don’t skeletons fight each other? They don’t have the guts." },
    { "joke": "What do you call fake spaghetti? An impasta!" },
    { "joke": "Why did the bicycle fall over? It was two-tired." },
    { "joke": "How do you organize a space party? You planet." },
    { "joke": "Why don’t scientists trust atoms? Because they make up everything!" },
    { "joke": "Why did the math book look sad? Because it had too many problems." },
    { "joke": "What did the ocean say to the beach? Nothing, it just waved." },
    { "joke": "Why can’t your nose be 12 inches long? Because then it would be a foot." },
    { "joke": "Why did the scarecrow win an award? Because he was outstanding in his field!" },
    { "joke": "What do you get if you cross a snowman and a vampire? Frostbite." },
    { "joke": "Why don’t some couples go to the gym? Because some relationships don’t work out." },
    { "joke": "I would tell you a construction pun, but I’m still working on it." },
    { "joke": "Why did the golfer bring two pairs of pants? In case he got a hole in one." },
    { "joke": "Why was the math book sad? It had too many problems." },
    { "joke": "Why can’t you give Elsa a balloon? Because she’ll let it go." },
    { "joke": "Why did the tomato turn red? Because it saw the salad dressing!" },
    { "joke": "What do you call cheese that isn’t yours? Nacho cheese." },
    { "joke": "Why did the computer go to the doctor? Because it had a virus." },
    { "joke": "Why don’t eggs tell jokes? Because they might crack up." },
    { "joke": "How do you catch a squirrel? Climb a tree and act like a nut." }
]


 
app.get('/api/jokes/random', (req, res) => {
   try{
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)].joke;
    console.log(randomJoke);
    
    res.json({ joke: randomJoke });
   }
   catch(err){
    console.log(err);
    
   }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});