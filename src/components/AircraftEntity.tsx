import React, {useEffect} from 'react';
import {Entity, ModelGraphics} from 'resium';
import * as Cesium from "cesium";
import {Cartesian3, Color, ColorBlendMode, JulianDate, SampledPositionProperty} from "cesium";
import {AircraftPosition} from "../data/mockData.ts";

interface AircraftEntityProps {
    id: string;
    name: string;
    positions: AircraftPosition[]; // 실시간 위치 데이터 배열
}

const AircraftEntity: React.FC<AircraftEntityProps> = ({ id, name, positions }) => {
    // 시간에 따른 위치를 관리하는 SampledPositionProperty 생성
    const positionProperty = new SampledPositionProperty();

    useEffect(() => {
        // 위치 데이터를 SampledPositionProperty에 추가
        positions.forEach((pos) => {
           const time = JulianDate.fromIso8601(pos.time); // 시간 변환
           const position = Cartesian3.fromDegrees(pos.longitude, pos.latitude, pos.altitude); // 위치 변환
           positionProperty.addSample(time, position); // 샘플 추가
        });
    }, [positions]);

    return (
        <Entity
            name={name} // InfoBox에 표시할 이름
            position={positionProperty} // 항공기의 시간 기반 위치
            description={`<h2>${name}</h2><p>ID: ${id}</p>`} // InfoBox 설명
            path={{
                resolution: 1,         // 경로 샘플링 간격
                material: Color.RED,   // 경로 색상
                width: 2,              // 경로 두께
                leadTime: 0,           // 미래 경로 시간
                trailTime: 60,         // 과거 경로 시간
            }}
        >
            <ModelGraphics
                uri="/Cesium/Models/CesiumAir/Cesium_Air.glb" // 모델 경로
                scale={2.0} // 크기 2배
                minimumPixelSize={64} // 최소 크기
                maximumScale={300} // 최대 크기
                color={Color.YELLOW} // 색상 변경
                colorBlendMode={ColorBlendMode.REPLACE} // 색상 혼합 모드
                silhouetteColor={Color.RED} // 외곽선 색상
                silhouetteSize={3.0} // 외곽선 두께
                runAnimations={true} // 모델 애니메이션 실행
                shadows={Cesium.ShadowMode.ENABLED} // 그림자 활성화
            />
        </Entity>
    );
};

export default AircraftEntity;