import React, { Component } from 'react';
import { DataGrid, GridToolbar, GridCellParams } from '@mui/x-data-grid';
import DouzoneContainer from './../../components/douzonecontainer/DouzoneContainer';
import { get, post } from '../../components/api_url/API_URL';
import { Checkbox, Menu, MenuItem, Select } from '@mui/material';
import Ace1010Search from './Ace1010Search';
import './ace1010.css'
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
      // 마지막 셀에서 엔터가 이루어 졌을 때 누락되는 정보를 담기 위함
      editedCell: '',

      // 차량에 대해 운행기록부가 저장되면 다시 데이터를 불러오기 위한 state
      selectedRowforbgc: '',
      hour: '',
      minute: '',
      car_cd: '',
      rows: [],
      selectAllCheckbox: false,
    }
    this.DouzoneContainer = React.createRef();
    this.ace1010SearchRef = React.createRef();
    this.dataGridRef = React.createRef()
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
    this.setState({ selectAllCheckbox: newSelectAllCheckbox, rows: newRows }, () => {
      console.log('체크박스 확인')
      console.log(this.state.rows);
    });
  }
  // 개별 체크박스의 선택 상태를 전환하는 함수.
  // 해당 체크박스의 상태를 변경하고, 모든 체크박스가 선택되었는지 확인한 후 상태를 업데이트한다.
  handleToggleCheckbox = (id) => {
    this.setState((prevState) => {
      const newRows = prevState.rows.map((row) => {
        if (row.id === id) {
          return { ...row, check: !row.check };
        }
        return row;
      });
      const allChecked = newRows.every((row) => row.check);
      const someChecked = newRows.some((row) => row.check);
      return {
        rows: newRows,
        selectAllCheckbox: allChecked ? true : (someChecked ? undefined : false)
      };
    });
  }


  forCssRowClick = (params, event) => {
    // console.log("행 클릭 정보 확인용")
    // console.log(params)
    // console.log(event)
    // 행 클릭시 필수 셀 빨간색 입히는 setState
    this.setState({ selectedRowforbgc: params.id })

  }
  // 차량 조회 후 rows에 abizcar_person 데이터 입력
  searchcarforabizperson = (carforabizperson) => {
    // emp_cd 로그인 사원코드 
    const user = JSON.parse(sessionStorage.getItem('user'));
    const empcd = user.emp_cd;

    // console.log(empcd)
    // console.log('=======================================!')
    // console.log(carforabizperson)
    // console.log('=======================================!')
    const carcd = carforabizperson[0].car_cd;
    const cocd = carforabizperson[0].co_cd;
    this.setState({ car_cd: carcd })
    console.log(carforabizperson[0].car_cd)
    const dataWithIds = carforabizperson.map((item, index) => {
      return {
        ...item,
        use_dt: new Date(item.use_dt),
        emp_cd: empcd,
        id: index + 1,// 혹은 다른 고유한 값으로 설정 가능하다고 함
        origin: 'Y'
      };
    });
    const maxId = Math.max(...dataWithIds.map(item => item.id));

    // 빈 행을 생성
    const emptyRow = {
      id: maxId + 1,
      car_cd: carcd,
      co_cd: cocd,
      seq_nb: 0,
      emp_cd: empcd,
      send_yn: '2',
      origin: 'N'
    };
    this.setState({ rows: [...dataWithIds, emptyRow] }, () => {
      console.log(this.state.rows); // setState callback 내에서 state를 출력
    });
  }

  // 엔터 시 데이터 저장 (다만 두번 엔터가 필요)
  saveCellKeyDown = (updatedRow, test, cellFieldName) => {
    console.log('saveCellKeyDown 실행.........')
    console.log(updatedRow.id)
    console.log('=============================')

    const currentRow = this.state.rows.find(row => row.id === updatedRow.id);
    console.log(currentRow)
    if (test === 'Enter') {
      if (cellFieldName === 'after_km') {
        if (currentRow.origin === 'N') {

          console.log('엔터가 눌러졌을 때')
          console.log(currentRow)
          // if (params.field === 'send_yn') {

          const fieldsToCheck = ['use_dt', 'start_fg', 'end_fg'];

          // 모든 필드가 값이 있는지 확인합니다.
          const allFieldsHaveValue = fieldsToCheck.every(field => {
            const value = currentRow[field];
            return value !== undefined && value !== null && value !== "";
          });

          if (!allFieldsHaveValue) {
            this.DouzoneContainer.current.handleSnackbarOpen('운행일자, 출발구분, 도착구분은 필수입력란 입니다.', 'error');
          } else {
            try {
              const response = post("/ace1010/test", updatedRow)
              this.DouzoneContainer.current.handleSnackbarOpen('서버로 요청 보냄.', 'success');
              console.log(response.data)
              if (response.data === 'insert success') {
                this.DouzoneContainer.current.handleSnackbarOpen('운행기록부가 저장되었습니다.', 'success');
              }
              // 새로운 운행기록부 저장시 빈행 추가
              const lastRow = this.state.rows[this.state.rows.length - 1];
              const newId = lastRow.id + 1;
              const user = JSON.parse(sessionStorage.getItem('user'));
              const empcd = user.emp_cd;
              const carcd = updatedRow.car_cd;
              const cocd = updatedRow.co_cd;

              const emptyRow = {
                id: newId,
                car_cd: carcd,
                co_cd: cocd,
                seq_nb: 0,
                emp_cd: empcd,
                send_yn: '2',
                // 기타 필요한 초기화 값들...
              };

              this.setState(prevState => ({
                rows: [...prevState.rows, emptyRow]
              }));


            } catch (error) {
              console.error(error);
              this.DouzoneContainer.current.handleSnackbarOpen('서버로 요청 보내기 실패.', 'error');
            }
          }
        } else if (currentRow.origin === 'Y') {
          console.log('수정')
        }
      }
    }
  }

  test = (params) => {
    this.setState({ editedCell: params.field })
  }


  processRowUpdatefunc = (updatedRow, originalRow) => {
    console.log('프로세스 실행')
    console.log(updatedRow.id)

    if (updatedRow === originalRow) {
      console.log('같은데여')
    }
    // 엔터가 이루어질때 field의 이름을 가져온다 becuase oncellkeydown이 processRowUpdate보다 먼저 일어나기 떄문
    const cellFieldName = this.state.editedCell;

    const rowIndex = this.state.rows.findIndex((row) => row.id === updatedRow.id);

    // Replace the old row with the updated row
    const updatedRows = [...this.state.rows];
    updatedRows[rowIndex] = updatedRow;

    // Update the state with the new rows
    this.setState({
      rows: updatedRows
    }, () => {  // setState의 콜백으로 saveCellKeyDown 함수 호출
      this.saveCellKeyDown(updatedRow, 'Enter', cellFieldName);
    });

    // Return the updated row to update the internal state of the DataGrid
    return updatedRow;
  }



  render() {
    const user = JSON.parse(sessionStorage.getItem('user'));

    const authority = user.authorities[0].authority



    const columns = [
      {
        field: 'id', headerName: 'No', width: 30, editable: true, headerAlign: 'center', align: 'center', sortable: false, renderHeader: (params) => (
          <strong>{params.colDef.headerName}</strong>
        ),
      },
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
        // renderCell: (params) => (

        //   <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        //     <Checkbox
        //       checked={params.row.check}
        //       onChange={() => this.handleToggleCheckbox(params.id)}
        //     />
        //   </div>

        // )
      },
      {
        field: 'use_dt',
        headerName: '운행일자',
        type: 'date',
        width: 100,
        editable: true,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        cellClassName: (params) => {
          if (this.state.selectedRowforbgc === params.id) {
            return 'required-field-style';
          }
          return '';
        },

        renderHeader: (params) => (
          <strong>{params.colDef.headerName}</strong>
        ),

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
        sortable: false, renderHeader: (params) => (
          <strong>{params.colDef.headerName}</strong>
        ),

      },
      {
        field: 'start_time',
        headerName: '출발시간',
        width: 120,
        editable: true,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        type: 'string', renderHeader: (params) => (
          <strong>{params.colDef.headerName}</strong>
        ),
        renderCell: (params) => {
          const time = params.value;

          // 값이 "12:00" 형식인지 확인
          if (/^\d{2}:\d{2}$/.test(time)) {
            return time;
          }

          // 값이 "1200" 형식인지 확인하고 포맷팅
          if (time && time.length === 4 && !isNaN(time)) {
            const hours = time.substring(0, 2);
            const minutes = time.substring(2, 4);
            return `${hours}:${minutes}`;
          }

          // 값이 다른 형식이거나 누락된 경우 원래 값을 반환
          return time;
        }
      },
      {
        field: 'end_time',
        headerName: '도착시간',
        width: 120,
        editable: true,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        type: 'string', renderHeader: (params) => (
          <strong>{params.colDef.headerName}</strong>
        ),
        renderCell: (params) => {
          const time = params.value;

          // 값이 "12:00" 형식인지 확인
          if (/^\d{2}:\d{2}$/.test(time)) {
            return time;
          }

          // 값이 "1200" 형식인지 확인하고 포맷팅
          if (time && time.length === 4 && !isNaN(time)) {
            const hours = time.substring(0, 2);
            const minutes = time.substring(2, 4);
            return `${hours}:${minutes}`;
          }

          // 값이 다른 형식이거나 누락된 경우 원래 값을 반환
          return time;
        }

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
        sortable: false,
        cellClassName: (params) => {
          if (this.state.selectedRowforbgc === params.id) {
            return 'required-field-style';
          }
          return '';
        },
        renderHeader: (params) => (
          <strong>{params.colDef.headerName}</strong>
        ),

      },

      {
        field: 'start_addr',
        headerName: '출발지',
        type: 'string',
        width: 120,
        editable: true,
        align: 'center',
        headerAlign: 'center',
        sortable: false, renderHeader: (params) => (
          <strong>{params.colDef.headerName}</strong>
        ),


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
        sortable: false, renderHeader: (params) => (
          <strong>{params.colDef.headerName}</strong>
        ),

        cellClassName: (params) => {
          if (this.state.selectedRowforbgc === params.id) {
            return 'required-field-style';
          }
          return '';
        },
      },
      {
        field: 'end_addr',
        headerName: '도착지',
        type: 'string',
        width: 120,
        editable: true,
        align: 'center',
        headerAlign: 'center',
        sortable: false, renderHeader: (params) => (
          <strong>{params.colDef.headerName}</strong>
        ),

      },
      {
        field: 'mileage_km',
        headerName: '주행(Km)',
        type: 'string',
        width: 120,
        editable: true,
        align: 'center',
        headerAlign: 'center',
        sortable: false, renderHeader: (params) => (
          <strong>{params.colDef.headerName}</strong>
        ),

      },
      {
        field: 'before_km',
        headerName: '주행전(Km)',
        type: 'string',
        width: 120,
        editable: true,
        align: 'center',
        headerAlign: 'center',
        sortable: false, renderHeader: (params) => (
          <strong>{params.colDef.headerName}</strong>
        ),

      },
      {
        field: 'after_km',
        headerName: '주행후(Km)',
        type: 'string',
        width: 120,
        editable: true,
        align: 'center',
        headerAlign: 'center',
        sortable: false, renderHeader: (params) => (
          <strong>{params.colDef.headerName}</strong>
        ),

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
        sortable: false, renderHeader: (params) => (
          <strong>{params.colDef.headerName}</strong>
        ),

        valueGetter: (params) => {
          return params.row.send_yn === '1' ? '마감' : '미마감';
        },
      },
      {
        field: 'ㅤ',
        width: 0,
        sortable: false,
      }

    ];
    return (

      <DouzoneContainer
        ref={this.DouzoneContainer}
        title={this.state.title}
      >
        <Ace1010Search
          ref={this.ace1010SearchRef}
          searchcarforabizperson={this.searchcarforabizperson}>

        </Ace1010Search>
        <DataGrid
          ref={this.dataGridRef}
          disableColumnFilter
          disableColumnMenu
          hideFooterPagination hideFooter
          //         checkboxSelection disableRowSelectionOnClick
          //          onSelectionModelChange={(selection) => {
          //   console.log('Selected rows:', selection.selectionModel);
          // }}
          // 마감여부에 따라 수정 못하게 하기
          //isCellEditable={(params) => params.row.send_yn === '2'}
          isCellEditable={(params) => {
            // send_yn 필드만 확인
            if (params.field === 'send_yn') {
              // userRole이 ADMIN이 아니면 수정 불가
              return authority === 'ROLE_ADMIN';
            }
            // 다른 셀은 기본적으로 수정 가능하다고 가정
            return true;
          }}
          processRowUpdate={this.processRowUpdatefunc}
          //onCellEditCommit={this.handleCellEditCommit}
          onCellKeyDown={this.test}
          onRowClick={this.forCssRowClick}
          //onRowEditCommit={this.test}
          // onRowEditStop={this.test}
          //onCellEditStop={this.test}
          sx={{
            "& .MuiDataGrid-columnHeaders": { background: "#cccccc", borderRadius: 0 },
            borderTop: '2px solid black',
            height: 500, borderRadius: 0, margin: '5px', overflowY: 'auto'
          }} rows={this.state.rows} columns={columns} />
      </DouzoneContainer>

    );
  }
}

export default Ace1010;