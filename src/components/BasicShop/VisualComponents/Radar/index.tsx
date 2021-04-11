import { Chart } from '@antv/f2';
import React, { memo, useEffect, useRef } from 'react';
// import { uuid } from 'utils/tool';
import AreaImg from '@/assets/leida.png';

import styles from './index.less';
import { IChartConfig } from './schema';

interface XRadarProps extends IChartConfig {
  isTpl: boolean;
}

const XRadar = (props: XRadarProps) => {
  const { isTpl, data, color, size, paddingTop, title } = props;
  const chartRef = useRef(null);
  useEffect(() => {
    if (!isTpl) {
      const chart = new Chart({
        el: chartRef.current || undefined,
        pixelRatio: window.devicePixelRatio, // 指定分辨率
      });

      // step 2: 处理数据
      const dataX = data.map(item => ({ ...item, value: Number(item.value)}));

      // Step 2: 载入数据源
      chart.coord('polar');
      chart.source(dataX, {
        score: {
          nice: true,
          tickCount: 5
        }
      });

      chart.axis('name', {
        label: function label(text, index, total) {
          if (index === total - 1) {
            return null;
          }
          return {
            top: true
          };
        },
        grid: function grid(text) {
          if (text === '120') {
            return {
              lineDash: null
            };
          }
        },
        line: {
          top: false
        }
      });
      chart.area().position('name*value')
        .animate({
          appear: {
            animation: 'groupWaveIn'
          }
        });
      chart.line().position('name*value')
        .animate({
          appear: {
            animation: 'groupWaveIn'
          }
        });
      chart.point().position('name*value')
        .style({
          stroke: '#fff',
          lineWidth: 1
        })
        .animate({
          appear: {
            delay: 300
          }
        });
      chart.render();
    }
  }, [data, isTpl]);
  return (
    <div className={styles.chartWrap}>
      <div className={styles.chartTitle} style={{ color, fontSize: size, paddingTop }}>
        {title}
      </div>
      {isTpl ? <img src={AreaImg} alt="dooring chart" /> : <canvas ref={chartRef}></canvas>}
    </div>
  );
};

export default memo(XRadar);
