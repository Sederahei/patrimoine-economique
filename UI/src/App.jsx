import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Possession from './../../models/possessions/Possession';
import Flux from './../../models/possessions/Flux';

const PossessionsTable = ({ possessions, date }) => (
  <table className="table table-striped table-bordered table-hover">
    <thead>
      <tr>
        <th>Libellé</th>
        <th>Valeur Initiale</th>
        <th>Date de Début</th>
        <th>Date Fin</th>
        <th>Amortissement (%)</th>
        <th>Valeur Actuelle</th>
      </tr>
    </thead>
    <tbody>
      {possessions.length > 0 ? possessions.map((possession, index) => {
        const isFlux = possession.jour !== undefined;
        const Component = isFlux ? Flux : Possession;
        const instance = new Component(
          possession.possesseur,
          possession.libelle,
          possession.valeur,
          possession.dateDebut,
          possession.dateFin,
          possession.tauxAmortissement,
          possession.jour
        );
        return (
          <tr key={index}>
            <td>{possession.libelle}</td>
            <td>{possession.valeur}</td>
            <td>{new Date(possession.dateDebut).toLocaleDateString()}</td>
            <td>{possession.dateFin ? new Date(possession.dateFin).toLocaleDateString() : 'N/A'}</td>
            <td>{possession.tauxAmortissement}</td>
            <td>{instance.getValeur(date)}</td>
          </tr>
        );
      }) : (
        <tr>
          <td colSpan="6">Aucune donnée disponible</td>
        </tr>
      )}
    </tbody>
  </table>
);

const App = () => {
  const [possessions, setPossessions] = useState([]);
  const [patrimoineValue, setPatrimoineValue] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/data');
        if (!response.ok) throw new Error('Erreur de réseau');
        const data = await response.json();
        const possessions = data[1].data.possessions.map(item => ({
          ...item,
          dateDebut: new Date(item.dateDebut),
          dateFin: item.dateFin ? new Date(item.dateFin) : null,
        }));
        setPossessions(possessions);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, []);

  const calculatePatrimoineValue = (date) => {
    const totalValue = possessions.reduce((acc, possession) => {
      const isFlux = possession.jour !== undefined;
      const Component = isFlux ? Flux : Possession;
      const instance = new Component(
        possession.possesseur,
        possession.libelle,
        possession.valeur,
        possession.dateDebut,
        possession.dateFin,
        possession.tauxAmortissement,
        possession.jour
      );
      return acc + parseFloat(instance.getValeur(date));
    }, 0);
    setPatrimoineValue(totalValue);
  };

  return (
    <div className="container mt-4">
      <h1>Gestion du Patrimoine</h1>
      <PossessionsTable possessions={possessions} date={selectedDate} />
      <form onSubmit={(e) => { e.preventDefault(); calculatePatrimoineValue(selectedDate); }}>
        <div className="form-group">
          <label>Choisir une date</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Calculer la valeur du patrimoine</button>
      </form>
      <h2 className="mt-4">Valeur du Patrimoine : {patrimoineValue.toFixed(2)} Ariary</h2>
    </div>
  );
};

export default App;
