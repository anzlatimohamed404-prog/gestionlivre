/**
 * ModifierLivre.jsx est la page pour modifier un livre existant.
 * Elle récupère les données du livre par son id depuis l'API.
 * Elle affiche un formulaire pré-rempli avec les données du livre.
 * Elle utilise le service livreService pour envoyer les modifications à l'API.
 * Après la modification, elle redirige vers la page principale.
 */

// J'importe useState et useEffect pour gérer l'état et les effets
import { useState, useEffect } from 'react'
// J'importe useNavigate et useParams pour naviguer et récupérer l'id dans l'URL
import { useNavigate, useParams } from 'react-router-dom'
// J'importe le service pour communiquer avec l'API
import livreService from '../services/livreService'
// J'importe le CSS de la page
import './ModifierLivre.css'

// Je définis le composant ModifierLivre
function ModifierLivre() {

  // Je récupère l'id du livre depuis les paramètres de l'URL
  const { id } = useParams()
  // J'utilise useNavigate pour rediriger après la modification
  const navigate = useNavigate()

  // Je crée un état pour stocker le titre du livre
  const [titre, setTitre] = useState('')
  // Je crée un état pour stocker l'auteur du livre
  const [auteur, setAuteur] = useState('')
  // Je crée un état pour stocker le statut de publication
  const [statut_publication, setStatutPublication] = useState(false)
  // Je crée un état pour afficher un message d'erreur
  const [erreur, setErreur] = useState('')

  /**
   * J'utilise useEffect pour récupérer les données du livre au chargement de la page.
   * Je passe l'id en dépendance pour recharger si l'id change.
   */
  useEffect(() => {
    // J'appelle la fonction pour charger les données du livre
    chargerLivre()
  }, [id])

  /**
   * La fonction chargerLivre récupère les données du livre depuis l'API.
   * Elle pré-remplit le formulaire avec les données reçues.
   */
  const chargerLivre = async () => {
    try {
      // J'appelle le service pour récupérer le livre par son id
      const response = await livreService.getLivreParId(id)
      // Je pré-remplis le formulaire avec les données du livre
      setTitre(response.data.titre)
      // Je pré-remplis l'auteur avec les données du livre
      setAuteur(response.data.auteur)
      // Je pré-remplis le statut de publication avec les données du livre
      setStatutPublication(response.data.statut_publication)
    } catch (error) {
      // J'affiche un message d'erreur si la récupération échoue
      setErreur('Erreur lors du chargement du livre')
    }
  }

  /**
   * La fonction handleSubmit gère la soumission du formulaire.
   * Elle envoie les nouvelles données à l'API et redirige vers la page principale.
   */
  const handleSubmit = async (e) => {
    // J'empêche le rechargement de la page lors de la soumission
    e.preventDefault()
    try {
      // J'appelle le service pour mettre à jour le livre avec les nouvelles données
      await livreService.mettreAJourLivre(id, { titre, auteur, statut_publication })
      // Je redirige vers la page principale après la modification
      navigate('/')
    } catch (error) {
      // J'affiche un message d'erreur si la modification échoue
      setErreur('Erreur lors de la modification du livre')
    }
  }

  return (
    // Je crée le conteneur principal de la page
    <div className="modifier-container">

      {/* J'affiche le titre de la page */}
      <h1>✏️ Modifier le livre</h1>

      {/* J'affiche le message d'erreur si il y en a un */}
      {erreur && <p className="error-message">{erreur}</p>}

      {/* Je crée le formulaire de modification pré-rempli */}
      <form onSubmit={handleSubmit} className="form-group">

        {/* Champ pour le titre pré-rempli */}
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

        {/* Champ pour l'auteur pré-rempli */}
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

        {/* Champ pour le statut de publication pré-rempli */}
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
            ✅ Modifier le livre
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

// J'exporte le composant ModifierLivre pour l'utiliser dans App.jsx
export default ModifierLivre