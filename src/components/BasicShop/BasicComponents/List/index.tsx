import React, { memo } from 'react';
import styles from './index.less';
import { IListConfig } from './schema';
import logo from '@/assets/07-列表.png';

interface ListType extends IListConfig {
  isTpl?: boolean;
}

const List = memo((props: ListType) => {
  const { round, sourceData, imgSize, fontSize, color, padding } = props;
  return props.isTpl ? (
    <div>
      <img style={{width: '100%'}} src={logo} alt="" />
    </div>
  ) : (
    <div className={styles.list}>
      <div className={styles.sourceList}>
        {sourceData.map((item, i) => {
          return (
            <div className={styles.sourceItem} key={i} style={{marginBottom: padding + 'px'}}>
              <div className={styles.imgWrap}>
                <img
                  src={
                    item.imgUrl[0]
                      ? item.imgUrl[0].url
                      : 'http://io.nainor.com/uploads/01_173e15d3493.png'
                  }
                  alt={item.desc}
                  style={{
                    width: parseFloat(imgSize),
                    height: imgSize + 'px',
                    objectFit: 'cover',
                    borderRadius: round,
                  }}
                />
              </div>
              <div className={styles.content}>
                <a
                  className={styles.tit}
                  style={{ fontSize, color }}
                  href={item.link ? item.link : '#'}
                >
                  {item.title}
                  <div
                    className={styles.desc}
                    style={{ fontSize: fontSize * 0.8, color: 'rgba(0,0,0, .3)' }}
                  >
                    {item.desc}
                  </div>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default List;
