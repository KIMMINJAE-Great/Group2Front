import React, { Component } from 'react';
import axios from 'axios';

class RouteDistanceAndDuration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        try {
            const response = await axios.get('https://map.naver.com/v5/api/dir/findcar', {
                params: {
                    start: '127.0036,37.570633',
                    name: '서울특별시 종로구 종로5가',
                    address: '1',
                    goal: '127.6378104,37.7563948',
                    placeid: '12288842',
                    name: '더존비즈온',
                    output: 'json',
                    crs: 'EPSG:4326',
                    //...
                },
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    // 필요한 경우 다른 헤더들도 추가
                },
            });
            this.setState({ data: response.data });
        } catch (error) {
            console.error("Error fetching the data: ", error);
        }
    };

    render() {
      const { data } = this.state;

      const distanceInKm = data && Math.round(data.route["3,0,0,0,0,0"][0].summary.distance / 1000); // meters to km, then rounded
      const durationInMinutes = data && Math.round(data.route["3,0,0,0,0,0"][0].summary.duration / 1000 / 60); // milliseconds to minutes

      return (
          <div>
              {data ? (
                  <div>
                      <p>Distance: {distanceInKm} km</p>
                      <p>Duration: {durationInMinutes} minutes</p>
                  </div>
              ) : <p>Loading...</p>}
          </div>
      );
    }
}

export default RouteDistanceAndDuration;