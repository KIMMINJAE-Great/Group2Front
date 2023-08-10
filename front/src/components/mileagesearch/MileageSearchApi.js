import React, { Component } from 'react';
import axios from 'axios';

class MileageSearchApi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }

    componentDidMount() {
        this.MapData();
    }

    MapData = async () => {
        try {
            const response = await axios.get('https://map.naver.com/v5/api/dir/findcar', {
                params: {
                    start: this.props.startCoordinate,//start
                    name: this.props.startName,  //start
                    address: '1',
                    goal: this.props.endCoordinate, //end
                    placeid: this.props.placeIdNum,
                    name: this.props.endName, //end
                    output: 'json',
                    crs: 'EPSG:4326',
                    // mainoption: 'traoptimal,avoidhipassonly:traoptimal,multiroute,avoidhipassonly:traoptimal,avoidtoll,avoidhipassonly:traoptdist,avoidhipassonly',
                },
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    
                },
            });
            this.setState({ data: response.data });
        } catch (error) {
            console.error("에러발생", error);
        }
    };

    render() {
      const { data } = this.state;

      const distance = data && Math.round(data.route["3,0,0,0,0,0"][0].summary.distance / 1000); //km
      const duration = data && Math.round(data.route["3,0,0,0,0,0"][0].summary.duration / 1000 / 60); //분

      
      return (
            <div>
                {data ? (
                    <div>
                        <p>Distance: {distance} km</p>
                        <p>Duration: {duration} minutes</p>
                        <br></br>
                      
                        {data ? <div>{JSON.stringify(data)}</div> : <p>Loading...</p>}
                    
                    </div>
                ) : <p>검색 실패</p>}
            </div>
      );
    }
}

export default MileageSearchApi;