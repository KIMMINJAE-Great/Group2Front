import { Component } from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { DataGrid } from '@mui/x-data-grid';
import './ace1010.css'
import { Checkbox, MenuItem, Popover, Select } from "@mui/material";
import DouzoneContainer from './../../components/douzonecontainer/DouzoneContainer';
import TimePicker from "./TimePicker";
import { maxWidth } from "@mui/system";
import { get } from "../../components/api_url/API_URL";
class Ace1010 extends Component {
  constructor(props) {
    super(props);

    const actualRows = [
      // { id: 1, check: '', use_dt: '2023/08/01', use_fg: '출근', start_time: '08:00', end_time: '17:00', start_fg: '자택', start_addt: '서울시', end_fg: '회사', end_addr: '판교', mileage_km: 30, before_km: 0, after_km: 30, send_yn: 'Yes' },
      // { id: 2, check: '', use_dt: '2023/08/02', use_fg: '퇴근', start_time: '17:30', end_time: '18:00', start_fg: '회사', start_addt: '판교', end_fg: '자택', end_addr: '서울시', mileage_km: 30, before_km: 0, after_km: 30, send_yn: 'No' },
      // { id: 3, check: '', use_dt: '2023/08/03', use_fg: '출근', start_time: '08:00', end_time: '17:00', start_fg: '자택', start_addt: '서울시', end_fg: '회사', end_addr: '판교', mileage_km: 30, before_km: 0, after_km: 30, send_yn: 'Yes' },
      // { id: 4, check: '', use_dt: '2023/08/04', use_fg: '퇴근', start_time: '17:30', end_time: '18:00', start_fg: '회사', start_addt: '판교', end_fg: '자택', end_addr: '서울시', mileage_km: 30, before_km: 0, after_km: 30, send_yn: 'No' },
      // { id: 5, check: '', use_dt: '2023/08/01', use_fg: '출근', start_time: '08:00', end_time: '17:00', start_fg: '자택', start_addt: '서울시', end_fg: '회사', end_addr: '판교', mileage_km: 30, before_km: 0, after_km: 30, send_yn: 'Yes' },
      // { id: 6, check: '', use_dt: '2023/08/02', use_fg: '퇴근', start_time: '17:30', end_time: '18:00', start_fg: '회사', start_addt: '판교', end_fg: '자택', end_addr: '서울시', mileage_km: 30, before_km: 0, after_km: 30, send_yn: 'No' },
      // { id: 7, check: '', use_dt: '2023/08/03', use_fg: '출근', start_time: '08:00', end_time: '17:00', start_fg: '자택', start_addt: '서울시', end_fg: '회사', end_addr: '판교', mileage_km: 30, before_km: 0, after_km: 30, send_yn: 'Yes' },
      // { id: 8, check: '', use_dt: '2023/08/01', use_fg: '출근', start_time: '08:00', end_time: '17:00', start_fg: '자택', start_addt: '서울시', end_fg: '회사', end_addr: '판교', mileage_km: 30, before_km: 0, after_km: 30, send_yn: 'Yes' },
      // { id: 9, check: '', use_dt: '2023/08/02', use_fg: '퇴근', start_time: '17:30', end_time: '18:00', start_fg: '회사', start_addt: '판교', end_fg: '자택', end_addr: '서울시', mileage_km: 30, before_km: 0, after_km: 30, send_yn: 'No' },
      // { id: 10, check: '', use_dt: '2023/08/03', use_fg: '출근', start_time: '08:00', end_time: '17:00', start_fg: '자택', start_addt: '서울시', end_fg: '회사', end_addr: '판교', mileage_km: 30, before_km: 0, after_km: 30, send_yn: 'Yes' },
      // { id: 11, check: '', use_dt: '2023/08/04', use_fg: '퇴근', start_time: '17:30', end_time: '18:00', start_fg: '회사', start_addt: '판교', end_fg: '자택', end_addr: '서울시', mileage_km: 30, before_km: 0, after_km: 30, send_yn: 'No' },
      // { id: 12, check: '', use_dt: '2023/08/01', use_fg: '출근', start_time: '08:00', end_time: '17:00', start_fg: '자택', start_addt: '서울시', end_fg: '회사', end_addr: '판교', mileage_km: 30, before_km: 0, after_km: 30, send_yn: 'Yes' },
      // { id: 13, check: '', use_dt: '2023/08/02', use_fg: '퇴근', start_time: '17:30', end_time: '18:00', start_fg: '회사', start_addt: '판교', end_fg: '자택', end_addr: '서울시', mileage_km: 30, before_km: 0, after_km: 30, send_yn: 'No' },
      // { id: 14, check: '', use_dt: '2023/08/03', use_fg: '출근', start_time: '08:00', end_time: '17:00', start_fg: '자택', start_addt: '서울시', end_fg: '회사', end_addr: '판교', mileage_km: 30, before_km: 0, after_km: 30, send_yn: 'Yes' },
      // { id: 15, check: '', use_dt: '2023/08/01', use_fg: '출근', start_time: '08:00', end_time: '17:00', start_fg: '자택', start_addt: '서울시', end_fg: '회사', end_addr: '판교', mileage_km: 30, before_km: 0, after_km: 30, send_yn: 'Yes' },
      // { id: 16, check: '', use_dt: '2023/08/02', use_fg: '퇴근', start_time: '17:30', end_time: '18:00', start_fg: '회사', start_addt: '판교', end_fg: '자택', end_addr: '서울시', mileage_km: 30, before_km: 0, after_km: 30, send_yn: 'No' },
      // { id: 17, check: '', use_dt: '2023/08/03', use_fg: '출근', start_time: '08:00', end_time: '17:00', start_fg: '자택', start_addt: '서울시', end_fg: '회사', end_addr: '판교', mileage_km: 30, before_km: 0, after_km: 30, send_yn: 'Yes' },
      // { id: 18, check: '', use_dt: '2023/08/04', use_fg: '퇴근', start_time: '17:30', end_time: '18:00', start_fg: '회사', start_addt: '판교', end_fg: '자택', end_addr: '서울시', mileage_km: 30, before_km: 0, after_km: 30, send_yn: 'No' },
      // { id: 19, check: '', use_dt: '2023/08/01', use_fg: '출근', start_time: '08:00', end_time: '17:00', start_fg: '자택', start_addt: '서울시', end_fg: '회사', end_addr: '판교', mileage_km: 30, before_km: 0, after_km: 30, send_yn: 'Yes' },
      // { id: 20, check: '', use_dt: '2023/08/02', use_fg: '퇴근', start_time: '17:30', end_time: '18:00', start_fg: '회사', start_addt: '판교', end_fg: '자택', end_addr: '서울시', mileage_km: 30, before_km: 0, after_km: 30, send_yn: 'No' },
    ];



    this.state = {
      anchorEl: null,
      selectedCell: null,
      selectAllCheckbox: false,
      lastClickedRowId: null,
      rows: [],
      selectedRow: '',
      lastClickedRowOrigin: '',
      columns: [
        {
          field: 'id',
          headerName: 'No',
          renderHeader: (params) => (
            <strong>{params.colDef.headerName}</strong>
          ),
          width: 10,
          align: 'center',
          sortable: false,
          renderCell: (params) => (
            params.row.use_dt ? params.value : ''
          ),
        },
        {
          field: 'check',
          width: 10,
          align: 'center',
          flex: 1,
          renderHeader: (params) => (
            <strong>{params.colDef.headerName}</strong>
          ),
          sortable: false,

          disableClickEventBubbling: true,
          renderHeader: (params) => (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Checkbox
                indeterminate={this.state.rows.some((row) => row.check) && !this.state.selectAllCheckbox}
                checked={this.state.selectAllCheckbox}
                onChange={this.handleToggleAllCheckboxes}
              />
            </div>
          ),
          renderCell: (params) => (
            params.row.use_dt ? (
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Checkbox
                  checked={params.row.check}
                  onChange={() => this.handleToggleCheckbox(params.id)}
                />
              </div>
            ) : null
          )

        },

        {
          field: 'use_dt', renderHeader: (params) => (
            <strong>{params.colDef.headerName}</strong>
          ), headerName: '운행일자', width: 130, editable: true, align: 'center', justifyContent: 'center', sortable: false
        },
        {
          field: 'use_fg', renderHeader: (params) => (
            <strong>{params.colDef.headerName}</strong>
          ), headerName: '운행구분', width: 120, editable: true, align: 'center', sortable: false, flex: 1
        },
        {
          field: 'start_time', renderHeader: (params) => (
            <strong>{params.colDef.headerName}</strong>
          ), headerName: '출발시간', width: 120, editable: true, align: 'center', sortable: false, flex: 1
        },
        {
          field: 'end_time', renderHeader: (params) => (
            <strong>{params.colDef.headerName}</strong>
          ), headerName: '도착시간', width: 120, editable: true, align: 'center', sortable: false, flex: 1
        },
        {
          field: 'start_fg', renderHeader: (params) => (
            <strong>{params.colDef.headerName}</strong>
          ), headerName: '출발구분', width: 120, editable: true, align: 'center', sortable: false, flex: 1
        },
        {
          field: 'start_addr', renderHeader: (params) => (
            <strong>{params.colDef.headerName}</strong>
          ), headerName: '출발지', width: 120, editable: true, align: 'center', sortable: false, flex: 1
        },
        {
          field: 'end_fg', renderHeader: (params) => (
            <strong>{params.colDef.headerName}</strong>
          ), headerName: '도착구분', width: 120, editable: true, align: 'center', sortable: false, flex: 1
        },
        {
          field: 'end_addr', renderHeader: (params) => (
            <strong>{params.colDef.headerName}</strong>
          ), headerName: '도착지', width: 120, editable: true, align: 'center', sortable: false, flex: 1
        },
        {
          field: 'mileage_km', renderHeader: (params) => (
            <strong>{params.colDef.headerName}</strong>
          ), headerName: '주행(km)', width: 120, editable: true, align: 'center', sortable: false, flex: 1
        },
        {
          field: 'before_km', renderHeader: (params) => (
            <strong>{params.colDef.headerName}</strong>
          ), headerName: '주행전(km)', width: 120, editable: true, align: 'center', sortable: false, flex: 1
        },
        {
          field: 'after_km', renderHeader: (params) => (
            <strong>{params.colDef.headerName}</strong>
          ), headerName: '주행후(km)', width: 120, editable: true, align: 'center', sortable: false, flex: 1
        },
        {
          field: 'send_yn', renderHeader: (params) => (
            <strong>{params.colDef.headerName}</strong>
          ), headerName: '마감여부', width: 120, editable: true, align: 'center', sortable: false, flex: 1
        },
      ],
      title: '운행기록부 개인화'
    };

  }
  //  Test 차량 전부 가져오기
  componentDidMount() {
    this.getadllcars();

  }


