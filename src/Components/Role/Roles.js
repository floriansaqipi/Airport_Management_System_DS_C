import { useLoaderData, json } from "react-router-dom";
import { checkAuthAdminLoader, getAuth } from "../../util/auth";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { Container } from "@mui/material";

const roles = ["Market", "Finance", "Development"];
const randomRole = () => {
  return "Market";
};

const initialRows = [
  {
    id: 1,
    name: "role",
    age: 25,
    joinDate: new Date(),
    role: "role",
  },
  {
    id: 1,
    name: "role",
    age: 25,
    joinDate: new Date(),
    role: "role",
  },
  {
    id: 1,
    name: "role",
    age: 25,
    joinDate: new Date(),
    role: "role",
  },
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = 24;
    setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
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

export default function FullFeaturedCrudGrid() {
  const data = useLoaderData();
  console.log(data);
  const [rows, setRows] = React.useState(data);
  const [rowModesModel, setRowModesModel] = React.useState({});

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

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const arrayViewModelMapper = (dataArray) => {
    return dataArray.map((element) => {
      return {
        roleId: element.roleId,
        roleName: element.roleName,
        numberOfUsers: element.users.length,
        abilities: element.abilities
          .map(
            (ability) =>
              `${ability.abilityId}: ${ability.entity} - ${ability.verb} - ${ability.field}`
          )
          .join(", "),
      };
    });
  };

  const columns = [
    { field: "roleId", headerName: "Id", width: 150, editable: true },
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
      width: 150,
      editable: true,
    },
    {
      field: "abilities",
      headerName: "Abilities",
      width: 500,
      editable: true,
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
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Container maxWidth="lg">
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
          rows={arrayViewModelMapper(rows)}
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
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Box>
    </Container>
  );
}

export const loader = async () => {
  checkAuthAdminLoader();
  const auth = getAuth();
  const response = await fetch("/api/private/roles", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + auth.token,
    },
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json(
      { message: "Could not fetch roles." },
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
};
