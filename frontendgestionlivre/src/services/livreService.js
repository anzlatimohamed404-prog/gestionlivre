/**
 * livreService.js est le service qui gère toutes les communications avec l'API backend.
 * Il utilise axios pour envoyer des requêtes HTTP (GET, POST, PUT, DELETE).
 * Chaque fonction correspond à une action CRUD de l'application.
 * Ce fichier est importé dans les pages React pour récupérer ou envoyer des données.
 * C'est lui qui fait le lien entre le front-end React et le back-end Node.js.
 */

// J'importe axios pour pouvoir envoyer des requêtes HTTP vers mon API backend
import axios from 'axios'

/**
 * Je définis l'URL de base de mon API backend.
 * Toutes les requêtes seront envoyées vers cette adresse.
 * Le port 5000 correspond au port défini dans le fichier .env du backend.
 */
const API_URL = 'http://localhost:5000/livres'

/**
 * Je définis toutes les fonctions du service et je les exporte directement.
 * Chaque fonction retourne une promesse axios que la page React pourra utiliser
 * avec async/await pour récupérer ou envoyer des données à l'API.
 */
export default {

  /**
   * La fonction getTousLesLivres envoie une requête GET à l'API.
   * Elle récupère la liste complète de tous les livres enregistrés en base de données.
   * Elle est utilisée sur la page ListeLivres pour afficher tous les livres.
   */
  getTousLesLivres: () =>
    // J'envoie une requête GET vers http://localhost:5000/livres
    axios.get(API_URL),

  /**
   * La fonction getLivreParId envoie une requête GET à l'API avec l'id du livre.
   * Elle récupère un seul livre correspondant à l'id passé en paramètre.
   * Elle est utilisée sur la page ModifierLivre pour pré-remplir le formulaire.
   */
  getLivreParId: (id) =>
    // J'envoie une requête GET vers http://localhost:5000/livres/:id
    axios.get(`${API_URL}/${id}`),

  /**
   * La fonction creerLivre envoie une requête POST à l'API avec les données du livre.
   * Elle crée un nouveau livre en base de données avec les données envoyées.
   * Elle est utilisée sur la page CreerLivre lors de la soumission du formulaire.
   */
  creerLivre: (livre) =>
    // J'envoie une requête POST vers http://localhost:5000/livres avec les données du livre
    axios.post(API_URL, livre),

  /**
   * La fonction mettreAJourLivre envoie une requête PUT à l'API avec l'id et les nouvelles données.
   * Elle met à jour un livre existant en base de données avec les nouvelles données envoyées.
   * Elle est utilisée sur la page ModifierLivre lors de la soumission du formulaire.
   */
  mettreAJourLivre: (id, livre) =>
    // J'envoie une requête PUT vers http://localhost:5000/livres/:id avec les nouvelles données
    axios.put(`${API_URL}/${id}`, livre),

  /**
   * La fonction supprimerLivre envoie une requête DELETE à l'API avec l'id du livre.
   * Elle supprime définitivement le livre correspondant à l'id passé en paramètre.
   * Elle est utilisée sur la page ListeLivres lors du clic sur le bouton supprimer.
   */
  supprimerLivre: (id) =>
    // J'envoie une requête DELETE vers http://localhost:5000/livres/:id
    axios.delete(`${API_URL}/${id}`),

  /**
   * La fonction rechercherParTitre envoie une requête GET à l'API avec le titre en query string.
   * Elle filtre les livres dont le titre contient le mot recherché.
   * Elle est utilisée sur la page ListeLivres lors de la recherche par titre.
   */
  rechercherParTitre: (titre) =>
    // J'envoie une requête GET vers http://localhost:5000/livres?titre=... avec le titre recherché
    axios.get(`${API_URL}?titre=${titre}`),

}