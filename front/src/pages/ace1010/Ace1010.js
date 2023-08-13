import React, { Component } from 'react';
import { DataGrid, GridToolbar, GridCellParams } from '@mui/x-data-grid';
import DouzoneContainer from './../../components/douzonecontainer/DouzoneContainer';
import { get, post } from '../../components/api_url/API_URL';
import { Checkbox, Menu, MenuItem, Select } from '@mui/material';
import Ace1010Search from './Ace1010Search';
import './ace1010.css'
import ModalInput from './ModalInput';
// import dayjs from 'dayjs';
// import utc from 'dayjs-plugin-utc';

// dayjs.extend(utc);

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

      isAce1010Open: true, // Ace1010.js 들어가면 거기만 기능모음 열기


      // 차량에 대해 운행기록부가 저장되면 다시 데이터를 불러오기 위한 state
      selectedRowId: '',


      //  출발구분 용
      selectedRowIdFg: '',
      selectedCellFg: '',
      hour: '',
      minute: '',
      car_cd: '',
      rows: [],
      selectAllCheckbox: false,
      // 출발구분 위해
      inputValueforfg: '',
      // fg 구분에서 직접입력을 위한 state
      showModal: false,

      editingCellName: '',

      // 일단 플래그
      flag: false,
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

  // 행이 클릭되면 여러 요소를 저장 하여 활용
  handleRowClick = (params, event) => {

    // 행 클릭시 필수 셀 빨간색 입히는 setState
    this.setState({
      selectedRowId: params.id
      // editingCellName : 
    })

  }
  // 차량 조회 후 rows에 abizcar_person 데이터 입력
  searchcarforabizperson = (carforabizperson, car_cd) => {

    if (carforabizperson === null) {
      this.DouzoneContainer.current.handleSnackbarOpen('해당차량은 존재하지 않습니다.', 'error');
      this.setState({ rows: [] })
      return

    } else {
      // emp_cd 로그인 사원코드 
      const user = JSON.parse(sessionStorage.getItem('user'));
      const empcd = user.emp_cd;
      //const cocd = carforabizperson[0].co_cd;
      const cocd = '1000';
      let carcd = car_cd; // 빈 값으로 초기화
      //let cocd = "";  // 빈 값으로 초기화

      if (carforabizperson && carforabizperson.length > 0) {
        carcd = carforabizperson[0].car_cd;
        // cocd = carforabizperson[0].co_cd;
        this.setState({ car_cd: carcd })

        const dataWithIds = carforabizperson.map((item, index) => {
          return {
            ...item,
            use_dt: new Date(item.use_dt),
            emp_cd: empcd,
            id: index + 1,
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

        this.setState({ rows: [...dataWithIds, emptyRow] });
      } else {
        // 차량등 등록되어 있지만 운행기록이 없을 때
        // 빈 행을 생성
        const emptyRow = {
          id: 1,
          car_cd: carcd,
          co_cd: cocd,
          seq_nb: 0,
          emp_cd: empcd,
          send_yn: '2',
          origin: 'N'
        };
        this.setState({ rows: [emptyRow] });
      }
    }

  }

  // 엔터 시 데이터 저장 (다만 두번 엔터가 필요)
  saveCellKeyDown = async (updatedRow, test, cellFieldName) => {
    console.log('saveCellKeyDown 실행.........')
    // console.log(updatedRow.id)
    // console.log('=============================')

    const currentRow = this.state.rows.find(row => row.id === updatedRow.id);
    //console.log(currentRow)
    if (test === 'Enter') {

      if (currentRow.origin === 'N') {

        //console.log(currentRow)
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
          const date = new Date(updatedRow.use_dt);
          date.setDate(date.getDate() + 1);

          updatedRow.use_dt = date;

          try {
            const response = await post("/ace1010/insert", updatedRow)
            //this.DouzoneContainer.current.handleSnackbarOpen('서버로 요청 보냄.', 'success');

            const date = new Date(updatedRow.use_dt);
            date.setDate(date.getDate() + -1);

            updatedRow.use_dt = date;

            if (response.data === 'insert success') {
              this.DouzoneContainer.current.handleSnackbarOpen('운행기록부가 저장되었습니다.', 'success');

              // origin을 'Y'로 변경합니다.
              updatedRow.origin = 'Y';

              // 상태를 업데이트합니다.
              const updatedRows = this.state.rows.map(row => {
                if (row.id === updatedRow.id) {
                  return updatedRow;
                }
                return row;
              });

              this.setState({
                rows: updatedRows
              });
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
              emp_cd: empcd,
              send_yn: '2',
              origin: 'N'
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
        try {
          const response = await post("/ace1010/update", updatedRow)
          if (response.data === 'update success') {
            this.DouzoneContainer.current.handleSnackbarOpen('운행기록부가 수정되었습니다.', 'success');
          }
        } catch (error) {
          console.error(error);
          this.DouzoneContainer.current.handleSnackbarOpen('서버로 요청 보내기 실패.', 'error');
        }
      }

    }
  }

  cellkeydown = (params, event) => {
    console.log('셀키다운')
    console.log(params.field)
    console.log(params.row.id)
    this.setState({
      editedCell: params.field,
      selectedRowIdFg: params.row.id,
      selectedCellFg: params.field,

    })

  }
  handleCellClick = (params, event) => {
    // console.log('셀 클릭')
    // console.log(params.row.id)
    // console.log(params.field)

    this.setState({
      selectedRowIdFg: params.row.id,
      selectedCellFg: params.field,

    })
  }


  // 모달을 띄우기
  showModalAndWait = () => {
    return new Promise((resolve, reject) => {
      this.resolveShowModal = resolve;  // resolve 함수를 저장
      this.setState({ showModal: true });
      console.log('모달이 생성되었음');
    });
  }

  //  모달 확인버튼 클릭 후 
  handleModalConfirm = (inputValue) => {
    this.setState({
      showModal: false,
      inputValueforfg: inputValue,
    }, () => {
      if (this.resolveShowModal) {
        this.resolveShowModal(); // 저장된 resolve 함수 실행
        this.resolveShowModal = null; // resolve 함수 초기화
        console.log('모달에서 입력 끝남')
      }
    });
  };

  handleModalNotConfirm = () => {
    this.setState({
      showModal: false,
      inputValueforfg: '',
    }, () => {
      if (this.resolveShowModal) {
        this.resolveShowModal();
        this.resolveShowModal = null;
        console.log('모달에서 입력 끝남')
      }
    });

  }

  processRowUpdatefunc = async (updatedRow, originalRow) => {
    console.log('프로세스 실행')
    console.log(updatedRow.id)

    // 엔터가 이루어질때 field의 이름을 가져온다 becuase oncellkeydown이 processRowUpdate보다 먼저 일어나기 떄문
    const cellFieldName = this.state.editedCell;

    console.log('updatedRow.id : ' + updatedRow.id)
    console.log('this.state.selectedRowIdFg  : ' + this.state.selectedRowIdFg)
    console.log('this.state.selectedCellFg  : ' + this.state.selectedCellFg)

    // 특정셀에서만 작동하도록 했음
    if (updatedRow.id === this.state.selectedRowIdFg && cellFieldName === 'start_fg') {

      if (updatedRow.start_fg !== '자택' && updatedRow.start_fg !== '회사' && updatedRow.start_fg !== '거래처' && updatedRow.start_fg !== '직전도착지' && updatedRow.start_fg !== '즐겨찾기') {
        console.log('모달뜨기 직전= 출발구분')
        await this.showModalAndWait();

        updatedRow.start_fg = this.state.inputValueforfg;

      }
    }

    if (updatedRow.id === this.state.selectedRowIdFg && cellFieldName === 'end_fg') {

      if (updatedRow.start_fg !== '자택' && updatedRow.start_fg !== '회사' && updatedRow.start_fg !== '거래처' && updatedRow.start_fg !== '직전도착지' && updatedRow.start_fg !== '즐겨찾기') {
        console.log('모달뜨기 직전 도착구분')
        await this.showModalAndWait();

        updatedRow.end_fg = this.state.inputValueforfg;

      }
    }


    const rowIndex = this.state.rows.findIndex((row) => row.id === updatedRow.id);

    //  주행전, 후 자동 입력
    if (cellFieldName === 'mileage_km') {

      const rowWithId2 = this.state.rows.find((row) => row.id === updatedRow.id - 1);
      if (rowWithId2) {
        const afterKmValueOfId2 = Number(rowWithId2.after_km);

        const mileageKmValue = Number(updatedRow.mileage_km);

        updatedRow.after_km = mileageKmValue + afterKmValueOfId2;

        updatedRow.before_km = afterKmValueOfId2;
      }
    }



    const updatedRows = [...this.state.rows];
    updatedRows[rowIndex] = updatedRow;


    this.setState({
      rows: updatedRows,
      inputValueforfg: ''
    }, () => {  // setState의 콜백으로 saveCellKeyDown 함수 호출
      this.saveCellKeyDown(updatedRow, 'Enter', cellFieldName);
    });

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
        width: 110,
        editable: true,
        align: 'center',
        headerAlign: 'center',
        sortable: false,

        // 필수 값 배경색 설정
        cellClassName: (params) => {
          if (this.state.selectedRowId === params.id) {
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
          if (this.state.selectedRowId === params.id) {
            return 'required-field-style';
          }
          return '';
        },
        renderHeader: (params) => (
          <strong>{params.colDef.headerName}</strong>
        ),
        //onCellEditStart: this.handleCellEditStart,
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
          if (this.state.selectedRowId === params.id) {
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
        //editable: true,
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
        valueOptions: this.state.sendyn.map(item => item.s_nm),
        width: 120,
        editable: true,
        align: 'center',
        headerAlign: 'center',
        sortable: false, renderHeader: (params) => (
          <strong>{params.colDef.headerName}</strong>
        ),

        valueGetter: (params) => {
          return params.row.send_yn === '마감' ? '마감' : '미마감';
        },
      },


    ];
    return (

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
          ref={this.dataGridRef}
          disableColumnFilter
          disableColumnMenu
          hideFooterPagination hideFooter
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
          // onCellEditStart={this.handleCellEditStart}
          // onCellEditStop={this.handleCellEditStop}
          processRowUpdate={this.processRowUpdatefunc}
          //processRowUpdate={this.testProceess}
          onCellKeyDown={this.cellkeydown}
          onRowClick={this.handleRowClick}
          onCellClick={this.handleCellClick}
          sx={{
            "& .MuiDataGrid-columnHeaders": { background: "#cccccc", borderRadius: 0 },
            borderTop: '2px solid black',
            height: 500, borderRadius: 0, margin: '5px', overflowY: 'auto'
          }} rows={this.state.rows} columns={columns} />

        {this.state.showModal && (
          <ModalInput
            onConfirm={this.handleModalConfirm}
            // onCancel={() => this.setState({ showModal: false, inputValueforfg: '미입력' })}
            onCancel={this.handleModalNotConfirm}
          />
        )}
      </DouzoneContainer>

    );

  }
}

export default Ace1010;