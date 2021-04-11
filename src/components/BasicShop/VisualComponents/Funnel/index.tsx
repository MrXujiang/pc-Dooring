import { Chart } from '@antv/f2';
import React, { memo, useEffect, useRef } from 'react';
// import { uuid } from 'utils/tool';
import AreaImg from '@/assets/loudou.png';

import styles from './index.less';
import { IChartConfig } from './schema';

const intervalLabel = require('@antv/f2/lib/plugin/interval-label');
// 第二步：注册插件 Tooltip
Chart.plugins.register(intervalLabel); 

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
        padding: [ 60, 80, 25, 50 ]
      });

      // step 2: 处理数据
      const dataX = data.map(item => ({ ...item, value: Number(item.value)}));

      // Step 2: 载入数据源
      chart.coord('polar');
      chart.source(dataX);

      chart.axis(false);
      chart.coord({
        transposed: true
      });
      chart.legend(true);
      chart.intervalLabel({
        offsetX: 10,
        label: (data, color) => {
          return {
            text: data.name,
            fill: color
          };
        },
        guide: data => {
          return {
            text: (data.value * 100).toFixed(0) + '%',
            fill: '#fff'
          };
        }
      });

      chart.interval()
        .position('name*value')
        .color('name', [ '#003366', '#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF'])
        .adjust('symmetric')
        .shape('pyramid');
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
