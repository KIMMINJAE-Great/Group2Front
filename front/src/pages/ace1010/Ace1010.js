import React, { Component } from 'react';
import { DataGrid, GridToolbar, GridCellParams } from '@mui/x-data-grid';
import DouzoneContainer from './../../components/douzonecontainer/DouzoneContainer';
import { get, post, update } from '../../components/api_url/API_URL';
import { Box, Checkbox, Menu, MenuItem, Select } from '@mui/material';
import Ace1010Search from './Ace1010Search';
import './ace1010.css'
import ModalInput from './ModalInput';

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

      selectedRowUseFg: '',//입력구분
      selectedRowRmkdc: '',//비고
      selectedRowRmkdcmodi: '',//수정비고
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



  // 차량 조회 후 rows에 abizcar_person 데이터 입력
  searchcarforabizperson = (carforabizperson, car_cd) => {
    if (carforabizperson === 'none') {
      this.DouzoneContainer.current.handleSnackbarOpen('해당차량은 사용이 중지되었습니다', 'error');
      this.setState({ rows: [] })
      return
    }
    else if (carforabizperson === null) {
      this.DouzoneContainer.current.handleSnackbarOpen('해당차량은 존재하지 않습니다.', 'error');
      this.setState({ rows: [] })
      return

    }
    else {
      // emp_cd 로그인 사원코드 
      const user = JSON.parse(sessionStorage.getItem('user'));

      const insertid = user.emp_id;

      const modifyid = user.emp_id;
      const cocd = carforabizperson[0].co_cd;
      const empcd = carforabizperson[0].emp_cd;
      const carcd = carforabizperson[0].car_cd; // 빈 값으로 초기화
      //let cocd = "";  // 빈 값으로 초기화

      if (carforabizperson[0].seq_nb !== 0) {


        const dataWithIds = carforabizperson.map((item, index) => {
          return {
            ...item,
            use_dt: new Date(item.use_dt),
            modify_id: modifyid,
            co_cd: cocd,
            emp_cd: empcd,
            car_cd: carcd,
            id: index + 1,
            origin: 'Y',

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
          insert_id: insertid,
          origin: 'N',
          rmk_dc: '',
          use_fg: '',

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
          insert_id: insertid,
          send_yn: '2',
          origin: 'N',
          rmk_dc: '',
          use_fg: '',
        };
        this.setState({ rows: [emptyRow] });
      }
    }

  }

  // 행이 클릭되면 여러 요소를 저장 하여 활용
  handleRowClick = (params, event) => {

    console.log(params.rmk_dc);
    console.log(params.row.rmk_dc);
    // 행 클릭시 필수 셀 빨간색 입히는 setState
    this.setState({
      selectedRowId: params.id,
      selectedRowRmkdc: params.row.rmk_dc,
      selectedRowUseFg: params.row.use_fg,
      // editingCellName : 
    })

  }

  cellkeydown = (params, event) => {
    console.log('셀키다운')
    console.log(params.field)
    console.log(params.row.id)
    console.log(params)
    this.setState({
      editedCell: params.field,
      selectedRowIdFg: params.row.id,
      selectedCellFg: params.field,

    }, () => {
      if (event.key === 'Enter' && params.field === 'after_km') {
        this.saveCellKeyDown(params);
      }
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
  handleRmkDcChange = (value) => {
    // 현재 상태의 rows 배열을 복사
    const updatedRows = [...this.state.rows];

    // 선택된 행의 인덱스 찾기
    const rowIndex = updatedRows.findIndex(item => item.id === this.state.selectedRowId);

    // 해당 행이 배열 내에 있으면
    if (rowIndex !== -1) {
      // 해당 행의 rmk_dc를 업데이트
      updatedRows[rowIndex].rmk_dc = value;

      // 상태 업데이트
      this.setState({
        rows: updatedRows,
        selectedRowRmkdc: value
      });
    }
  }

  processRowUpdatefunc = async (updatedRow, originalRow) => {
    console.log('프로세스 실행')
    console.log(updatedRow.id)
    console.log(updatedRow.seq_nb)


    // 엔터가 이루어질때 field의 이름을 가져온다 becuase oncellkeydown이 processRowUpdate보다 먼저 일어나기 떄문
    const cellFieldName = this.state.editedCell;

    // 출발구분, 도착구분
    if (updatedRow.id === this.state.selectedRowIdFg && cellFieldName === 'start_fg') {

      if (updatedRow.start_fg !== '자택' && updatedRow.start_fg !== '회사' && updatedRow.start_fg !== '거래처' && updatedRow.start_fg !== '직전도착지' && updatedRow.start_fg !== '즐겨찾기') {
        console.log('모달뜨기 직전= 출발구분')
        await this.showModalAndWait();

        updatedRow.start_fg = this.state.inputValueforfg;

      }
    }

    if (updatedRow.id === this.state.selectedRowIdFg && cellFieldName === 'end_fg') {

      if (updatedRow.end_fg !== '자택' && updatedRow.end_fg !== '회사' && updatedRow.end_fg !== '거래처' && updatedRow.end_fg !== '직전도착지' && updatedRow.end_fg !== '즐겨찾기') {
        console.log('모달뜨기 직전 도착구분')
        await this.showModalAndWait();

        updatedRow.end_fg = this.state.inputValueforfg;

      }
    }


    //const rowIndex = this.state.rows.findIndex((row) => row.id === updatedRow.id);
    const mileageKm = Number(updatedRow.mileage_km);
    const updatedRows = [...this.state.rows];
    console.log('updatedRows의 row의 id 타입')
    console.log(typeof updatedRows[0].id) // row의 id는 number이다. 
    //  주행전, 후 자동 입력
    if (cellFieldName === 'mileage_km') {
      //가정 1 첫 빈행일 때 즉 id가 1일때
      //가정 2 id가 1이상일때

      // 운행기록부 첫 주행 등록
      if (updatedRow.id === 1 && updatedRow.seq_nb === 0) {
        console.log('운행기록부 첫 주행 등록')
        updatedRow.mileage_km = mileageKm;
        if (!updatedRow.before_km) {
          updatedRow.before_km = 0;
          updatedRow.after_km = mileageKm + Number(updatedRow.before_km);
        } else {
          updatedRow.after_km = mileageKm + Number(updatedRow.before_km)
        }
        // 운행기록부 첫 주행 이후 등록
      } else if (updatedRow.id > 1 && updatedRow.seq_nb === 0) {
        console.log('운행기록부 첫 주행 이후 등록')
        updatedRow.mileage_km = mileageKm;
        updatedRow.before_km = updatedRows[updatedRow.id - 2].after_km;
        updatedRow.after_km = Number(updatedRow.before_km) + mileageKm;
        // 운행기록부 한행의 주행 변경시 이후의 행들의 주행전,주행후 변경
      } else {
        console.log('그 이후 한행 이 변한뒤 하위 행들 주행전, 주행 후 변경')
        let i = updatedRow.id
        updatedRows[i - 1].mileage_km = mileageKm;
        updatedRow.after_km = Number(updatedRows[i - 1].before_km) + mileageKm;
        updatedRows[i - 1].after_km = updatedRow.after_km
        // updatedRows[i - 1].after_km = Number(updatedRows[i - 1].before_km) + mileageKm;을 하였을 때 updatedRows[i - 1].after_km이 부분이 인식이 안돼, 적용이 불가하여 분리 하였습니다.
        for (let i = updatedRow.id; i < updatedRows.length - 1; i++) {

          updatedRows[i].before_km = updatedRows[i - 1].after_km;
          updatedRows[i].after_km = Number(updatedRows[i].before_km) + Number(updatedRows[i].mileage_km)
        }
      }

    }

    this.setState({
      //rows: updatedRows,
      inputValueforfg: ''
    })

    return updatedRow;
  }

  toLocalISOString = (date) => {
    const off = date.getTimezoneOffset();
    const offset = (off < 0 ? '+' : '-') + String(Math.abs(off / 60)).padStart(2, '0');
    return (new Date(date.getTime() - off * 60 * 1000).toISOString().substring(0, 23) + offset + ':00');
  }

  // 1. 주행후에서 엔터가 쳐졌을 때만 저장이 실행이 된다.
  // 2. 값들 중 운행일자, 출발구분, 도착 구분이 없다면 스낵바를 띄운다.
  // 3. 신규 저장이면 빈 행을 띄운다. seq를 rows에서 max를 찾아 1증가 시켜 수정이 가능하도록 한다.
  // 4. 신규 저장시 seq_nb를 0에서 1로 바꾼다.
  // 5. 
  saveCellKeyDown = async (params) => {
    console.log(' 저장 시작 ')
    console.log(params)//<- 여이가 undefined가 뜨니깐 반복저장할 때 잘 못 넘겨준거
    console.log(params.row)
    console.log(params.field)

    const fieldsToCheck = ['use_dt', 'start_fg', 'end_fg'];

    const allFieldsHaveValue = fieldsToCheck.every(field => {

      const value = params.row[field];
      return value !== undefined && value !== null && value !== "";
    });

    if (!allFieldsHaveValue) {
      this.DouzoneContainer.current.handleSnackbarOpen('운행일자, 출발구분, 도착구분은 필수입력란 입니다.', 'error');
      return
    }

    if (params.row.origin === 'N') {
      console.log('신규 저장 시작')
      const isoDate = this.toLocalISOString(new Date());  // 현재 시간을 로컬 타임존을 고려한 ISO 형식으로 변환
      const mysqlDate = isoDate.slice(0, 19).replace('T', ' ');
      params.row.insert_dt = mysqlDate;
      console.log('운행일자가 어떻게 바뀌는지 보는')
      console.log(params.row.use_dt)
      if (params.row.use_dt !== null) {
        // use_dt가 이미 yyyy-MM-dd HH:mm:ss 형식인지 검사
        const isAlreadyFormatted = /^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/.test(params.row.use_dt);

        if (!isAlreadyFormatted) {
          const selectedDate = params.row.use_dt;  // DatePicker에서 선택한 날짜
          const isoDate2 = this.toLocalISOString(selectedDate);
          const mysqlDate2 = isoDate2.slice(0, 19).replace('T', ' ');
          params.row.use_dt = mysqlDate2;
        }
      }
      params.row.rmk_dc = this.state.selectedRowRmkdc;
      try {
        const response = await post("/ace1010/insert", params.row)
        if (response.data === 'before data exist') {
          this.DouzoneContainer.current.handleSnackbarOpen('입력일 이후에 데이터가 존재하여 입력이불가능합니다', 'error');
        }
        if (response.data === 'same time data exist') {
          this.DouzoneContainer.current.handleSnackbarOpen('입력일의 같은 시간대와 이전 시간대의 운행이 존재하여 입력이 불가능합니다', 'error');
        }


        if (response.data === 'insert success') {
          this.DouzoneContainer.current.handleSnackbarOpen('운행기록부가 새롭게 저장되었습니다.', 'success');

          // origin을 'Y'로 변경합니다.
          if (params.row.seq_nb === 0) {
            params.row.seq_nb = 1;
          }

          params.row.origin = 'Y';

          // 상태를 업데이트합니다.
          const updatedRows = this.state.rows.map(row => {
            if (row.id === params.row.id) {
              return params.row;
            }
            return row;
          });

          this.setState({
            rows: updatedRows
          });

          // 새로운 운행기록부 저장시 빈행 추가
          const lastRow = this.state.rows[this.state.rows.length - 1];
          const newId = lastRow.id + 1;
          const seqnb = lastRow.seq_nb;
          // const seqnb = lastRow.seq_nb + 1; 왜 1로 해놨는데 잘 됐을까 무섭네
          const user = JSON.parse(sessionStorage.getItem('user'));
          const empid = user.emp_id;
          const carcd = params.row.car_cd;
          const cocd = params.row.co_cd;

          const emptyRow = {
            id: newId,
            car_cd: carcd,
            co_cd: cocd,
            seq_nb: seqnb,
            insert_id: empid,
            emp_cd: params.row.emp_cd,
            send_yn: '2',
            origin: 'N',
            use_fg: '',
            rmk_dc: '',
            // 기타 필요한 초기화 값들...
          };

          this.setState(prevState => ({
            rows: [...prevState.rows, emptyRow]
          }));

        }


      } catch (error) {
        console.error(error);
        this.DouzoneContainer.current.handleSnackbarOpen('신규 저장중 서버로 요청 보내기 실패.', 'error');
      }

    } else if (params.row.origin === 'Y') {
      console.log('수정 시작')
      console.log(params.row)
      if (params.row.use_dt !== null) {
        // use_dt가 이미 yyyy-MM-dd HH:mm:ss 형식인지 검사
        const isAlreadyFormatted = /^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/.test(params.row.use_dt);

        if (!isAlreadyFormatted) {
          const selectedDate = params.row.use_dt;  // DatePicker에서 선택한 날짜
          const isoDate2 = this.toLocalISOString(selectedDate);
          const mysqlDate2 = isoDate2.slice(0, 19).replace('T', ' ');
          params.row.use_dt = mysqlDate2;
        }
      }
      // if (params.row.use_dt !== null && typeof params.row.use_dt === 'string') {
      //   const selectedDate = new Date(params.row.use_dt);  // 문자열을 Date 객체로 변환
      //   const isoDate2 = this.toLocalISOString(selectedDate);
      //   const mysqlDate2 = isoDate2.slice(0, 19).replace('T', ' ');
      //   params.row.use_dt = mysqlDate2;
      // }
      const isoDate2 = this.toLocalISOString(new Date());
      const mysqlDate = isoDate2.slice(0, 19).replace('T', ' ');
      params.row.modify_dt = mysqlDate;

      const user = JSON.parse(sessionStorage.getItem('user'));
      const modifyid = user.emp_id;
      params.row.modify_id = modifyid

      params.row.rmk_dc = this.state.selectedRowRmkdc;

      try {
        const response = await update("/ace1010/update", params.row)
        if (response.data === 'same time exist at working row') {
          this.DouzoneContainer.current.handleSnackbarOpen('해당 시간은 같은 운행일자의 중복되는 시간입니다.', 'error');
        }
        if (response.data === 'before data exist') {
          this.DouzoneContainer.current.handleSnackbarOpen('입력일 이후에 데이터가 존재하여 입력이불가능합니다', 'error');
        }
        if (response.data === 'same time data exist') {
          this.DouzoneContainer.current.handleSnackbarOpen('입력일의 같은 시간대와 이전 시간대의 운행이 존재하여 입력이 불가능합니다', 'error');
        }
        if (response.data === 'update success') {
          this.DouzoneContainer.current.handleSnackbarOpen('운행기록부가 수정되었습니다.', 'success');
        } else if (response.data === 'update failed') {
          this.DouzoneContainer.current.handleSnackbarOpen('운행기록부 수정에 실패하였습니다.', 'error');
        }

        // 상태를 업데이트합니다.
        const updatedRows = this.state.rows.map(row => {
          if (row.id === params.row.id) {
            return params.row;
          }
          return row;
        });

        this.setState({
          rows: updatedRows
        });

      } catch (error) {
        console.error(error);
        this.DouzoneContainer.current.handleSnackbarOpen('업데이트 중 서버로 요청 보내기 실패.', 'error');
      }
    }

  }
















  processRowUpdatefunc=(e)=>{
    if(this.props.processRowUpdatefunc){
      this.props.processRowUpdatefunc(e)
    }
  }

  render() {
    const user = JSON.parse(sessionStorage.getItem('user'));

    const authority = user.authorities[0].authority



    class douzoneDataGrid{
      render(){
        <dataGrid 
        
          processRowUpdate={this.processRowUpdatefunc}
          //processRowUpdate={this.testProceess}
          onCellKeyDown={this.cellkeydown}
          onRowClick={this.handleRowClick}
          onCellClick={this.handleCellClick}
         />
      }
    }
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
        valueGetter: (params) => {
          if (params.value) {
            return new Date(params.value);
          }
          return null;
        },
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
        align: 'center',
        headerAlign: 'center',
        editable: "true",
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




        <Box sx={{ display: 'flex' }}>
          <h4 style={{ fontWeight: 'bold', marginLeft: 20 }}>비고 : </h4>

          <input
            onChange={(e) => this.handleRmkDcChange(e.target.value)}
            type="text"
            style={{ height: '30px', width: '300px', marginTop: '17px', marginLeft: '5px', border: '0px', fontSize: 15, }}
            value={this.state.selectedRowRmkdc}

          />

          <h4 style={{ fontWeight: 'bold', marginLeft: 20 }}>입력구분 : </h4>

          <input
            type="text"
            style={{ height: '30px', width: '300px', outline: 'none', marginTop: '17px', marginLeft: '5px', border: '0px', fontSize: 15, }}
            value={this.state.selectedRowUseFg}

            readOnly
          />

        </Box>
        {this.state.showModal && (
          <ModalInput
            onConfirm={this.handleModalConfirm}
            onCancel={this.handleModalNotConfirm}
          />
        )}
      </DouzoneContainer>

    );

  }
}

export default Ace1010;