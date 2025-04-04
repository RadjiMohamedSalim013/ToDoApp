const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token){
        return res.status(401).json({ message: 'Accès refusé , veuillez vous connecter !' });
    }
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error){
        return res.status(401).json({ message: 'Token invalide !' });
    }


}

module.exports = authMiddleware;