  getadllcars = async () => {
    try {
      const response = await get('/ace1010/getallcars');
      console.log("운행기록부 : " + JSON.stringify(response.data))
      const actualRows = response.data.map((row, index) => ({ id: index + 1, check: false, origin: 'Y', ...row }));

      // 데이터 개수 확인 후, 10개가 안되면 나머지를 빈 행으로 채움
      const emptyRowCount = Math.max(0, 10 - actualRows.length + 1);
      const emptyRows = Array.from({ length: emptyRowCount }).map((_, index) => ({
        id: actualRows.length + index + 1,
        check: false,
        use_dt: '',
        use_fg: '',
        start_time: '',
        end_time: '',
        start_fg: '',
        start_addr: '',
        end_fg: '',
        end_addr: '',
        mileage_km: '',
        premileage_km: '',
        postmileage_km: '',
        send_yn: '',
        origin: 'N',

      }));

      this.setState({ rows: [...actualRows, ...emptyRows] });

    } catch (error) {

    }

  }


  // @@@@@@@@@@@@@@@ 체크 박스 @@@@@@@@@@@@@@@@@@@@@@
  // 모든 체크박스의 선택 상태를 전환하는 함수.
  // selectAllCheckbox 상태를 변경하고 모든 행의 체크박스 상태를 업데이트한다.
  handleToggleAllCheckboxes = () => {
    const newSelectAllCheckbox = !this.state.selectAllCheckbox;
    const newRows = this.state.rows.map((row) => ({ ...row, check: newSelectAllCheckbox }));
    this.setState({ selectAllCheckbox: newSelectAllCheckbox, rows: newRows });
  }
  // 개별 체크박스의 선택 상태를 전환하는 함수.
  // 해당 체크박스의 상태를 변경하고, 모든 체크박스가 선택되었는지 확인한 후 상태를 업데이트한다.
  handleToggleCheckbox = (id) => {
    const newRows = this.state.rows.map((row) => {
      if (row.id === id) {
        return { ...row, check: !row.check };
      }
      return row;
    });
    const newSelectAllCheckbox = newRows.every((row) => row.check);
    this.setState({ rows: newRows, selectAllCheckbox: newSelectAllCheckbox });
  }


