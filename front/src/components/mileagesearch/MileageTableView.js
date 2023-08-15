import React, { Component } from 'react';
import axios from 'axios';

class MileageTableView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: false
        };
    }


    render() {

   
    const {distanceRealtime, distanceBased, distanceFree} = this.props;
      return (                    
            
                <table style= {{marginTop:"5px"}} border="1">
                    <thead>
                        <tr>
                            <th style={{width:"50px"}}> No</th>
                            <th style={{width:"118px"}}>경로</th>
                            <th style={{width:"209px"}}>거리(km)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{textAlign:"center"}}>1</td>
                            <td style={{textAlign:"center"}}>실시간</td>
                            <td style={{textAlign:"center"}}>{distanceRealtime}</td>
                        </tr>
                        <tr>
                            <td style={{textAlign:"center"}}>2</td>
                            <td style={{textAlign:"center"}}>최단</td>
                            <td style={{textAlign:"center"}}>{distanceBased}</td>
                        </tr>
                        <tr>
                            <td style={{textAlign:"center"}}>3</td>
                            <td style={{textAlign:"center"}}>무료</td>
                            <td style={{textAlign:"center"}}>{distanceFree}</td>
                        </tr>
                    </tbody>
                </table>                        
           

      );
    }
}

export default MileageTableView;