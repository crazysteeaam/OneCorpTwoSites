import React, { useState, useMemo } from 'react';
import styles from '../styles/TransportListCard.module.css';

// 示例运输数据类型
type TransportItem = {
  id: string;
  from: string;
  to: string;
  code: string;
  plate: string;
  weight: string;
  status: string;
  depart: string;
  arrive?: string;
};

const mockData: TransportItem[] = [
  {
    id: '1',
    from: 'COMAC浦东基地',
    to: 'COMAC大场基地',
    code: '010010',
    plate: '沪A01983',
    weight: '200kg',
    status: '运输中',
    depart: '14:00',
    arrive: '-',
  },
  {
    id: '2',
    from: 'COMAC大场基地',
    to: 'COMAC浦东基地',
    code: '010011',
    plate: '沪A01984',
    weight: '180kg',
    status: '已到达',
    depart: '13:20',
    arrive: '15:10',
  },
  {
    id: '3',
    from: 'COMAC浦东基地',
    to: 'COMAC大场基地',
    code: '010012',
    plate: '沪A01985',
    weight: '220kg',
    status: '运输中',
    depart: '12:30',
    arrive: '-',
  },
  {
    id: '4',
    from: 'COMAC大场基地',
    to: 'COMAC浦东基地',
    code: '010013',
    plate: '沪A01986',
    weight: '210kg',
    status: '运输中',
    depart: '11:00',
    arrive: '-',
  },
  {
    id: '5',
    from: 'COMAC浦东基地',
    to: 'COMAC大场基地',
    code: '010014',
    plate: '沪A01987',
    weight: '250kg',
    status: '已到达',
    depart: '10:00',
    arrive: '12:00',
  },
  {
    id: '6',
    from: 'COMAC大场基地',
    to: 'COMAC浦东基地',
    code: '010015',
    plate: '沪A01988',
    weight: '190kg',
    status: '运输中',
    depart: '09:30',
    arrive: '-',
  },
  {
    id: '7',
    from: 'COMAC浦东基地',
    to: 'COMAC大场基地',
    code: '010016',
    plate: '沪A01989',
    weight: '230kg',
    status: '运输中',
    depart: '08:45',
    arrive: '-',
  },
  {
    id: '8',
    from: 'COMAC大场基地',
    to: 'COMAC浦东基地',
    code: '010017',
    plate: '沪A01990',
    weight: '170kg',
    status: '已到达',
    depart: '07:50',
    arrive: '09:20',
  },
  {
    id: '9',
    from: 'COMAC浦东基地',
    to: 'COMAC大场基地',
    code: '010018',
    plate: '沪A01991',
    weight: '260kg',
    status: '运输中',
    depart: '07:00',
    arrive: '-',
  },
  {
    id: '10',
    from: 'COMAC大场基地',
    to: 'COMAC浦东基地',
    code: '010019',
    plate: '沪A01992',
    weight: '200kg',
    status: '运输中',
    depart: '06:30',
    arrive: '-',
  },
  {
    id: '11',
    from: 'COMAC浦东基地',
    to: 'COMAC大场基地',
    code: '010020',
    plate: '沪A01993',
    weight: '240kg',
    status: '已到达',
    depart: '05:40',
    arrive: '07:10',
  },
  {
    id: '12',
    from: 'COMAC大场基地',
    to: 'COMAC浦东基地',
    code: '010021',
    plate: '沪A01994',
    weight: '210kg',
    status: '运输中',
    depart: '05:00',
    arrive: '-',
  },
  {
    id: '13',
    from: 'COMAC浦东基地',
    to: 'COMAC大场基地',
    code: '010022',
    plate: '沪A01995',
    weight: '220kg',
    status: '运输中',
    depart: '04:20',
    arrive: '-',
  },
  {
    id: '14',
    from: 'COMAC大场基地',
    to: 'COMAC浦东基地',
    code: '010023',
    plate: '沪A01996',
    weight: '180kg',
    status: '已到达',
    depart: '03:30',
    arrive: '05:00',
  },
  {
    id: '15',
    from: 'COMAC浦东基地',
    to: 'COMAC大场基地',
    code: '010024',
    plate: '沪A01997',
    weight: '250kg',
    status: '运输中',
    depart: '02:40',
    arrive: '-',
  },
  {
    id: '16',
    from: 'COMAC大场基地',
    to: 'COMAC浦东基地',
    code: '010025',
    plate: '沪A01998',
    weight: '200kg',
    status: '运输中',
    depart: '01:50',
    arrive: '-',
  },
  {
    id: '17',
    from: 'COMAC浦东基地',
    to: 'COMAC大场基地',
    code: '010026',
    plate: '沪A01999',
    weight: '210kg',
    status: '已到达',
    depart: '01:00',
    arrive: '02:30',
  },
  {
    id: '18',
    from: 'COMAC大场基地',
    to: 'COMAC浦东基地',
    code: '010027',
    plate: '沪A02000',
    weight: '230kg',
    status: '运输中',
    depart: '00:20',
    arrive: '-',
  },
  {
    id: '19',
    from: 'COMAC浦东基地',
    to: 'COMAC大场基地',
    code: '010028',
    plate: '沪A02001',
    weight: '220kg',
    status: '运输中',
    depart: '23:30',
    arrive: '-',
  },
  {
    id: '20',
    from: 'COMAC大场基地',
    to: 'COMAC浦东基地',
    code: '010029',
    plate: '沪A02002',
    weight: '190kg',
    status: '已到达',
    depart: '22:40',
    arrive: '00:10',
  },
];

