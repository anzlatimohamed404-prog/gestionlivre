/**
 * app.js configure l'application Express
 * Il définit les middlewares et les routes
 * Il est exporté pour être utilisé dans server.js
 */

// J'importe express pour créer l'application
const express = require("express");
// J'importe cors pour autoriser React à communiquer avec le back-end
const cors = require("cors");

// J'importe les routes des livres
const livreRoutes = require("./routes/livreRoutes");

// Je crée mon application Express
const app = express();

// J'autorise les requêtes venant de React (front-end) sur le port 5173
app.use(cors({
  // J'autorise uniquement l'origine du front-end React
  origin: 'http://localhost:5173',
  // J'autorise les méthodes HTTP utilisées par l'application
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// J'autorise mon serveur à lire le JSON envoyé par le client
app.use(express.json());

// Route racine
app.get("/", (req, res) => {
  // Je retourne un message de bienvenue en JSON
  res.json({ message: "Bienvenue sur l'API Gestion Livre", version: "1.0.0" });
});

// Je déclare le préfixe de mes routes livres
app.use("/livres", livreRoutes);

/*
 * J'exporte l'application pour l'utiliser dans server.js
 */
module.exports = app;