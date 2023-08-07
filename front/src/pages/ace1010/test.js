constructor(props) {
  super(props);

  const actualRows = [
    { id: 1, check: '', date: '2023/08/01', commute: '출근', startTime: '08:00', endTime: '17:00', startType: '자택', startLocation: '서울시', endType: '회사', endLocation: '판교', drive: 30, preDrive: 0, postDrive: 30, closed: 'Yes' },
    { id: 2, check: '', date: '2023/08/02', commute: '퇴근', startTime: '17:30', endTime: '18:00', startType: '회사', startLocation: '판교', endType: '자택', endLocation: '서울시', drive: 30, preDrive: 0, postDrive: 30, closed: 'No' },
    { id: 3, check: '', date: '2023/08/03', commute: '출근', startTime: '08:00', endTime: '17:00', startType: '자택', startLocation: '서울시', endType: '회사', endLocation: '판교', drive: 30, preDrive: 0, postDrive: 30, closed: 'Yes' },
    { id: 4, check: '', date: '2023/08/04', commute: '퇴근', startTime: '17:30', endTime: '18:00', startType: '회사', startLocation: '판교', endType: '자택', endLocation: '서울시', drive: 30, preDrive: 0, postDrive: 30, closed: 'No' },
  ];

  const totalRows = 20; // 총 행 개수를 결정합니다.
  const emptyRows = Array(totalRows - actualRows.length).fill().map((_, index) => ({
    id: actualRows.length + index + 1,
    check: '',
    date: '',
    commute: '',
    startTime: '',
    endTime: '',
    startType: '',
    startLocation: '',
    endType: '',
    endLocation: '',
    drive: '',
    preDrive: '',
    postDrive: '',
    closed: ''
  }));

  this.state = {
    anchorEl: null,
    selectedCell: null,
    rows: [...actualRows, ...emptyRows],
    columns: [
      {
        field: 'id',
        headerName: 'No',
        width: 10,
        align: 'center',
        sortable: false,
        renderCell: (params) => (
          params.row.date ? params.value : ''
        ),
      },
      {
        field: 'check',
        width: 10,
        align: 'center',
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
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            {params.row.date && (
              <Checkbox
                checked={params.row.check}
                onChange={() => this.handleToggleCheckbox(params.id)}
              />
            )}
          </div>
        ),
      },

      {
        field: 'date', headerName: '운행일자', width: 125, editable: true, align: 'center', justifyContent: 'center', sortable: false
      },
      { field: 'commute', headerName: '운행구분', width: 122, editable: true, align: 'center', sortable: false, },
      {
        field: 'startTime', headerName: '출발시간', width: 122, editable: true, align: 'center', sortable: false
      },
      { field: 'endTime', headerName: '도착시간', width: 122, editable: true, align: 'center', sortable: false },
      { field: 'startType', headerName: '출발구분', width: 122, editable: true, align: 'center', sortable: false },
      { field: 'startLocation', headerName: '출발지', width: 122, editable: true, align: 'center', sortable: false },
      { field: 'endType', headerName: '도착구분', width: 122, editable: true, align: 'center', sortable: false },
      { field: 'endLocation', headerName: '도착지', width: 122, editable: true, align: 'center', sortable: false },
      { field: 'drive', headerName: '주행(km)', width: 122, editable: true, align: 'center', sortable: false },
      { field: 'preDrive', headerName: '주행전(km)', width: 122, editable: true, align: 'center', sortable: false },
      { field: 'postDrive', headerName: '주행후(km)', width: 122, editable: true, align: 'center', sortable: false },
      { field: 'closed', headerName: '마감여부', width: 122, editable: true, align: 'center', sortable: false },
    ],
    title: '운행기록부 개인화'
  };
  this.handleEditCellChangeCommit = this.handleEditCellChangeCommit.bind(this);
  this.handleRowClick = this.handleRowClick.bind(this);
  this.handleToggleAllCheckboxes = this.handleToggleAllCheckboxes.bind(this);
  this.handleToggleCheckbox = this.handleToggleCheckbox.bind(this);
}

handleCellClick(params, event) {
  if (params.field === 'startTime') {
    this.setState({ anchorEl: event.currentTarget, selectedCell: params });
  }
}
handleSelectChange(event) {
  const newRows = this.state.rows.map((row) => {
    if (row.id === this.state.selectedCell.id) {
      return {
        ...row,
        startTime: event.target.value,
      };
    }
    return row;
  });

  this.setState({ rows: newRows, anchorEl: null });
}

handleEditCellChangeCommit(e) {
  console.log(e); // 이벤트 로깅
  // 이벤트 데이터를 사용하여 필요한 서버 요청 구성
}

handleRowClick(e) {
  this.setState({ selectedRow: e.row });
}
handleToggleAllCheckboxes() {
  const newSelectAllCheckbox = !this.state.selectAllCheckbox;
  const newRows = this.state.rows.map((row) => ({ ...row, check: newSelectAllCheckbox }));
  this.setState({ selectAllCheckbox: newSelectAllCheckbox, rows: newRows });
}

handleToggleCheckbox(id) {
  const newRows = this.state.rows.map((row) => {
    if (row.id === id) {
      return { ...row, check: !row.check };
    }
    return row;
  });
  const newSelectAllCheckbox = newRows.every((row) => row.check);
  this.setState({ rows: newRows, selectAllCheckbox: newSelectAllCheckbox });
}
render() {
  return (
    <div >
      <DouzoneContainer title={this.state.title}>
        <DataGrid
          onCellClick={this.handleCellClick.bind(this)}
          style={{ height: 505, margin: 5, borderRadius: 0 }} // remove the width here
          hideFooterPagination hideFooter
          rows={this.state.rows}
          columns={this.state.columns.map((column) => ({
            ...column,
            headerClassName: 'my-header-class', // 각 열의 헤더 클래스 설정
          }))}

          rowHeight={30}
          onEditCellChangeCommit={this.handleEditCellChangeCommit}
          onRowClick={this.handleRowClick}
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
        <Popover

          open={Boolean(this.state.anchorEl)}
          anchorEl={this.state.anchorEl}
          onClose={() => this.setState({ anchorEl: null })}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Select
            value={this.state.selectedCell ? this.state.selectedCell.value : ''}
            onChange={this.handleSelectChange.bind(this)}
          >
            <MenuItem value={'08:00'}>08:00</MenuItem>
            <MenuItem value={'09:00'}>09:00</MenuItem>
            {/* 필요한 만큼 MenuItem 추가 */}
          </Select>
        </Popover>

        <div>비고</div>
      </DouzoneContainer>
    </div>
  );
}
}