/**
 * Navbar.jsx est le composant de la barre de navigation de l'application.
 * Il est affiché sur toutes les pages de l'application grâce à App.jsx.
 * Il utilise Link de react-router-dom pour naviguer entre les pages
 * sans recharger la page (navigation côté client).
 */

// J'importe Link depuis react-router-dom pour créer des liens de navigation
import { Link } from 'react-router-dom'
// J'importe le CSS du composant Navbar
import './Navbar.css'

// Je définis le composant Navbar
function Navbar() {
  return (
    // Je crée la barre de navigation avec la balise nav
    <nav className="navbar">

      {/* Je crée un lien vers la page d'accueil qui affiche tous les livres */}
      <Link to="/" className="navbar-link">
        📚 Liste des livres
      </Link>

      {/* Je crée un lien vers la page de création d'un nouveau livre */}
      <Link to="/creer" className="navbar-link-add">
        ➕ Ajouter un livre
      </Link>

    </nav>
  )
}

// J'exporte le composant Navbar pour l'utiliser dans App.jsx
export default Navbar