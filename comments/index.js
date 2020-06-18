const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsById = {};

app.get('/posts/:id/comments', (req,res) => {
    res.send(commentsById[req.params.id] || []);
});

app.post('/posts/:id/comments', (req,res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsById[req.params.id] || [];
    comments.push({id:commentId, content});

    commentsById[req.params.id] = comments;

    axios.post('http://localhost:4005/events',{
        type: 'CommentCreated',
        data : {
            id: commentId,
            content,
            postId: req.params.id
        }
    })

    res.status(201).send(comments);
});


app.post('/events', (req,res) => {
    console.log('Recieved Event', req.body.type);
    res.send({});
})

app.listen(4001, () => {
    console.log('Listening on Port 4001...');
})