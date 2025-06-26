import React, { useEffect, useRef } from 'react';

// 声明全局 AMap 类型
declare global {
  interface Window {
    AMap: any;
    _AMapSecurityConfig?: any;
  }
}

const truckIcon = '/truck.png';

interface Props {
  selectedRouteIdx: number | null;
  setSelectedRouteIdx: (idx: number | null) => void;
}

const AMapComponent = ({ selectedRouteIdx, setSelectedRouteIdx }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: any;
    let overlays: any[] = [];
    if (typeof window !== 'undefined' && mapRef.current) {
      // 设置高德安全密钥
      window._AMapSecurityConfig = {
        securityJsCode: 'bade43594a020944a72b111f21027000',
      };
      if (window.AMap) {
        initMap();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://webapi.amap.com/maps?v=2.0&key=5934d3bbd34e2a0eb8f3de21c5a0c948&plugin=AMap.Driving';
      script.async = true;
      script.onload = () => {
        if (window.AMap) {
          initMap();
        } else {
          console.error('高德地图 SDK 加载失败');
        }
      };
      script.onerror = () => {
        console.error('高德地图 SDK 加载失败');
      };
      document.body.appendChild(script);
    }

    function clearOverlays() {
      if (map && overlays.length > 0) {
        overlays.forEach(o => map.remove(o));
        overlays = [];
      }
    }

    function initMap() {
      try {
        map = new window.AMap.Map(mapRef.current, {
          zoom: 11,
          center: [121.5737, 31.2337],
          viewMode: '3D',
          mapStyle: 'amap://styles/dark',
          layers: [
            new window.AMap.TileLayer.Satellite(),
            new window.AMap.TileLayer.RoadNet()
          ]
        });

        // 基地坐标
        const dachang = [121.422082, 31.315288];
        const pudong = [121.8577, 31.0857];

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

        map.add([dachangMarker, pudongMarker]);
        overlays.push(dachangMarker, pudongMarker);

        // 大场基地电子围栏四个拐点
        const dachangPoints = [
          [121.412, 31.322], // A
          [121.432, 31.322], // B
          [121.432, 31.308], // C
          [121.412, 31.308]  // D
        ];
        // 浦东基地电子围栏四个拐点（新坐标，更贴合实际）
        const pudongPoints = [
          [121.832, 31.120], // 左上
          [121.870, 31.120], // 右上
          [121.870, 31.100], // 右下
          [121.832, 31.100]  // 左下
        ];

        // 用Driving服务获取四段路网轨迹并拼接闭环（串行请求，防止QPS超限）
        function drawFence(points, color, style, dashArray) {
          let fencePath = [];
          const segments = [[], [], [], []];
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
            const driving = new window.AMap.Driving({ policy: window.AMap.DrivingPolicy.LEAST_TIME });
            driving.search(points[i], points[(i+1)%4], (status, result) => {
              if (status === 'complete' && result.routes && result.routes.length > 0) {
                let seg = [];
                result.routes[0].steps.forEach(step => {
                  if (step.path) seg = seg.concat(step.path);
                });
                segments[i] = seg;
              } else {
                console.error('电子围栏路径规划失败', points[i], points[(i+1)%4], result);
              }
              // 串行请求下一段，间隔600ms
              setTimeout(() => requestSegment(i + 1), 600);
            });
          }
          requestSegment(0);
        }
        // 大场：绿色实线
        drawFence(dachangPoints, '#00FF00', 'solid', undefined);
        // 浦东：黄色虚线
        drawFence(pudongPoints, '#FFD700', 'dashed', [20, 20]);

        // 多组起点终点，制造多条路线，并指定不同策略
        const routePairs = [
          // 大场到浦东
          {
            start: [121.422082, 31.315288],
            end: [121.8577, 31.0857],
            color: '#00FF00',
            policy: window.AMap ? window.AMap.DrivingPolicy.LEAST_TIME : 0
          },
          // 浦东到大场
          {
            start: [121.8577, 31.0857],
            end: [121.422082, 31.315288],
            color: '#1E90FF',
            policy: window.AMap ? window.AMap.DrivingPolicy.LEAST_DISTANCE : 1
          },
          // 大场到浦东（不同策略）
          {
            start: [121.419, 31.315288],
            end: [121.8577, 31.081],
            color: '#FF69B4',
            policy: window.AMap ? window.AMap.DrivingPolicy.LEAST_FEE : 2
          },
          // 浦东到大场（不同策略）
          {
            start: [121.862, 31.0857],
            end: [121.422082, 31.318],
            color: '#FFD700',
            policy: window.AMap ? window.AMap.DrivingPolicy.LEAST_TIME : 0
          }
        ];

        window.AMap.plugin('AMap.Driving', function() {
          routePairs.slice(0, 3).forEach((pair, idx) => {
            if (selectedRouteIdx !== null && selectedRouteIdx !== idx) return;
            const driving = new window.AMap.Driving({
              map: null,
              policy: pair.policy
            });
            driving.search(pair.start, pair.end, (status: string, result: any) => {
              if (status === 'complete' && result.routes && result.routes.length > 0) {
                const steps = result.routes[0].steps;
                let path = [];
                steps.forEach(step => {
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
                      lineCap: 'round',
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
                      strokeDasharray: [20, 20]
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
                      lineCap: 'round',
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
                  extData: { routeIdx: idx }
                });
                truckMarker.on('click', () => {
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
    return () => {
      clearOverlays();
    };
  }, [selectedRouteIdx, setSelectedRouteIdx]);

  return (
    <>
      <div ref={mapRef} style={{ width: '100vw', height: '100vh' }} />
      {selectedRouteIdx !== null && (
        <button
          style={{
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
          }}
          onClick={() => setSelectedRouteIdx(null)}
        >
          返回全局
        </button>
      )}
    </>
  );
};

export default AMapComponent; 