const PostController = require('../controllers/post-controller');
 
module.exports = app => {
    app.get('/api/posts', PostController.findAllPosts);
    app.get('/api/posts/:id', PostController.findOneSinglePost);
    app.patch('/api/posts/:id', PostController.updateExistingPost);
    app.post('/api/posts', PostController.createNewPost);
    app.delete('/api/posts/:id', PostController.deleteAnExistingPost);
}