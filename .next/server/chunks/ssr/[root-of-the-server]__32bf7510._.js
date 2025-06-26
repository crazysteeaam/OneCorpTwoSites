module.exports = {

"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}}),
"[project]/pages/biz/pc.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// 复制自 index.tsx，作为电脑端页面
// ...请将 index.tsx 全部内容粘贴到这里... 
__turbopack_context__.s({
    "default": (()=>BizPC)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
// PC端宽屏友好风格
const pageStyle = {
    maxWidth: 1200,
    margin: '0 auto',
    background: '#f7f9fb',
    minHeight: '100vh',
    color: '#222',
    padding: 40,
    fontSize: 18
};
const cardStyle = {
    background: '#fff',
    borderRadius: 16,
    padding: 32,
    marginBottom: 32,
    boxShadow: '0 2px 16px #e6eaf1'
};
const btnStyle = {
    width: 200,
    padding: '14px 0',
    background: 'linear-gradient(90deg,#1890ff 60%,#40a9ff 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    fontSize: 20,
    fontWeight: 600,
    marginTop: 24,
    boxShadow: '0 2px 8px #1890ff22',
    cursor: 'pointer'
};
const stepActive = {
    background: '#1890ff',
    color: '#fff'
};
const stepInactive = {
    background: '#e6eaf1',
    color: '#888'
};
const steps = [
    '出库扫码'
];
// 模拟物料数据库
const MATERIAL_DB = [
    {
        code: '000000410000032320',
        name: '37框密封角盒G70',
        spec: 'G70',
        unit: '件'
    },
    {
        code: '00000041000081581',
        name: '连接片 5716C',
        spec: '5716C',
        unit: '件'
    },
    {
        code: '00000041000099999',
        name: '测试物料A',
        spec: 'A',
        unit: '箱'
    },
    {
        code: '00000041000088888',
        name: '测试物料B',
        spec: 'B',
        unit: '包'
    }
];
// 模拟数据库
const WMS_DB = [
    {
        code: 'YK001',
        type: '移库号',
        source: 'WMS',
        status: '待处理',
        materials: [
            MATERIAL_DB[0],
            MATERIAL_DB[1]
        ]
    },
    {
        code: 'YK002',
        type: '移库号',
        source: 'WMS',
        status: '处理中',
        materials: [
            MATERIAL_DB[2]
        ]
    }
];
const SAP_DB = [
    {
        code: 'PZ001',
        type: '49号凭证号',
        source: 'SAP',
        status: '待处理',
        materials: [
            MATERIAL_DB[0],
            MATERIAL_DB[1]
        ]
    },
    {
        code: 'PZ002',
        type: '49号凭证号',
        source: 'SAP',
        status: '已完成',
        materials: [
            MATERIAL_DB[2]
        ]
    },
    {
        code: 'DD001',
        type: '订单号',
        source: 'SAP',
        status: '待处理',
        materials: [
            MATERIAL_DB[0],
            MATERIAL_DB[1]
        ],
        fo: [
            'FO.1',
            'FO.2'
        ]
    },
    {
        code: 'DD002',
        type: '订单号',
        source: 'SAP',
        status: '处理中',
        materials: [
            MATERIAL_DB[2]
        ],
        fo: [
            'FO.3'
        ]
    },
    {
        code: 'DD003',
        type: '订单号',
        source: 'SAP',
        status: '已完成',
        materials: [
            MATERIAL_DB[3]
        ],
        fo: [
            'FO.4',
            'FO.5'
        ]
    }
];
const MOM_DB = [
    {
        code: 'FO.1',
        type: '系列号',
        source: 'MOM',
        status: '待处理',
        materials: [
            MATERIAL_DB[0]
        ]
    },
    {
        code: 'FO.2',
        type: '系列号',
        source: 'MOM',
        status: '处理中',
        materials: [
            MATERIAL_DB[1]
        ]
    },
    {
        code: 'FO.3',
        type: '系列号',
        source: 'MOM',
        status: '已完成',
        materials: [
            MATERIAL_DB[2]
        ]
    },
    {
        code: 'FO.10',
        type: '系列号',
        source: 'MOM',
        status: '待处理',
        materials: [
            MATERIAL_DB[0],
            MATERIAL_DB[1]
        ],
        fo: [
            'FO.10-1',
            'FO.10-2'
        ]
    }
];
function genOrderCode(seq) {
    const d = new Date();
    return `ORD${d.getFullYear()}${(d.getMonth() + 1).toString().padStart(2, '0')}${d.getDate().toString().padStart(2, '0')}${d.getHours().toString().padStart(2, '0')}${d.getMinutes().toString().padStart(2, '0')}${d.getSeconds().toString().padStart(2, '0')}${seq.toString().padStart(3, '0')}`;
}
const addQtyToMaterials = (materials)=>materials.map((m)=>({
            ...m,
            qty: 1
        }));
function BizPC() {
    // 其余内容与index.tsx一致，只需将BizMobile改为BizPC，并用本文件的pageStyle/cardStyle/btnStyle变量
    // ...以下为index.tsx的全部业务内容，变量已替换...
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [order, setOrder] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        code: '',
        dest: '大场基地',
        truck: '',
        materials: ''
    });
    const [inputType, setInputType] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('移库号');
    const [inputValue, setInputValue] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [selectedItems, setSelectedItems] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [orders, setOrders] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [showHistory, setShowHistory] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [historyIdx, setHistoryIdx] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [orderSeq, setOrderSeq] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(1);
    const [showFoSelection, setShowFoSelection] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [currentFo, setCurrentFo] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [selectedFo, setSelectedFo] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [itemMaterials, setItemMaterials] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({});
    const [seriesMaterialSelect, setSeriesMaterialSelect] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (orders.length === 0) {
            setOrders([
                {
                    code: genOrderCode(1),
                    dest: '大场基地',
                    truck: '沪A12345',
                    materials: [
                        MATERIAL_DB[0],
                        MATERIAL_DB[1]
                    ],
                    photos: {
                        door: {
                            url: '',
                            time: '2024-07-16 09:10:00'
                        },
                        arrive: {
                            url: '',
                            time: '2024-07-16 09:50:00'
                        }
                    },
                    scanList: [
                        MATERIAL_DB[0].code,
                        MATERIAL_DB[1].code
                    ],
                    time: '2024-07-16 09:00:00',
                    status: '已完成',
                    customsOutTime: '2024-07-16 09:20:00',
                    customsInTime: '2024-07-16 09:40:00'
                },
                {
                    code: genOrderCode(2),
                    dest: '浦东基地',
                    truck: '沪B54321',
                    materials: [
                        MATERIAL_DB[2]
                    ],
                    photos: {
                        door: {
                            url: '',
                            time: '2024-07-16 10:40:00'
                        }
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
                    materials: [
                        MATERIAL_DB[3]
                    ],
                    photos: {},
                    scanList: [
                        MATERIAL_DB[3].code
                    ],
                    time: '2024-07-16 11:20:00',
                    status: '待处理',
                    customsOutTime: '',
                    customsInTime: ''
                }
            ]);
            setOrderSeq(4);
        }
    }, []);
    const handleAddItem = ()=>{
        const value = inputValue.trim();
        if (!value) return;
        let found;
        if (inputType === '移库号') {
            found = WMS_DB.find((m)=>m.code === value);
        } else if (inputType === '49号凭证号') {
            found = SAP_DB.find((m)=>m.code === value && m.type === '49号凭证号');
        } else if (inputType === '订单号') {
            found = SAP_DB.find((m)=>m.code === value && m.type === '订单号');
        } else if (inputType === '系列号') {
            found = MOM_DB.find((m)=>m.code === value);
            if (found) {
                setCurrentFo(found);
                setSeriesMaterialSelect(found.materials.map((m)=>m.code));
                setShowFoSelection(true);
                return;
            }
        }
        if (found && !selectedItems.some((m)=>m.code === value)) {
            setSelectedItems((list)=>[
                    ...list,
                    found
                ]);
            setItemMaterials((prev)=>({
                    ...prev,
                    [found.code]: addQtyToMaterials(found.materials)
                }));
        }
        setInputValue('');
    };
    const handleRemoveItem = (code)=>{
        setSelectedItems((list)=>list.filter((item)=>item.code !== code));
        setItemMaterials((prev)=>{
            const newObj = {
                ...prev
            };
            delete newObj[code];
            return newObj;
        });
    };
    const handleFoConfirm = ()=>{
        if (currentFo && selectedFo.length > 0) {
            const foItems = selectedFo.map((fo)=>MOM_DB.find((m)=>m.code === fo)).filter(Boolean);
            setSelectedItems((list)=>[
                    ...list,
                    ...foItems
                ]);
            setShowFoSelection(false);
            setCurrentFo(null);
            setSelectedFo([]);
            setInputValue('');
        }
    };
    const handleSeriesMaterialConfirm = ()=>{
        if (currentFo && seriesMaterialSelect.length > 0) {
            const selectedMaterials = currentFo.materials.filter((m)=>seriesMaterialSelect.includes(m.code));
            setSelectedItems((list)=>[
                    ...list,
                    {
                        ...currentFo,
                        materials: selectedMaterials
                    }
                ]);
            setItemMaterials((prev)=>({
                    ...prev,
                    [currentFo.code]: addQtyToMaterials(selectedMaterials)
                }));
            setShowFoSelection(false);
            setCurrentFo(null);
            setSeriesMaterialSelect([]);
            setInputValue('');
        }
    };
    const handleFinish = ()=>{
        const newCode = genOrderCode(orderSeq);
        setOrders((list)=>[
                ...list,
                {
                    ...order,
                    code: newCode,
                    items: selectedItems,
                    time: new Date().toLocaleString(),
                    status: '处理中'
                }
            ]);
        setOrder({
            code: '',
            dest: '大场基地',
            truck: '',
            materials: ''
        });
        setSelectedItems([]);
        setInputValue('');
        setShowHistory(true);
    };
    if (showHistory) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            style: pageStyle,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                    style: {
                        textAlign: 'center',
                        margin: '18px 0 24px 0',
                        fontWeight: 700,
                        fontSize: 28
                    },
                    children: "历史工单"
                }, void 0, false, {
                    fileName: "[project]/pages/biz/pc.tsx",
                    lineNumber: 209,
                    columnNumber: 9
                }, this),
                historyIdx === null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                    children: [
                        orders.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'center',
                                color: '#888',
                                margin: '32px 0',
                                fontSize: 20
                            },
                            children: "暂无历史工单"
                        }, void 0, false, {
                            fileName: "[project]/pages/biz/pc.tsx",
                            lineNumber: 212,
                            columnNumber: 37
                        }, this),
                        orders.map((o, i)=>{
                            const handleClick = ()=>{
                                if (o.status === '已完成') {
                                    setHistoryIdx(i);
                                } else {
                                    setShowHistory(false);
                                }
                            };
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    ...cardStyle,
                                    cursor: 'pointer',
                                    borderLeft: '8px solid #1890ff'
                                },
                                onClick: handleClick,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontWeight: 700,
                                            fontSize: 22
                                        },
                                        children: [
                                            o.code,
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontWeight: 400,
                                                    fontSize: 18,
                                                    color: '#1890ff'
                                                },
                                                children: o.dest
                                            }, void 0, false, {
                                                fileName: "[project]/pages/biz/pc.tsx",
                                                lineNumber: 223,
                                                columnNumber: 70
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/biz/pc.tsx",
                                        lineNumber: 223,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 18,
                                            color: '#888',
                                            margin: '8px 0'
                                        },
                                        children: [
                                            "货车：",
                                            o.truck
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/biz/pc.tsx",
                                        lineNumber: 224,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 16,
                                            color: '#aaa'
                                        },
                                        children: [
                                            "创建时间：",
                                            o.time
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/biz/pc.tsx",
                                        lineNumber: 225,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 16,
                                            color: '#1890ff',
                                            marginTop: 6
                                        },
                                        children: [
                                            "状态：",
                                            o.status
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/biz/pc.tsx",
                                        lineNumber: 226,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/pages/biz/pc.tsx",
                                lineNumber: 222,
                                columnNumber: 17
                            }, this);
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            style: {
                                ...btnStyle,
                                marginTop: 32
                            },
                            onClick: ()=>setShowHistory(false),
                            children: "创建工单"
                        }, void 0, false, {
                            fileName: "[project]/pages/biz/pc.tsx",
                            lineNumber: 230,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: cardStyle,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                fontWeight: 700,
                                fontSize: 24,
                                marginBottom: 12
                            },
                            children: "工单详情"
                        }, void 0, false, {
                            fileName: "[project]/pages/biz/pc.tsx",
                            lineNumber: 234,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: [
                                "工单编号：",
                                orders[historyIdx].code
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/biz/pc.tsx",
                            lineNumber: 235,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: [
                                "目的地：",
                                orders[historyIdx].dest
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/biz/pc.tsx",
                            lineNumber: 236,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: [
                                "货车：",
                                orders[historyIdx].truck
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/biz/pc.tsx",
                            lineNumber: 237,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: "物料："
                        }, void 0, false, {
                            fileName: "[project]/pages/biz/pc.tsx",
                            lineNumber: 238,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("table", {
                            style: {
                                width: '100%',
                                margin: '12px 0',
                                background: '#f7f9fb',
                                borderRadius: 8,
                                fontSize: 18
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                        style: {
                                            color: '#1890ff',
                                            fontWeight: 700
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                children: "编码"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/biz/pc.tsx",
                                                lineNumber: 240,
                                                columnNumber: 67
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                children: "名称"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/biz/pc.tsx",
                                                lineNumber: 240,
                                                columnNumber: 78
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                children: "规格"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/biz/pc.tsx",
                                                lineNumber: 240,
                                                columnNumber: 89
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                children: "单位"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/biz/pc.tsx",
                                                lineNumber: 240,
                                                columnNumber: 100
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/biz/pc.tsx",
                                        lineNumber: 240,
                                        columnNumber: 22
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/biz/pc.tsx",
                                    lineNumber: 240,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tbody", {
                                    children: orders[historyIdx].materials.map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                    children: m.code
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/biz/pc.tsx",
                                                    lineNumber: 243,
                                                    columnNumber: 31
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                    children: m.name
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/biz/pc.tsx",
                                                    lineNumber: 243,
                                                    columnNumber: 48
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                    children: m.spec
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/biz/pc.tsx",
                                                    lineNumber: 243,
                                                    columnNumber: 65
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                    children: m.unit
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/biz/pc.tsx",
                                                    lineNumber: 243,
                                                    columnNumber: 82
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/pages/biz/pc.tsx",
                                            lineNumber: 243,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/pages/biz/pc.tsx",
                                    lineNumber: 241,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/biz/pc.tsx",
                            lineNumber: 239,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                margin: '16px 0 8px 0',
                                fontWeight: 600
                            },
                            children: [
                                "海关进卡时间：",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: '#1890ff'
                                    },
                                    children: orders[historyIdx].customsInTime || '--'
                                }, void 0, false, {
                                    fileName: "[project]/pages/biz/pc.tsx",
                                    lineNumber: 247,
                                    columnNumber: 72
                                }, this),
                                "　海关出卡时间：",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: '#1890ff'
                                    },
                                    children: orders[historyIdx].customsOutTime || '--'
                                }, void 0, false, {
                                    fileName: "[project]/pages/biz/pc.tsx",
                                    lineNumber: 247,
                                    columnNumber: 159
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/biz/pc.tsx",
                            lineNumber: 247,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: [
                                "创建时间：",
                                orders[historyIdx].time
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/biz/pc.tsx",
                            lineNumber: 248,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                margin: '16px 0 8px 0',
                                fontWeight: 600
                            },
                            children: "拍照记录："
                        }, void 0, false, {
                            fileName: "[project]/pages/biz/pc.tsx",
                            lineNumber: 249,
                            columnNumber: 13
                        }, this),
                        Object.entries(orders[historyIdx].photos).map(([k, v])=>v?.url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: 16
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                        src: v.url,
                                        alt: k,
                                        style: {
                                            width: '100%',
                                            margin: '8px 0',
                                            borderRadius: 10
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/pages/biz/pc.tsx",
                                        lineNumber: 252,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 16,
                                            color: '#888',
                                            marginTop: 4
                                        },
                                        children: [
                                            k === 'door' ? '关舱照片' : k === 'arrive' ? '到货照片' : '照片',
                                            "　拍摄时间：",
                                            v.time || '--'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/biz/pc.tsx",
                                        lineNumber: 253,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, k, true, {
                                fileName: "[project]/pages/biz/pc.tsx",
                                lineNumber: 251,
                                columnNumber: 15
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                margin: '16px 0 8px 0',
                                fontWeight: 600
                            },
                            children: "扫码物料："
                        }, void 0, false, {
                            fileName: "[project]/pages/biz/pc.tsx",
                            lineNumber: 258,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                            style: {
                                margin: '0 0 16px 0',
                                padding: 0
                            },
                            children: orders[historyIdx].scanList.map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                    style: {
                                        margin: '8px 0',
                                        listStyle: 'none',
                                        color: '#1890ff',
                                        fontSize: 18
                                    },
                                    children: m
                                }, i, false, {
                                    fileName: "[project]/pages/biz/pc.tsx",
                                    lineNumber: 260,
                                    columnNumber: 70
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/pages/biz/pc.tsx",
                            lineNumber: 259,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            style: btnStyle,
                            onClick: ()=>setHistoryIdx(null),
                            children: "返回列表"
                        }, void 0, false, {
                            fileName: "[project]/pages/biz/pc.tsx",
                            lineNumber: 262,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/biz/pc.tsx",
                    lineNumber: 233,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/biz/pc.tsx",
            lineNumber: 208,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: pageStyle,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                style: {
                    textAlign: 'center',
                    margin: '24px 0 32px 0',
                    fontWeight: 800,
                    fontSize: 32
                },
                children: "出库工单提交（PC端）"
            }, void 0, false, {
                fileName: "[project]/pages/biz/pc.tsx",
                lineNumber: 271,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 16,
                    marginBottom: 32
                },
                children: steps.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '10px 24px',
                            borderRadius: 8,
                            ...i === step ? stepActive : stepInactive,
                            fontWeight: i === step ? 800 : 500,
                            fontSize: 20,
                            whiteSpace: 'nowrap'
                        },
                        children: s
                    }, i, false, {
                        fileName: "[project]/pages/biz/pc.tsx",
                        lineNumber: 274,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/pages/biz/pc.tsx",
                lineNumber: 272,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                style: {
                    ...btnStyle,
                    background: '#fff',
                    color: '#1890ff',
                    border: '2px solid #1890ff',
                    margin: '0 0 32px 0',
                    boxShadow: 'none'
                },
                onClick: ()=>setShowHistory(true),
                children: "历史工单管理"
            }, void 0, false, {
                fileName: "[project]/pages/biz/pc.tsx",
                lineNumber: 277,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: cardStyle,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            fontWeight: 700,
                            fontSize: 24,
                            marginBottom: 16
                        },
                        children: "出库工单提交"
                    }, void 0, false, {
                        fileName: "[project]/pages/biz/pc.tsx",
                        lineNumber: 279,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            "工单编号：",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                style: {
                                    fontWeight: 600,
                                    color: '#1890ff'
                                },
                                children: genOrderCode(orderSeq)
                            }, void 0, false, {
                                fileName: "[project]/pages/biz/pc.tsx",
                                lineNumber: 280,
                                columnNumber: 19
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/biz/pc.tsx",
                        lineNumber: 280,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            "目的地：",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                value: order.dest,
                                onChange: (e)=>setOrder((o)=>({
                                            ...o,
                                            dest: e.target.value
                                        })),
                                style: {
                                    width: '40%',
                                    margin: '10px 0',
                                    borderRadius: 8,
                                    border: '2px solid #e6eaf1',
                                    padding: 10,
                                    fontSize: 18
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                        value: "大场基地",
                                        children: "大场基地"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/biz/pc.tsx",
                                        lineNumber: 283,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                        value: "浦东基地",
                                        children: "浦东基地"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/biz/pc.tsx",
                                        lineNumber: 284,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/biz/pc.tsx",
                                lineNumber: 282,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/biz/pc.tsx",
                        lineNumber: 281,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            "货车车牌：",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                value: order.truck,
                                onChange: (e)=>setOrder((o)=>({
                                            ...o,
                                            truck: e.target.value
                                        })),
                                style: {
                                    width: '40%',
                                    margin: '10px 0',
                                    borderRadius: 8,
                                    border: '2px solid #e6eaf1',
                                    padding: 10,
                                    fontSize: 18
                                }
                            }, void 0, false, {
                                fileName: "[project]/pages/biz/pc.tsx",
                                lineNumber: 287,
                                columnNumber: 19
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/biz/pc.tsx",
                        lineNumber: 287,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            "物料信息绑定：",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: 16,
                                    margin: '10px 0',
                                    alignItems: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                        value: inputType,
                                        onChange: (e)=>setInputType(e.target.value),
                                        style: {
                                            width: 180,
                                            borderRadius: 8,
                                            border: '2px solid #e6eaf1',
                                            padding: 10,
                                            fontSize: 18
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                value: "移库号",
                                                children: "移库号"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/biz/pc.tsx",
                                                lineNumber: 291,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                value: "49号凭证号",
                                                children: "49号凭证号"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/biz/pc.tsx",
                                                lineNumber: 292,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                value: "订单号",
                                                children: "订单号"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/biz/pc.tsx",
                                                lineNumber: 293,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                value: "系列号",
                                                children: "系列号"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/biz/pc.tsx",
                                                lineNumber: 294,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/biz/pc.tsx",
                                        lineNumber: 290,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        value: inputValue,
                                        onChange: (e)=>setInputValue(e.target.value),
                                        style: {
                                            flex: 1,
                                            borderRadius: 8,
                                            border: '2px solid #e6eaf1',
                                            padding: 10,
                                            fontSize: 18
                                        },
                                        placeholder: `输入${inputType}`
                                    }, void 0, false, {
                                        fileName: "[project]/pages/biz/pc.tsx",
                                        lineNumber: 296,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        style: {
                                            ...btnStyle,
                                            width: 120,
                                            padding: '10px 0',
                                            marginTop: 0
                                        },
                                        onClick: handleAddItem,
                                        disabled: !inputValue,
                                        children: "添加"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/biz/pc.tsx",
                                        lineNumber: 297,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/biz/pc.tsx",
                                lineNumber: 289,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("table", {
                                style: {
                                    width: '100%',
                                    margin: '12px 0',
                                    background: '#f7f9fb',
                                    borderRadius: 8,
                                    fontSize: 18
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("thead", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                            style: {
                                                color: '#1890ff',
                                                fontWeight: 700
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                    children: "类型"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/biz/pc.tsx",
                                                    lineNumber: 300,
                                                    columnNumber: 65
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                    children: "编码"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/biz/pc.tsx",
                                                    lineNumber: 300,
                                                    columnNumber: 76
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                    children: "操作"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/biz/pc.tsx",
                                                    lineNumber: 300,
                                                    columnNumber: 87
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/biz/pc.tsx",
                                            lineNumber: 300,
                                            columnNumber: 20
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/biz/pc.tsx",
                                        lineNumber: 300,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tbody", {
                                        children: selectedItems.map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        children: m.type
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/biz/pc.tsx",
                                                        lineNumber: 304,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        children: m.code
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/biz/pc.tsx",
                                                        lineNumber: 305,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleRemoveItem(m.code),
                                                            style: {
                                                                color: '#ff4d4f',
                                                                background: 'none',
                                                                border: 'none',
                                                                cursor: 'pointer',
                                                                fontSize: 18
                                                            },
                                                            children: "删除"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/biz/pc.tsx",
                                                            lineNumber: 306,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/biz/pc.tsx",
                                                        lineNumber: 306,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/pages/biz/pc.tsx",
                                                lineNumber: 303,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/pages/biz/pc.tsx",
                                        lineNumber: 301,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/biz/pc.tsx",
                                lineNumber: 299,
                                columnNumber: 11
                            }, this),
                            selectedItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: 18
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontWeight: 700,
                                            marginBottom: 10,
                                            fontSize: 20
                                        },
                                        children: "物料清单："
                                    }, void 0, false, {
                                        fileName: "[project]/pages/biz/pc.tsx",
                                        lineNumber: 313,
                                        columnNumber: 15
                                    }, this),
                                    selectedItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginBottom: 24,
                                                background: '#f7f9fb',
                                                borderRadius: 8,
                                                padding: '12px 12px 4px 12px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontWeight: 600,
                                                        marginBottom: 6,
                                                        fontSize: 18
                                                    },
                                                    children: [
                                                        item.type,
                                                        "：",
                                                        item.code
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/biz/pc.tsx",
                                                    lineNumber: 316,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("table", {
                                                    style: {
                                                        width: '100%',
                                                        background: '#fff',
                                                        borderRadius: 8,
                                                        fontSize: 18
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("thead", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                                                style: {
                                                                    color: '#1890ff',
                                                                    fontWeight: 700
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                                        children: "编码"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/biz/pc.tsx",
                                                                        lineNumber: 318,
                                                                        columnNumber: 73
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                                        children: "名称"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/biz/pc.tsx",
                                                                        lineNumber: 318,
                                                                        columnNumber: 84
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                                        children: "规格"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/biz/pc.tsx",
                                                                        lineNumber: 318,
                                                                        columnNumber: 95
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                                        children: "单位"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/biz/pc.tsx",
                                                                        lineNumber: 318,
                                                                        columnNumber: 106
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                                        children: "数量"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/biz/pc.tsx",
                                                                        lineNumber: 318,
                                                                        columnNumber: 117
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/biz/pc.tsx",
                                                                lineNumber: 318,
                                                                columnNumber: 28
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/biz/pc.tsx",
                                                            lineNumber: 318,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tbody", {
                                                            children: itemMaterials[item.code]?.map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                                            children: m.code
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/biz/pc.tsx",
                                                                            lineNumber: 322,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                                            children: m.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/biz/pc.tsx",
                                                                            lineNumber: 323,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                                            children: m.spec
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/biz/pc.tsx",
                                                                            lineNumber: 324,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                                            children: m.unit
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/biz/pc.tsx",
                                                                            lineNumber: 325,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                                            children: m.qty
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/biz/pc.tsx",
                                                                            lineNumber: 326,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, i, true, {
                                                                    fileName: "[project]/pages/biz/pc.tsx",
                                                                    lineNumber: 321,
                                                                    columnNumber: 25
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/biz/pc.tsx",
                                                            lineNumber: 319,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/biz/pc.tsx",
                                                    lineNumber: 317,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, item.code, true, {
                                            fileName: "[project]/pages/biz/pc.tsx",
                                            lineNumber: 315,
                                            columnNumber: 17
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/biz/pc.tsx",
                                lineNumber: 312,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/biz/pc.tsx",
                        lineNumber: 288,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        style: btnStyle,
                        onClick: handleFinish,
                        disabled: !order.truck || selectedItems.length === 0,
                        children: "提交工单"
                    }, void 0, false, {
                        fileName: "[project]/pages/biz/pc.tsx",
                        lineNumber: 336,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/biz/pc.tsx",
                lineNumber: 278,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    ...cardStyle,
                    marginTop: 32,
                    background: '#f0f7ff'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            fontWeight: 700,
                            fontSize: 18,
                            marginBottom: 16,
                            color: '#1890ff'
                        },
                        children: "测试用例提示"
                    }, void 0, false, {
                        fileName: "[project]/pages/biz/pc.tsx",
                        lineNumber: 341,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 16,
                            color: '#666',
                            lineHeight: 1.8
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: 10
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontWeight: 600
                                        },
                                        children: "移库号："
                                    }, void 0, false, {
                                        fileName: "[project]/pages/biz/pc.tsx",
                                        lineNumber: 343,
                                        columnNumber: 42
                                    }, this),
                                    "YK001, YK002"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/biz/pc.tsx",
                                lineNumber: 343,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: 10
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontWeight: 600
                                        },
                                        children: "49号凭证号："
                                    }, void 0, false, {
                                        fileName: "[project]/pages/biz/pc.tsx",
                                        lineNumber: 344,
                                        columnNumber: 42
                                    }, this),
                                    "PZ001, PZ002"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/biz/pc.tsx",
                                lineNumber: 344,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: 10
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontWeight: 600
                                        },
                                        children: "订单号："
                                    }, void 0, false, {
                                        fileName: "[project]/pages/biz/pc.tsx",
                                        lineNumber: 345,
                                        columnNumber: 42
                                    }, this),
                                    "DD001, DD002, DD003"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/biz/pc.tsx",
                                lineNumber: 345,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: 10
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontWeight: 600
                                        },
                                        children: "系列号："
                                    }, void 0, false, {
                                        fileName: "[project]/pages/biz/pc.tsx",
                                        lineNumber: 346,
                                        columnNumber: 42
                                    }, this),
                                    "FO.1, FO.2, FO.3, FO.10"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/biz/pc.tsx",
                                lineNumber: 346,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: 16,
                                    color: '#1890ff'
                                },
                                children: "提示：输入系列号可多选物料，输入订单号后可以选择对应的分卡"
                            }, void 0, false, {
                                fileName: "[project]/pages/biz/pc.tsx",
                                lineNumber: 347,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/biz/pc.tsx",
                        lineNumber: 342,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/biz/pc.tsx",
                lineNumber: 340,
                columnNumber: 7
            }, this),
            showFoSelection && currentFo && inputType === '系列号' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        ...cardStyle,
                        width: '60%',
                        maxWidth: 700
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                fontWeight: 700,
                                fontSize: 22,
                                marginBottom: 16
                            },
                            children: "选择本次运输的物料"
                        }, void 0, false, {
                            fileName: "[project]/pages/biz/pc.tsx",
                            lineNumber: 366,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: 16,
                                fontSize: 18
                            },
                            children: [
                                "系列号：",
                                currentFo.code
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/biz/pc.tsx",
                            lineNumber: 367,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: 16,
                                fontSize: 18
                            },
                            children: "可选物料："
                        }, void 0, false, {
                            fileName: "[project]/pages/biz/pc.tsx",
                            lineNumber: 368,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 12
                            },
                            children: currentFo.materials.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 12,
                                        fontSize: 18
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            checked: seriesMaterialSelect.includes(m.code),
                                            onChange: (e)=>{
                                                if (e.target.checked) {
                                                    setSeriesMaterialSelect([
                                                        ...seriesMaterialSelect,
                                                        m.code
                                                    ]);
                                                } else {
                                                    setSeriesMaterialSelect(seriesMaterialSelect.filter((code)=>code !== m.code));
                                                }
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/pages/biz/pc.tsx",
                                            lineNumber: 372,
                                            columnNumber: 19
                                        }, this),
                                        m.code,
                                        " ",
                                        m.name,
                                        " ",
                                        m.spec,
                                        " ",
                                        m.unit
                                    ]
                                }, m.code, true, {
                                    fileName: "[project]/pages/biz/pc.tsx",
                                    lineNumber: 371,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/pages/biz/pc.tsx",
                            lineNumber: 369,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                gap: 16,
                                marginTop: 24
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    style: {
                                        ...btnStyle,
                                        flex: 1,
                                        background: '#fff',
                                        color: '#1890ff',
                                        border: '2px solid #1890ff'
                                    },
                                    onClick: ()=>{
                                        setShowFoSelection(false);
                                        setCurrentFo(null);
                                        setSeriesMaterialSelect([]);
                                    },
                                    children: "取消"
                                }, void 0, false, {
                                    fileName: "[project]/pages/biz/pc.tsx",
                                    lineNumber: 388,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    style: {
                                        ...btnStyle,
                                        flex: 1
                                    },
                                    onClick: handleSeriesMaterialConfirm,
                                    disabled: seriesMaterialSelect.length === 0,
                                    children: "确认"
                                }, void 0, false, {
                                    fileName: "[project]/pages/biz/pc.tsx",
                                    lineNumber: 389,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/biz/pc.tsx",
                            lineNumber: 387,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/biz/pc.tsx",
                    lineNumber: 365,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/biz/pc.tsx",
                lineNumber: 353,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/biz/pc.tsx",
        lineNumber: 270,
        columnNumber: 5
    }, this);
}
}}),
"[project]/node_modules/next/dist/esm/server/route-modules/pages/module.compiled.js [ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    if ("TURBOPACK compile-time truthy", 1) {
        if ("TURBOPACK compile-time truthy", 1) {
            module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/pages-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-turbo.runtime.dev.js, cjs)");
        } else {
            "TURBOPACK unreachable";
        }
    } else {
        "TURBOPACK unreachable";
    }
} //# sourceMappingURL=module.compiled.js.map
}}),
"[project]/node_modules/next/dist/esm/server/route-kind.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "RouteKind": (()=>RouteKind)
});
var RouteKind = /*#__PURE__*/ function(RouteKind) {
    /**
   * `PAGES` represents all the React pages that are under `pages/`.
   */ RouteKind["PAGES"] = "PAGES";
    /**
   * `PAGES_API` represents all the API routes under `pages/api/`.
   */ RouteKind["PAGES_API"] = "PAGES_API";
    /**
   * `APP_PAGE` represents all the React pages that are under `app/` with the
   * filename of `page.{j,t}s{,x}`.
   */ RouteKind["APP_PAGE"] = "APP_PAGE";
    /**
   * `APP_ROUTE` represents all the API routes and metadata routes that are under `app/` with the
   * filename of `route.{j,t}s{,x}`.
   */ RouteKind["APP_ROUTE"] = "APP_ROUTE";
    /**
   * `IMAGE` represents all the images that are generated by `next/image`.
   */ RouteKind["IMAGE"] = "IMAGE";
    return RouteKind;
}({}); //# sourceMappingURL=route-kind.js.map
}}),
"[project]/node_modules/next/dist/esm/build/templates/helpers.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Hoists a name from a module or promised module.
 *
 * @param module the module to hoist the name from
 * @param name the name to hoist
 * @returns the value on the module (or promised module)
 */ __turbopack_context__.s({
    "hoist": (()=>hoist)
});
function hoist(module, name) {
    // If the name is available in the module, return it.
    if (name in module) {
        return module[name];
    }
    // If a property called `then` exists, assume it's a promise and
    // return a promise that resolves to the name.
    if ('then' in module && typeof module.then === 'function') {
        return module.then((mod)=>hoist(mod, name));
    }
    // If we're trying to hoise the default export, and the module is a function,
    // return the module itself.
    if (typeof module === 'function' && name === 'default') {
        return module;
    }
    // Otherwise, return undefined.
    return undefined;
} //# sourceMappingURL=helpers.js.map
}}),
"[project]/node_modules/next/dist/esm/build/templates/pages.js { INNER_PAGE => \"[project]/pages/biz/pc.tsx [ssr] (ecmascript)\", INNER_DOCUMENT => \"[project]/node_modules/next/document.js [ssr] (ecmascript)\", INNER_APP => \"[project]/node_modules/next/app.js [ssr] (ecmascript)\" } [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "config": (()=>config),
    "default": (()=>__TURBOPACK__default__export__),
    "getServerSideProps": (()=>getServerSideProps),
    "getStaticPaths": (()=>getStaticPaths),
    "getStaticProps": (()=>getStaticProps),
    "reportWebVitals": (()=>reportWebVitals),
    "routeModule": (()=>routeModule),
    "unstable_getServerProps": (()=>unstable_getServerProps),
    "unstable_getServerSideProps": (()=>unstable_getServerSideProps),
    "unstable_getStaticParams": (()=>unstable_getStaticParams),
    "unstable_getStaticPaths": (()=>unstable_getStaticPaths),
    "unstable_getStaticProps": (()=>unstable_getStaticProps)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2f$module$2e$compiled$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/route-modules/pages/module.compiled.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/route-kind.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/build/templates/helpers.js [ssr] (ecmascript)");
