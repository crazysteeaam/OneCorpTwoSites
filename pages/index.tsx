import dynamic from 'next/dynamic';
import React, { useState } from 'react';
// import MapRoute from '../components/MapRoute';
// import MapMarkers from '../components/MapMarkers';
import InfoCard from '../components/InfoCard';
import WarningModal from '../components/WarningModal';
import DashboardPanel from '../components/DashboardPanel';
import TransportListCard from '../components/TransportListCard';
import TransportDetailCard from '../components/TransportDetailCard';
import styles from '../styles/Home.module.css';

// 动态引入高德地图组件，避免SSR问题
const AMapComponent = dynamic(() => import('../components/AMapComponent'), { ssr: false });

// 导入 mockData 以便详情卡片演示
import { default as transportListData } from '../components/TransportListCard';

export default function Home() {
  const [selectedRouteIdx, setSelectedRouteIdx] = useState<number | null>(null);
  return (
    <div className={styles.container}>
      {selectedRouteIdx === null && <DashboardPanel />}
      <div className={styles.mapBg}>
        <AMapComponent selectedRouteIdx={selectedRouteIdx} setSelectedRouteIdx={setSelectedRouteIdx} />
      </div>
      {/* <MapRoute /> */}
      {/* <MapMarkers /> */}
      <InfoCard />
      {selectedRouteIdx === null ? <TransportListCard onSelect={setSelectedRouteIdx} /> : <TransportDetailCard />}
      {selectedRouteIdx !== null && <WarningModal />}
    </div>
  );
}