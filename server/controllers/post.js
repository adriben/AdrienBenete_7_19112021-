const { Model } = require('sequelize/dist');
const db = require('../models');
const User = require('../models/User');





exports.create = async (req, res) => {
    
    if (req.file){
        const imageUrl =`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        const newPost = await db.Post.create({
        content: req.body.content,
        userId: req.body.userId, 
        username: req.body.username,
        image: imageUrl, 
        likes: 0
    })
    } else{
     await db.Post.create({
        content: req.body.content,
        userId: req.body.userId, 
        username: req.body.username,
        likes: 0,
    })
    } try{
         res.status(201).json({ message: "post successfully created"})

    } catch{
        err => res.status(400).json({ err })

    }

};

exports.showAllPosts = async (req, res) => {
    
    db.Post.findAll({
        include: [db.Like, db.User]
      })
    .then((posts) => res.status(200).json({ posts }))
    .catch(err => res.status(400).json({ err }))
};

exports.showOnePost =  (req, res) => {
    db.Post.findAll({
        where: {
            id: req.params.id
        }
    })
    
    .then((post) => res.status(200).json({ post }))
    .catch(err => res.status(400).json({ err }))

}

exports.updateOnePost =  (req, res) => {

db.Post.update(
          { content: req.body.content},
          { where: { id: req.body.id } })
      .then(post => res.status(200).json({ post }))
      .catch(err => res.status(400).json({ err }))
};

exports.deletePost  = async (req, res) => {
   
        db.Post.destroy({
            where: {
                id:req.params.id
            }
        })
   
    .then(() => res.status(200).json({ message: 'post successfully deleted'}))
    .catch(err => res.status(400).json({ err }))
}



