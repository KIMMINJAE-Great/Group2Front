import React, { Component } from 'react';

class MileageTableViewTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: false,
            selectedRoute: null
        };
    }

    handleRouteClick = (route) => {
        this.setState({ selectedRoute: route });
        // 이 부분에 클릭 시 원하는 동작을 추가하실 수 있습니다.
        console.log(`선택된 경로: ${route.name}`);
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
                <table style={{ marginTop: "5px" }} border="1">
                    <thead>
                        <tr>
                            <th style={{ width: "50px" }}>No</th>
                            <th style={{ width: "118px" }}>경로</th>
                            <th style={{ width: "209px" }}>거리(km)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {routes.map(route => (
                            <tr key={route.id} onClick={() => this.handleRouteClick(route)}>
                                <td style={{ textAlign: "center" }}>{route.id}</td>
                                <td style={{ textAlign: "center" }}>{route.name}</td>
                                <td style={{ textAlign: "center" }}>{route.distance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {this.state.selectedRoute && <div>선택된 경로: {this.state.selectedRoute.name}</div>}
            </div>
        );
    }
}

export default MileageTableViewTest;