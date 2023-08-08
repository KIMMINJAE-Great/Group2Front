import { Component } from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { DataGrid } from '@mui/x-data-grid';
import './ace1010.css'
import { Checkbox, MenuItem, Popover, Select } from "@mui/material";
import DouzoneContainer from './../../components/douzonecontainer/DouzoneContainer';
import TimePicker from "./TimePicker";
import UseFg from "./UseFg";
import { maxWidth } from "@mui/system";
import { get } from "../../components/api_url/API_URL";
import SendYn from "./SendYn";
import StartEndFg from "./StartEndFg";
class Ace1010 extends Component {
  constructor(props) {
    super(props);





    this.state = {
      currentRow: null, //현재 편집중인 row
      editingRowId: '',
      anchorElTime: null,
      anchorElUseFg: null,
      anchorElStartendfg: null,
      anchorElSendyn: null,
      selectedCell: null,
      selectAllCheckbox: false,
      lastClickedRowId: null,
      rows: [],
      selectedRow: '',
      lastClickedRowOrigin: '',
      blockclickcell: '',
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
          ), headerName: '운행구분', width: 120, editable: true, align: 'center', sortable: false,
        },
        {
          field: 'start_time', renderHeader: (params) => (
            <strong>{params.colDef.headerName}</strong>
          ), headerName: '출발시간', width: 120, editable: true, align: 'center', sortable: false,
        },
        {
          field: 'end_time', renderHeader: (params) => (
            <strong>{params.colDef.headerName}</strong>
          ), headerName: '도착시간', width: 120, editable: true, align: 'center', sortable: false,
        },
        {
          field: 'start_fg', renderHeader: (params) => (
            <strong>{params.colDef.headerName}</strong>
          ), headerName: '출발구분', width: 120, editable: true, align: 'center', sortable: false,
        },
        {
          field: 'start_addr', renderHeader: (params) => (
            <strong>{params.colDef.headerName}</strong>
          ), headerName: '출발지', width: 120, editable: true, align: 'center', sortable: false,
        },
        {
          field: 'end_fg', renderHeader: (params) => (
            <strong>{params.colDef.headerName}</strong>
          ), headerName: '도착구분', width: 120, editable: true, align: 'center', sortable: false,
        },
        {
          field: 'end_addr', renderHeader: (params) => (
            <strong>{params.colDef.headerName}</strong>
          ), headerName: '도착지', width: 120, editable: true, align: 'center', sortable: false,
        },
        {
          field: 'mileage_km', renderHeader: (params) => (
            <strong>{params.colDef.headerName}</strong>
          ), headerName: '주행(km)', width: 120, editable: true, align: 'center', sortable: false,
        },
        {
          field: 'before_km', renderHeader: (params) => (
            <strong>{params.colDef.headerName}</strong>
          ), headerName: '주행전(km)', width: 120, editable: true, align: 'center', sortable: false,
        },
        {
          field: 'after_km', renderHeader: (params) => (
            <strong>{params.colDef.headerName}</strong>
          ), headerName: '주행후(km)', width: 120, editable: true, align: 'center', sortable: false,
        },
        {
          field: 'send_yn', renderHeader: (params) => (
            <strong>{params.colDef.headerName}</strong>
          ), headerName: '마감여부', width: 120, editable: true, align: 'center', sortable: false,
        },
      ],
      title: '운행기록부 개인화'
    };

  }
  //  Test 차량 전부 가져오기
  componentDidMount() {
    this.generateInitialRows();
    const initialRows = this.generateInitialRows();
    this.setState({ rows: initialRows });
    //this.getadllcars();
  }


  getadllcars = async () => {
    console.log('됐냐')
    try {
      // const response = await get('/ace1010/usefg');
      // console.log('여기 ' + JSON.stringify(response.data))
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
  // 첫 화면 을위한 빈 행
  generateInitialRows = () => {
    return Array.from({ length: 10 }).map((_, index) => ({
      id: index + 1,
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
  };


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

    this.setState({ rows: newRows, anchorElTime: null });
  }


  // 운행구분 
  onSelectUsefgChange = (selectedValue) => {
    const newRows = this.state.rows.map((row) => {
      if (row.id === this.state.selectedCell.id) {
        if (this.state.selectedCell.type === 'use_fg') {
          console.log('selectedValue : ' + selectedValue)
          return {
            ...row,
            use_fg: selectedValue,
          };
        }

      }
      return row;
    });
    this.setState({ rows: newRows, anchorElUseFg: null });
  }
  // 출발지 도착지 구분
  onSelectStartendfgChange = (selectedValue) => {
    const newRows = this.state.rows.map((row) => {
      if (row.id === this.state.selectedCell.id) {
        if (this.state.selectedCell.type === 'start_fg') {

          return {
            ...row,
            start_fg: selectedValue,
          };
        } else if (this.state.selectedCell.type === 'end_fg') {
          return {
            ...row,
            end_fg: selectedValue,
          };
        }

      }
      return row;
    });

    this.setState({ rows: newRows, anchorElStartendfg: null });
  }
  // 마감 여부 
  onSelectsendynChange = (selectedValue) => {
    const newRows = this.state.rows.map((row) => {
      if (row.id === this.state.selectedCell.id) {
        if (this.state.selectedCell.type === 'send_yn') {
          console.log('selectedValue : ' + selectedValue)
          return {
            ...row,
            send_yn: selectedValue,
          };
        }

      }
      return row;
    });
    this.setState({ rows: newRows, anchorElSendyn: null });
  }

  // 출발지


  //  셀을 클릭하였을 때 컴포넌트를 사용하거나 빈셀 즉 빈행을 클릭하면 새로운 예시 데이터를 넣어 주거나 하는 함수
  handleCellClick = (params, event) => {

    // 빈행 확인
    // let updatedRow = { ...this.state.rows.find(row => row.id === params.id) };
    const currentRows = [...this.state.rows];
    const targetRows = currentRows.filter(row => row.origin === 'N');

    // 가장 작은 id 값을 가진 행 찾기
    const smallestIdRow = targetRows.reduce((prev, current) => {
      return (prev.id < current.id) ? prev : current;
    });
    console.log('aaaaaaaaaaa >............. : ' + smallestIdRow);
    //this.state.currentRow: 
    this.setState({
      selectedRow: params.row,
      lastClickedRowId: smallestIdRow.id,// 새저장을 위한 행
    })

    if (params.value && (params.field === 'start_time' || params.field === 'end_time')) {

      this.setState({
        anchorElTime: event.currentTarget,
        selectedCell: {
          id: params.id,
          type: params.field,
        },
      });
      console.log('state 출력 time뒤: ' + JSON.stringify(this.state.rows))
    } else if (params.value && (params.field === 'use_fg')) {
      this.setState({
        anchorElUseFg: event.currentTarget,
        selectedCell: {
          id: params.id,
          type: params.field,
        },
      }, () => {
        // setState가 완료된 이후에 currentRow를 업데이트 합니다.
        this.setState(prevState => ({
          currentRow: {
            ...prevState.currentRow,  // 기존의 currentRow 상태를 유지하고
            use_fg: params.value      // use_fg 필드만 갱신합니다.
          }
        }));
      });

      console.log('state 출력 use_fg뒤: ' + this.state.rows)
    } else if (params.value && (params.field === 'send_yn')) {
      console.log('SEND_YN 클릭됨')
      this.setState({
        anchorElSendyn: event.currentTarget,
        selectedCell: {
          id: params.id,
          type: params.field,
        },
      });
      console.log('state 출력 : send_yn뒤' + this.state.rows)
    } else if (params.value && (params.field === 'start_fg' || params.field === 'end_fg')) {
      this.setState({
        anchorElStartendfg: event.currentTarget,
        selectedCell: {
          id: params.id,
          type: params.field,
        },
      });
      console.log('state 출력 : start_fg뒤' + this.state.rows)
    }

    else if (params.row.send_yn === '') {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const date = now.getDate().toString().padStart(2, '0');
      const day = now.getDay();
      const week = ['일', '월', '화', '수', '목', '금', '토']
      const usedt = year + '/' + month + '/' + date + '/' + '(' + week[day] + ')';
      smallestIdRow.check = false;
      smallestIdRow.use_dt = usedt;
      smallestIdRow.use_fg = '123';
      smallestIdRow.start_time = '123';
      smallestIdRow.end_time = '123';
      smallestIdRow.start_fg = '123';
      smallestIdRow.start_addr = '123';
      smallestIdRow.end_fg = '123';
      smallestIdRow.end_addr = '123';
      smallestIdRow.mileage_km = '123';
      smallestIdRow.premileage_km = '123';
      smallestIdRow.postmileage_km = '123';
      smallestIdRow.send_yn = '123';
      smallestIdRow.origin = 'N';

      // 이제 currentRows를 업데이트하고 state를 설정합니다.
      const rowIndex = currentRows.findIndex(row => row.id === smallestIdRow.id);
      currentRows[rowIndex] = smallestIdRow;
      this.setState({ rows: currentRows });
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



  // 셀 내부의 값이 변경되었을 때 발생하는 이벤트 핸들러.
  // 현재는 로깅만 수행하지만 필요시 서버 요청 등 추가 기능 구현이 가능하다.
  handleEditCellChangeCommit = (e) => {
    console.log(e); // 이벤트 로깅
    // 이벤트 데이터를 사용하여 필요한 서버 요청 구성
  }



  render() {
    return (

      <DouzoneContainer title={this.state.title} >
        <DataGrid

          onCellClick={this.handleCellClick}
          style={{ height: 505, margin: 5, width: '98.5%', justifyContent: "flex-end", display: "flex", }}
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
          timeopen={Boolean(this.state.anchorElTime)}
          anchorEl={this.state.anchorElTime}
          onClose={() => this.setState({ anchorElTime: null })}
          onTimeChange={this.handleTimeChange}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}>


        </TimePicker>
        <UseFg
          usefgopen={Boolean(this.state.anchorElUseFg)}
          anchorEl={this.state.anchorElUseFg}
          onClose={() => this.setState({ anchorElUseFg: null })}
          onSelectUsefgChange={this.onSelectUsefgChange}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
        </UseFg>

        <SendYn
          sendynopen={Boolean(this.state.anchorElSendyn)}
          anchorEl={this.state.anchorElSendyn}
          onClose={() => this.setState({ anchorElSendyn: null })}
          onSelectsendynChange={this.onSelectsendynChange}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >

        </SendYn>
        <StartEndFg
          startendfgopen={Boolean(this.state.anchorElStartendfg)}
          anchorEl={this.state.anchorElStartendfg}
          onClose={() => this.setState({ anchorElStartendfg: null })}
          onSelectStartendfgChange={this.onSelectStartendfgChange}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >

        </StartEndFg>
        <div>비고</div>
      </DouzoneContainer>

    );
  }
}

export default Ace1010;