  // @@@@@@@@@@@@@@ 시간 선택 @@@@@@@@@@@@@@@@@@@@@@@@@@
  // 사용자가 시간을 변경할 때 호출되는 함수. 선택된 셀의 정보와 새 시간을 받아 상태를 업데이트한다.
  handleTimeChange = (newTime) => {
    console.log(newTime)
    console.log(this.state.selectedCell)
    const newRows = this.state.rows.map((row) => {
      if (row.id === this.state.selectedCell.id) {
        if (this.state.selectedCell.type === 'start_time') {
          console.log('start_time : ' + newTime)
          return {
            ...row,
            start_time: newTime,
          };
        } else if (this.state.selectedCell.type === 'end_time') {
          return {
            ...row,
            end_time: newTime,
          };
        }

      }
      return row;
    });

    this.setState({ rows: newRows, anchorEl: null });
  }
  //  셀을 클릭하였을 때 컴포넌트를 사용하거나 빈셀 즉 빈행을 클릭하면 새로운 예시 데이터를 넣어 주거나 하는 함수
  handleCellClick = (params, event) => {
    // 빈행 확이
    if (this.state.lastClickedRowId != null) {
      const lastClickedRow = this.state.rows.find(row => row.id === this.state.lastClickedRowId);
      if (lastClickedRow.origin === 'N') {
        this.handleOutsideClick(lastClickedRow.id);
      }

    }
    this.setState({
      selectedRow: params.row,
      lastClickedRowId: params.row.id,
    })
    // state 업데이트 후 콜백 함수 내에서 'user'인 경우 handleOutsideClick 호출


    console.log("Cell clicked", params);
    if (params.value && (params.field === 'start_time' || params.field === 'end_time')) {
      this.setState({
        anchorEl: event.currentTarget,
        selectedCell: {
          id: params.id,
          type: params.field,
        },
      });
    } else if (params.row.use_dt === '') {

      console.log('아이디......... : ' + params.id)
      const currentRows = [...this.state.rows];
      const clickedRow = currentRows.find(row => row.id === params.id);
      if (clickedRow) {
        clickedRow.id = params.row.id; // 해당 셀의 row에 id를 표시
        clickedRow.check = false;   // checkbox를 표시
        clickedRow.use_dt = '123';
        clickedRow.use_fg = '123';
        clickedRow.start_time = '123';
        clickedRow.end_time = '123';
        clickedRow.start_fg = '123';
        clickedRow.start_addr = '123';
        clickedRow.end_fg = '123';
        clickedRow.end_addr = '123';
        clickedRow.mileage_km = '123';
        clickedRow.premileage_km = '123';
        clickedRow.postmileage_km = '123';
        clickedRow.send_yn = '123';
        clickedRow.origin = 'N'
        this.setState({ rows: currentRows });
      }
    }
  };

