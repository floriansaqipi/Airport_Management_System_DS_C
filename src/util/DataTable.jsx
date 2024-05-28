import React, { useState } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


const DataTable = ({
    rows,
    columns,
    loading,
    sx,
    id,
    rowModesModel,
    onRowEditStop,
    processRowUpdate,
    onRowModesModelChange

}) => {
    const [pageSize, setPageSize] = useState(2);

    return (
        <DataGrid getRowId={(row) => row[id]}
            rows={rows}
            columns={columns}
            loading={loading}
            sx={sx}
            checkboxSelection
            pagination
            enableNestedDataAccess
            getRowHeight={(params) => "auto"}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[2, 5, 10]}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
                toolbar: {
                    showQuickFilter: true,
                },
            }}
            rowModesModel={rowModesModel}
            onRowEditStop={onRowEditStop}
            processRowUpdate={processRowUpdate}
            onRowModesModelChange={onRowModesModelChange}
        />
        
    );
};

export default DataTable