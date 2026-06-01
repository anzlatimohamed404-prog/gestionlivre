// J'importe React pour pouvoir utiliser le JSX
import React from 'react'
// J'importe ReactDOM pour afficher l'application dans le navigateur
import ReactDOM from 'react-dom/client'
// J'importe le composant principal App
import App from './App'
// J'importe les styles globaux
import './index.css'

// Je monte l'application React dans la div id="root" du index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode permet de détecter les erreurs potentielles en développement
  <React.StrictMode>
    <App />
  </React.StrictMode>
)