var express = require('express');

var userController = require('../controllers/userController');

var postController = require('../controllers/postController');

var commentController = require('../controllers/commentController');

var likesController = require('../controllers/likesController');

var commentsCountController = require('../controllers/commentsCountController');
var auth = require('../controllers/authController');


var router = express.Router();



router.post('/auth/authenticate', auth.authenticate);
router.get('/users',   auth.loginRequired, userController.user_list);

router.get('/user/:id', userController.user_detail);

router.post('/user/create', userController.user_create);

router.post('/user/:id/update', userController.user_update);

router.post('/user/:id/delete', userController.user_delete);


router.get('/posts', postController.post_list);

router.get('/post/:id', postController.post_detail);

router.post('/post/create', postController.post_create);

router.post('/post/:id/update', postController.post_update);
router.post('/post/:id/delete', postController.post_delete);


router.get('/:post_id/comments', commentController.comment_list);

router.get('/comment/:id', commentController.comment_detail);

router.post('/comment/:post_id/create', commentController.comment_create);

router.post('/comment/:id/update', commentController.comment_update);

router.post('/comment/:id/delete', commentController.comment_delete);


router.get('/likes', likesController.likes_list);

router.get('/likes/:id',likesController.likes_detail);

router.post('/likes/create', likesController.likes_create);

router.post('/likes/:id/update', likesController.likes_update);

router.post('/likes/:id/delete', likesController.likes_delete);


router.get('/comments_count', commentsCountController.comments_count_list);

router.get('/comments_count/:id',commentsCountController.comments_count_detail);

router.post('/comments_count/create', commentsCountController.comments_count_create);

router.post('/comments_count/:id/update', commentsCountController.comments_count_update);

router.post('/comments_count/:id/delete', commentsCountController.comments_count_delete);


module.exports = router;

