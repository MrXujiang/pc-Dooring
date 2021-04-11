import {
  IDataListConfigType,
  IRadioConfigType,
  ISwitchConfigType,
  TDataListDefaultType,
  TRadioDefaultType,
  TSwitchDefaultType,
} from '@/components/PanelComponents/FormEditor/types';

export type CarouselDirectionKeyType = 'top' | 'bottom' | 'left' | 'right';

export type TCarouselEditData = Array<
  IRadioConfigType<CarouselDirectionKeyType> | ISwitchConfigType | IDataListConfigType
>;
export interface ICarouselConfig {
  dotPosition: TRadioDefaultType<CarouselDirectionKeyType>;
  autoPlay: TSwitchDefaultType;
  imgList: TDataListDefaultType;
  tplImg: string;
}

export interface ICarouselSchema {
  editData: TCarouselEditData;
  config: ICarouselConfig;
}

const Carousel: ICarouselSchema = {
  editData: [
    {
      key: 'dotPosition',
      name: '方向',
      type: 'Radio',
      range: [
        {
          key: 'top',
          text: '顶部',
        },
        {
          key: 'left',
          text: '左部',
        },
        {
          key: 'bottom',
          text: '底部',
        },
        {
          key: 'right',
          text: '右部',
        },
      ],
    },
    {
      key: 'autoPlay',
      name: '是否自动播放',
      type: 'Switch',
    },
    {
      key: 'imgList',
      name: '图片列表',
      type: 'DataList'
    },
  ],
  config: {
    dotPosition: 'left',
    autoPlay: false,
    imgList: [
      {
        id: '1',
        title: '趣谈小课1',
        desc: '致力于打造优质小课程',
        link: 'xxxxx',
        imgUrl: [
          {
            uid: '001',
            name: 'image.png',
            status: 'done',
            url: 'http://h5.dooring.cn/uploads/1_1740bd7c3dc.png',
          },
        ],
      },
      {
        id: '2',
        title: '趣谈小课1',
        desc: '致力于打造优质小课程',
        link: 'xxxxx',
        imgUrl: [
          {
            uid: '001',
            name: 'image.png',
            status: 'done',
            url: 'http://h5.dooring.cn/uploads/2_1740bd8d525.png',
          },
        ],
      },
    ],
    tplImg: 'http://h5.dooring.cn/uploads/carousal_17442e1420f.png',
  },
};
export default Carousel;
