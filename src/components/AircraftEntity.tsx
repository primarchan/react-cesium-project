import React from 'react';
import { Entity, ModelGraphics } from 'resium';
import * as Cesium from "cesium";
import {Color, ColorBlendMode} from "cesium";

interface AircraftEntityProps {
    id: string;
    name: string;
    longitude: number;
    latitude: number;
    altitude: number;
}

const AircraftEntity: React.FC<AircraftEntityProps> = ({ id, name, longitude, latitude, altitude }) => {
    return (
        <Entity
            name={name} // InfoBox에 표시할 이름
            position={Cesium.Cartesian3.fromDegrees(longitude, latitude, altitude)} // 항공기 위치
            description={`<h2>${name}</h2><p>ID: ${id}</p>`} // InfoBox에 표시할 설명
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