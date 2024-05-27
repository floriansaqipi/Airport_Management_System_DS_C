import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiService } from '../../apiService';
import AirlineForm from './AirlineForm';

const EditAirlineForm = () => {
  const [airline, setAirline] = useState({ name: '', code: '' });
  const [errors, setErrors] = useState({ name: '', code: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadAirline(id);
    }
  }, [id]);

  const loadAirline = async (id) => {
    try {
      const data = await apiService.get('/public/airlines/' + id);
      setAirline(data);
    } catch (error) {
      console.error('There was an error fetching the airline!', error);
      alert('There was an error fetching the airline!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiService.put(`/private/airlines`, airline);
      alert("Airline updated successfully!");
      navigate('/airlines');
    } catch (error) {
      setErrors(prevErrors => ({
        ...prevErrors, code: 'The name or code already exists!', name: 'The name or code already exists!'
      }));
    }
  };

  return (
    <AirlineForm
      airline={airline}
      setAirline={setAirline}
      handleSubmit={handleSubmit}
      title="Edit Airline"
      submitButtonLabel="Update Airline"
      errors={errors}
      setErrors={setErrors}
    />
  );
};

export default EditAirlineForm;