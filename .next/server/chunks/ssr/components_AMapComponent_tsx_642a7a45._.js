module.exports = {

"[project]/components/AMapComponent.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
const truckIcon = '/truck.png';
const AMapComponent = ({ selectedRouteIdx, setSelectedRouteIdx })=>{
    const mapRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        let map;
        let overlays = [];
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        function clearOverlays() {
            if (map && overlays.length > 0) {
                overlays.forEach((o)=>map.remove(o));
                overlays = [];
            }
        }
        function initMap() {
            try {
                map = new window.AMap.Map(mapRef.current, {
                    zoom: 11,
                    center: [
                        121.5737,
                        31.2337
                    ],
                    viewMode: '3D',
                    mapStyle: 'amap://styles/dark',
                    layers: [
                        new window.AMap.TileLayer.Satellite(),
                        new window.AMap.TileLayer.RoadNet()
                    ]
                });
                // 基地坐标
                const dachang = [
                    121.422082,
                    31.315288
                ];
                const pudong = [
                    121.8577,
                    31.0857
                ];
                // 添加大场基地标记和label
                const dachangMarker = new window.AMap.Marker({
                    position: dachang,
                    title: '上飞公司大场基地',
                    icon: new window.AMap.Icon({
                        size: new window.AMap.Size(48, 48),
                        image: '/station.png',
                        imageSize: new window.AMap.Size(48, 48)
                    }),
                    label: {
                        content: '<div style="color:#fff;font-weight:bold;font-size:16px;background:#222c;padding:2px 8px;border-radius:8px;">大场基地</div>',
                        offset: new window.AMap.Pixel(-20, -50)
                    }
                });
                // 添加浦东基地标记和label
                const pudongMarker = new window.AMap.Marker({
                    position: pudong,
                    title: '上飞公司浦东基地',
                    icon: new window.AMap.Icon({
                        size: new window.AMap.Size(48, 48),
                        image: '/station.png',
                        imageSize: new window.AMap.Size(48, 48)
                    }),
                    label: {
                        content: '<div style="color:#fff;font-weight:bold;font-size:16px;background:#222c;padding:2px 8px;border-radius:8px;">浦东基地</div>',
                        offset: new window.AMap.Pixel(-20, -50)
                    }
                });
                map.add([
                    dachangMarker,
                    pudongMarker
                ]);
                overlays.push(dachangMarker, pudongMarker);
                // 大场基地电子围栏四个拐点
                const dachangPoints = [
                    [
                        121.412,
                        31.322
                    ],
                    [
                        121.432,
                        31.322
                    ],
                    [
                        121.432,
                        31.308
                    ],
                    [
                        121.412,
                        31.308
                    ] // D
                ];
                // 浦东基地电子围栏四个拐点（新坐标，更贴合实际）
                const pudongPoints = [
                    [
                        121.832,
                        31.120
                    ],
                    [
                        121.870,
                        31.120
                    ],
                    [
                        121.870,
                        31.100
                    ],
                    [
                        121.832,
                        31.100
                    ] // 左下
                ];
                // 用Driving服务获取四段路网轨迹并拼接闭环（串行请求，防止QPS超限）
                function drawFence(points, color, style, dashArray) {
                    let fencePath = [];
                    const segments = [
                        [],
                        [],
                        [],
                        []
                    ];
                    function requestSegment(i) {
                        if (i >= 4) {
                            // 拼接四段
                            fencePath = segments[0].concat(segments[1], segments[2], segments[3]);
                            const fence = new window.AMap.Polygon({
                                path: fencePath,
                                strokeColor: color,
                                strokeWeight: 5,
                                strokeOpacity: 1,
                                fillOpacity: 0,
                                strokeStyle: style,
                                strokeDasharray: dashArray || undefined
                            });
                            map.add(fence);
                            overlays.push(fence);
                            return;
                        }
                        const driving = new window.AMap.Driving({
                            policy: window.AMap.DrivingPolicy.LEAST_TIME
                        });
                        driving.search(points[i], points[(i + 1) % 4], (status, result)=>{
                            if (status === 'complete' && result.routes && result.routes.length > 0) {
                                let seg = [];
                                result.routes[0].steps.forEach((step)=>{
                                    if (step.path) seg = seg.concat(step.path);
                                });
                                segments[i] = seg;
                            } else {
                                console.error('电子围栏路径规划失败', points[i], points[(i + 1) % 4], result);
                            }
                            // 串行请求下一段，间隔600ms
                            setTimeout(()=>requestSegment(i + 1), 600);
                        });
                    }
                    requestSegment(0);
                }
                // 大场：绿色实线
                drawFence(dachangPoints, '#00FF00', 'solid', undefined);
                // 浦东：黄色虚线
                drawFence(pudongPoints, '#FFD700', 'dashed', [
                    20,
                    20
                ]);
                // 多组起点终点，制造多条路线，并指定不同策略
                const routePairs = [
                    // 大场到浦东
                    {
                        start: [
                            121.422082,
                            31.315288
                        ],
                        end: [
                            121.8577,
                            31.0857
                        ],
                        color: '#00FF00',
                        policy: window.AMap ? window.AMap.DrivingPolicy.LEAST_TIME : 0
                    },
                    // 浦东到大场
                    {
                        start: [
                            121.8577,
                            31.0857
                        ],
                        end: [
                            121.422082,
                            31.315288
                        ],
                        color: '#1E90FF',
                        policy: window.AMap ? window.AMap.DrivingPolicy.LEAST_DISTANCE : 1
                    },
                    // 大场到浦东（不同策略）
                    {
                        start: [
                            121.419,
                            31.315288
                        ],
                        end: [
                            121.8577,
                            31.081
                        ],
                        color: '#FF69B4',
                        policy: window.AMap ? window.AMap.DrivingPolicy.LEAST_FEE : 2
                    },
                    // 浦东到大场（不同策略）
                    {
                        start: [
                            121.862,
                            31.0857
                        ],
                        end: [
                            121.422082,
                            31.318
                        ],
                        color: '#FFD700',
                        policy: window.AMap ? window.AMap.DrivingPolicy.LEAST_TIME : 0
                    }
                ];
                window.AMap.plugin('AMap.Driving', function() {
                    routePairs.slice(0, 3).forEach((pair, idx)=>{
                        if (selectedRouteIdx !== null && selectedRouteIdx !== idx) return;
                        const driving = new window.AMap.Driving({
                            map: null,
                            policy: pair.policy
                        });
                        driving.search(pair.start, pair.end, (status, result)=>{
                            if (status === 'complete' && result.routes && result.routes.length > 0) {
                                const steps = result.routes[0].steps;
                                let path = [];
                                steps.forEach((step)=>{
                                    if (step.path) {
                                        path = path.concat(step.path);
                                    }
                                });
                                if (selectedRouteIdx !== null) {
                                    // 单车模式：已行驶实线，未行驶虚线
                                    const progress = Math.floor(path.length * 0.6);
                                    const passedPath = path.slice(0, progress);
                                    const futurePath = path.slice(progress - 1);
                                    if (passedPath.length > 1) {
                                        const passedPolyline = new window.AMap.Polyline({
                                            path: passedPath,
                                            strokeColor: pair.color,
                                            strokeWeight: 6,
                                            strokeOpacity: 1,
                                            isOutline: true,
                                            outlineColor: '#222',
                                            lineJoin: 'round',
                                            lineCap: 'round'
                                        });
                                        map.add(passedPolyline);
                                        overlays.push(passedPolyline);
                                    }
                                    if (futurePath.length > 1) {
                                        const futurePolyline = new window.AMap.Polyline({
                                            path: futurePath,
                                            strokeColor: pair.color,
                                            strokeWeight: 6,
                                            strokeOpacity: 1,
                                            isOutline: true,
                                            outlineColor: '#222',
                                            lineJoin: 'round',
                                            lineCap: 'round',
                                            strokeStyle: 'dashed',
                                            strokeDasharray: [
                                                20,
                                                20
                                            ]
                                        });
                                        map.add(futurePolyline);
                                        overlays.push(futurePolyline);
                                    }
                                } else {
                                    // 全局模式：全部用实线
                                    if (path.length > 1) {
                                        const polyline = new window.AMap.Polyline({
                                            path: path,
                                            strokeColor: pair.color,
                                            strokeWeight: 6,
                                            strokeOpacity: 1,
                                            isOutline: true,
                                            outlineColor: '#222',
                                            lineJoin: 'round',
                                            lineCap: 'round'
                                        });
                                        map.add(polyline);
                                        overlays.push(polyline);
                                    }
                                }
                                // 每条轨迹上只放1辆卡车
                                const truckIdx = Math.floor((path.length - 1) / 2);
                                const truckMarker = new window.AMap.Marker({
                                    position: path[truckIdx],
                                    icon: new window.AMap.Icon({
                                        size: new window.AMap.Size(40, 40),
                                        image: truckIcon,
                                        imageSize: new window.AMap.Size(40, 40)
                                    }),
                                    offset: new window.AMap.Pixel(-20, -20),
                                    extData: {
                                        routeIdx: idx
                                    }
                                });
                                truckMarker.on('click', ()=>{
                                    setSelectedRouteIdx(idx);
                                });
                                map.add(truckMarker);
                                overlays.push(truckMarker);
                            } else {
                                console.error('获取驾车数据失败：', result);
                            }
                        });
                    });
                });
            } catch (error) {
                console.error('初始化地图失败:', error);
            }
        }
        // 监听 selectedRouteIdx 变化，切换视图时清理并重绘
        return ()=>{
            clearOverlays();
        };
    }, [
        selectedRouteIdx,
        setSelectedRouteIdx
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                ref: mapRef,
                style: {
                    width: '100vw',
                    height: '100vh'
                }
            }, void 0, false, {
                fileName: "[project]/components/AMapComponent.tsx",
                lineNumber: 300,
                columnNumber: 7
            }, this),
            selectedRouteIdx !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                style: {
                    position: 'absolute',
                    bottom: 40,
                    right: 40,
                    zIndex: 1000,
                    padding: '10px 20px',
                    fontSize: 16,
                    background: '#222c',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px #00eaff33'
                },
                onClick: ()=>setSelectedRouteIdx(null),
                children: "返回全局"
            }, void 0, false, {
                fileName: "[project]/components/AMapComponent.tsx",
                lineNumber: 302,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
};
const __TURBOPACK__default__export__ = AMapComponent;
}}),
"[project]/components/AMapComponent.tsx [ssr] (ecmascript, next/dynamic entry)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/components/AMapComponent.tsx [ssr] (ecmascript)"));
}}),

};

//# sourceMappingURL=components_AMapComponent_tsx_642a7a45._.js.map