const db = require('../models');
const fs = require('fs')


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
    db.Post.findOne({
        where: {
            id: req.params.id
        }
    })
    
    .then((post) => res.status(200).json({ post }))
    .catch(err => res.status(400).json({ err }))

}

exports.updateOnePost =  (req, res) => {
    console.log(req.body);

    if(req.file){
        const imageUrl =`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        db.Post.update(
          { image: imageUrl },
          { where: { id: req.params.id },
         })
      } 

db.Post.update(
          { content: req.body.content},
          { where: { id: req.params.id } })
      .then(post => res.status(200).json({ post }))
      .catch(err => res.status(400).json({ err }))
};

exports.deletePost  = async (req, res) => {
    db.Post.findOne({
        where: {
            id: req.params.id
        }
    }).then((post) => {
        console.log(post);
        if(post.image){
            const filename = post.image.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
   
            db.Post.destroy({
                where: {
                    id:req.params.id
                }
            })

    })
            
        } else{
            db.Post.destroy({
                where: {
                    id:req.params.id
                }
            })

        }
        
    
        })
   
    .then(() => res.status(200).json({ message: 'post successfully deleted'}))
    .catch(err => res.status(400).json({ err }))
}



