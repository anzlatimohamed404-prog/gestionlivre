/**
 * livreRoutes.js contient toutes les routes pour gérer les livres
 * Chaque route correspond à une action CRUD (Create, Read, Update, Delete)
 * Les routes sont exportées pour être utilisées dans le serveur
 */

// J'importe express pour créer le router
const express = require("express");
// Je crée le router d'express
const router = express.Router();

// J'importe toutes les fonctions du controller
const livreController = require("../controllers/livreController");

// Je déclare la route POST /livres pour créer un nouveau livre
router.post("/", livreController.creerLivre);

// Je déclare la route GET /livres pour récupérer tous les livres
router.get("/", livreController.getTousLesLivres);

// Je déclare la route GET /livres/:id pour récupérer un livre par son id
router.get("/:id", livreController.getLivreParId);

// Je déclare la route PUT /livres/:id pour mettre à jour un livre
router.put("/:id", livreController.mettreAJourLivre);

// Je déclare la route DELETE /livres/:id pour supprimer un livre
router.delete("/:id", livreController.supprimerLivre);

// J'exporte le router pour l'utiliser dans app.js
module.exports = router;