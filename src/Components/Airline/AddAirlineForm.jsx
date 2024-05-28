import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../util/apiService';
import AirlineForm from './AirlineForm';

const AddAirlineForm = () => {
  const [airline, setAirline] = useState({ name: '', code: '' });
  const [errors, setErrors] = useState({ name: '', code: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiService.post('/private/airlines', airline);
      alert("Airline added successfully!");
      navigate('/airlines');
    } catch (error) {
      setErrors(prevErrors => ({ ...prevErrors, code:'The name or code already exists!', name: 'The name or code already exists!' }));
      console.error('There was an error saving the airline!', error);
    }
  };

  return (
    <AirlineForm
      airline={airline}
      setAirline={setAirline}
      handleSubmit={handleSubmit}
      title="Add Airline"
      submitButtonLabel="Add Airline"
      errors={errors}
      setErrors={setErrors}
    />
  );
};

export default AddAirlineForm;