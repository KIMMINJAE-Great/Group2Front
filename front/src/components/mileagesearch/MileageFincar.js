import React, { Component } from 'react';
import axios from 'axios';

class MileageFindcar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: false
        };
    }

    
    componentDidMount() {
        this.MapData();
    }

    MapData = async () => {
        this.setState({ isLoading: true });  // 데이터 로딩 시작

        try {
            const response = await axios.get('https://map.naver.com/v5/api/dir/findcar', {
                params: {
                    mainoption:'traoptimal,avoidhipassonly:traoptimal,multiroute,avoidhipassonly:traoptimal,avoidtoll,avoidhipassonly:traoptdist,avoidhipassonly',
                    start: this.props.startCoordinate,//start
                    name: this.props.startName,  //start
                    address: '1',
                    goal: this.props.endCoordinate, //end
                    placeid: this.props.placeIdNum,
                    name: this.props.endName, //end
                    output: 'json',
                    crs: 'EPSG:4326',
                    
                    responsetype:'web',
                    rptype:'4',
                    cartype:'1',
                    fueltype:'1',
                    mileage:'11.4',
                    lang:'ko',
                },
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    
                },
            });
            this.setState({ data: response.data });
        } catch (error) {
            console.error("에러발생", error);
        } finally {
            this.setState({ isLoading: false });  // 데이터 로딩 완료
        }
    };




    
    render() {

        const routes = [
            { no: 1, path: "추천", distance: this.state.distanceRealTime },
            { no: 2, path: "최단", distance: "{}" },
            { no: 3, path: "무료", distance: "{}" },
          ];
      const { data, isLoading } = this.state;

        //실시간거리와 시간
        const distanceRealTime = data && Math.round(data.route["3,1,0,0,0,0"][0].summary.distance / 1000); //km
        
        //거리우선의 거리
        const distanceBased = data && Math.round(data.route["9,1,0,0,0,0"][0].summary.distance / 1000);
        //무료우선의 거리
        // "3,1,1,0,0,0" 키의 데이터를 가져와서 km로 변환
        const distanceFree = data && Math.round(data.route["3,1,1,0,0,0"][0].summary.distance / 1000);
      
      return (

        <div>
               


            <div>
                {isLoading ? (
                    <p>경로를 탐색중입니다...</p>  // 로딩 중일 때 표시할 메시지
                ) : data ? (
                    
                    <div>
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>경로</th>
                                    <th>거리(km)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>추천</td>
                                    <td>{distanceRealTime}</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>최단</td>
                                    <td>{distanceBased}</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>무료</td>
                                    <td>{distanceFree}</td>
                                </tr>
                            </tbody>
                        </table>                        
                    </div>
                ) : <p>검색 실패</p>}
            </div>
        </div>
      );
    }
}

export default MileageFindcar;