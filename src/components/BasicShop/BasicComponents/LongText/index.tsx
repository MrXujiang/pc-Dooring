import React, { memo } from 'react';
import styles from './index.less';
import { ILongTextConfig } from './schema';
import logo from '@/assets/08-长文本.png';

interface LongTextType extends ILongTextConfig {
  isTpl?: boolean;
}

const LongText = memo((props: LongTextType) => {
  const { text, fontSize, color, indent, lineHeight, textAlign, bgColor, padding, radius } = props;
  return props.isTpl ? (
    <div>
      <img style={{width: '100%'}} src={logo} alt="" />
    </div>
  ) : (
    <div
      className={styles.textWrap}
      style={{ 
        color, 
        textIndent: indent + 'px', 
        fontSize, 
        lineHeight, 
        textAlign,
        backgroundColor: bgColor,
        padding,
        borderRadius: radius
      }}
    >
      {text}
    </div>
  );
});
export default LongText;
