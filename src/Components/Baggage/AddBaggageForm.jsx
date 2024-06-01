import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../util/apiService';
import BaggageForm from './BaggageForm';

const AddBaggageForm = () => {
  const [baggage, setBaggage] = useState({ passengerId: '', flightId: '', weight: '' });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await apiService.post('/private/baggage', baggage);
      alert("Baggage added successfully!");
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
      title="Add Baggage"
      submitButtonLabel="Add Baggage"
    />
  );
};

export default AddBaggageForm;