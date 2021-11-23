const jwt = require("jsonwebtoken");


module.exports = (req, res, next) =>{
    try{
        const token = req.headers.autorization.split(' ')[1];
        const decodedToken = jwt.verify(token,'ghuf342fkoy78gderlokA6');
        const userId = decodedToken.userId;

        if(req.body.userId && req.body.userId !== userId){
            throw 'This user id is not available'
        } else {
            next()
        }
    } catch {
        res.status(401).json({ error: error | "Unidentified request"})
    }
}