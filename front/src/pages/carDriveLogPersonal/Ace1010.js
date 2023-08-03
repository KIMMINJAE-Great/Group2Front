import { Component } from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { DataGrid } from '@mui/x-data-grid';
import './ace1010.css'
class Ace1010 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [
        { id: 1, check: '', date: '2019/12/02(월)', commute: '출근', startTime: '08:00', endTime: '08:40', startType: '자택', startLocation: '퇴계로120', endType: '회사', endLocation: '삼성', drive: 25, preDrive: 0, postDrive: 25, closed: 'Yes' },
        { id: 2, check: '', date: '2019/12/02(월)', commute: '출근', startTime: '08:00', endTime: '08:40', startType: '자택', startLocation: '퇴계로120', endType: '회사', endLocation: '삼성', drive: 25, preDrive: 0, postDrive: 25, closed: 'Yes' },

        // ... 더 많은 행 데이터
      ],
      columns: [
        { field: 'id', headerName: 'No', width: 90 },
        { field: 'check', headerName: '체크박스', width: 130, editable: true },
        { field: 'date', headerName: '운행일자', width: 130, editable: true },
        { field: 'commute', headerName: '운행구분', width: 130, editable: true },
        // ... 더 많은 컬럼 정의
        { field: 'closed', headerName: '마감여부', width: 130, editable: true },
      ],
      selectedRow: null,
    };

    this.handleEditCellChangeCommit = this.handleEditCellChangeCommit.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
  }

  handleEditCellChangeCommit(e) {
    console.log(e); // 이벤트 로깅
    // 이벤트 데이터를 사용하여 필요한 서버 요청 구성
  }

  handleRowClick(e) {
    this.setState({ selectedRow: e.row });
  }

  render() {
    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={this.state.rows}
          columns={this.state.columns}
          onEditCellChangeCommit={this.handleEditCellChangeCommit}
          onRowClick={this.handleRowClick}
          getRowClassName={(params) =>
            this.state.selectedRow && params.row.id === this.state.selectedRow.id
              ? 'selected-row'
              : ''
          }
        />
      </div>
    );
  }
}

export default Ace1010;
