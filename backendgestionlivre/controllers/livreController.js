/**
 * livreController.js contient toutes les fonctions pour gérer les livres
 * Il suit l'architecture MVC (Modèle-Vue-Contrôleur).
 * Chaque fonction est déclenchée par le routeur lors d'une requête HTTP.
 * Elle interagit avec le modèle Livre pour effectuer des opérations CRUD
 * et retourne une réponse JSON au client.
 * module.exports exporte toutes les fonctions pour qu'elles soient utilisables depuis le fichier de routes.
 */

// J'importe le modèle Livre pour interagir avec la base de données
const Livre = require("../models/livre");
// J'importe Op de Sequelize pour faire des recherches avec LIKE
const { Op } = require("sequelize");

// J'exporte toutes les fonctions du contrôleur
module.exports = {

  // La fonction creerLivre permet de créer un nouveau livre
  creerLivre: async (req, res) => {
    // Je récupère les données envoyées par le client dans le corps de la requête
    const { titre, auteur, statut_publication } = req.body;
    try {
      // Je crée un nouveau livre dans la base de données avec les données reçues
      const livre = await Livre.create({ titre, auteur, statut_publication });
      // Je retourne le livre créé avec le statut 201 (Created)
      res.status(201).json(livre);
    } catch (error) {
      // Je retourne une erreur 500 si la création échoue
      res.status(500).json({ message: error.message });
    }
  },

  // La fonction getTousLesLivres permet de récupérer tous les livres
  getTousLesLivres: async (req, res) => {
    // Je récupère le titre passé en query string (?titre=...)
    const { titre } = req.query;
    try {
      // Si un titre est passé, je filtre les livres par titre avec LIKE
      const livres = titre
        // Je recherche les livres dont le titre contient le mot recherché
        ? await Livre.findAll({ where: { titre: { [Op.like]: `%${titre}%` } } })
        // Sinon je récupère tous les livres sans filtre
        : await Livre.findAll();
      // Je retourne la liste des livres avec le statut 200 (OK)
      res.status(200).json(livres);
    } catch (error) {
      // Je retourne une erreur 500 si la récupération échoue
      res.status(500).json({ message: error.message });
    }
  },

  // La fonction getLivreParId permet de récupérer un livre par son id
  getLivreParId: async (req, res) => {
    try {
      // Je recherche le livre par sa clé primaire (id) passée dans les paramètres
      const livre = await Livre.findByPk(req.params.id);
      // Je retourne une erreur 404 si le livre n'existe pas en base de données
      if (!livre) return res.status(404).json({ message: "Livre non trouvé" });
      // Je retourne le livre trouvé avec le statut 200 (OK)
      res.status(200).json(livre);
    } catch (error) {
      // Je retourne une erreur 500 si la récupération échoue
      res.status(500).json({ message: error.message });
    }
  },

  // La fonction mettreAJourLivre permet de mettre à jour un livre existant
  mettreAJourLivre: async (req, res) => {
    // Je récupère les nouvelles données envoyées par le client dans le corps de la requête
    const { titre, auteur, statut_publication } = req.body;
    try {
      // Je recherche le livre par son id passé dans les paramètres de la requête
      const livre = await Livre.findByPk(req.params.id);
      // Je retourne une erreur 404 si le livre n'existe pas en base de données
      if (!livre) return res.status(404).json({ message: "Livre non trouvé" });
      // Je mets à jour le livre avec les nouvelles données reçues
      await livre.update({ titre, auteur, statut_publication });
      // Je retourne le livre mis à jour avec le statut 200 (OK)
      res.status(200).json(livre);
    } catch (error) {
      // Je retourne une erreur 500 si la mise à jour échoue
      res.status(500).json({ message: error.message });
    }
  },

  // La fonction supprimerLivre permet de supprimer un livre par son id
  supprimerLivre: async (req, res) => {
    try {
      // Je recherche le livre par son id passé dans les paramètres de la requête
      const livre = await Livre.findByPk(req.params.id);
      // Je retourne une erreur 404 si le livre n'existe pas en base de données
      if (!livre) return res.status(404).json({ message: "Livre non trouvé" });
      // Je supprime le livre de la base de données
      await livre.destroy();
      // Je retourne un message de confirmation avec le statut 200 (OK)
      res.status(200).json({ message: "Livre supprimé avec succès" });
    } catch (error) {
      // Je retourne une erreur 500 si la suppression échoue
      res.status(500).json({ message: error.message });
    }
  },

};