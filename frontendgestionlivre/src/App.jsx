// J'importe BrowserRouter et Routes depuis react-router-dom pour gérer la navigation
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// J'importe les pages de l'application
import ListeLivres from './pages/ListeLivres'
import CreerLivre from './pages/CreerLivre'
import ModifierLivre from './pages/ModifierLivre'
// J'importe la barre de navigation
import Navbar from './components/Navbar'

// Je définis le composant principal App qui gère les routes
function App() {
  return (
    // BrowserRouter permet de gérer la navigation entre les pages
    <BrowserRouter>
      {/* J'affiche la barre de navigation sur toutes les pages */}
      <Navbar />
      {/* Je définis les routes de l'application */}
      <Routes>
        {/* Route principale qui affiche la liste des livres */}
        <Route path="/" element={<ListeLivres />} />
        {/* Route pour créer un nouveau livre */}
        <Route path="/creer" element={<CreerLivre />} />
        {/* Route pour modifier un livre existant par son id */}
        <Route path="/modifier/:id" element={<ModifierLivre />} />
      </Routes>
    </BrowserRouter>
  )
}

// J'exporte le composant App pour l'utiliser dans main.jsx
export default App