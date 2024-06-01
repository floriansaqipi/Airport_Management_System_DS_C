import React, { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function EntityList({ selectedEntity, onEntityChange, style }) {
  // Directly use the created array
  const loadEntity = [
    "employees",
    "flights"
  ];

  return (
    <FormControl fullWidth sx={{ mt: 2 }} style={style}>
      <InputLabel id="entity-label">Entity</InputLabel>
      <Select
        labelId="entity-label"
        id="entity-select"
        value={selectedEntity}
        onChange={(e) => onEntityChange(e.target.value)}
        input={<OutlinedInput label="Entity" />}
        MenuProps={MenuProps}
      >
        {loadEntity.map((entity) => (
          <MenuItem key={entity} value={entity}>
            {entity}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
