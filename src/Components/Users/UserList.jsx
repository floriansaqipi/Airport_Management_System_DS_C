import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import SearchBarForUsers from './SearchBarForUsers';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const StyledTableHeader = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '70%',
  overflow: 'hidden',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: theme.spacing(5),
  marginBottom: theme.spacing(2),
}));

const StyledTableContainer = styled(TableContainer)({
  maxHeight: 440,
});

const StyledTablePagination = styled(TablePagination)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const columns = [
  { id: 'userID', label: 'User ID', minWidth: 170, format: (value) => value.toLocaleString('en-US') },
  { id: 'username', label: 'Username', minWidth: 100, align: 'center' },
  { id: 'role', label: 'Role', minWidth: 170, align: 'right' },
];

function UserList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbXBsb3llZTIiLCJpYXQiOjE3MTY3NjM5NjcsImV4cCI6MTcxNjc2NzU2N30.9dYK2sPqlVABdw71YRPzqWsqCKQcBk-hjG_OkymnzCCUfjoWIAU-Y-1xODHsjYC0anOBJgiyTJpITQNSsaxb4Q";
        const response = await fetch('/api/private/users', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching data');
        }

        const responseData = await response.json();
        const modifiedData = responseData.map((user) => ({
          userID: user.userId,
          username: user.username,
          role: user.role ? user.role.roleName : 'Role Not Specified'
        }));

        setData(modifiedData);
        setFilteredData(modifiedData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = data.filter((item) =>
      item.username.toLowerCase().includes(query.toLowerCase()) ||
      item.userID.toString().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              UsersList
            </Typography>
            <SearchBarForUsers handleSearch={handleSearch} />
          </Toolbar>
        </AppBar>
      </Box>
      <StyledPaper>
        <StyledTableContainer>
          <Table stickyHeader aria-label="sticky table">
            <StyledTableHeader>
              <TableRow>
              {columns.map((column) => (
                  <StyledTableCell key={column.id} align={column.align}>
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </StyledTableHeader>
            <TableBody>
              {(searchQuery ? filteredData : data)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.userID}>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(row[column.id]) : row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
        <StyledTablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={(searchQuery ? filteredData : data).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </StyledPaper>
    </>
  );
}

export default UserList;
