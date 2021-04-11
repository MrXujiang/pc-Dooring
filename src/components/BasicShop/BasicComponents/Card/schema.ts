import {
  IColorConfigType,
  INumberConfigType,
  ITextConfigType,
  ITextAreaConfigType,
  IUploadConfigType,
  TColorDefaultType,
  TNumberDefaultType,
  TTextDefaultType,
  TUploadDefaultType,
  TTextAreaDefaultType,
} from '@/components/PanelComponents/FormEditor/types';

export type TCardEditData = Array<
  IUploadConfigType | ITextConfigType | IColorConfigType | INumberConfigType | ITextAreaConfigType
>;
export interface ICardConfig {
  width: TNumberDefaultType;
  bgColor: TColorDefaultType;
  bgPadding: TNumberDefaultType;
  cardRadius: TNumberDefaultType;
  link: TTextDefaultType;
  imgUrl: TUploadDefaultType;
  title: TTextDefaultType;
  desc: TTextAreaDefaultType;
  titColor: TColorDefaultType;
  titFontSize: TNumberDefaultType;
  descColor: TColorDefaultType;
  descFontSize: TNumberDefaultType;
}

export interface ICardSchema {
  editData: TCardEditData;
  config: ICardConfig;
}

const Card: ICardSchema = {
  editData: [
    {
      key: 'width',
      name: '卡片宽度',
      type: 'Number',
    },
    {
      key: 'bgColor',
      name: '卡片背景颜色',
      type: 'Color',
    },
    {
      key: 'bgPadding',
      name: '内容边距',
      type: 'Number',
    },
    {
      key: 'cardRadius',
      name: '卡片圆角',
      type: 'Number',
    },
    {
      key: 'link',
      name: '点击跳转链接',
      type: 'Text',
    },
    {
      key: 'imgUrl',
      name: '选择图片',
      type: 'Upload',
      isCrop: true,
      cropRate: 1,
    },
    {
      key: 'title',
      name: '标题',
      type: 'Text',
    },
    {
      key: 'titColor',
      name: '标题颜色',
      type: 'Color',
    },
    {
      key: 'titFontSize',
      name: '标题大小',
      type: 'Number',
    },
    {
      key: 'desc',
      name: '描述',
      type: 'TextArea',
    },
    {
      key: 'descColor',
      name: '描述颜色',
      type: 'Color',
    },
    {
      key: 'descFontSize',
      name: '描述文字大小',
      type: 'Number',
    }
  ],
  config: {
    width: 220,
    imgUrl: [
      {
        uid: '001',
        name: 'image.png',
        status: 'done',
        url: 'http://h5.dooring.cn/uploads/card@2x_175d58cb3a1.png',
      },
    ],
    title: '卡片标题',
    desc: '卡片描述',
    titColor: 'rgba(0,0,0,1)',
    titFontSize: 18,
    descColor: 'rgba(0,0,0,.6)',
    descFontSize: 14,
    bgColor: 'rgba(255,255,255,1)',
    bgPadding: 16,
    cardRadius: 6,
    link: ''
  },
};

export default Card;
