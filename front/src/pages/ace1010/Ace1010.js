import React, { Component } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import DouzoneContainer from './../../components/douzonecontainer/DouzoneContainer';
import { get, post } from '../../components/api_url/API_URL';
import { Checkbox, Menu, MenuItem, Select } from '@mui/material';
import Ace1010Search from './Ace1010Search';

class Ace1010 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '운행기록부',
      // 출발 도착 구분
      startendfg: [],
      // 마감 유무
      sendyn: [],
      // 운행 구분
      usefg: [],

      isAce1010Open: true, // Ace1010.js 들어가면 거기만 기능모음 열기


      // 차량에 대해 운행기록부가 저장되면 다시 데이터를 불러오기 위한 state

      hour: '',
      minute: '',
      car_cd: '',
      rows: [],

    }
    this.DouzoneContainer = React.createRef();
    this.ace1010SearchRef = React.createRef();
  }
  componentDidMount() {
    this.getstartendfg();
    this.getsendyn();
    this.getusefg();
  }



  getstartendfg = async () => {
    try {
      const response = await get('/ace1010/startendfg');
      this.setState({ startendfg: response.data });

    } catch (error) {

    }
  }
  getsendyn = async () => {
    try {
      const response = await get('/ace1010/sendyn');
      this.setState({ sendyn: response.data });
    } catch (error) {

    }
  }
  getusefg = async () => {
    try {
      const response = await get('/ace1010/usefg');
      this.setState({ usefg: response.data });
    } catch (error) {

    }
  }

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


  testRowClick = (params, event) => {
    console.log("행 클릭 정보 확인용")
    console.log(params)
    console.log(event)

  }
  // 차량 조회 후 rows에 abizcar_person 데이터 입력
  searchcarforabizperson = (carforabizperson) => {
    // emp_cd 로그인 사원코드 
    const user = JSON.parse(sessionStorage.getItem('user'));
    const empcd = user.emp_cd;

    console.log(empcd)
    console.log('=======================================!')
    console.log(carforabizperson)
    console.log('=======================================!')
    const carcd = carforabizperson[0].car_cd;
    const cocd = carforabizperson[0].co_cd;
    this.setState({ car_cd: carcd })
    console.log(carforabizperson[0].car_cd)
    const dataWithIds = carforabizperson.map((item, index) => {
      return {
        ...item,
        use_dt: new Date(item.use_dt),
        emp_cd: empcd,
        origin: 'Y',
        id: index + 1 // 혹은 다른 고유한 값으로 설정 가능하다고 함
      };
    });
    const maxId = Math.max(...dataWithIds.map(item => item.id));

    // 빈 행을 생성
    const emptyRow = {
      id: maxId + 1,
      car_cd: carcd,
      co_cd: cocd,
      emp_cd: empcd,
      origin: 'N',
    };
    this.setState({ rows: [...dataWithIds, emptyRow] }, () => {
      console.log(this.state.rows); // setState callback 내에서 state를 출력
    });
  }

  // 엔터 시 데이터 저장 (다만 두번 엔터가 필요)
  testCellKeyDown = (params, event) => {
    console.log('testCellKeyDown실행')
    // const currentRow = this.state.rows.find(row => row.id === params.row.id);

    if (event.key === 'Enter') {
      const fieldsToCheck = ['use_dt', 'use_fg', 'start_time', 'start_fg', 'start_addr', 'end_fg', 'end_addr', 'mileage_km', 'before_km', 'after_km', 'send_yn'];

      // 모든 필드가 값이 있는지 확인합니다.
      const allFieldsHaveValue = fieldsToCheck.every(field => {
        const value = params.row[field];
        return value !== undefined && value !== null && value !== "";
      });
      if (!allFieldsHaveValue) {
        console.log('없다')
      } else {
        try {
          const response = post("/ace1010/test", params.row)
          this.DouzoneContainer.current.handleSnackbarOpen('서버로 요청 보냄.', 'success');
          console.log(response.data)
          if (response.data === 'insert success') {
            this.DouzoneContainer.current.handleSnackbarOpen('운행기록부가 저장되었습니다.', 'success');
          }
          this.ace1010SearchRef.current.searchcarforabizperson(this.state.car_cd);
        } catch (error) {
          console.error(error);
          this.DouzoneContainer.current.handleSnackbarOpen('서버로 요청 보내기 실패.', 'error');
        }
      }
    }
  };
  render() {
    const columns = [
      { field: 'id', headerName: 'No', width: 30, editable: true, headerAlign: 'center', align: 'center' },
      {
        field: 'check',
        width: 20,
        headerName: '체크',
        type: 'boolean',
        editable: true,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
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

          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Checkbox
              checked={params.row.check}
              onChange={() => this.handleToggleCheckbox(params.id)}
            />
          </div>

        )
      },
      {
        field: 'use_dt',
        headerName: '운행일자',
        type: 'date',
        width: 100,
        editable: true,
        align: 'center',
        headerAlign: 'center',


      },
      {
        field: 'use_fg',
        headerName: '운행구분',
        type: 'singleSelect',
        valueOptions: this.state.usefg.map(item => item.d_nm),
        width: 120,
        editable: true,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'start_time',
        headerName: '출발시간',
        width: 120,
        editable: true,
        align: 'center',
        headerAlign: 'center',
        type: 'string'
        // renderCell: (params) => (
        //   <TimeModal
        //     initialTime={params.value}
        //     onTimeChange={(newTime) => this.handleTimeChange(params.id, newTime)}
        //   />
        // ),



      },
      {
        field: 'end_time',
        headerName: '도착시간',
        width: 120,
        editable: true,
        align: 'center',
        headerAlign: 'center',
        type: 'string'
        // renderCell: (params) => (
        //   <TimeModal
        //     initialTime={params.value}
        //     onTimeChange={(newTime) => this.handleTimeChange(params.id, newTime)}
        //   />
        // ),
      },
      {
        field: 'start_fg',
        headerName: '출발구분',
        width: 120,
        type: 'singleSelect',
        editable: true,
        valueOptions: this.state.startendfg.map(item => item.p_nm), // p_nm 값들을 이용하여 valueOptions 구성
        align: 'center',
        headerAlign: 'center',
      },

      {
        field: 'start_addr',
        headerName: '출발지',
        type: 'string',
        width: 120,
        editable: true,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'end_fg',
        headerName: '도착구분',
        type: 'singleSelect',
        valueOptions: this.state.startendfg.map(item => item.p_nm),
        width: 120,
        editable: true,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'end_addr',
        headerName: '도착지',
        type: 'string',
        width: 120,
        editable: true,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'mileage_km',
        headerName: '주행(Km)',
        type: 'string',
        width: 120,
        editable: true,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'before_km',
        headerName: '주행전(Km)',
        type: 'string',
        width: 120,
        editable: true,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'after_km',
        headerName: '주행후(Km)',
        type: 'string',
        width: 120,
        editable: true,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'send_yn',
        headerName: '마감여부',
        type: 'singleSelect',
        valueOptions: this.state.sendyn.map(item => item.s_id),
        width: 120,
        editable: true,
        align: 'center',
        headerAlign: 'center',
        // valueGetter: (params) => {
        //   return params.row.send_yn === '1' ? 'Yes' : params.row.send_yn === '2' ? 'No' : '';
        // },
      },

    ];
    return (
      <div style={{ minHeight: 600, width: '100%' }}>
        <DouzoneContainer
          ref={this.DouzoneContainer}
          title={this.state.title}
          isAce1010Open={this.state.isAce1010Open}
        >
          <Ace1010Search
            ref={this.ace1010SearchRef}
            searchcarforabizperson={this.searchcarforabizperson}>

          </Ace1010Search>
          <DataGrid
            disableColumnFilter
            disableColumnMenu
            hideFooterPagination hideFooter
            onCellKeyDown={this.testCellKeyDown}
            onRowClick={this.testRowClick}
            sx={{ minHeight: 500, borderRadius: 0, margin: '5px' }} rows={this.state.rows} columns={columns} />
        </DouzoneContainer>
      </div>
    );
  }
}

export default Ace1010;