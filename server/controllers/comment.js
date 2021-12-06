const db = require('../models')


exports.createComment = async (req, res) => {

   const newComment =  await db.Comment.create({
        content: req.body.content,
        userId: req.body.userId
    })
    .then(()=>  res.status(201).json({ message: "comment successfully posted"}))
    .catch(err => res.status(400).json({ err }))

};

exports.deleteComment = async (req, res) => {
    Comment.destroy({
        where: {
            id:req.body.id
        }
    })
    .then(()=>  res.status(201).json({ message: "comment successfully deleted"}))
    .catch(err => res.status(400).json({ err }))
}