  //  행에서 엔터 눌렀을 때 저장 요청
  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const activeRow = this.state.rows.find(row => row.id === this.state.selectedCell.id);
      if (activeRow) {
        // DB로 데이터 전송하는 함수 호출
        // 예: sendToDB(activeRow);

        const newRows = this.state.rows.map(row => {
          if (row.id === activeRow.id) {
            return {
              ...row,
              origin: 'Y' // origin을 'db'로 업데이트
            };
          }
          return row;
        });
        this.setState({ rows: newRows });
      }
    }
  };



  // 빈행을 클릭후 다른 곳을 클릭하면 취소
  handleOutsideClick = (clickedRowId) => {

    const currentRows = [...this.state.rows];
    const targetRow = currentRows.find(row => row.id === clickedRowId);

    if (targetRow) {
      targetRow.check = false;
      targetRow.use_dt = '';
      targetRow.use_fg = '';
      targetRow.start_time = '';
      targetRow.end_time = '';
      targetRow.start_fg = '';
      targetRow.start_addr = '';
      targetRow.end_fg = '';
      targetRow.end_addr = '';
      targetRow.mileage_km = '';
      targetRow.premileage_km = '';
      targetRow.postmileage_km = '';
      targetRow.send_yn = '';
      targetRow.origin = 'N';

      this.setState({ rows: currentRows });
    }

  };

  // 셀 내부의 값이 변경되었을 때 발생하는 이벤트 핸들러.
  // 현재는 로깅만 수행하지만 필요시 서버 요청 등 추가 기능 구현이 가능하다.
  handleEditCellChangeCommit = (e) => {
    console.log(e); // 이벤트 로깅
    // 이벤트 데이터를 사용하여 필요한 서버 요청 구성
  }



  render() {
    return (
      <div >
        <DouzoneContainer title={this.state.title} >
          <DataGrid

            onCellClick={this.handleCellClick}
            style={{ height: 505, margin: 5, width: '99%' }}
            hideFooterPagination hideFooter
            rows={this.state.rows}
            columns={this.state.columns.map((column) => ({
              ...column,
              headerClassName: 'my-header-class', // 각 열의 헤더 클래스 설정
            }))}
            onEditCellChangeCommit={this.handleEditCellChangeCommit}


            disableColumnFilter
            disableColumnMenu
            getRowClassName={(params) => {
              let className = '';
              if (params.row.id % 2 === 0) {
                className += ' my-even-row-class'; // 짝수 행 클래스
              } else {
                className += ' my-odd-row-class'; // 홀수 행 클래스
              }
              if (this.state.selectedRow && params.row.id === this.state.selectedRow.id) {
                className += ' selected-row';
              }
              return className;
            }}
          />
          {/* 모든 시간 선택 이런거 PopOver로 하자 */}

          <TimePicker
            timeopen={Boolean(this.state.anchorEl)}
            anchorEl={this.state.anchorEl}
            onClose={() => this.setState({ anchorEl: null })}
            onTimeChange={this.handleTimeChange}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}>


          </TimePicker>
          <div>비고</div>
        </DouzoneContainer>
      </div>
    );
  }
}

export default Ace1010;