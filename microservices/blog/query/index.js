const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts);
});

const handleEvents = () => {
    
    if( type === "PostCreated"){
        const { id, title } = data;
        posts[id] = { id, title, comments: []}
    }

    if(type === "CommentCreated"){
        const { id, content, postId, status } = data;
        const post = posts[postId];
        post.comments.push({id, content, status});
    }

    if(type === "CommentUpdated"){
        const { id, content, postId, status } = data;
        const post = posts[postId];
        const comment = post.comments.find(comment => {
            return comment.id === id;
        })
        comment.status = status;
        comment.content = content;
    }
}

app.post('/events',  (req, res) => {

    const { type, data } = req.body;

    handleEvents(type, data)

    console.log(posts);
    res.send({});
});

app.listen(4002, () => {
    console.log("Listening on 4002");
})