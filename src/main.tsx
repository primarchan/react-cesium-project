import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Ion } from 'cesium';

// Cesium 정적 리소스 경로 설정
(window as any).CESIUM_BASE_URL = '/Cesium';

// Cesium Ion Access Token 설정 (환경 변수 사용 시)
Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_ACCESS_TOKEN;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
