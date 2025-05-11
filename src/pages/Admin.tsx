import { useState } from 'react';
import { Tab, Tabs, Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
// import { ResponsiveBar } from '@nivo/bar'; 

const UsersTable = () => {
  const { data } = useQuery({
    queryKey: ['admin-users'],
    queryFn: () => api.get('/users/').then(res => res.data)
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'is_staff', headerName: 'Admin', width: 100, type: 'boolean' },
    { field: 'date_joined', headerName: 'Joined', width: 200 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data || []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

const ContentTable = () => {
  const { data } = useQuery({
    queryKey: ['admin-content'],
    queryFn: () => api.get('/content/').then(res => res.data)
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'content_type', headerName: 'Type', width: 130 },
    { field: 'created_at', headerName: 'Created At', width: 200 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data || []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

// Optional: AnalyticsChart component 

export default function AdminDashboard() {
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
        <Tab label="Users" />
        <Tab label="Content" />
        {/* <Tab label="Analytics" /> */}
      </Tabs>
      <Box sx={{ mt: 3 }}>
        {tabValue === 0 && <UsersTable />}
        {tabValue === 1 && <ContentTable />}
        {/* {tabValue === 2 && <AnalyticsChart />} */}
      </Box>
    </Box>
  );
}
