import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'content_type', headerName: 'Type', width: 130 },
  { field: 'created_at', headerName: 'Created At', width: 200 },
];

export default function AdminDashboard() {
  const { data } = useQuery({
    queryKey: ['admin-content'],
    queryFn: () => api.get('/content/').then(res => res.data),
  });

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data || []}
        columns={columns}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
