import { memo } from 'react';
import styles from './index.less';
import React from 'react';
import { Input } from 'antd';
import logo from '@/assets/search.png';
import { IHeaderConfig } from './schema';

const { Search } = Input;

interface HeaderPropTypes extends IHeaderConfig {
  isTpl: boolean;
}

const Header = memo((props: HeaderPropTypes) => {
  const { placeholder, enterButton, size } = props;
  return props.isTpl ? (
    <div>
      <img style={{width: '100%'}} src={logo} alt="" />
    </div>
  ) : (
    <div style={{width: '100%', padding: '16px'}}>
      <Search
        placeholder={placeholder}
        allowClear
        onSearch={() => {}}
        style={{ width: '100%' }}
        enterButton={!!enterButton}
        size={size}
      />
    </div>
  );
});

export default Header;
