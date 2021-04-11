import React, { memo } from 'react';
import { Button, Popover } from 'antd';
import styles from './index.less';

///这组件写的有问题  popover会重定位
const content = (
  <div className={styles.imgWrap}>
    <img src="http://h5.dooring.cn/uploads/apay_1756b1405d8.jpeg" alt="sponsorship" />
  </div>
);

export default memo(function ZanPao() {
  return (
    <div className={styles.takeCat}>
      <Popover placement="top" title={null} content={content} trigger="hover">
        <Button type="primary" danger style={{background: 'red !important'}}>
          支持作者, 换台好点的服务器?
        </Button>
      </Popover>
    </div>
  );
});
