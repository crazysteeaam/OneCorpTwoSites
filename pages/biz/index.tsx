import React, { useState, useEffect } from 'react';
import { Steps, Timeline } from 'antd';
import 'antd/dist/reset.css';

// 白色友好风格
const pageStyle: React.CSSProperties = {
  maxWidth: 480, margin: '0 auto', background: '#f7f9fb', minHeight: '100vh', color: '#222', padding: 16, fontSize: 16
};
const cardStyle: React.CSSProperties = {
  background: '#fff', borderRadius: 12, padding: 18, marginBottom: 18, boxShadow: '0 2px 12px #e6eaf1'
};
const btnStyle: React.CSSProperties = {
  width: '100%', padding: '12px 0', background: 'linear-gradient(90deg,#1890ff 60%,#40a9ff 100%)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 18, fontWeight: 600, marginTop: 18, boxShadow: '0 2px 8px #1890ff22', cursor: 'pointer'
};
const stepActive = { background: '#1890ff', color: '#fff' };
const stepInactive = { background: '#e6eaf1', color: '#888' };

const steps = [
  '出库扫码'
];

// 模拟物料数据库
const MATERIAL_DB = [
  { code: '000000410000032320', name: '37框密封角盒G70', spec: 'G70', unit: '件' },
  { code: '00000041000081581', name: '连接片 5716C', spec: '5716C', unit: '件' },
  { code: '00000041000099999', name: '测试物料A', spec: 'A', unit: '箱' },
  { code: '00000041000088888', name: '测试物料B', spec: 'B', unit: '包' },
];

// 模拟数据库
const WMS_DB = [
  { code: 'YK001', type: '移库号', source: 'WMS', status: '待处理', materials: [MATERIAL_DB[0], MATERIAL_DB[1]] },
  { code: 'YK002', type: '移库号', source: 'WMS', status: '处理中', materials: [MATERIAL_DB[2]] },
];

const SAP_DB = [
  { code: 'PZ001', type: '49号凭证号', source: 'SAP', status: '待处理', materials: [MATERIAL_DB[0], MATERIAL_DB[1]] },
  { code: 'PZ002', type: '49号凭证号', source: 'SAP', status: '已完成', materials: [MATERIAL_DB[2]] },
  { code: 'DD001', type: '订单号', source: 'SAP', status: '待处理', materials: [MATERIAL_DB[0], MATERIAL_DB[1]], fo: ['FO.1', 'FO.2'] },
  { code: 'DD002', type: '订单号', source: 'SAP', status: '处理中', materials: [MATERIAL_DB[2]], fo: ['FO.3'] },
  { code: 'DD003', type: '订单号', source: 'SAP', status: '已完成', materials: [MATERIAL_DB[3]], fo: ['FO.4', 'FO.5'] },
];

const MOM_DB = [
  { code: 'FO.1', type: '系列号', source: 'MOM', status: '待处理', materials: [MATERIAL_DB[0]] },
  { code: 'FO.2', type: '系列号', source: 'MOM', status: '处理中', materials: [MATERIAL_DB[1]] },
  { code: 'FO.3', type: '系列号', source: 'MOM', status: '已完成', materials: [MATERIAL_DB[2]] },
  { code: 'FO.10', type: '系列号', source: 'MOM', status: '待处理', materials: [MATERIAL_DB[0], MATERIAL_DB[1]], fo: ['FO.10-1', 'FO.10-2'] },
];

function genOrderCode(seq: number) {
  const d = new Date();
  return `ORD${d.getFullYear()}${(d.getMonth()+1).toString().padStart(2,'0')}${d.getDate().toString().padStart(2,'0')}${d.getHours().toString().padStart(2,'0')}${d.getMinutes().toString().padStart(2,'0')}${d.getSeconds().toString().padStart(2,'0')}${seq.toString().padStart(3,'0')}`;
}

// 工单步骤名
const stepNames = [
  '出库扫码'
];

