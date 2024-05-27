import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiService } from '../../apiService';
import BaggageForm from './BaggageForm';

const EditBaggageForm = () => {
  const [baggage, setBaggage] = useState({ passengerId: '', flightId: '', weight: '' });
  const [originalBaggage, setOriginalBaggage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadBaggage(id);
    }
  }, [id]);

  const loadBaggage = async (id) => {
    try {
      const data = await apiService.get('/private/baggage/' + id);
      setBaggage(data);
      setOriginalBaggage(data);

    } catch (error) {
      console.error('There was an error fetching the baggage!', error);
      alert('There was an error fetching the baggage! Check the console for more details.');
    }
  };

  console.log(baggage);

  const handleSubmit = async () => {
    if (JSON.stringify(baggage) === JSON.stringify(originalBaggage)) {
      alert('You did not change anything.');
      return;
    }

    try {
      await apiService.put(`/private/baggage`, baggage);
      alert("Baggage updated successfully!");
      navigate('/baggages');
    } catch (error) {
      console.error('There was an error saving the baggage!', error);
      alert('There was an error saving the baggage! Check the console for more details.');
    }
  };

  return (
    <BaggageForm
      baggage={baggage}
      setBaggage={setBaggage}
      handleSubmit={handleSubmit}
      title="Edit Baggage"
      submitButtonLabel="Update Baggage"
    />
  );
};

export default EditBaggageForm;