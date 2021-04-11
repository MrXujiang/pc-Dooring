import React, { memo } from 'react';
import { IFooterConfig } from './schema';
import logo from '@/assets/02-页脚.png';

interface FooterPropTypes extends IFooterConfig {
  isTpl: boolean;
}

const Footer = memo((props: FooterPropTypes) => {
  const { bgColor, text, color, align, fontSize, height } = props;
  return props.isTpl ? (
    <div>
      <img style={{width: '100%'}} src={logo} alt="" />
    </div>
  ) : (
    <footer
      style={{
        backgroundColor: bgColor,
        color,
        fontSize,
        textAlign: align,
        height,
        lineHeight: height + 'px',
      }}
    >
      {text}
    </footer>
  );
});

export default Footer;
