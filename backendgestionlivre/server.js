/**
 * server.js est le point d'entrée du back-end
 * Il importe l'application Express depuis app.js
 * Il connecte la base de données et lance le serveur
 */

// J'importe dotenv pour utiliser les variables d'environnement
require("dotenv").config();

// J'importe l'application Express
const app = require("./app");
// J'importe la connexion à la base de données
const sequelize = require("./config/database");

// Je récupère le port depuis le fichier .env
const PORT = process.env.PORT || 5000;

/**
 * Je connecte la base de données et je lance le serveur
 * sync({ force: false }) crée la table si elle n'existe pas
 * sans supprimer les données existantes
 */
sequelize.sync({ force: false }).then(() => {
  console.log("✅ Base de données connectée !");
  app.listen(PORT, () => {
    console.log(`✅ Serveur lancé sur le port ${PORT}`);
  });
}).catch((error) => {
  console.log("❌ Erreur de connexion à la base de données :", error);
});