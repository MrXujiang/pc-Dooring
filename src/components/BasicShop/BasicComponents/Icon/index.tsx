import React, { memo } from 'react';
import * as Icon from '@ant-design/icons';
import IconImg from 'assets/icon.png';
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';
import { AntdIconType } from './icon';
import { IIconConfig } from './schema';
import logo from '@/assets/05-图标.png';

interface IconType extends IIconConfig {
  isTpl?: boolean;
}
const XIcon = memo((props: IconType) => {
  const { color, size, type, spin, isTpl } = props;

  const MyIcon: React.ForwardRefExoticComponent<Pick<AntdIconProps, AntdIconType> &
    React.RefAttributes<HTMLSpanElement>> = Icon[type];

  return isTpl ? (
    <div>
      <img style={{width: '100%'}} src={logo} alt="" />
    </div>
  ) : (
    <MyIcon twoToneColor={color} style={{ fontSize: size }} spin={spin} />
  );
});

export default XIcon;
