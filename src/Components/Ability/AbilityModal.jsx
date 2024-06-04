import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Button, TextField, Box, Typography, FormHelperText } from '@mui/material';

import { apiService } from '../../util/apiService';
import EntityList from './EntityList';
import VerbList from './VerbList';
Modal.setAppElement('#root');

const isEmpty = (value) => value.trim() === '';
const isMoreThanFiftyChars = (value) => value.trim().length > 100;

const validateField = (field) => {
  const valid = !isEmpty(field) && !isMoreThanFiftyChars(field);
  const message = isEmpty(field) ? 'Field is required' : 
  isMoreThanFiftyChars(field) ? 'Field should not exceed 50 characters' : '';
  return { valid, message };
};
const validate=(field)=>{
  const valid =  !isMoreThanFiftyChars(field);
  const message =  isMoreThanFiftyChars(field) ? 'Field should not exceed 50 characters' : '';
  return { valid, message };
}

const AbilityModal = ({ isOpen, onClose, onSave, abilityData }) => {
  const [ability, setAbility] = useState({
    abilityId: abilityData?.abilityId || '',
    entity: abilityData?.entity || '',
    verb: abilityData?.verb || '',
    field: abilityData?.field || '',
  });

  const [formInputsValidity, setFormInputsValidity] = useState({
    entity: { valid: true, message: '' },
    verb: { valid: true, message: '' },
    field: { valid: true, message: '' }
  });

  useEffect(() => {
    setAbility({
      abilityId: abilityData?.abilityId || '',
      entity: abilityData?.entity || '',
      verb: abilityData?.verb || '',
      field: abilityData?.field || ''
    });
  }, [abilityData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAbility(prevAbility => ({
      ...prevAbility,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const entityValidation = validateField(ability.entity);
    const verbValidation = validateField(ability.verb);
    const fieldValidation = validate(ability.field);

    setFormInputsValidity({
      entity: entityValidation,
      verb: verbValidation,
      field: fieldValidation
    });

    const isFormValid = entityValidation.valid && verbValidation.valid && fieldValidation.valid;

    if (isFormValid) {
      try {
        const abilityToSave = {
            ...ability,
            verb: ability.verb === 'ALL' ? null : ability.verb,
            field: ability.field ===''?null:ability.field
          };
          console.log(abilityToSave);
        if (ability.abilityId) {
          await apiService.put('/private/abilities', abilityToSave);
        } else {
          console.log(abilityToSave)
          await apiService.post('/private/abilities', abilityToSave);
        }
        onSave(ability);
      } catch (error) {
        console.error('There was an error saving the ability!', error);
        alert('There was an error saving the ability! Check the console for more details.');
      }
    }
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '500px',
      maxHeight: '90vh',
      overflowY: 'auto'
    },
  };

  const handleEntityChange = (entity) => {
    setAbility((prevAbility) => ({
      ...prevAbility,
      entity
    }));
  };

  const handleVerbChange = (verb) => {
    setAbility((prevAbility) => ({
      ...prevAbility,
      verb
    }));
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Ability Modal" style={customStyles}>
      <Box p={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          {abilityData ? 'Edit' : 'Add'} Ability
        </Typography>
        <form onSubmit={handleSubmit}>
          <EntityList
            selectedEntity={ability.entity}
            onEntityChange={handleEntityChange}
            style={{ marginTop: '20px' }}
          />
          {formInputsValidity.entity.message && <FormHelperText error>{formInputsValidity.entity.message}</FormHelperText>}
          <VerbList
            selectedVerb={ability.verb}
            onVerbChange={handleVerbChange}
            style={{ marginTop: '20px' }}
          />
          {formInputsValidity.verb.message && <FormHelperText error>{formInputsValidity.verb.message}</FormHelperText>}
          <TextField
            name="field"
            label="Field"
            value={ability.field}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {formInputsValidity.field.message && <FormHelperText error>{formInputsValidity.field.message}</FormHelperText>}
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              {abilityData ? 'Update' : 'Add'} Ability
            </Button>
            <Button onClick={onClose} variant="contained" color="secondary" style={{ marginLeft: '10px' }}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AbilityModal;