export default function TransportListCard({ data = mockData, onSelect }: { data?: TransportItem[], onSelect?: (idx: number) => void }) {
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = useMemo(() => {
    return data.filter(item => {
      const q = search.trim();
      if (!q) return true;
      return (
        item.plate.includes(q) ||
        item.code.includes(q) ||
        item.status.includes(q) ||
        item.from.includes(q) ||
        item.to.includes(q)
      );
    });
  }, [search, data]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortAsc) {
        return a.depart.localeCompare(b.depart);
      } else {
        return b.depart.localeCompare(a.depart);
      }
    });
  }, [filtered, sortAsc]);

  return (
    <div className={styles.transportListCard}>
      <div className={styles.header}>
        <span>运输列表</span>
        <span className={styles.sortTip} style={{cursor:'pointer'}} onClick={()=>setSortAsc(v=>!v)}>
          按出发时间{sortAsc ? '↑' : '↓'}排序
        </span>
      </div>
      <div className={styles.filterRow}>
        <select className={styles.select} disabled><option>车牌号</option></select>
        <input className={styles.input} placeholder="请输入搜索" value={search} onChange={e=>setSearch(e.target.value)} />
        <button className={styles.searchBtn} onClick={()=>setSearch('')}>清空</button>
      </div>
      <div className={styles.listWrap} style={{maxHeight: '420px'}}>
        {sorted.slice(0, 20).map((item, idx) => (
          <div className={styles.card} key={item.id} onClick={()=>onSelect && onSelect(idx)} style={{cursor: onSelect ? 'pointer' : undefined}}>
            <div className={styles.iconWrap}>
              <img src="/truck.png" alt="truck" className={styles.truckIcon} />
            </div>
            <div className={styles.infoWrap}>
              <div className={styles.title}>{item.from} - {item.to}</div>
              <div className={styles.row}><span>运输编号</span>{item.code}<span style={{marginLeft:16}}>状态</span>{item.status}</div>
              <div className={styles.row}><span>车牌</span>{item.plate}<span style={{marginLeft:16}}>实际出发</span>{item.depart}</div>
              <div className={styles.row}><span>运输重量</span>{item.weight}<span style={{marginLeft:16}}>实际到达</span>{item.arrive || '-'}</div>
            </div>
            <div className={styles.moreBtn}>...</div>
          </div>
        ))}
        {sorted.length === 0 && <div style={{color:'#b0c4d8',textAlign:'center',marginTop:32}}>无匹配数据</div>}
      </div>
    </div>
  );
} 