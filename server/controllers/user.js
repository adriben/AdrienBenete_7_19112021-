const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const db = require('../models')



//USER SIGNUP
exports.signup = async (req, res) => {
  const salt = await bcrypt.genSalt(10)

       const user = await db.User.create({
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, salt)
   })
   .then(()=>  res.status(201).send({ message: "user successfully created"}))
   .catch(err => res.status(400).json({ err }))
    
};

//USER LOGIN
exports.login = (req, res) => {
  db.User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      let token = jwt.sign({ id: user.id }, 'ghuf342fkoy78gderlokA6', {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).send({ 
        id: user.id,
        username: user.username,
        accessToken: token,
        imageUrl: user.image,
        isAdmin: user.isAdmin
      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.changeInfo= (req, res) => {
  const userId = req.body.userId
  console.log(req.body);
  if(req.file){
    const imageUrl =`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    db.User.update(
      { image: imageUrl },
      { where: { id: userId },
     })
  } 
  db.User.update(
    { bio: req.body.bio,
      role: req.body.role },
    { where: { id: userId },
   })
.then(picture => res.status(200).json({ picture }))
.catch(err => res.status(400).json({ err }))
};


exports.getall = async (req, res) => {
  const users = await db.User.findAll({
    include: [db.Post]
  });
 res.send({ users })
}

exports.getOneUser = async(req, res) => {
  console.log(req.params);
  db.User.findOne({
    where: {
      id: req.params.id
    }
  }).then(user => res.status(200).json({ user }))
  .catch(err => res.status(400).json({ err }))
}

exports.deleteAccount = async(req, res) => {
  db.User.destroy({
    where: {
        id:req.params.id
    }
})
db.Post.destroy({ 
  where: {
    userId: req.params.id
  }
  
})
db.Comment.destroy({ 
  where: {
    userId: req.params.id
  }
  
})
.then(() => res.status(200).json({ message: "user post and comment successfully deleted" }))
  .catch(err => res.status(400).json({ err }))

}