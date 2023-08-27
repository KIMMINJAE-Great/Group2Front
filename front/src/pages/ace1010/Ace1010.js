import React, { Component } from 'react';
import { DataGrid, GridToolbar, GridCellParams } from '@mui/x-data-grid';
import DouzoneContainer from './../../components/douzonecontainer/DouzoneContainer';
import { del, get, getByQueryString, post, update } from '../../components/api_url/API_URL';
import { Box, Checkbox, Menu, MenuItem, Select } from '@mui/material';
import Ace1010Search from './Ace1010Search';
import './ace1010.css'
import Spinner from '../../components/commons/Spinner/Spinner';
import Ace1010Bookmark from './Ace1010Bookmark';
import Ace1010BasicDistance from './Ace1010BasicDistance';
import Ace1010DivisionDistance from './Ace1010DivisionDistance';
import MileageModal from './mileagesearch/MileageModal';

// //기능모음
// const functionCollection = [
//   { component: <Ace1010BasicDistance />, label: "기초거리입력" },
//   { component: <Ace1010DivisionDistance />, label: "안분" },
//   { component: <MileageModal />, label: "주행거리 검색" },
//   { component: <Ace1010Bookmark />, label: "즐겨찾기" }
// ];
import ModalInput from './ModalInput';
import DrivingRecordCopy from './DrivingRecordCopy';
import Ace1010SendYn from './Ace1010SendYn';

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
      selectedRow: '',


      //  출발구분 용
      selectedRowIdFg: '',
      selectedCellFg: '',
      selectedRowId: null, //선택된 행
      selectedCellName: null, //선택된 열의 이름
      hour: '',
      minute: '',
      car_cd: '',
      co_cd: '',
      // 운행기록부에 표시될 기본 rows
      rows: [],
      // 출발구분 위해
      inputValueforfg: '',
      // fg 구분에서 직접입력을 위한 state
      showModal: false,
      editingCellName: '',

      selectedRowUseFg: '',//입력구분
      selectedRowRmkdc: '',//비고
      selectedRowRmkdcmodi: '',//수정비고

      selectedCheckedRows: [],
      selectAllCheckbox: false,

      // 일단 플래그
      flag: false,

      // 즐겨찾기 목록 
      bookmarks: [],
      bookmarkShowrows: [],
      bookmarkTempRow: null,
      // Spinner
      loading: false,

      // 삭제 모달
      showDeleteModal: false,
      //마일리지....관련
      cardsMileageKm: '', // 주행거리 검색 콜백으로 바뀌는 mileage_km
      cardsSeq: '',        // 주행거리 검색 에서 선택한 카드리스트  의 seq_nb
      MileageFunction: {}, //주행거리 검색에서 사용할 함수 집합


      beforeKm: '',


      startacc_km: 0,

      lastAfterKm: '',

    }
    this.DouzoneContainer = React.createRef();
    this.ace1010SearchRef = React.createRef();

  }
  componentDidMount() {
    this.getstartendfg();
    this.getsendyn();
    this.getusefg();

    //this.setState({ loading: true })
  }

  handleBeforeKmChange = (beforeKm) => {
    this.setState({
      receivedBeforeKm: beforeKm,
    });
    // 부모 컴포넌트로 값 전달
    this.props.onBeforeKmChange(beforeKm);
  };


  // 기능모음 리턴
  setMenus = () => {
    return [
      <Ace1010BasicDistance
        car_cd={this.state.car_cd}
        co_cd={this.state.co_cd}
        onBeforeKmChange={this.handleBeforeKmChange}
      >기초거리입력</Ace1010BasicDistance>,
      <Ace1010DivisionDistance
        selectedCheckedRows={this.state.selectedCheckedRows}
        researchAfterSaveDivisionDistance={this.researchAfterSaveDivisionDistance}
        updateLoadingStateTrue={this.updateLoadingStateTrue}
        updateLoadingStateFalse={this.updateLoadingStateFalse}
      >안분</Ace1010DivisionDistance>,
      <MileageModal
        callback={this.MileageFunction}
        content={this.state.selectedCheckedRows}
      >주행거리 검색</MileageModal>,
      <Ace1010Bookmark>즐겨찾기</Ace1010Bookmark>
    ]
  }

  handleBeforeKmChange = (beforeKm) => {
    const updatedRows = [...this.state.rows];

    if (updatedRows.length === 0) {
      updatedRows.push({ before_km: beforeKm });
    } else {
      updatedRows[0].before_km = beforeKm;
    }

    this.setState({
      beforeKm: beforeKm,
    });
  };



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
  setStartacckm = (value) => {
    console.log('... : ' + value)
    this.setState({ startacc_km: value })
  }

  setLastAfterKm = (value) => {

    this.setState({ lastAfterKm: value }, () => {
      console.log('스테이트 변화')
      console.log(this.state.lastAfterKm)
    })
  }


  // 차량 조회 후 rows에 abizcar_person 데이터 입력
  searchcarforabizperson = (carforabizperson, car_cd) => {

    this.setState({ car_cd: carforabizperson[0].car_cd })
    this.setState({ co_cd: carforabizperson[0].co_cd })


    if (carforabizperson === 'none') {
      this.DouzoneContainer.current.handleSnackbarOpen('해당차량은 사용이 중지되었습니다', 'error');
      this.setState({ rows: [] })
      return
    }
    else if (carforabizperson === null) {
      this.DouzoneContainer.current.handleSnackbarOpen('해당차량은 존재하지 않습니다.', 'error');
      this.setState({ rows: [] })
      return

    } //첫 기록이 없을 때 사원코드나 그런거 차에서 가져와도 못담네 야팔
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
          before_km: this.state.lastAfterKm,

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
          before_km: this.state.lastAfterKm,
        };
        this.setState({ rows: [emptyRow] });
      }
    }

  }

  // 행이 클릭되면 여러 요소를 저장 하여 활용
  handleRowClick = (params, event) => {
    console.log('행클릭')
    console.log(params.rmk_dc);
    console.log(params.row.rmk_dc);
    console.log(params.row)
    // 행 클릭시 필수 셀 빨간색 입히는 setState
    this.setState({
      selectedRowId: params.id,
      selectedRowRmkdc: params.row.rmk_dc,
      selectedRowUseFg: params.row.use_fg,
      selectedRow: params.row,

    })

  }

  cellkeydown = (params, event) => {
    console.log('셀키다운')
    this.setState({
      editedCell: params.field,
      selectedRowIdFg: params.row.id,
      selectedCellFg: params.field,
      selectedRow: params.row,

    }, () => {
      if (event.key === 'Enter' && params.field === 'after_km') {
        this.saveCellKeyDown(params);

      }
    })

  }
  handleCellClick = (params, event) => {

    this.setState({
      selectedRowIdFg: params.row.id,
      selectedCellFg: params.field,
      selectedRow: params.row,
    });
  }
  handleModalNotConfirm = () => {
    this.setState({
      showModal: false,
      inputValueforfg: '',
      bookmark: [],
      bookmarkShowrows: [],
    }, () => {

      console.log('모달에서 입력 끝남')

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


  getbookmarks = (bookmarks, user) => {

    const empcd = user.emp_cd;
    const cocd = "1000";

    const dataWithIds = bookmarks.map((item, index) => {
      return {
        ...item,
        co_cd: cocd,
        emp_cd: empcd,
        id: index + 1,
      };
    });
    this.setState({ bookmarkShowrows: dataWithIds }, () => {
      console.log(this.state.bookmarkShowrows)
    });


  }

  // 모달을 띄우기
  showModalAndWait = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const emp_cd = user.emp_cd;
    const co_cd = "1000";


    console.log('모달이 생성되었음');

    try {
      const queryString = `?emp_cd=${emp_cd}&co_cd=${co_cd}`;
      const response = await getByQueryString(
        `/ace1010/abizbookmark${queryString}`
      );
      this.setState(
        {
          bookmarks: response.data,
          showModal: true,
        },
        () => {
          console.log(this.state.bookmarks);
          this.getbookmarks(this.state.bookmarks, user);
        }
      );
    } catch (error) {
      console.log(error);
    }



    return new Promise((resolve, reject) => {
      this.resolveShowModal = resolve;  // resolve 함수를 저장
      this.setState({ showModal: true });
      console.log('모달이 생성되었음');
    });
  }

  //  모달 확인버튼 클릭 후 
  handleModalConfirm = (bookmarkparams) => {
    console.log('행 나와아아아앙')
    console.log(bookmarkparams)

    this.setState({ bookmarkTempRow: bookmarkparams })

    this.setState({
      showModal: false,
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

  updateSendYnSnackBar = () => {
    this.setState({ loading: true });
    this.ace1010SearchRef.current.searchcarforabizperson();
    setTimeout(() => {
      this.setState({ loading: false, selectedCheckedRows: [], selectAllCheckbox: false });
    }, 1000)
    this.DouzoneContainer.current.handleSnackbarOpen(`운행기록이 마감되었습니다.`, 'success');
  }


  processRowUpdatefunc = async (updatedRow, originalRow) => {
    console.log('프로세스 실행')
    console.log(originalRow)
    console.log(updatedRow)
    console.log(updatedRow.id)
    // this.setState({ selectedRow: updatedRow }, () => {
    //   console.log(this.state.selectedRow); // 업데이트 된 상태를 확인하기 위해 콜백 내에서 확인
    // });




    // 엔터가 이루어질때 field의 이름을 가져온다 becuase oncellkeydown이 processRowUpdate보다 먼저 일어나기 떄문
    const cellFieldName = this.state.editedCell;

    // 출발구분, 도착구분
    if (updatedRow.id === this.state.selectedRowIdFg && (cellFieldName === 'start_fg' || cellFieldName === 'end_fg')) {



      // 현재 셀이 'start_fg'이고 값이 '직전행선지'인 경우
      if (cellFieldName === 'start_fg' && updatedRow.start_fg === '직전행선지') {
        // 이전 행의 인덱스를 찾습니다.
        const previousRowIndex = this.state.rows.findIndex(row => row.id === updatedRow.id - 1);
        if (previousRowIndex !== -1) {
          // 이전 행의 'start_addr' 값을 가져옵니다.
          const previousStartfg = this.state.rows[previousRowIndex].start_fg;
          const previousAddr = this.state.rows[previousRowIndex].start_addr;

          // 현재 행의 'start_addr' 값을 이전 행의 'start_addr'로 업데이트합니다.
          updatedRow.start_fg = previousStartfg;
          updatedRow.start_addr = previousAddr;
        }

        // 업데이트된 값을 새로운 변수에 저장
        this.setState(
          () => ({
            updatedValue: updatedRow,
          }),
          () => {
            console.log(this.state.updatedValue);
          }
        );

        return updatedRow;
      } else if (cellFieldName === 'end_fg' && updatedRow.end_fg === '직전행선지') {
        const previousRowIndex = this.state.rows.findIndex(row => row.id === updatedRow.id - 1);
        if (previousRowIndex !== -1) {
          // 이전 행의 'end_addr' 값을 가져옵니다.
          const previousEndfg = this.state.rows[previousRowIndex].end_fg;
          const previousAddr = this.state.rows[previousRowIndex].end_addr;

          // 현재 행의 'end_addr' 값을 이전 행의 'end_addr'로 업데이트합니다.
          updatedRow.end_fg = previousEndfg;
          updatedRow.end_addr = previousAddr;
          console.log(previousEndfg)
        }
        // 업데이트된 값을 새로운 변수에 저장
        this.setState(
          () => ({
            updatedValue: updatedRow,
          }),
          () => {
            console.log(this.state.updatedValue);
          }
        );

        return updatedRow;

      }








      if (updatedRow.start_fg === '즐겨찾기' || updatedRow.end_fg === '즐겨찾기') {
        console.log('모달뜨기 직전= 출발구분')
        await this.showModalAndWait();

        const tmp = this.state.bookmarkTempRow;

        updatedRow = {
          ...updatedRow,

          use_fg: tmp.use_fg,
          start_time: tmp.start_time,
          end_time: tmp.end_time,
          start_fg: tmp.start_fg,
          start_addr: tmp.start_addr,
          end_fg: tmp.end_fg,
          end_addr: tmp.end_addr,
          mileage_km: tmp.mileage_km,


        }
        console.log('프로세스에서 updatedrow 북마크 확힌')
        console.log(this.state.bookmarkTempRow)
        console.log(updatedRow)



      }

      if (cellFieldName === 'start_fg') {
        const user = JSON.parse(sessionStorage.getItem("user"));
        const emp_cd = user.emp_cd;
        const co_cd = "1000";
        const start_fg = updatedRow.start_fg;

        if (updatedRow.start_fg === '자택') {

          const queryString = `?emp_cd=${emp_cd}&co_cd=${co_cd}&start_fg=${start_fg}`;
          const response = await getByQueryString(`/ace1010/bookmarkstartfg${queryString}`);
          console.log(response.data);
          const tmp = response.data;

          updatedRow = {
            ...updatedRow,
            start_fg: tmp.start_fg,
            start_addr: tmp.start_addr,

          }
          //  console.log('프로세스에서 updatedrow 북마크 확힌')
          //  console.log(this.state.bookmarkTempRow)
          //  console.log(updatedRow)

          return updatedRow;

        } else if (updatedRow.start_fg === '회사') {


          const queryString = `?emp_cd=${emp_cd}&co_cd=${co_cd}&start_fg=${start_fg}`;
          const response = await getByQueryString(`/ace1010/bookmarkstartfg${queryString}`);
          console.log(response.data);
          const tmp = response.data;

          updatedRow = {
            ...updatedRow,
            start_fg: tmp.start_fg,
            start_addr: tmp.start_addr,

          }
          //  console.log('프로세스에서 updatedrow 북마크 확힌')
          //  console.log(this.state.bookmarkTempRow)
          //  console.log(updatedRow)

          return updatedRow;
        }
      }

      //도착구분 
      if (cellFieldName === 'end_fg') {
        const user = JSON.parse(sessionStorage.getItem("user"));
        const emp_cd = user.emp_cd;
        const co_cd = "1000";
        const end_fg = updatedRow.end_fg;

        if (updatedRow.end_fg === '자택') {

          const queryString = `?emp_cd=${emp_cd}&co_cd=${co_cd}&end_fg=${end_fg}`;
          const response = await getByQueryString(`/ace1010/bookmarkendfg${queryString}`);
          console.log(response.data);
          const tmp = response.data;

          updatedRow = {
            ...updatedRow,
            end_fg: tmp.end_fg,
            end_addr: tmp.end_addr,

          }
          //  console.log('프로세스에서 updatedrow 북마크 확힌')
          //  console.log(this.state.bookmarkTempRow)
          //  console.log(updatedRow)

          return updatedRow;

        } else if (updatedRow.end_fg === '회사') {


          const queryString = `?emp_cd=${emp_cd}&co_cd=${co_cd}&end_fg=${end_fg}`;
          const response = await getByQueryString(`/ace1010/bookmarkendfg${queryString}`);
          console.log(response.data);
          const tmp = response.data;

          updatedRow = {
            ...updatedRow,
            end_fg: tmp.end_fg,
            end_addr: tmp.end_addr,

          }


          return updatedRow;
        }



      }
    }

    //const rowIndex = this.state.rows.findIndex((row) => row.id === updatedRow.id);
    const mileageKm = Number(updatedRow.mileage_km);
    const updatedRows = [...this.state.rows];
    //  주행전, 후 자동 입력
    if (cellFieldName === 'mileage_km') {

      if (updatedRow.origin === 'Y') {

        // 오리진이 y이지만 맨마지막 행일 떄 오류발생
        console.log('마일리지까지 들어옴')
        //가정 1 첫 빈행일 때 즉 id가 1일때
        //가정 2 id가 1이상일때

        console.log('요청 전')
        // 스피너 적용
        this.setState({ loading: true });
        var finalresponse;
        post('/ace1010/autocalcmileage', updatedRow)
          .then((response) => {
            console.log('주행 요청 후 데이터 출력')
            console.log(response.data)
            if (response.data > 0) {
              finalresponse = response.data;
              setTimeout(() => {
                this.setState({ loading: false });
                if (finalresponse > 0) {
                  this.DouzoneContainer.current.handleSnackbarOpen(`주행거리가 수정되었습니다`, 'success');
                  this.ace1010SearchRef.current.searchcarforabizperson();
                }
              }, 1000);

              //여기서 조회를 다시한다
            } else {
              this.DouzoneContainer.current.handleSnackbarOpen(`주행거리가 수정에 실패하였습니다.`, 'error');
            }

          })
          .catch((error) => {
            console.error('서버 요청 중에 에러가 발생했습니다:', error);
          })
        // .finally(() => {
        //   this.setState({ loading: false });
        // })


        console.log('요청후')


      } else if (updatedRow.origin === 'N') {

        updatedRow.after_km = mileageKm + Number(updatedRow.before_km)

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
    console.log(params)
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



    if (params.row.origin == 'N') {
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

          const maxSeqNb = Math.max(...this.state.rows.map(item => item.seq_nb));

          params.row.seq_nb = maxSeqNb + 1;


          // origin을 'Y'로 변경합니다.
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
          const seqnb = lastRow.seq_nb + 1;
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
            before_km: this.state.lastAfterKm,
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
    this.ace1010SearchRef.current.searchcarforabizperson();
  }
  // 모든 체크박스
  handleToggleAllCheckboxes = () => {
    const { rows, selectAllCheckbox } = this.state;

    if (selectAllCheckbox === true || selectAllCheckbox === 'indeterminate') {
      this.setState({ selectedCheckedRows: [], selectAllCheckbox: false });
    } else {
      this.setState({
        selectedCheckedRows: rows.slice(0, -1), // 마지막 row 제외
        selectAllCheckbox: true
      });
    }
  };

  // 단일 체크박스
  handleToggleCheckbox = (row) => {
    const { selectedCheckedRows } = this.state;
    const newSelectedCheckedRows = selectedCheckedRows.some(selectedRow => selectedRow.id === row.id)
      ? selectedCheckedRows.filter(selectedRow => selectedRow.id !== row.id)
      : [...selectedCheckedRows, row];

    this.setState({ selectedCheckedRows: newSelectedCheckedRows }, () => {
      this.updateSelectAllCheckboxState();
    });
  };

  // const authority = user.authorities[0].authority;
  // const { beforeKm } = this.state;



  // 컬럼헤더의 체크박스 상태
  updateSelectAllCheckboxState = () => {
    const { selectedCheckedRows, rows } = this.state;

    if (selectedCheckedRows.length === 0) {
      this.setState({ selectAllCheckbox: false });
    } else if (selectedCheckedRows.length === rows.length) {
      this.setState({ selectAllCheckbox: true });
    } else {
      this.setState({ selectAllCheckbox: 'indeterminate' });
    }
  };


  //주행거리 함수 모음
  MileageFunction = {

    //체크박스를 눌러서 배열을 만들어서 가져감,
    //카드리스트를 눌러서 출발지와 목적지를 바인딩함..
    //주행거리가 검색되어 나온 결과를 누르면 반영이 되어야함.
    //선택한 카드의 배열 정보는 seq_nb로 찾아서 mileageModal에 handelCardClick에 있다.
    //선택한 KM의 정보는 TableView에서 가져온다....

    //카드를 선택한곳의 seq_nb
    //ace1010.js ->MileageModal.js // 눌린 카드리스트의 seq_nb값 가져오기
    handleGetSeqNbBySeletedCard: (data) => {
      this.setState({
        cardsSeq: data
      });
    },
    //ace1010.js -> MileageTableView.js // mileage변경
    handleCallBackMileageData: (data) => {
      if (data == 0) {
        alert('값을 다시 입력해주세요.');
      } else {
        this.setState({ cardsMileageKm: data, });
      }
    },
    //ace
    handleCallBackAddrData: (start_addr1, end_arrd1, start_addr, end_addr) => {
      this.setState({
        startAddr1: start_addr1,
        endAddr1: end_arrd1,
        startAddr: start_addr,
        endAddr: end_addr,

      }, () => { console.log("@@@@콜백함수안에있는 addr1", this.state.endAddr); });

    },

    //주행거리 계산 함수
    handelCalcMileageKm: () => {
      const { cardsSeq, rows, mileage_km, cardsMileageKm, startAddr1, endAddr1, startAddr, endAddr } = this.state;
      const updatedRows = [...rows];
      // this.processRowUpdatefunc();
      // updatedRows = {
      //   ...updatedRows,

      //   use_fg: tmp.use_fg,
      //   start_time: tmp.start_time,
      //   end_time: tmp.end_time,
      //   start_fg: tmp.start_fg,
      //   start_addr: tmp.start_addr,
      //   end_fg: tmp.end_fg,
      //   end_addr: tmp.end_addr,
      //   mileage_km: tmp.mileage_km,
      // }
      console.log("if가 실행되기전 addr" + startAddr);
      if (cardsSeq !== null && cardsSeq !== undefined) {
        const rowIndex = updatedRows.findIndex(row => row.seq_nb === cardsSeq);
        if (rowIndex !== -1) { //"선택된 행 ID와 일치하는 행이 updatedRows 배열 안에 있다면..."
          //(조건에 부합하는 요소가 없다면 -1을 반환이므로)
          updatedRows[rowIndex].mileage_km = Number(cardsMileageKm);
          console.log("함수안에 있는거야 Addr1" + startAddr1);
          updatedRows[rowIndex].start_addr1 = startAddr1;
          updatedRows[rowIndex].end_addr1 = endAddr1;
          updatedRows[rowIndex].start_addr = startAddr;
          updatedRows[rowIndex].end_addr = endAddr;

          this.setState({
            rows: updatedRows,
            mileage_km: cardsMileageKm,
            start_addr1: startAddr1,
            end_addr1: endAddr1,
            start_addr: startAddr,
            end_addr: endAddr
          });
        }
      }
    }
  }

  // 삭제 모달 열기
  handleRowDeleteOpenModal = () => {
    this.setState({ showDeleteModal: true });
  }

  // 삭제 모달 닫기
  handleRowDeleteCloseModal = () => {
    this.setState({ showDeleteModal: false });
  }


  // 운행기록 삭제
  deleteRow = async () => {
    const deleteRows = this.state.selectedCheckedRows;
    console.log(deleteRows)
    const rows = this.state.rows;
    const user = JSON.parse(sessionStorage.getItem('user'));

    const co_cd = user.co_cd;
    const finaleDeleteRows = deleteRows.map(row => {
      return {
        seq_nb: row.seq_nb,
        car_cd: row.car_cd,
        co_cd: co_cd,
      }
    })
    // 삭제할 운행기록을 오름차순으로 정렬
    finaleDeleteRows.sort((a, b) => a.seq_nb - b.seq_nb);
    console.log('삭제될 운행기록들')
    console.log(finaleDeleteRows)
    this.setState({ loading: true })
    del(`/ace1010/deleteabizcarperson`, { data: finaleDeleteRows })
      .then((response) => {

        if (response.data > 0) {
          setTimeout(() => {
            this.setState({ loading: false, selectedCheckedRows: [], selectAllCheckbox: false });
            this.DouzoneContainer.current.handleSnackbarOpen(`운행기록이 정상적으로 삭제되었습니다.`, 'success');
            this.ace1010SearchRef.current.searchcarforabizperson();
          }, 1000);

          //여기서 조회를 다시한다
        } else {
          this.DouzoneContainer.current.handleSnackbarOpen(`운행기록 삭제 실패하였습니다.`, 'error');
        }
      }
      ).catch((error) => {
        console.log(error)
        this.DouzoneContainer.current.handleSnackbarOpen('운행기록 삭제 실패 하였습니다.', 'error');
      })
    this.handleRowDeleteCloseModal();
  }
  //  안분하고 spinner 사용하기 위해 
  updateLoadingStateTrue = () => {
    console.log('스피너 작동')
    this.setState({ loading: true });
  }
  updateLoadingStateFalse = () => {
    console.log('스피너 종료')
    this.setState({ loading: false });
  }
  researchAfterSaveDivisionDistance = () => {
    this.ace1010SearchRef.current.searchcarforabizperson();
    this.setState({ selectedCheckedRows: [], selectAllCheckbox: false })
    this.DouzoneContainer.current.handleClose();
    this.DouzoneContainer.current.handleSnackbarOpen(`주행거리 안분 처리가 완료되었습니다.`, 'success');
  }

  searchcarforabizpersondrivingcopy = () => {
    console.log('복사 재조회 시작')
    this.ace1010SearchRef.current.searchcarforabizperson();
    this.setState({ selectedCheckedRows: [], selectAllCheckbox: false })
  }

  columns = () => {

    return [
      {
        field: 'id', headerName: 'No', width: 30, headerAlign: 'center', align: 'center', sortable: false, renderHeader: (params) => (
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
              indeterminate={this.state.selectAllCheckbox === 'indeterminate'}
              checked={this.state.selectAllCheckbox === true}
              onChange={this.handleToggleAllCheckboxes}
            />
          </div>
        ),
        renderCell: (params) => {
          if (params.row.send_yn === '1') {
            return <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>마감</div>;
          }

          return (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Checkbox
                checked={this.state.selectedCheckedRows.some(selectedRow => selectedRow.id === params.id)}
                onChange={() => this.handleToggleCheckbox(params.row)}
              />
            </div>
          );
        },

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
        },



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
        width: 130,
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
        width: 130,
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
        type: 'string',

        width: 140,
        //editable: 'true',
        align: 'center',
        headerAlign: 'center',
        sortable: false, renderHeader: (params) => (
          <strong>{params.colDef.headerName}</strong>
        ),
        valueGetter: (params) => {
          if (params.value === '1') {
            return '마감';
          } else if (params.value === '2') {
            return '미마감';
          }
          return params.value;  // 기본값 반환 (1 또는 2가 아닌 경우 원래 값 출력)
        }

      },
    ];
  }



  render() {
    const user = JSON.parse(sessionStorage.getItem('user'));

    const authority = user.authorities[0].authority

    return (


      <DouzoneContainer
        car_cd={this.state.car_cd}
        co_cd={this.state.co_cd}
        selectedCheckedRows={this.state.selectedCheckedRows}
        ref={this.DouzoneContainer}
        title={this.state.title}
        isAce1010Open={this.state.isAce1010Open} // 기능 모음 표시 여부
        openDeleteModal={this.state.showDeleteModal}// 모달이 켜지는 state
        delete={this.handleRowDeleteOpenModal} //삭제 모달 열기
        menus={this.setMenus()} //기능 모음 메뉴 전달
        handleClose={this.handleRowDeleteCloseModal} // 삭제 모달 닫기
        handleConfirm={this.deleteRow}// 삭제 모달의 확인 버튼
        showDelete={''}
        searchcarforabizpersondrivingcopy={this.searchcarforabizpersondrivingcopy}
        sendYn={<Ace1010SendYn
          selectedCheckedRows={this.state.selectedCheckedRows}
          updateSendYnSnackBar={this.updateSendYnSnackBar}></Ace1010SendYn>}
        //title="사원 삭제 확인"
        message="정말로 운행기록 정보를 삭제하시겠습니까?"
      // menu={}

      >

        <Ace1010Search
          beforeKm={this.state.beforeKm}
          handleBeforeKmChange={this.handleBeforeKmChange}
          setStartacckm={this.setStartacckm}
          ref={this.ace1010SearchRef}
          searchcarforabizperson={this.searchcarforabizperson}
          setLastAfterKm={this.setLastAfterKm}>

        </Ace1010Search>
        {/* <DrivingRecordCopy selectedRows={this.state.newSelectedCheckedRows} /> */}
        <DataGrid
          disableColumnFilter
          disableColumnMenu
          // hideFooterPagination hideFooter
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          isCellEditable={(params) => params.row.send_yn !== '1'}
          processRowUpdate={this.processRowUpdatefunc}
          onCellKeyDown={this.cellkeydown}
          onRowClick={this.handleRowClick}
          onCellClick={this.handleCellClick}
          sx={{
            "& .MuiDataGrid-columnHeaders": { background: "#cccccc", borderRadius: 0, },
            "& .MuiDataGrid-cell": { borderRight: '1px solid #cccccc' },
            borderTop: '2px solid black',
            height: 500, borderRadius: 0, margin: '5px', overflowY: 'auto'
          }} rows={this.state.rows} columns={this.columns()} />




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
            onCancel={this.handleModalNotConfirm}
            showModal={this.state.showModal}
            rows={this.state.bookmarkShowrows}
            onConfirm={this.handleModalConfirm}
          //updatedRowFromBookMark={this.updatedRowFromBookMark()}

          />
        )}



        <Spinner loading={this.state.loading}></Spinner>
      </DouzoneContainer>
    )
  }

}

export default Ace1010;