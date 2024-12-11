export interface AircraftPosition {
    time: string;       // ISO 8601 형식의 시간 (예: "2024-12-11T10:00:00Z")
    longitude: number;  // 경도
    latitude: number;   // 위도
    altitude: number;   // 고도
}

export const mockRealTimeData: AircraftPosition[] = [
    {
        time: "2024-12-11T10:00:00Z",
        longitude: 126.4407,
        latitude: 37.4602,
        altitude: 10000,
    },
    {
        time: "2024-12-11T10:01:00Z",
        longitude: 126.4500,
        latitude: 37.4700,
        altitude: 12000,
    },
    {
        time: "2024-12-11T10:02:00Z",
        longitude: 126.4600,
        latitude: 37.4800,
        altitude: 15000,
    },
];
