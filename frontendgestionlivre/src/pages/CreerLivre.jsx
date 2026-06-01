/**
 * CreerLivre.jsx est la page pour créer un nouveau livre.
 * Elle affiche un formulaire avec les champs titre, auteur et statut de publication.
 * Elle utilise le service livreService pour envoyer les données à l'API.
 * Après la création, elle redirige vers la page principale.
 */

// J'importe useState pour gérer l'état du formulaire
import { useState } from 'react'
// J'importe useNavigate pour rediriger vers la page principale après la création
import { useNavigate } from 'react-router-dom'
// J'importe le service pour communiquer avec l'API
import livreService from '../services/livreService'
// J'importe le CSS de la page
import './CreerLivre.css'

// Je définis le composant CreerLivre
function CreerLivre() {

  // Je crée un état pour stocker les données du formulaire
  const [titre, setTitre] = useState('')
  // Je crée un état pour stocker l'auteur
  const [auteur, setAuteur] = useState('')
  // Je crée un état pour stocker le statut de publication
  const [statut_publication, setStatutPublication] = useState(false)
  // Je crée un état pour afficher un message d'erreur
  const [erreur, setErreur] = useState('')

  // J'utilise useNavigate pour rediriger après la création
  const navigate = useNavigate()

  /**
   * La fonction handleSubmit gère la soumission du formulaire.
   * Elle envoie les données à l'API et redirige vers la page principale.
   */
  const handleSubmit = async (e) => {
    // J'empêche le rechargement de la page lors de la soumission
    e.preventDefault()
    try {
      // J'appelle le service pour créer le nouveau livre
      await livreService.creerLivre({ titre, auteur, statut_publication })
      // Je redirige vers la page principale après la création
      navigate('/')
    } catch (error) {
      // J'affiche un message d'erreur si la création échoue
      setErreur('Erreur lors de la création du livre')
    }
  }

  return (
    // Je crée le conteneur principal de la page
    <div className="creer-container">

      {/* J'affiche le titre de la page */}
      <h1>➕ Ajouter un livre</h1>

      {/* J'affiche le message d'erreur si il y en a un */}
      {erreur && <p className="error-message">{erreur}</p>}

      {/* Je crée le formulaire de création */}
      <form onSubmit={handleSubmit} className="form-group">

        {/* Champ pour le titre */}
        <div className="form-field">
          <label>Titre :</label>
          <input
            type="text"
            value={titre}
            // Je mets à jour l'état titre à chaque saisie
            onChange={(e) => setTitre(e.target.value)}
            required
          />
        </div>

        {/* Champ pour l'auteur */}
        <div className="form-field">
          <label>Auteur :</label>
          <input
            type="text"
            value={auteur}
            // Je mets à jour l'état auteur à chaque saisie
            onChange={(e) => setAuteur(e.target.value)}
            required
          />
        </div>

        {/* Champ pour le statut de publication */}
        <div className="form-field-checkbox">
          <input
            type="checkbox"
            id="publication"
            checked={statut_publication}
            // Je mets à jour l'état statut_publication à chaque clic
            onChange={(e) => setStatutPublication(e.target.checked)}
          />
          <label htmlFor="publication">Publié</label>
        </div>

        {/* Boutons d'action */}
        <div className="form-actions">
          {/* Bouton pour soumettre le formulaire */}
          <button
            type="submit"
            className="btn-submit"
          >
            ✅ Créer le livre
          </button>

          {/* Bouton pour annuler et retourner à la liste */}
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn-cancel"
          >
            ❌ Annuler
          </button>
        </div>

      </form>

    </div>
  )
}

// J'exporte le composant CreerLivre pour l'utiliser dans App.jsx
export default CreerLivre