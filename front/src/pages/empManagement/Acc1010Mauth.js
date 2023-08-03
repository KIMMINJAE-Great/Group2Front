import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Checkbox } from '@mui/material';
import { MenuCollection } from './../../components/menu/MenuCollection';
import { del, post } from "../../components/api_url/API_URL";

class Acc1010Mauth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mauth: Array.isArray(props.mauth) ? props.mauth : [],  // mauth가 배열이 아니라면 빈 배열을 사용
      permission: {}
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.mauth !== this.props.mauth) {
      this.setState({
        mauth: this.props.mauth
      });
    }
  }

  // 메뉴권한 등록 및 삭제
  handleCheckboxChange = (event, params) => {
    console.log("params........" + params)
    console.log("Checked state: ", event.target.checked);

    const isChecked = event.target.checked;
    const menucd = params.row.menucd;
    const user = JSON.parse(sessionStorage.getItem('user'));
    const insertid = user.emp_id;
    const empcd = this.props.selectedCard.emp_cd;

    const mauthDTO = {
      menucd,
      insertid,
      empcd,
    };
    if (isChecked) {

      try {
        const response = post("/emp/insertmauth", mauthDTO);
        this.setState(prevState => ({
          permission: {
            ...prevState.permission,
            [params.id]: true,
          },
        }));
        const result = response.data;
        console.log(result);

      } catch (error) {
        console.log(error + "메뉴 권한 등록 에러")
      }

      // 메뉴 권한 삭제
    } else {
      try {
        const response = del(`/emp/deletemauth/${empcd}/${menucd}`)
        console.log(response.data)
        this.setState(prevState => ({
          permission: {
            ...prevState.permission,
            [params.id]: false,
          },
        }));
      } catch (error) {
        console.log(error + "메뉴 권한 삭제 에러")
      }
    }
  }

  render() {

    const sections = MenuCollection(); // 가져온 배열 객체
    const rows = sections.flatMap((section, index) =>
      section.subItems.map((subItem, subIndex) => {

        const mauthItem = this.state.mauth.find(item => item.menucd === section.menucd[subIndex]);

        return {
          id: `${index}-${subIndex}`,
          title: section.title,
          menucd: section.menucd[subIndex],
          subItem,
          insertid: mauthItem ? mauthItem.insertid : '',
          insertip: mauthItem ? mauthItem.insertip : '',
          insertdt: mauthItem ? mauthItem.insertdt : '',
        };
      })
    );

    const columns = [
      { field: 'title', headerName: '그룹 이름', width: 200 },
      { field: 'menucd', headerName: '메뉴 코드', width: 150 },
      { field: 'subItem', headerName: '메뉴 이름', width: 200 },
      { field: 'insertid', headerName: '권한 부여자', width: 150 },
      { field: 'insertip', headerName: '권한 부여자 IP', width: 150 },
      { field: 'insertdt', headerName: '권한 허가 날짜', width: 150 },
      {
        field: 'permission',
        headerName: '허가',
        width: 50,
        renderCell: (params) => (
          <Checkbox
            checked={
              // 현재 row의 emp_cd가 mauth 내에 있는지 확인
              this.state.mauth.some(mauthItem => mauthItem.menucd === params.row.menucd) ||
              this.state.permission[params.id] ||
              false
            }
            onChange={(event) => this.handleCheckboxChange(event, params)}
          />
        ),
      },
    ];

    return <div style={{ width: 1200 }}>
      <DataGrid rows={rows} columns={columns} hideFooterPagination hideFooter />
    </div>
  }
}

export default Acc1010Mauth;
