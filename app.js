const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');


//charger les variables d'environnement
dotenv.config();


const app = express();

// Middleware pour parser le corps des requêtes JSON
app.use(express.json());




// Importer les routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

// Utiliser les routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

//Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})
.then(() =>console.log('Connexion à MongoDB réussie'))
.catch((err) => console.log('Erreur de connexion à MongoDB:', err));


app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
  });
  
  app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
  });
  
  app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
  });
  


//Demarer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});