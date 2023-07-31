import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Checkbox } from '@mui/material';
import { MenuCollection } from './../../components/menu/MenuCollection';

class Acc1010Mauth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: {}
    }
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleCheckboxChange(event, id) {
    this.setState({
      permission: {
        ...this.state.permission,
        [id]: event.target.checked,
      },
    });
  };

  render() {
    const sections = MenuCollection(); // 가져온 배열 객체

    const rows = sections.flatMap((section, index) =>
      section.subItems.map((subItem, subIndex) => ({
        id: `${index}-${subIndex}`,
        title: section.title,
        menucd: section.menucd[subIndex],
        subItem
      }))
    );

    const columns = [
      { field: 'title', headerName: '그룹 이름', width: 200 },
      { field: 'menucd', headerName: '메뉴 코드', width: 150 },
      { field: 'subItem', headerName: '메뉴 이름', width: 200 },
      {
        field: 'permission',
        headerName: '허가',
        width: 150,
        renderCell: (params) => (
          <Checkbox
            checked={this.state.permission[params.id] || false}
            onChange={(event) => this.handleCheckboxChange(event, params.id)}
          />
        ),
      },
    ];

    return <div style={{ width: '800px' }}>
      <DataGrid rows={rows} columns={columns} hideFooterPagination hideFooter />
    </div>

  }
}

export default Acc1010Mauth;