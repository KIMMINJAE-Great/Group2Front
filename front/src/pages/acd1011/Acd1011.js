import React, { Component } from 'react';
import axios from 'axios';
import Acd1011Child from './Acd1011Child';
import { get } from '../../components/api_url/API_URL';

class Acd1011 extends Component {
    constructor(props){
        super(props);
        this.state = {
            startName:'',
            endName:'',
            startCoords:'',
            endCoords:'',
            bookmark:'', //abizcar_북마크의 정보를 list로 담을것임. 1개짜리
        };
    }

    //위도경도 가져오는 서버요청 함수
    //여러개의 배열이 아닌.. 배열[0]의 출발지와 도착지만 가져오면됨
    handleGetCoordinate = async () => {
        try {
            const response = await get("Example/ace1010/abizcarbookmark");
            this.setState({
                bookmark : response.data
            });
        } catch (error) {
            console.log(error);
        }
    }

    /*
            <Acd1011Child
                startName="{서울특별시 종로구 종로5가}"     //
                endName="더존비즈온"                     //
                startCoordinate={this.state.bookmark.START_ADDR1}    //
                endCoordinate={this.state.bookmark.END_ADDR1}  //
                placeIdNum="12288842"                   //
            />
    */

    render() {

        return(

            <Acd1011Child
                startName="서울특별시 종로구 종로5가"     //달라도됨
                endName="더존비즈온"                     //달라도됨
                startCoordinate="127.0036,37.570633"    //다르면안됨
                endCoordinate="127.6378104,37.7563948"  //다르면안됨
                placeIdNum="12288842"                   //달라도되는듯
            />



        );
    }
}

export default Acd1011;