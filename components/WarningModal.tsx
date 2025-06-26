import React from 'react';

export default function WarningModal() {
  return (
    <div style={{
      position: 'absolute', left: 40, bottom: 40, /* transform: 'translateX(-50%)', */
      width: 800, background: '#222c', borderRadius: 10, color: '#fff', padding: 24, zIndex: 30
    }}>
      <div style={{ fontWeight: 'bold', color: '#ff0', fontSize: 18 }}>货车风险预警：</div>
      <div style={{ margin: '8px 0' }}>沪A01984 于 2024年10月24日 13:53:12 在上海浦东耗时较平均时间长。</div>
      <div>AI分析原因：前方其他车辆发生了交通事故，交通拥堵。</div>
      <div style={{ marginTop: 16, textAlign: 'right' }}>
        <button style={{ marginRight: 12, padding: '6px 18px', borderRadius: 6, border: 'none', background: '#555', color: '#fff' }}>关闭警告</button>
        <button style={{ background: '#09f', color: '#fff', padding: '6px 18px', borderRadius: 6, border: 'none' }}>处理</button>
      </div>
    </div>
  );
} 