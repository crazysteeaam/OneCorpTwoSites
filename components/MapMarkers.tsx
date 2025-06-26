import React from 'react';

export default function MapMarkers() {
  return (
    <>
      {/* 大场基地 */}
      <div style={{
        position: 'absolute', left: 180, top: 120, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        <img src="/station.png" alt="station" style={{ width: 48 }} />
        <span style={{
          background: '#222c', color: '#fff', borderRadius: 8, padding: '2px 8px', marginTop: 4
        }}>大场基地</span>
      </div>
      {/* 车辆图标 */}
      <div style={{
        position: 'absolute', left: 600, top: 220, zIndex: 10
      }}>
        <img src="/truck.png" alt="truck" style={{ width: 40 }} />
      </div>
      {/* 浦东基地 */}
      <div style={{
        position: 'absolute', left: 1500, top: 500, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        <img src="/station.png" alt="station" style={{ width: 48 }} />
        <span style={{
          background: '#222c', color: '#fff', borderRadius: 8, padding: '2px 8px', marginTop: 4
        }}>浦东基地</span>
      </div>
    </>
  );
} 