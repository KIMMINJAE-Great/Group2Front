import React, { Component } from 'react';
import axios from 'axios';

import { get } from '../api_url/API_URL';
import MileageTableView from './MileageTableView';



class MileageTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            startName:'',
            endName:'',
            startCoords:'',
            endCoords:'',
            bookmarkCards:[], //abizcar_북마크의 정보를 담을 배열
            selectedBookmark:'', //북마크 정보 저장할 상태변수
            content:[], //하위 컴포넌트로의 전달 등 여러기능함
            coordinateInfo: '', //위도경도가 포함된 정보를 담을 변수인데... bookmarkCards에서 충분할듯? 
        };
    }
    
    /*
            //1. 드롭다운 메뉴에는 북마크된것들이 일단 들어가 있을 것임.
            //2. 출발지, 도착지 각각 골라서 "검색 버튼"을 누를테니까.. 출발지, 도착지 2개의 값이 들어올듯
            //2-1 검색버튼은 시간조회 버튼이랑 같은말일듯. 어차피 왼쪽 카드리스트를 눌러서 이미 저장되어있는 값 넣기
            //3. 상세주소의 텍스트필드는 출발지는 START_FG, 목적지는 END_FG 가 입력되어야한다. (설계서 보니까 틀린듯?)
            //3-1 일단 addr1 에 위도경도를 넣어뒀으니 이 것의 값을 변환해서 넣어야함
            //4. 무료우선과 거리우선은 정해진 거리이다(시간은 정해지지 않지만) 2개는 고정값, 실시간 스크래핑정보는 1개이다.

            //카드리스트: START_FG -> END_FG //아래줄) START_ADDR -> END_ADDR (설계서 사진) // 가장오른쪽) 거리

            select * from abizcar_bookmark
            where =

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

            // <MileageTableView
            //     startName="서울특별시 종로구 종로5가"     //달라도됨
            //     endName="더존비즈온"                     //달라도됨
            //     startCoordinate="127.0036,37.570633"    //다르면안됨
            //     endCoordinate="127.6378104,37.7563948"  //다르면안됨
            //     placeIdNum="12288842"                   //달라도되는듯
            // />
<div>
    
</div>


        );
    }
}

export default MileageTable;