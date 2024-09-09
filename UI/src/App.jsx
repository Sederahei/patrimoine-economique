import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EnTete from './components/En-Tete';
import Patrimoine from './Pages/Patrimoine';
import ListePossessions from './Pages/ListePossessions';
import CreerPossession from './Pages/CreerPossession';
import ModifierPossession from './Pages/ModifierPossession';

function App() {
  return (
    <div className="App">
      <EnTete />
      <Routes>
        <Route path="/patrimoine" element={<Patrimoine />} />
        <Route path="/possession" element={<ListePossessions />} />
        <Route path="/possession/create" element={<CreerPossession />} />
        <Route path="/possession/:libelle/update" element={<ModifierPossession />} />
        
      </Routes>
    </div>
  );
}

export default App;
