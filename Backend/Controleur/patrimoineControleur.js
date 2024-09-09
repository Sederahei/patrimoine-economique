import Patrimoine from './../../models/Patrimoine.js';
import Personne from './../../models/Personne.js';
import { readFile } from './../../data/index.js'; 

async function initializePatrimoine() {
  try {
    const data = await readFile();
    const possessions = data.possessions;

    if (!Array.isArray(possessions)) {
      throw new Error('Les possessions doivent être un tableau');
    }

    const personne = new Personne('John Doe'); 
    const patrimoine = new Patrimoine(personne, possessions);
    return patrimoine;
  } catch (error) {
    console.error('Erreur lors de l\'initialisation du patrimoine:', error.message);
    throw error;
  }
}

export const getPatrimoineByDate = async (req, res) => {
  try {
    const patrimoine = await initializePatrimoine(); // Initialiser le patrimoine
    const { date } = req.query;  // Utilisez req.query pour les paramètres de requête
    const valeur = patrimoine.getValeur(new Date(date));
    res.json({ valeur });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la valeur du patrimoine.' });
  }
};


export const getPatrimoineInRange = async (req, res) => {
  try {
    const patrimoine = await initializePatrimoine(); // Initialiser le patrimoine
    const { type, dateDebut, dateFin, jour } = req.query;
    if (!dateDebut || !dateFin || !jour) {
      return res.status(400).json({ error: 'Paramètres manquants' });
    }
    const valeur = patrimoine.getValeurRange(new Date(dateDebut), new Date(dateFin), parseInt(jour), type);
    res.json({ valeur });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la valeur du patrimoine.' });
  }
};
