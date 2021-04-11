import React, { memo, PropsWithChildren } from 'react';
import { Carousel } from 'antd';
import styles from './index.less';
import { ICarouselConfig } from './schema';
import logo from '@/assets/01-轮播.png';

interface CarouselTypes extends ICarouselConfig {
  isTpl: boolean;
}

const XCarousel = memo((props: PropsWithChildren<CarouselTypes>) => {
  const { dotPosition, autoPlay, isTpl, imgList, tplImg } = props;
  const contentRender = () => {
    return imgList.map((item, i) => {
      return (
        <div className={styles.carousel__item__pic} key={+i}>
          <img src={item.imgUrl.length > 0 ? item.imgUrl[0].url : ''} alt="" />
        </div>
      );
    });
  };
  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      {isTpl ? (
        <div className={styles.carousel__item__pic}>
          <img src={logo} alt="" />
        </div>
      ) : (
        <Carousel
          afterChange={index => {
            // console.log(`onChange: ${index}`);
          }}
          dotPosition={dotPosition}
          autoplay={autoPlay}
        >
          {contentRender()}
        </Carousel>
      )}
    </div>
  );
});

export default XCarousel;
