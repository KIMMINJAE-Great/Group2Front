import React, { Component } from 'react';

class MileageTableView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRoute: null
        };
    }    

    handleRouteClick = (route) => {
        this.setState({ selectedRoute: route });
        this.props.callback.handleCallBackMileageData(route.distance);  //Ace1010.js에 있는 콜백함수 실행!
        console.log("viewTest에서 콜백 들어갈값 route.distance:" +route.distance);
    }

    render() {
        const { distanceRealtime, distanceBased, distanceFree } = this.props;

        const routes = [
            { id: 1, name: "실시간", distance: distanceRealtime },
            { id: 2, name: "최단", distance: distanceBased },
            { id: 3, name: "무료", distance: distanceFree }
        ];

        return (
            <div>
                <table style={{ marginTop: "5px", width:"450px" }} border="1">
                    <thead>
                        <tr>
                            <th style={{ width: "70px" }}>No</th>
                            <th style={{ width: "148px" }}>경로</th>
                            <th style={{ width: "239px" }}>거리(km)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {routes.map(route => (
                            <tr key={route.id} onClick={() => this.handleRouteClick(route)}>
                                <td style={{ textAlign: "center", height:"50px" }}>{route.id}</td>
                                <td style={{ textAlign: "center", height:"50px" }}>{route.name}</td>
                                <td style={{ textAlign: "center", height:"50px" }}>{route.distance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {this.state.selectedRoute && <div>선택된 경로: {this.state.selectedRoute.name}</div>}
            </div>
        );
    }
}

export default MileageTableView;