// 在 selectedItems 初始化时为每个物料加上数量字段
const addQtyToMaterials = (materials) => materials.map(m => ({ ...m, qty: 1 }));

export default function BizMobile() {
  const [step, setStep] = useState(0);
  // 工单信息
  const [order, setOrder] = useState({ code: '', dest: '大场基地', truck: '', materials: '' });
  // 输入信息
  const [inputType, setInputType] = useState('移库号');
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  // 历史工单
  const [orders, setOrders] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(true);
  const [historyIdx, setHistoryIdx] = useState<number|null>(null);
  // 工单序号
  const [orderSeq, setOrderSeq] = useState(1);
  const [showFoSelection, setShowFoSelection] = useState(false);
  const [currentFo, setCurrentFo] = useState<any>(null);
  const [selectedFo, setSelectedFo] = useState<string[]>([]);
  // 用于存储每个编码下物料的数量
  const [itemMaterials, setItemMaterials] = useState<any>({});
  // 在 BizMobile 组件内，增加系列号物料选择逻辑
  const [seriesMaterialSelect, setSeriesMaterialSelect] = useState<any[]>([]);

  // 初始化生成几个不同状态的历史工单
  useEffect(() => {
    if (orders.length === 0) {
      setOrders([
        {
          code: genOrderCode(1),
          dest: '大场基地',
          truck: '沪A12345',
          materials: [MATERIAL_DB[0], MATERIAL_DB[1]],
          photos: {
            door: { url: '', time: '2024-07-16 09:10:00' },
            arrive: { url: '', time: '2024-07-16 09:50:00' }
          },
          scanList: [MATERIAL_DB[0].code, MATERIAL_DB[1].code],
          time: '2024-07-16 09:00:00',
          status: '已完成',
          customsOutTime: '2024-07-16 09:20:00',
          customsInTime: '2024-07-16 09:40:00'
        },
        {
          code: genOrderCode(2),
          dest: '浦东基地',
          truck: '沪B54321',
          materials: [MATERIAL_DB[2]],
          photos: {
            door: { url: '', time: '2024-07-16 10:40:00' }
          },
          scanList: [],
          time: '2024-07-16 10:30:00',
          status: '处理中',
          customsOutTime: '2024-07-16 10:50:00',
          customsInTime: ''
        },
        {
          code: genOrderCode(3),
          dest: '大场基地',
          truck: '沪C88888',
          materials: [MATERIAL_DB[3]],
          photos: {},
          scanList: [MATERIAL_DB[3].code],
          time: '2024-07-16 11:20:00',
          status: '待处理',
          customsOutTime: '',
          customsInTime: ''
        }
      ]);
      setOrderSeq(4);
    }
  }, []);

  // 搜索并添加项目
  const handleAddItem = () => {
    const value = inputValue.trim();
    if (!value) return;

    let found;
    if (inputType === '移库号') {
      found = WMS_DB.find(m => m.code === value);
    } else if (inputType === '49号凭证号') {
      found = SAP_DB.find(m => m.code === value && m.type === '49号凭证号');
    } else if (inputType === '订单号') {
      found = SAP_DB.find(m => m.code === value && m.type === '订单号');
    } else if (inputType === '系列号') {
      found = MOM_DB.find(m => m.code === value);
      if (found) {
        setCurrentFo(found);
        setSeriesMaterialSelect(found.materials.map(m => m.code)); // 默认全选
        setShowFoSelection(true);
        return;
      }
    }

    if (found && !selectedItems.some(m => m.code === value)) {
      setSelectedItems(list => [...list, found]);
      setItemMaterials(prev => ({ ...prev, [found.code]: addQtyToMaterials(found.materials) }));
    }
    setInputValue('');
  };

  // 删除编码时同步删除物料表
  const handleRemoveItem = (code: string) => {
    setSelectedItems(list => list.filter(item => item.code !== code));
    setItemMaterials(prev => {
      const newObj = { ...prev };
      delete newObj[code];
      return newObj;
    });
  };

  // 确认系列号选择
  const handleFoConfirm = () => {
    if (currentFo && selectedFo.length > 0) {
      const foItems = selectedFo.map(fo => MOM_DB.find(m => m.code === fo)).filter(Boolean);
      setSelectedItems(list => [...list, ...foItems]);
      setShowFoSelection(false);
      setCurrentFo(null);
      setSelectedFo([]);
      setInputValue('');
    }
  };

  // 系列号物料选择弹窗确认
  const handleSeriesMaterialConfirm = () => {
    if (currentFo && seriesMaterialSelect.length > 0) {
      const selectedMaterials = currentFo.materials.filter(m => seriesMaterialSelect.includes(m.code));
      setSelectedItems(list => [...list, { ...currentFo, materials: selectedMaterials }]);
      setItemMaterials(prev => ({ ...prev, [currentFo.code]: addQtyToMaterials(selectedMaterials) }));
      setShowFoSelection(false);
      setCurrentFo(null);
      setSeriesMaterialSelect([]);
      setInputValue('');
    }
  };

  // 完成工单
  const handleFinish = () => {
    const newCode = genOrderCode(orderSeq);
    setOrders(list => [
      ...list,
      {
        ...order,
        code: newCode,
        items: selectedItems,
        time: new Date().toLocaleString(),
        status: '处理中'
      }
    ]);
    setOrder({ code: '', dest: '大场基地', truck: '', materials: '' });
    setSelectedItems([]);
    setInputValue('');
    setShowHistory(true);
  };

  // 步骤渲染
  if (showHistory) {
    return (
      <div style={pageStyle}>
        <h2 style={{textAlign:'center',margin:'18px 0 24px 0',fontWeight:800,fontSize:28,letterSpacing:2}}>历史工单</h2>
        {historyIdx === null ? (
          <>
            {orders.length === 0 && <div style={{textAlign:'center',color:'#888',margin:'32px 0',fontSize:20}}>暂无历史工单</div>}
            <div style={{display:'flex',flexWrap:'wrap',gap:24,justifyContent:'center'}}>
              {orders.map((o, i) => {
                // 业务流程步骤（含入库开门，入库开门和完成时间一致）
                const steps = [
                  { title: '创建', time: o.time },
                  { title: '出库关门', time: o.photos?.door?.time },
                  { title: '出卡', time: o.customsOutTime },
                  { title: '进卡', time: o.customsInTime },
                  { title: '入库开门', time: o.status === '已完成' ? (o.customsInTime || o.customsOutTime || o.time) : undefined },
                  { title: '完成', time: o.status === '已完成' ? (o.customsInTime || o.customsOutTime || o.time) : undefined }
                ];
                const currentStep = steps.findIndex(s => !s.time);
                const currentStepName = steps[(currentStep === -1 ? steps.length-1 : currentStep)].title;
                const handleClick = () => setHistoryIdx(i);
                return (
                  <div key={i} style={{...cardStyle, minWidth:340, maxWidth:420, boxShadow:'0 4px 24px #e6eaf1', borderLeft:'6px solid #1890ff', cursor:'pointer', transition:'box-shadow .2s'}} onClick={handleClick}>
                    <div style={{fontWeight:700,fontSize:20,marginBottom:6}}>{o.code}</div>
                    <div style={{fontSize:16,color:'#1890ff',marginBottom:4}}>运输目的地：{o.dest}</div>
                    <div style={{fontSize:15,color:'#555',marginBottom:4}}>货车车牌：{o.truck}</div>
                    <div style={{fontSize:14,color:'#888',marginBottom:8}}>创建时间：{o.time}</div>
                    <div style={{fontSize:16,color:'#1890ff',marginTop:8,fontWeight:700}}>当前环节：{currentStepName}</div>
                    <div style={{fontSize:15,color:'#1890ff',marginTop:4}}>当前状态：{o.status}</div>
                  </div>
                );
              })}
            </div>
            <button style={{...btnStyle,marginTop:32}} onClick={()=>setShowHistory(false)}>创建新工单</button>
          </>
        ) : (
          <div style={{...cardStyle, maxWidth:600, margin:'0 auto'}}>
            <div style={{fontWeight:800,fontSize:24,marginBottom:12}}>工单详情</div>
            <div style={{fontSize:17,marginBottom:6}}><b>工单编号：</b>{orders[historyIdx].code}</div>
            <div style={{fontSize:16,marginBottom:6}}><b>运输目的地：</b>{orders[historyIdx].dest}</div>
            <div style={{fontSize:16,marginBottom:6}}><b>货车车牌：</b>{orders[historyIdx].truck}</div>
            <div style={{fontSize:16,marginBottom:10}}><b>物料清单：</b></div>
            <table style={{width:'100%',margin:'8px 0 18px 0',background:'#f7f9fb',borderRadius:8,fontSize:16}}>
              <thead><tr style={{color:'#1890ff',fontWeight:700}}><td>编码</td><td>名称</td><td>规格</td><td>单位</td></tr></thead>
              <tbody>
                {orders[historyIdx].materials.map((m:any,i:number)=>(
                  <tr key={i}><td>{m.code}</td><td>{m.name}</td><td>{m.spec}</td><td>{m.unit}</td></tr>
                ))}
              </tbody>
            </table>
            <div style={{margin:'18px 0 8px 0',fontWeight:700}}>业务流程：</div>
            <Steps
              direction="vertical"
              size="small"
              current={(() => {
                const steps = [orders[historyIdx].time, orders[historyIdx].photos?.door?.time, orders[historyIdx].customsOutTime, orders[historyIdx].customsInTime, (orders[historyIdx].status === '已完成' ? (orders[historyIdx].customsInTime || orders[historyIdx].customsOutTime || orders[historyIdx].time) : undefined)];
                return steps.findIndex(t => !t) === -1 ? steps.length+1 : steps.findIndex(t => !t);
              })()}
              items={[
                { title: '创建', description: <span style={{color:'#1890ff'}}>{orders[historyIdx].time}</span> },
                { title: '出库关门', description: orders[historyIdx].photos?.door?.time ? <span style={{color:'#1890ff'}}>{orders[historyIdx].photos.door.time}</span> : <span style={{color:'#aaa'}}>待处理</span> },
                { title: '出卡', description: orders[historyIdx].customsOutTime ? <span style={{color:'#1890ff'}}>{orders[historyIdx].customsOutTime}</span> : <span style={{color:'#aaa'}}>待处理</span> },
                { title: '进卡', description: orders[historyIdx].customsInTime ? <span style={{color:'#1890ff'}}>{orders[historyIdx].customsInTime}</span> : <span style={{color:'#aaa'}}>待处理</span> },
                { title: '入库开门', description: orders[historyIdx].status === '已完成' ? <span style={{color:'#1890ff'}}>{orders[historyIdx].customsInTime || orders[historyIdx].customsOutTime || orders[historyIdx].time}</span> : <span style={{color:'#aaa'}}>待处理</span> },
                { title: '完成', description: orders[historyIdx].status === '已完成' ? <span style={{color:'#1890ff'}}>{orders[historyIdx].customsInTime || orders[historyIdx].customsOutTime || orders[historyIdx].time}</span> : <span style={{color:'#aaa'}}>待处理</span> }
              ]}
            />
            <div style={{margin:'18px 0 8px 0',fontWeight:700}}>关键时间节点：</div>
            <Timeline style={{marginBottom:18}}>
              <Timeline.Item color="blue">创建：{orders[historyIdx].time}</Timeline.Item>
              {orders[historyIdx].photos?.door?.time && <Timeline.Item color="blue">出库关门：{orders[historyIdx].photos.door.time}</Timeline.Item>}
              {orders[historyIdx].customsOutTime && <Timeline.Item color="blue">出卡：{orders[historyIdx].customsOutTime}</Timeline.Item>}
              {orders[historyIdx].customsInTime && <Timeline.Item color="blue">进卡：{orders[historyIdx].customsInTime}</Timeline.Item>}
              {orders[historyIdx].status === '已完成' && <Timeline.Item color="green">入库开门/完成：{orders[historyIdx].customsInTime || orders[historyIdx].customsOutTime || orders[historyIdx].time}</Timeline.Item>}
              <Timeline.Item color={orders[historyIdx].status === '已完成' ? 'green' : 'gray'}>{orders[historyIdx].status === '已完成' ? '工单已完成' : '工单未完成'}</Timeline.Item>
            </Timeline>
            <button style={btnStyle} onClick={()=>setHistoryIdx(null)}>返回列表</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <h2 style={{textAlign:'center',margin:'18px 0 24px 0',fontWeight:700,fontSize:22}}>一司两地业务系统</h2>
      <div style={{display:'flex',justifyContent:'center',gap:8,marginBottom:18}}>
        {steps.map((s,i)=>(
          <div key={i} style={{padding:'6px 12px',borderRadius:6,...(i===step?stepActive:stepInactive),fontWeight:i===step?700:400,fontSize:15,whiteSpace:'nowrap'}}>一司两地移库工单提交</div>
        ))}
      </div>
      <button style={{...btnStyle,background:'#fff',color:'#1890ff',border:'1.5px solid #1890ff',margin:'0 0 18px 0',boxShadow:'none'}} onClick={()=>setShowHistory(true)}>历史工单管理</button>
      <div style={cardStyle}>
        <div style={{fontWeight:600,fontSize:18,marginBottom:12}}>出库工单提交</div>
        <div>工单编号：<span style={{fontWeight:500,color:'#1890ff'}}>{genOrderCode(orderSeq)}</span></div>
        <div>目的地：
          <select value={order.dest} onChange={e=>setOrder(o=>({...o,dest:e.target.value}))} style={{width:'70%',margin:'6px 0',borderRadius:6,border:'1.5px solid #e6eaf1',padding:6}}>
            <option value="大场基地">大场基地</option>
            <option value="浦东基地">浦东基地</option>
          </select>
        </div>
        <div>货车车牌：<input value={order.truck} onChange={e=>setOrder(o=>({...o,truck:e.target.value}))} style={{width:'70%',margin:'6px 0',borderRadius:6,border:'1.5px solid #e6eaf1',padding:6}} /></div>
        <div>物料信息绑定：
          <div style={{display:'flex',gap:8,margin:'6px 0',alignItems:'center'}}>
            <select value={inputType} onChange={e=>setInputType(e.target.value)} style={{width:120,borderRadius:6,border:'1.5px solid #e6eaf1',padding:6}}>
              <option value="移库号">移库号</option>
              <option value="49号凭证号">49号凭证号</option>
              <option value="订单号">订单号</option>
              <option value="系列号">系列号</option>
            </select>
            <input value={inputValue} onChange={e=>setInputValue(e.target.value)} style={{flex:1,borderRadius:6,border:'1.5px solid #e6eaf1',padding:6}} placeholder={`输入${inputType}`} />
            <button style={{...btnStyle,width:90,padding:'6px 0',marginTop:0}} onClick={handleAddItem} disabled={!inputValue}>添加</button>
          </div>
          <table style={{width:'100%',margin:'8px 0',background:'#f7f9fb',borderRadius:6}}>
            <thead><tr style={{color:'#1890ff',fontWeight:600}}><td>类型</td><td>编码</td><td>操作</td></tr></thead>
            <tbody>
              {selectedItems.map((m,i)=>(
                <tr key={i}>
                  <td>{m.type}</td>
                  <td>{m.code}</td>
                  <td><button onClick={()=>handleRemoveItem(m.code)} style={{color:'#ff4d4f',background:'none',border:'none',cursor:'pointer'}}>删除</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedItems.length > 0 && (
            <div style={{marginTop:12}}>
              <div style={{fontWeight:600,marginBottom:8}}>物料清单：</div>
              {selectedItems.map(item => (
                <div key={item.code} style={{marginBottom:18,background:'#f7f9fb',borderRadius:6,padding:'8px 8px 2px 8px'}}>
                  <div style={{fontWeight:500,marginBottom:4}}>{item.type}：{item.code}</div>
                  <table style={{width:'100%',background:'#fff',borderRadius:6}}>
                    <thead><tr style={{color:'#1890ff',fontWeight:600}}><td>编码</td><td>名称</td><td>规格</td><td>单位</td><td>数量</td></tr></thead>
                    <tbody>
                      {itemMaterials[item.code]?.map((m,i)=>(
                        <tr key={i}>
                          <td>{m.code}</td>
                          <td>{m.name}</td>
                          <td>{m.spec}</td>
                          <td>{m.unit}</td>
                          <td>{m.qty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}
        </div>
        <button style={btnStyle} onClick={handleFinish} disabled={!order.truck||selectedItems.length===0}>提交工单</button>
      </div>

      {/* 测试用例提示 */}
      <div style={{...cardStyle, marginTop: 24, background: '#f0f7ff'}}>
        <div style={{fontWeight:600,fontSize:16,marginBottom:12,color:'#1890ff'}}>测试用例提示</div>
        <div style={{fontSize:14,color:'#666',lineHeight:1.6}}>
          <div style={{marginBottom:8}}><span style={{fontWeight:500}}>移库号：</span>YK001, YK002</div>
          <div style={{marginBottom:8}}><span style={{fontWeight:500}}>49号凭证号：</span>PZ001, PZ002</div>
          <div style={{marginBottom:8}}><span style={{fontWeight:500}}>订单号：</span>DD001, DD002, DD003</div>
          <div style={{marginBottom:8}}><span style={{fontWeight:500}}>系列号：</span>FO.1, FO.2, FO.3</div>
          <div style={{marginTop:12,color:'#1890ff'}}>提示：输入订单号后可以选择对应的分卡</div>
        </div>
      </div>

      {/* 系列号分卡选择弹窗 */}
      {showFoSelection && currentFo && inputType === '系列号' && (
        <div style={{
          position:'fixed',
          top:0,
          left:0,
          right:0,
          bottom:0,
          background:'rgba(0,0,0,0.5)',
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          zIndex:1000
        }}>
          <div style={{...cardStyle,width:'90%',maxWidth:480}}>
            <div style={{fontWeight:600,fontSize:18,marginBottom:12}}>选择本次运输的物料</div>
            <div style={{marginBottom:12}}>系列号：{currentFo.code}</div>
            <div style={{marginBottom:12}}>可选物料：</div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {currentFo.materials.map((m: any) => (
                <label key={m.code} style={{display:'flex',alignItems:'center',gap:8}}>
                  <input
                    type="checkbox"
                    checked={seriesMaterialSelect.includes(m.code)}
                    onChange={e => {
                      if (e.target.checked) {
                        setSeriesMaterialSelect([...seriesMaterialSelect, m.code]);
                      } else {
                        setSeriesMaterialSelect(seriesMaterialSelect.filter(code => code !== m.code));
                      }
                    }}
                  />
                  {m.code} {m.name} {m.spec} {m.unit}
                </label>
              ))}
            </div>
            <div style={{display:'flex',gap:8,marginTop:16}}>
              <button style={{...btnStyle,flex:1,background:'#fff',color:'#1890ff',border:'1.5px solid #1890ff'}} onClick={()=>{setShowFoSelection(false);setCurrentFo(null);setSeriesMaterialSelect([]);}}>取消</button>
              <button style={{...btnStyle,flex:1}} onClick={handleSeriesMaterialConfirm} disabled={seriesMaterialSelect.length === 0}>确认</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 