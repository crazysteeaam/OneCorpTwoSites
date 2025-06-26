import React from 'react';

export default function InfoCard() {
  return (
    <div style={{
      position: 'absolute', top: 40, right: 40, width: 320, background: '#222a', borderRadius: 12, color: '#fff', padding: 20, zIndex: 20
    }}>
      <img src="/truck.png" alt="truck" style={{ width: 80 }} />
      <div style={{ fontWeight: 'bold', fontSize: 18, margin: '8px 0' }}>COMAC运输车</div>
      <div>车牌：沪A01984</div>
      <div>车型：COMAC轻型货车</div>
      <div>司机：张三</div>
      <div>当前状态：运输中</div>
      {/* 其他信息可补充 */}
    </div>
  );
} 