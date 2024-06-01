import React from 'react';
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

export default function VerbList({ selectedVerb, onVerbChange, style }) {
  const loadVerb = [
    "POST",
    "PUT",
    "GET",
    "DELETE",
    "ALL"
  ];

  return (
    <FormControl fullWidth sx={{ mt: 2 }} style={style}>
      <InputLabel id="verb-label">Verb</InputLabel>
      <Select
        labelId="verb-label"
        id="verb-select"
        value={selectedVerb}
        onChange={(e) => onVerbChange(e.target.value)}
        input={<OutlinedInput label="Verb" />}
        MenuProps={MenuProps}
      >
        {loadVerb.map((verb) => (
          <MenuItem key={verb} value={verb}>
            {verb}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
