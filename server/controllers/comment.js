const db = require("../models");

exports.createComment = async (req, res) => {

  const newComment = await db.Comment.create({
    content: req.body.content,
    userId: req.body.userId,
    postId: req.body.postId,
  });
  db.Post.increment({ comments: 1 }, { where: { id: req.params.id } })
    .then(() =>
      res.status(201).json({ message: "comment successfully posted" })
    )
    .catch((err) => res.status(400).json({ err }));
};

exports.getComment = async (req, res) => {
  await db.Comment.findAll({
    include: [db.User],
    where: {
      postId: req.params.id,
    },
  })
    .then((comments) => res.status(201).json({ comments }))
    .catch((err) => res.status(400).json({ err }));
};

exports.deleteComment = async (req, res) => {
  db.Post.decrement({ comments: 1 }, { where: { id: req.body.postId } });
  db.Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() =>
      res.status(201).json({ message: "comment successfully deleted" })
    )
    .catch((err) => res.status(400).json({ err }));
};
