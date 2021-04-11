import React, { memo } from 'react';
import styles from './index.less';
import { Divider } from 'antd';
import { ITextConfig } from './schema';
import logo from '@/assets/drivide.png';

interface TextType extends ITextConfig {
  isTpl?: boolean;
}

const Text = memo((props: TextType) => {
  const { 
    text,
    color,
    dashed,
    orientation,
    type,
    isTpl
  } = props;
  
  return isTpl ? (
    <div>
      <img style={{width: '100%'}} src={logo} alt=""></img>
    </div>
  ) : (
    <div 
      className={styles.dividerWrap}
    >
      <Divider dashed={!!dashed} orientation={orientation} type={type}> 
        {
          !!text && <span style={{color}}>{ text }</span>
        }
      </Divider>
    </div>
  );
});
export default Text;
