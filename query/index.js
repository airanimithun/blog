const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());


const posts = {};

app.get('/posts', (req,res) => {
    res.send(posts);
})

app.post('/events', (req,res)=> {
    const {type, data} = req.body;
    if(type === 'PostCreated') {
        posts[data.id] = { 
            id: data.id,
            title: data.title,
            comments: []
        };
    }
    if(type === 'CommentCreated') {
        posts[data.postId].comments.push({
            id: data.id,
            content: data.content,
            postId: data.postId
        })
    }
    res.send({});
})

app.listen(4002, ()=> {
    console.log('Listening on Port 4002...');
})