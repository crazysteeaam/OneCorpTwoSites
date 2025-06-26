// 复制自 index.tsx，作为电脑端页面
// ...请将 index.tsx 全部内容粘贴到这里... 

import React, { useState, useEffect } from 'react';

// PC端宽屏友好风格
const pageStyle: React.CSSProperties = {
  maxWidth: 1200, margin: '0 auto', background: '#f7f9fb', minHeight: '100vh', color: '#222', padding: 40, fontSize: 18
};
const cardStyle: React.CSSProperties = {
  background: '#fff', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 2px 16px #e6eaf1'
};
const btnStyle: React.CSSProperties = {
  width: 200, padding: '14px 0', background: 'linear-gradient(90deg,#1890ff 60%,#40a9ff 100%)', color: '#fff', border: 'none', borderRadius: 10, fontSize: 20, fontWeight: 600, marginTop: 24, boxShadow: '0 2px 8px #1890ff22', cursor: 'pointer'
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

const addQtyToMaterials = (materials: any[]) => materials.map(m => ({ ...m, qty: 1 }));

// 其余业务逻辑与移动端一致，直接复制 BizMobile 组件内容并替换样式变量即可。
// ...请将 index.tsx 的 BizMobile 组件内容粘贴到这里，并将所有 pageStyle/cardStyle/btnStyle 替换为本文件对应变量 ... 

export default function BizPC() {
  // 其余内容与index.tsx一致，只需将BizMobile改为BizPC，并用本文件的pageStyle/cardStyle/btnStyle变量
  // ...以下为index.tsx的全部业务内容，变量已替换...

  const [step, setStep] = useState(0);
  const [order, setOrder] = useState({ code: '', dest: '大场基地', truck: '', materials: '' });
  const [inputType, setInputType] = useState('移库号');
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(true);
  const [historyIdx, setHistoryIdx] = useState<number|null>(null);
  const [orderSeq, setOrderSeq] = useState(1);
  const [showFoSelection, setShowFoSelection] = useState(false);
  const [currentFo, setCurrentFo] = useState<any>(null);
  const [selectedFo, setSelectedFo] = useState<string[]>([]);
  const [itemMaterials, setItemMaterials] = useState<any>({});
  const [seriesMaterialSelect, setSeriesMaterialSelect] = useState<any[]>([]);

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
        setSeriesMaterialSelect(found.materials.map(m => m.code));
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

  const handleRemoveItem = (code: string) => {
    setSelectedItems(list => list.filter(item => item.code !== code));
    setItemMaterials(prev => {
      const newObj = { ...prev };
      delete newObj[code];
      return newObj;
    });
  };

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

  if (showHistory) {
    return (
      <div style={pageStyle}>
        <h2 style={{textAlign:'center',margin:'18px 0 24px 0',fontWeight:700,fontSize:28}}>历史工单</h2>
        {historyIdx === null ? (
          <>
            {orders.length === 0 && <div style={{textAlign:'center',color:'#888',margin:'32px 0',fontSize:20}}>暂无历史工单</div>}
            {orders.map((o, i) => {
              const handleClick = () => {
                if (o.status === '已完成') {
                  setHistoryIdx(i);
                } else {
                  setShowHistory(false);
                }
              };
              return (
                <div key={i} style={{...cardStyle, cursor:'pointer', borderLeft:'8px solid #1890ff'}} onClick={handleClick}>
                  <div style={{fontWeight:700,fontSize:22}}>{o.code} <span style={{fontWeight:400,fontSize:18,color:'#1890ff'}}>{o.dest}</span></div>
                  <div style={{fontSize:18,color:'#888',margin:'8px 0'}}>货车：{o.truck}</div>
                  <div style={{fontSize:16,color:'#aaa'}}>创建时间：{o.time}</div>
                  <div style={{fontSize:16,color:'#1890ff',marginTop:6}}>状态：{o.status}</div>
                </div>
              );
            })}
            <button style={{...btnStyle,marginTop:32}} onClick={()=>setShowHistory(false)}>创建工单</button>
          </>
        ) : (
          <div style={cardStyle}>
            <div style={{fontWeight:700,fontSize:24,marginBottom:12}}>工单详情</div>
            <div>工单编号：{orders[historyIdx].code}</div>
            <div>目的地：{orders[historyIdx].dest}</div>
            <div>货车：{orders[historyIdx].truck}</div>
            <div>物料：</div>
            <table style={{width:'100%',margin:'12px 0',background:'#f7f9fb',borderRadius:8,fontSize:18}}>
              <thead><tr style={{color:'#1890ff',fontWeight:700}}><td>编码</td><td>名称</td><td>规格</td><td>单位</td></tr></thead>
              <tbody>
                {orders[historyIdx].materials.map((m:any,i:number)=>(
                  <tr key={i}><td>{m.code}</td><td>{m.name}</td><td>{m.spec}</td><td>{m.unit}</td></tr>
                ))}
              </tbody>
            </table>
            <div style={{margin:'16px 0 8px 0',fontWeight:600}}>海关进卡时间：<span style={{color:'#1890ff'}}>{orders[historyIdx].customsInTime||'--'}</span>　海关出卡时间：<span style={{color:'#1890ff'}}>{orders[historyIdx].customsOutTime||'--'}</span></div>
            <div>创建时间：{orders[historyIdx].time}</div>
            <div style={{margin:'16px 0 8px 0',fontWeight:600}}>拍照记录：</div>
            {Object.entries(orders[historyIdx].photos).map(([k,v]:any[])=>v?.url&&(
              <div key={k} style={{marginBottom:16}}>
                <img src={v.url} alt={k} style={{width:'100%',margin:'8px 0',borderRadius:10}} />
                <div style={{fontSize:16,color:'#888',marginTop:4}}>
                  {k==='door'?'关舱照片':k==='arrive'?'到货照片':'照片'}　拍摄时间：{v.time||'--'}
                </div>
              </div>
            ))}
            <div style={{margin:'16px 0 8px 0',fontWeight:600}}>扫码物料：</div>
            <ul style={{margin:'0 0 16px 0',padding:0}}>
              {orders[historyIdx].scanList.map((m:string,i:number)=>(<li key={i} style={{margin:'8px 0',listStyle:'none',color:'#1890ff',fontSize:18}}>{m}</li>))}
            </ul>
            <button style={btnStyle} onClick={()=>setHistoryIdx(null)}>返回列表</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <h2 style={{textAlign:'center',margin:'24px 0 32px 0',fontWeight:800,fontSize:32}}>出库工单提交（PC端）</h2>
      <div style={{display:'flex',justifyContent:'center',gap:16,marginBottom:32}}>
        {steps.map((s,i)=>(
          <div key={i} style={{padding:'10px 24px',borderRadius:8,...(i===step?stepActive:stepInactive),fontWeight:i===step?800:500,fontSize:20,whiteSpace:'nowrap'}}>{s}</div>
        ))}
      </div>
      <button style={{...btnStyle,background:'#fff',color:'#1890ff',border:'2px solid #1890ff',margin:'0 0 32px 0',boxShadow:'none'}} onClick={()=>setShowHistory(true)}>历史工单管理</button>
      <div style={cardStyle}>
        <div style={{fontWeight:700,fontSize:24,marginBottom:16}}>出库工单提交</div>
        <div>工单编号：<span style={{fontWeight:600,color:'#1890ff'}}>{genOrderCode(orderSeq)}</span></div>
        <div>目的地：
          <select value={order.dest} onChange={e=>setOrder(o=>({...o,dest:e.target.value}))} style={{width:'40%',margin:'10px 0',borderRadius:8,border:'2px solid #e6eaf1',padding:10,fontSize:18}}>
            <option value="大场基地">大场基地</option>
            <option value="浦东基地">浦东基地</option>
          </select>
        </div>
        <div>货车车牌：<input value={order.truck} onChange={e=>setOrder(o=>({...o,truck:e.target.value}))} style={{width:'40%',margin:'10px 0',borderRadius:8,border:'2px solid #e6eaf1',padding:10,fontSize:18}} /></div>
        <div>物料信息绑定：
          <div style={{display:'flex',gap:16,margin:'10px 0',alignItems:'center'}}>
            <select value={inputType} onChange={e=>setInputType(e.target.value)} style={{width:180,borderRadius:8,border:'2px solid #e6eaf1',padding:10,fontSize:18}}>
              <option value="移库号">移库号</option>
              <option value="49号凭证号">49号凭证号</option>
              <option value="订单号">订单号</option>
              <option value="系列号">系列号</option>
            </select>
            <input value={inputValue} onChange={e=>setInputValue(e.target.value)} style={{flex:1,borderRadius:8,border:'2px solid #e6eaf1',padding:10,fontSize:18}} placeholder={`输入${inputType}`} />
            <button style={{...btnStyle,width:120,padding:'10px 0',marginTop:0}} onClick={handleAddItem} disabled={!inputValue}>添加</button>
          </div>
          <table style={{width:'100%',margin:'12px 0',background:'#f7f9fb',borderRadius:8,fontSize:18}}>
            <thead><tr style={{color:'#1890ff',fontWeight:700}}><td>类型</td><td>编码</td><td>操作</td></tr></thead>
            <tbody>
              {selectedItems.map((m,i)=>(
                <tr key={i}>
                  <td>{m.type}</td>
                  <td>{m.code}</td>
                  <td><button onClick={()=>handleRemoveItem(m.code)} style={{color:'#ff4d4f',background:'none',border:'none',cursor:'pointer',fontSize:18}}>删除</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedItems.length > 0 && (
            <div style={{marginTop:18}}>
              <div style={{fontWeight:700,marginBottom:10,fontSize:20}}>物料清单：</div>
              {selectedItems.map(item => (
                <div key={item.code} style={{marginBottom:24,background:'#f7f9fb',borderRadius:8,padding:'12px 12px 4px 12px'}}>
                  <div style={{fontWeight:600,marginBottom:6,fontSize:18}}>{item.type}：{item.code}</div>
                  <table style={{width:'100%',background:'#fff',borderRadius:8,fontSize:18}}>
                    <thead><tr style={{color:'#1890ff',fontWeight:700}}><td>编码</td><td>名称</td><td>规格</td><td>单位</td><td>数量</td></tr></thead>
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
      <div style={{...cardStyle, marginTop: 32, background: '#f0f7ff'}}>
        <div style={{fontWeight:700,fontSize:18,marginBottom:16,color:'#1890ff'}}>测试用例提示</div>
        <div style={{fontSize:16,color:'#666',lineHeight:1.8}}>
          <div style={{marginBottom:10}}><span style={{fontWeight:600}}>移库号：</span>YK001, YK002</div>
          <div style={{marginBottom:10}}><span style={{fontWeight:600}}>49号凭证号：</span>PZ001, PZ002</div>
          <div style={{marginBottom:10}}><span style={{fontWeight:600}}>订单号：</span>DD001, DD002, DD003</div>
          <div style={{marginBottom:10}}><span style={{fontWeight:600}}>系列号：</span>FO.1, FO.2, FO.3, FO.10</div>
          <div style={{marginTop:16,color:'#1890ff'}}>提示：输入系列号可多选物料，输入订单号后可以选择对应的分卡</div>
        </div>
      </div>

      {/* 系列号物料选择弹窗 */}
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
          <div style={{...cardStyle,width:'60%',maxWidth:700}}>
            <div style={{fontWeight:700,fontSize:22,marginBottom:16}}>选择本次运输的物料</div>
            <div style={{marginBottom:16,fontSize:18}}>系列号：{currentFo.code}</div>
            <div style={{marginBottom:16,fontSize:18}}>可选物料：</div>
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              {currentFo.materials.map((m: any) => (
                <label key={m.code} style={{display:'flex',alignItems:'center',gap:12,fontSize:18}}>
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
            <div style={{display:'flex',gap:16,marginTop:24}}>
              <button style={{...btnStyle,flex:1,background:'#fff',color:'#1890ff',border:'2px solid #1890ff'}} onClick={()=>{setShowFoSelection(false);setCurrentFo(null);setSeriesMaterialSelect([]);}}>取消</button>
              <button style={{...btnStyle,flex:1}} onClick={handleSeriesMaterialConfirm} disabled={seriesMaterialSelect.length === 0}>确认</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 