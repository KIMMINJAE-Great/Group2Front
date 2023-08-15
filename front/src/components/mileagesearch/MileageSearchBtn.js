import React, { Component } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

class MileageSearchBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: false,
            distanceRealTime: null,
            distanceBased: null,
            distanceFree: null
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
                    goal: this.props.endCoordinate, //end
                    // name: this.props.startName,  //start
                    // address: '1',                    
                    // placeid: this.props.placeIdNum,
                    // name: this.props.endName, //end
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

            
            this.setState({ 
                data: response.data,
                distanceRealTime: Math.round(response.data.route["3,1,0,0,0,0"][0].summary.distance / 1000),
                distanceBased: Math.round(response.data.route["9,1,0,0,0,0"][0].summary.distance / 1000),
                distanceFree: Math.round(response.data.route["3,1,1,0,0,0"][0].summary.distance / 1000)
            }, () => {
                if (this.state.data !== undefined) {
                    this.SendDistanceData();
                }
            });
        } catch (error) {
            console.error("에러발생", error);
        } finally {
            this.setState({ isLoading: false });  // 데이터 로딩 완료
        }
    };


    //실시간, 거리우선, 무료 를 부모로 보내는 코드!
    SendDistanceData = () => {
        const { distanceRealTime, distanceBased, distanceFree } = this.state;
        sessionStorage.setItem('distanceRealTime', distanceRealTime);
        sessionStorage.setItem('distanceBased', distanceBased);
        sessionStorage.setItem('distanceFree', distanceFree);
        this.props.onSendDistanceData(distanceRealTime, distanceBased, distanceFree);
        
    };


    
    render() {
        
        const { data, isLoading, distanceRealTime, distanceBased, distanceFree } = this.state;

        console.log("distanceRealtime : "+distanceRealTime);
        console.log("distanceBased : "+distanceBased);
        console.log("distanceFree : "+distanceFree);
        return (   
            <div>
            {isLoading ? (
                <p>경로를 탐색중입니다...</p>
            ) : data ? (
                <Button
                    variant="outlined" 
                    style={{ width: '100px', height: '30px', padding: '2px 5px' }}
                    onClick={this.MapData}        
                    >
                    검색 완료!
                    </Button>
            ) : <Button
                    variant="outlined" 
                    style={{ width: '100px', height: '30px', padding: '2px 5px' }}
                    onClick={this.MapData}        
                    >
                    주행거리검색
                    </Button>}
        </div>
            
      );
    }
}

export default MileageSearchBtn;