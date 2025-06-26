import React, { useState } from 'react';
import styles from '../styles/DashboardPanel.module.css';

const overviewData = [
  { title: '在途物料', value: 769, unit: '' },
  { title: '物料货值', value: 0.42, unit: '亿' },
  { title: '在途制品', value: 120, unit: '' },
  { title: '在制品货值', value: 150.9, unit: '万' },
  { title: '今日在途', value: 3, unit: '' },
  { title: '今日到达', value: 15, unit: '' },
];

const monitorList = [
  { type: 'danger', text: '货车异常预警: PH01984于2024年XX月XX日XX:XX:XX从上海浦东园区...' },
  { type: 'warning', text: '货车风险预警: PA01984于2024年XX月XX日 在上海浦东起始区, 原...' },
  { type: 'success', text: '货车动态正常: PA01983于2024年XX月XX日XX:XX:XX从上海浦东园区...' },
  { type: 'success', text: '货车动态正常: PA01984于2024年XX月XX日XX:XX:XX从上海浦东园区...' },
  { type: 'success', text: '货车动态正常: PA01983于2024年XX月XX日XX:XX:XX从上海浦东园区...' },
];

const pieData = [
  { name: '在途', value: 41523850 },
  { name: '在制', value: 15094015 },
];

const trendData = {
  x: ['2023-2', '2023-3', '2023-4', '2023-5', '2023-6', '2023-7'],
  bar: [80, 60, 50, 40, 60, 80],
  line1: [60, 50, 40, 30, 40, 60],
  line2: [70, 60, 50, 40, 50, 70],
};

export default function DashboardPanel() {
  const [timeType, setTimeType] = useState('月');
  return (
    <div className={styles.dashboardRoot}>
      <div className={styles.dashboardCards}>
        {/* 概况卡片 */}
        <div className={styles.dashboardCard}>
          <div className={styles.overviewHeader}>
            <span>一司两地概况</span>
            <div className={styles.timeToggle}>
              {['日', '月', '年'].map(t => (
                <button
                  key={t}
                  className={timeType === t ? styles.active : ''}
                  onClick={() => setTimeType(t)}
                >{t}</button>
              ))}
            </div>
          </div>
          <div className={styles.overviewCardsRow}>
            {overviewData.map((item, idx) => (
              <div className={styles.overviewCard} key={idx}>
                <div className={styles.cardValue}>{item.value}<span className={styles.unit}>{item.unit}</span></div>
                <div className={styles.cardTitle}>{item.title}</div>
              </div>
            ))}
          </div>
        </div>
        {/* 监测+比例卡片并排 */}
        <div className={styles.dashboardRow}>
          <div className={styles.dashboardCard + ' ' + styles.monitorCard}>
            <div className={styles.monitorTitle}>智能监测</div>
            <ul className={styles.monitorList}>
              {monitorList.map((item, idx) => (
                <li key={idx} className={styles[item.type]}>{item.text}</li>
              ))}
            </ul>
          </div>
          <div className={styles.dashboardCard + ' ' + styles.pieCard}>
            <div className={styles.pieTitle}>流转金额比例</div>
            <div className={styles.pieChartPlaceholder}>
              <svg width="160" height="160">
                <circle cx="80" cy="80" r="64" stroke="#00eaff" strokeWidth="24" fill="none" strokeDasharray="302 100" strokeDashoffset="0"/>
                <circle cx="80" cy="80" r="64" stroke="#1e2a3a" strokeWidth="24" fill="none" strokeDasharray="100 302" strokeDashoffset="302"/>
              </svg>
              <div className={styles.pieCenterText}>
                <div>在途</div>
                <div style={{fontSize:20, fontWeight:'bold'}}>96.7%</div>
              </div>
            </div>
            <div className={styles.pieLegend}>
              <span style={{color:'#00eaff'}}>在途转料</span>
              <span style={{color:'#6c7a89', marginLeft:16}}>在制专制品</span>
            </div>
          </div>
        </div>
        {/* 趋势卡片 */}
        <div className={styles.dashboardCard + ' ' + styles.trendCard}>
          <div className={styles.trendTitle}>工单趋势总览</div>
          <div className={styles.trendChartPlaceholder}>
            <svg width="800" height="160">
              {/* 柱状图 */}
              <rect x="60" y="60" width="32" height="80" fill="#00eaff" rx="8" />
              <rect x="120" y="80" width="32" height="60" fill="#1e90ff" rx="8" />
              <rect x="180" y="100" width="32" height="40" fill="#00eaff" rx="8" />
              <rect x="240" y="90" width="32" height="50" fill="#1e90ff" rx="8" />
              <rect x="300" y="70" width="32" height="70" fill="#00eaff" rx="8" />
              <rect x="360" y="60" width="32" height="80" fill="#1e90ff" rx="8" />
              {/* 折线图1 */}
              <polyline points="76,100 136,110 196,120 256,130 316,110 376,100" fill="none" stroke="#ffea00" strokeWidth="4" />
              {/* 圆点 */}
              <circle cx="76" cy="100" r="5" fill="#ffea00" />
              <circle cx="136" cy="110" r="5" fill="#ffea00" />
              <circle cx="196" cy="120" r="5" fill="#ffea00" />
              <circle cx="256" cy="130" r="5" fill="#ffea00" />
              <circle cx="316" cy="110" r="5" fill="#ffea00" />
              <circle cx="376" cy="100" r="5" fill="#ffea00" />
              {/* 折线图2 */}
              <polyline points="76,120 136,130 196,140 256,150 316,130 376,120" fill="none" stroke="#ff5e5e" strokeWidth="3" />
              {/* 圆点2 */}
              <circle cx="76" cy="120" r="4" fill="#ff5e5e" />
              <circle cx="136" cy="130" r="4" fill="#ff5e5e" />
              <circle cx="196" cy="140" r="4" fill="#ff5e5e" />
              <circle cx="256" cy="150" r="4" fill="#ff5e5e" />
              <circle cx="316" cy="130" r="4" fill="#ff5e5e" />
              <circle cx="376" cy="120" r="4" fill="#ff5e5e" />
              {/* 图例 */}
              <rect x="500" y="20" width="18" height="18" fill="#00eaff" rx="4" />
              <text x="525" y="34" fill="#b0c4d8" fontSize="15">进出口额</text>
              <rect x="600" y="20" width="18" height="18" fill="#1e90ff" rx="4" />
              <text x="625" y="34" fill="#b0c4d8" fontSize="15">当年累计</text>
              <circle cx="540" cy="60" r="7" fill="#ffea00" />
              <text x="555" y="65" fill="#b0c4d8" fontSize="15">同比</text>
              <circle cx="600" cy="60" r="7" fill="#ff5e5e" />
              <text x="615" y="65" fill="#b0c4d8" fontSize="15">环比</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
} 