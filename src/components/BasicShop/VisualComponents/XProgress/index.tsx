import React, { memo } from 'react';
import { Progress } from 'zarm';
import styles from './index.less';
import { IXProgressConfig } from './schema';
import logo from '@/assets/15-进度.png';

interface IProps extends IXProgressConfig {
  isTpl: boolean;
}

const XProgress = memo((props: IProps) => {
  const { theme, size, shape, percent, strokeWidth, isTpl } = props;
  return isTpl ? (
    <div>
      <img style={{width: '100%'}} src={logo} alt=""></img>
    </div>
  ) : (
    <div className={styles.textWrap} style={{ textAlign: 'center' }}>
      <Progress
        shape={shape}
        size={size}
        percent={percent}
        theme={theme}
        strokeWidth={strokeWidth}
      />
    </div>
  );
});

export default XProgress;
