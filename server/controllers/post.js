const Post = require('../models/Post');
// const db = require('../database/connection');
const db = require('../models')



exports.create = async (req, res) => {
    
    if (req.file){
        const imageUrl =`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        const newPost = await Post.create({
        content: req.body.content,
        userId: req.body.userId, 
        username: req.body.username,
        image: imageUrl, 
    })
    } else{
        const newPost = await Post.create({
        content: req.body.content,
        userId: req.body.userId, 
        username: req.body.username,
    })
    } try{
         res.status(201).json({ message: "post successfully created"})

    } catch{
        err => res.status(400).json({ err })

    }

};

exports.showAllPosts = async (req, res) => {
    Post.findAll()
    .then((posts) => res.status(200).json({ posts }))
    .catch(err => res.status(400).json({ err }))
};

exports.showOnePost =  (req, res) => {
    Post.findAll({
        where: {
            id: req.params.id
        }
    })
    
    .then((post) => res.status(200).json({ post }))
    .catch(err => res.status(400).json({ err }))

}

exports.updateOnePost =  (req, res) => {

Post.update(
          { content: req.body.content},
          { where: { id: req.body.id } })
      .then(post => res.status(200).json({ post }))
      .catch(err => res.status(400).json({ err }))
};

exports.deletePost  = async (req, res) => {
   
        Post.destroy({
            where: {
                id:req.body.id
            }
        })
   
    .then(() => res.status(200).json({ message: 'post successfully deleted'}))
    .catch(err => res.status(400).json({ err }))
}

