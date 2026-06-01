/**
 * ListeLivres.jsx est la page principale de l'application.
 * Elle affiche tous les livres récupérés depuis l'API backend.
 * Elle permet aussi de rechercher un livre par titre et de supprimer un livre.
 * Elle utilise le service livreService pour communiquer avec l'API.
 */

// J'importe useState et useEffect depuis React pour gérer l'état et les effets
import { useState, useEffect } from 'react'
// J'importe useNavigate pour naviguer vers une autre page
import { useNavigate } from 'react-router-dom'
// J'importe le service pour communiquer avec l'API
import livreService from '../services/livreService'
// J'importe le CSS de la page
import './ListeLivres.css'

// Je définis le composant ListeLivres
function ListeLivres() {

  // Je crée un état pour stocker la liste des livres
  const [livres, setLivres] = useState([])
  // Je crée un état pour stocker le titre recherché
  const [recherche, setRecherche] = useState('')
  // Je crée un état pour afficher un message d'erreur
  const [erreur, setErreur] = useState('')

  // J'utilise useNavigate pour naviguer vers la page de modification
  const navigate = useNavigate()

  /**
   * J'utilise useEffect pour récupérer tous les livres au chargement de la page.
   * Le tableau vide [] signifie que l'effet ne s'exécute qu'une seule fois.
   */
  useEffect(() => {
    // J'appelle la fonction pour récupérer tous les livres
    chargerLivres()
  }, [])

  /**
   * La fonction chargerLivres récupère tous les livres depuis l'API.
   * Elle met à jour l'état livres avec les données reçues.
   */
  const chargerLivres = async () => {
    try {
      // J'appelle le service pour récupérer tous les livres
      const response = await livreService.getTousLesLivres()
      // Je mets à jour l'état avec les livres reçus
      setLivres(response.data)
    } catch (error) {
      // J'affiche un message d'erreur si la récupération échoue
      setErreur('Erreur lors du chargement des livres')
    }
  }

  /**
   * La fonction rechercherLivre recherche les livres par titre.
   * Elle appelle le service avec le titre saisi dans le champ de recherche.
   */
  const rechercherLivre = async () => {
    try {
      // J'appelle le service pour rechercher les livres par titre
      const response = await livreService.rechercherParTitre(recherche)
      // Je mets à jour l'état avec les livres trouvés
      setLivres(response.data)
    } catch (error) {
      // J'affiche un message d'erreur si la recherche échoue
      setErreur('Erreur lors de la recherche')
    }
  }

  /**
   * La fonction supprimerLivre supprime un livre par son id.
   * Elle recharge la liste des livres après la suppression.
   */
  const supprimerLivre = async (id) => {
    try {
      // J'appelle le service pour supprimer le livre
      await livreService.supprimerLivre(id)
      // Je recharge la liste des livres après la suppression
      chargerLivres()
    } catch (error) {
      // J'affiche un message d'erreur si la suppression échoue
      setErreur('Erreur lors de la suppression')
    }
  }

  return (
    // Je crée le conteneur principal de la page
    <div className="liste-container">

      {/* Je affiche le titre de la page */}
      <h1>📚 Liste des livres</h1>

      {/* J'affiche le message d'erreur si il y en a un */}
      {erreur && <p className="error-message">{erreur}</p>}

      {/* Je crée le champ de recherche par titre */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher par titre..."
          value={recherche}
          // Je mets à jour l'état recherche à chaque saisie
          onChange={(e) => setRecherche(e.target.value)}
          className="search-input"
        />
        {/* Bouton pour lancer la recherche */}
        <button onClick={rechercherLivre} className="btn-search">
          🔍 Rechercher
        </button>
        {/* Bouton pour réinitialiser la recherche */}
        <button onClick={chargerLivres} className="btn-reset">
          🔄 Réinitialiser
        </button>
      </div>

      {/* J'affiche la liste des livres */}
      {livres.map((livre) => (
        // Je crée une carte pour chaque livre
        <div key={livre.id} className="book-card">

          {/* J'affiche le titre du livre */}
          <h3>{livre.titre}</h3>
          {/* J'affiche l'auteur du livre */}
          <p>✍️ Auteur : {livre.auteur}</p>
          {/* J'affiche le statut de publication du livre */}
          <p>📌 Statut : {livre.statut_publication ? '✅ Publié' : '❌ Non publié'}</p>

          {/* Boutons d'action */}
          <div className="book-actions">
            {/* Bouton pour modifier le livre */}
            <button
              onClick={() => navigate(`/modifier/${livre.id}`)}
              className="btn-modifier"
            >
              ✏️ Modifier
            </button>

            {/* Bouton pour supprimer le livre */}
            <button
              onClick={() => supprimerLivre(livre.id)}
              className="btn-supprimer"
            >
              🗑️ Supprimer
            </button>
          </div>

        </div>
      ))}

    </div>
  )
}

// J'exporte le composant ListeLivres pour l'utiliser dans App.jsx
export default ListeLivres