import './App.css'
import {Viewer} from 'resium';
import { createWorldTerrainAsync, Cartesian3, Math as CesiumMath } from 'cesium';
import React, {useEffect, useRef, useState} from 'react';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import AircraftEntity from './components/AircraftEntity';
import {AircraftPosition} from "./data/mockData.ts";

const App: React.FC = () => {
    const [terrainProvider, setTerrainProvider] = useState<any>(null);
    const viewerRef = useRef<any>(null); // Viewer의 ref 생성
    const [realTimeData, setRealTimeData] = useState<AircraftPosition[]>([]);

    // 초기 카메라 위치 설정
    const initialCameraPosition = {
        longitude: 126.4407,                // 인천국제공항 경도
        latitude: 37.4602,                  // 인천국제공항 위도
        altitude: 50000,                    // 고도
        heading: CesiumMath.toRadians(0),   // 북쪽을 향함
        pitch: CesiumMath.toRadians(-90),   // 지면을 향해 약 30도 아래
        roll: 0.0,                          // 회전 없음
    };

    // 지형 데이터를 비동기적으로 가져오기
    useEffect(() => {
        (async () => {
            const terrain = await createWorldTerrainAsync(); // Cesium Ion 기본 지형 가져오기
            setTerrainProvider(terrain); // 지형 데이터를 상태에 저장
        })();
    }, []);

    // 실시간 데이터를 모의로 추가
    useEffect(() => {
        const mockData: AircraftPosition[] = [
            {
                time: new Date().toISOString(),
                longitude: 126.4407,
                latitude: 37.4602,
                altitude: 10000,
            },
        ];

        const interval = setInterval(() => {
            const lastPoint = mockData[mockData.length - 1];
            const newPoint = {
                time: new Date(Date.now() + 60000).toISOString(), // 1분 후 데이터
                longitude: lastPoint.longitude + 0.01, // 경도 증가
                latitude: lastPoint.latitude + 0.01, // 위도 증가
                altitude: lastPoint.altitude + 500, // 고도 증가
            };
            mockData.push(newPoint);
            setRealTimeData([...mockData]); // 상태 업데이트
        }, 2000);

        return () => clearInterval(interval); // 클린업
    }, []);


    // Viewer가 렌더링된 후 초기 카메라 위치 설정
    useEffect(() => {
        if (viewerRef.current && terrainProvider) {
            const viewer = viewerRef.current.cesiumElement; // Viewer 객체 접근
            if (viewer) {
                viewer.scene.camera.setView({
                    destination: Cartesian3.fromDegrees(
                        initialCameraPosition.longitude,
                        initialCameraPosition.latitude,
                        initialCameraPosition.altitude
                    ),
                    orientation: {
                        heading: initialCameraPosition.heading,
                        pitch: initialCameraPosition.pitch,
                        roll: initialCameraPosition.roll,
                    },
                });
            }
        }
    }, [terrainProvider]); // terrainProvider가 설정된 후 실행

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            {terrainProvider ? (
            <Viewer
                full
                ref={viewerRef} //Viewer에 ref 연결
                terrainProvider={terrainProvider} // 지형 데이터 적용
                animation={true} // 애니메이션 UI
                timeline={true} // 타임라인 UI
                baseLayerPicker={true} // 기본 레이어 선택 UI
                geocoder={true} // 주소 검색 UI
                homeButton={true} // 홈 버튼
                sceneModePicker={true} // 장면 모드 선택 UI
                navigationHelpButton={true} // 네비게이션 도움말 버튼
            >
                {/* 실시간 데이터로 항공기와 경로 표시 */}
                <AircraftEntity
                    id="A1"
                    name="Flight ICN-001"
                    positions={realTimeData}
                />
            </Viewer>
            ) : (
                <div>Loading terrain...</div> // 지형 데이터 로드 대기 메시지 (createWorldTerrainAsync는 비동기 함수이므로 지형 데이터가 준비되기 전에 Viewer가 렌더링 됩)
            )}
        </div>
    );

}

export default App;