// Import the app and document modules.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$document$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/document.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$app$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/app.js [ssr] (ecmascript)");
// Import the userland code.
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$biz$2f$pc$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/biz/pc.tsx [ssr] (ecmascript)");
;
;
;
;
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$biz$2f$pc$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'default');
const getStaticProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$biz$2f$pc$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'getStaticProps');
const getStaticPaths = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$biz$2f$pc$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'getStaticPaths');
const getServerSideProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$biz$2f$pc$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'getServerSideProps');
const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$biz$2f$pc$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'config');
const reportWebVitals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$biz$2f$pc$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'reportWebVitals');
const unstable_getStaticProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$biz$2f$pc$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'unstable_getStaticProps');
const unstable_getStaticPaths = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$biz$2f$pc$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'unstable_getStaticPaths');
const unstable_getStaticParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$biz$2f$pc$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'unstable_getStaticParams');
const unstable_getServerProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$biz$2f$pc$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'unstable_getServerProps');
const unstable_getServerSideProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$biz$2f$pc$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, 'unstable_getServerSideProps');
const routeModule = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2f$module$2e$compiled$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["PagesRouteModule"]({
    definition: {
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["RouteKind"].PAGES,
        page: "/biz/pc",
        pathname: "/biz/pc",
        // The following aren't used in production.
        bundlePath: '',
        filename: ''
    },
    components: {
        // default export might not exist when optimized for data only
        App: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$app$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"],
        Document: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$document$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"]
    },
    userland: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$biz$2f$pc$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
}); //# sourceMappingURL=pages.js.map
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__32bf7510._.js.map