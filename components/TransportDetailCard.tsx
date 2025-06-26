import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/TransportDetailCard.module.css';
import { Steps } from 'antd';
import 'antd/dist/reset.css';

// 示例类型
export type TransportDetail = {
  from: string;
  to: string;
  code: string;
  plate: string;
  weight: string;
  status: string;
  depart: string;
  arrive?: string;
  materials: { code: string; name: string; qty: number }[];
  riskLevel: '高' | '中' | '低';
  progress: { label: string; time?: string; active?: boolean; done?: boolean; color?: string; img?: string; type?: string }[];
};

const mockDetail: TransportDetail = {
  from: 'COMAC浦东基地',
  to: 'COMAC大场基地',
  code: '010010',
  plate: '沪PEE3033',
  weight: '200kg',
  status: '运输中',
  depart: '14:00',
  arrive: '-',
  materials: [
    { code: '000000410000032320', name: '37框密封角盒G70', qty: 1 },
    { code: '00000041000081581', name: '连接片 5716C', qty: 2 },
  ],
  riskLevel: '中',
  progress: [
    { label: '出库装运', time: '2024/07/16 14:20:36', active: true, done: true, color: '#00ff66', type: 'img', img: '/progress1.png' },
    { label: '出库扫码', time: '2024/07/16 14:24:26', active: true, done: true, color: '#00ff66', type: 'video', img: '/progress2.mp4' },
    { label: '出库关门', type: 'img', img: '/progress3.jpg' },
    { label: '出卡', type: 'video', img: '/progress4.mp4' },
    { label: '进卡', type: 'img', img: '/progress5.jpg' },
    { label: '入库开门', type: 'img', img: '/progress6.jpg' },
    { label: '入库卸货', type: 'img', img: '/progress7.jpg' },
  ],
};

export default function TransportDetailCard({ detail = mockDetail }: { detail?: TransportDetail }) {
  // 计算当前进度
  const currentIdx = detail.progress.findLastIndex(p => p.done) + 1;
  const steps = detail.progress.map((step) => ({
    title: step.label,
    description: step.time,
    status: step.done ? 'finish' : undefined as 'finish' | undefined,
  }));
  const [previewIdx, setPreviewIdx] = React.useState<number | null>(null);

  return (
    <div className={styles.detailCard}>
      <div className={styles.header}>货物详情</div>
      <div className={styles.truckRow}>
        <img src="/truck.png" alt="truck" className={styles.truckImg} />
      </div>
      <div className={styles.routeTitle}>{detail.from} - {detail.to}</div>
      <div className={styles.infoRow}>
        <div>运输编号<br /><span>{detail.code}</span></div>
        <div>车牌<br /><span>{detail.plate}</span></div>
        <div>运输重量<br /><span>{detail.weight}</span></div>
        <div>状态<br /><span>{detail.status}</span></div>
        <div>实际出发<br /><span>{detail.depart}</span></div>
        <div>实际到达<br /><span>{detail.arrive || '-'}</span></div>
      </div>
      <hr className={styles.hr} />
      <div className={styles.sectionTitle}>当前状态</div>
      <div style={{margin: '16px 0 8px 0'}}>
        <Steps
          current={currentIdx}
          items={steps}
          labelPlacement="vertical"
          size="small"
          status="process"
          onChange={setPreviewIdx}
        />
      </div>
      {/* 图片/视频弹窗 */}
      {previewIdx !== null && detail.progress[previewIdx]?.img && ReactDOM.createPortal(
        <div style={{
          position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', zIndex: 2000,
          background: 'rgba(0,0,0,0.45)'
        }}>
          <div style={{
            background:'#222c', borderRadius:12, padding:32, minWidth:400, maxWidth:600, color:'#fff', boxShadow:'0 4px 32px #000a',
            position:'absolute', left:'50%', top:'50%', transform:'translate(-50%, -50%)'
          }}>
            <div style={{fontSize:20, fontWeight:'bold', marginBottom:8}}>视频追溯</div>
            <div style={{fontSize:15, marginBottom:8}}>{detail.progress[previewIdx].time || ''} {detail.progress[previewIdx].label}</div>
            {detail.progress[previewIdx].type === 'video' ? (
              <video src={detail.progress[previewIdx].img} controls style={{maxWidth:520, maxHeight:320, borderRadius:8, marginBottom:16, background:'#000'}} />
            ) : (
              <img src={detail.progress[previewIdx].img} alt="节点图片" style={{maxWidth:520, maxHeight:320, borderRadius:8, marginBottom:16}} />
            )}
            <div style={{textAlign:'right'}}>
              <button onClick={()=>setPreviewIdx(null)} style={{padding:'6px 24px', borderRadius:8, border:'none', background:'#555', color:'#fff', fontSize:16}}>关闭</button>
            </div>
          </div>
        </div>,
        typeof window !== 'undefined' ? document.body : null
      )}
      <div className={styles.sectionTitle} style={{marginTop:24}}>运输物料信息</div>
      <div className={styles.materialTable}>
        <div className={styles.materialHeader}>
          <div>物料编码</div>
          <div>名称</div>
          <div>数量</div>
        </div>
        {detail.materials.map((m, i) => (
          <div className={styles.materialRow} key={i}>
            <div>{m.code}</div>
            <div>{m.name}</div>
            <div>{m.qty}</div>
          </div>
        ))}
      </div>
      <div className={styles.sectionTitle} style={{marginTop:24,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span>货车安全风险预警等级</span>
        <span className={styles.riskLevel + ' ' + styles['risk' + detail.riskLevel]}>{detail.riskLevel}</span>
      </div>
    </div>
  );
} 