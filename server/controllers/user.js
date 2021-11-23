const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')



//USER SIGNUP
exports.signup = async (req, res) => {
  const salt = await bcrypt.genSalt(10)

       const user = await User.create({
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, salt)
   })
   .then(()=>  res.status(201).json({ message: "user successfully created"}))
   .catch(err => res.status(400).json({ err }))
    
};

//USER LOGIN
exports.login = (req, res) => {
  User.findOne({
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
        accessToken: token
      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.getall = async (req, res) => {
  const users = await User.findAll();
 res.send({ users })
}