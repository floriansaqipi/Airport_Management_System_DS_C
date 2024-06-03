import { useLoaderData, json, redirect, Form, useRouteLoaderData, useSubmit, useNavigate } from "react-router-dom";
import { checkAuthAdminLoader, getAuth } from "../../util/auth";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useTheme } from "@mui/material/styles";

import DeleteRoleModal from "./DeleteRoleModal";
import ErrorAlert from './ErrorAlert'

import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  Container,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";




function EditToolbar(props) {
  const { setRows, setRowModesModel, roles } = props;





  const handleClick = () => {
    const id = 0; // Generate a unique ID for the new role

    const newRole = {
      roleId: id, // Assign a unique ID
      roleName: "", // Initialize other fields as empty or default values
      users: [],
      abilities: [],
      isNew: true
    };
    setRows((oldRows) => [...oldRows, newRole]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "roleName" }, // Focus on editing the roleName field
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}


function MultipleSelect(props) {
  const { id, value, api, field, abilities, updateRowAbilities } = props;

  const [selectedAbilities, setSelectedAbilities] = React.useState([]);

  React.useEffect(() => {
    setSelectedAbilities(value.map((ability) => ability.abilityId));
  }, [value]);

  const handleChange = (event) => {
    const { value: selectedValues } = event.target;
    setSelectedAbilities(selectedValues);
    const updatedAbilities = abilities.filter(ability =>
      selectedValues.includes(ability.abilityId)
    );
    updateRowAbilities(id, updatedAbilities); // Invoke callback to update rows
  };

  return (
    <FormControl sx={{ width: 550 }}>
      <Select
        labelId={`abilities-label-${id}`}
        id={`abilities-${id}`}
        multiple
        value={selectedAbilities}
        onChange={handleChange}
        input={<OutlinedInput label="Abilities" />}
      >
        {abilities.map((ability) => (
          <MenuItem key={ability.abilityId} value={ability.abilityId}>
            {`${ability.abilityId}: ${ability.entity} - ${ability.verb} - ${ability.field}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default function FullFeaturedCrudGrid() {
  const { roles, abilities } = useLoaderData();
  const [rows, setRows] = React.useState(roles);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [error, setError] = React.useState(null);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const getRowId = (row) => row.roleId;

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = async (id) => {
    await deleteRoleAction(id);
    setRows(rows.filter((row) => row.roleId !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.roleId === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.roleId !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    
    const newRowId = newRow.roleId;
    const row = getRowById(newRowId)
    row.roleName = newRow.roleName
    // const updatedRow = { ...newRow, isNew: false };
    // console.log(updatedRow);
    
    // setRows(rows.map((row) => (row.roleId === newRow.roleId ? updatedRow : row)));
    if(row.roleName === ''){
      setError('Name of the role can not be empty');
      return;
    }

    const formData = {
      roleName : row.roleName,
      abilityIds : row.abilities.map(ability => ability.abilityId)
    }

    let result;

    if (row.isNew) {
      result = await addRoleAction(formData);
    }else {
      formData.roleId = row.roleId
      result = await editRoleAction(formData); 
    }

    if(result.isError){
      setError(result.response.message)
      return;
    };
    row.roleId = result.roleId;
    row.isNew = false;

    setRows((prevRows) =>
      prevRows.map((prevRow) => (prevRow.roleId === newRowId ? row : prevRow))
    );
    return row;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const updateRowAbilities = (id, selectedAbilities) => {
    setRows(rows.map(row => 
      row.roleId === id ? { ...row, abilities: selectedAbilities } : row
    ));
  };

  const getRowById = (id) => rows.find(row => row.roleId === id)

  const columns = [
    { field: "roleId", headerName: "Id", width: 150 },
    {
      field: "roleName",
      headerName: "name",
      type: "string",
      width: 150,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "numberOfUsers",
      headerName: "Number of Users",
      type: "number",
      width: 200,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        return params.row.users.length;
      },
    },
    {
      field: "abilities",
      headerName: "Abilities",
      width: 500,
      editable: true,
      renderCell: (params) => {
        return params.value
          .map(
            (ability) =>
              `${ability.abilityId}: ${ability.entity} - ${ability.verb} - ${ability.field}`
          )
          .join(", ");
      },

      renderEditCell: (params) => {
        return <MultipleSelect {...params} abilities={abilities} updateRowAbilities={updateRowAbilities}  />;
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            // <Form method="" action="" >

              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{
                  color: "primary.main",
                }}
                onClick={handleSaveClick(id)}
              />,
            
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
            
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleOpen}
            color="inherit"
          />,
          <DeleteRoleModal open={open} handleClose={handleClose} handleDeleteClick={handleDeleteClick} id={id} />
        ];
      },
    },
  ];

  return (
    <Container maxWidth="lg">
      {error && <ErrorAlert  errorMessage={error}/> }
      <Box
        sx={{
          height: 500,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
        my={4}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={getRowId}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel, roles },
          }}
        />
      </Box>
    </Container>
  );
}

export const loader = async () => {
  const resultAuth = checkAuthAdminLoader();
  if(resultAuth != null){
    return resultAuth;
  }


  const auth = getAuth();
  const responseRoles = await fetch("/api/private/roles", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + auth.token,
    },
  });

  if (responseRoles.status === 422) {
    return responseRoles;
  }

  if (!responseRoles.ok) {
    throw json(
      { message: "Could not fetch roles." },
      {
        status: 500,
      }
    );
  }

  const responseAbilities = await fetch("/api/private/abilities", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + auth.token,
    },
  });

  if (responseAbilities.status === 422) {
    return responseAbilities;
  }

  if (!responseAbilities.ok) {
    throw json(
      { message: "Could not fetch abilities." },
      {
        status: 500,
      }
    );
  }

  const roles = await responseRoles.json();
  const abilities = await responseAbilities.json();

  return { roles, abilities };
};

export async function addRoleAction(data) {
 
  const roleData = {
    roleName: data.roleName,
    abilityIds: data.abilityIds
  }

  const auth = getAuth();
  const responseRole = await fetch("/api/private/roles", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + auth.token,
    },
    body: JSON.stringify(roleData),
  });


  const response = await responseRole.json()
  
  if (responseRole.status === 400) {
    return {isError: true, response};
  }

  if (!responseRole.ok) {
    throw json({ message: 'Could not save role.' }, { status: 500 });
  }

  return response;
}

export async function editRoleAction(data) {
  const roleData = {
    roleId: data.roleId,
    roleName: data.roleName,
    abilityIds: data.abilityIds
  }

  const auth = getAuth();
  const responseRole = await fetch("/api/private/roles", {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + auth.token,
    },
    body: JSON.stringify(roleData),
  });

  const response = await responseRole.json()

  if (responseRole.status === 400) {
    return {isError: true, response};
  }

  if (!responseRole.ok) {
    throw json({ message: 'Could not edit role.' }, { status: 500 });
  }

  return response;
}

export async function deleteRoleAction(id) {

  const auth = getAuth();
  const responseRole = await fetch("/api/private/roles/" + id, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + auth.token,
    },
  });


  if (!responseRole.ok) {
    throw json({ message: 'Could not delete role.' }, { status: 500 });
  }


}

