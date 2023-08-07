import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

function DataGridExample() {
  const columns = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
    { field: 'col3', headerName: 'Column 3', width: 150 },
    { field: 'col4', headerName: 'Column 4', width: 150 },
  ];

  const rows = [
    { id: 1, col1: 'Data 1', col2: 'Data 2', col3: 'Data 3', col4: 'Data 4' },
    { id: 2, col1: 'Data 5', col2: 'Data 6', col3: 'Data 7', col4: 'Data 8' },
    // 나머지 행을 여기에 추가하세요
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}

export default DataGridExample;