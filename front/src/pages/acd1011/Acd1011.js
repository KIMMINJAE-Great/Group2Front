// import React, { Component } from 'react';
// import axios from 'axios';
// import Acd1011Child from './Acd1011Child';
// import { get } from '../../components/api_url/API_URL';


// class Acd1011 extends Component {
// <<<<<<< HEAD
//   constructor(props) {
//     super(props);
//     this.state = {
//       startName: '',
//       endName: '',
//       startCoords: '',
//       endCoords: '',
//       bookmark: '', //abizcar_북마크의 정보를 list로 담을것임. 1개짜리
//     };
//   }

//   //위도경도 가져오는 서버요청 함수
//   //여러개의 배열이 아닌.. 배열[0]의 출발지와 도착지만 가져오면됨
//   handleGetCoordinate = async () => {
//     try {
//       const response = await get("Example/ace1010/abizcarbookmark");
//       this.setState({
//         bookmark: response.data
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   /*
//           <Acd1011Child
//               startName="{서울특별시 종로구 종로5가}"     //
//               endName="더존비즈온"                     //
//               startCoordinate={this.state.bookmark.START_ADDR1}    //
//               endCoordinate={this.state.bookmark.END_ADDR1}  //
//               placeIdNum="12288842"                   //
//           />
//   */
// =======
//     constructor(props){
//         super(props);
//         this.state = {
//             startName:'',
//             endName:'',
//             startCoords:'',
//             endCoords:'',
//             bookmarkCards:[], //abizcar_북마크의 정보를 담을 배열
//             selectedBookmark:'', //북마크 정보 저장할 상태변수
//             content:[], //하위 컴포넌트로의 전달 등 여러기능함
//             coordinateInfo: '', //위도경도가 포함된 정보를 담을 변수인데... bookmarkCards에서 충분할듯?
//         };
//     }
//     componentDidMount() {
//         //abizcar_person의 정보를 가져오는코드임
//         get(`/ace1010/getallcars`)
//           .then((response) => {
//             this.setState({ bookmarkCards: response.data, content: response.data });
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       }

//     //위도경도 가져오는 서버요청 함수
//     //여러개의 배열이 아닌.. 배열[0]의 출발지와 도착지만 가져오면됨
//     handleGetCoordinate = async () => {
//         try {
//             const response = await get("example/ace1010/getcoordinate");
//             this.setState({
//                 coordinateInfo : response.data
//             });
//         } catch (error) {
//             console.log(error);
//         }
//     }
// >>>>>>> 2c2da7bb8c328b683d0b2d79ea7d700b4665563d

//   render() {

//     return (

//       <Acd1011Child
//         startName="서울특별시 종로구 종로5가"     //달라도됨
//         endName="더존비즈온"                     //달라도됨
//         startCoordinate="127.0036,37.570633"    //다르면안됨
//         endCoordinate="127.6378104,37.7563948"  //다르면안됨
//         placeIdNum="12288842"                   //달라도되는듯
//       />



//     );
//   }
// }

// export default Acd1011;
