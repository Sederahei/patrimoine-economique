import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Form, Alert } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);

function Patrimoine() {
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [jour, setJour] = useState('');
  const [date, setDate] = useState('');
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  const handleRangeSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/api/patrimoine/range', {
        params: { type: 'month', dateDebut, dateFin, jour }
      });
      setChartData({
        labels: response.data.labels,
        datasets: [
          {
            label: 'Valeur Patrimoine',
            data: response.data.values,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
        ],
      });
    } catch (error) {
      setError('Erreur lors de la récupération des données du patrimoine');
    }
  };

  const handleDateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/patrimoine', { date });
      setChartData({
        labels: [date],
        datasets: [
          {
            label: 'Valeur Patrimoine',
            data: [response.data.valeur],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
        ],
      });
    } catch (error) {
      setError('Erreur lors de la récupération de la valeur du patrimoine');
    }
  };

  return (
    <Container>
      <h1 className="my-4">Patrimoine</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleRangeSubmit}>
        <Form.Group controlId="dateDebut">
          <Form.Label>Date de Début</Form.Label>
          <Form.Control
            type="date"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="dateFin" className="mt-3">
          <Form.Label>Date de Fin</Form.Label>
          <Form.Control
            type="date"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="jour" className="mt-3">
          <Form.Label>Jour</Form.Label>
          <Form.Control
            type="number"
            value={jour}
            onChange={(e) => setJour(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">Valider Plage</Button>
      </Form>
      <Form onSubmit={handleDateSubmit} className="mt-4">
        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">Valider Date</Button>
      </Form>
      {chartData && (
        <div className="mt-4">
          <Line data={chartData} />
        </div>
      )}
    </Container>
  );
}

export default Patrimoine;
