import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';  // Mapbox에서 발급받은 토큰을 여기에 넣어주세요.

class Acd1011 extends Component {
  mapContainer = React.createRef();

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [127.0276, 37.5042],  // 초기 지도 중심 좌표, 이 부분을 변경해야할 수 있습니다.
      zoom: 10
    });

    map.addControl(
      new MapboxDirections({
        accessToken: mapboxgl.accessToken
      }),
      'top-left'
    );
  }

  render() {
    return <div ref={this.mapContainer} style={{ width: "100%", height: "100vh" }} />;
  }
}

export default Acd1011;