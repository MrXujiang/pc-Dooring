import {
  IColorConfigType,
  INumberConfigType,
  ITextConfigType,
  IUploadConfigType,
  IRadioConfigType,
  TColorDefaultType,
  TNumberDefaultType,
  TRadioDefaultType,
  TTextDefaultType,
  TUploadDefaultType,
} from '@/components/PanelComponents/FormEditor/types';

export type HeaderFixedKeyType = 0 | 1;

export type THeaderEditData = Array<
  IColorConfigType | INumberConfigType | IUploadConfigType | ITextConfigType | IRadioConfigType<HeaderFixedKeyType>
>;
export interface IHeaderConfig {
  bgColor: TColorDefaultType;
  logo: TUploadDefaultType;
  logoText: TTextDefaultType;
  fontSize: TNumberDefaultType;
  color: TColorDefaultType;
  height: TNumberDefaultType;
  // fixed: TRadioDefaultType<HeaderFixedKeyType>;
}

export interface IHeaderSchema {
  editData: THeaderEditData;
  config: IHeaderConfig;
}

const Header: IHeaderSchema = {
  editData: [
    {
      key: 'bgColor',
      name: '背景色',
      type: 'Color',
    },
    {
      key: 'height',
      name: '高度',
      type: 'Number',
    },
    {
      key: 'logo',
      name: 'logo',
      type: 'Upload',
      isCrop: true,
      cropRate: 1000 / 618,
    },
    {
      key: 'logoText',
      name: 'logo文字',
      type: 'Text',
    },
    {
      key: 'color',
      name: '文字颜色',
      type: 'Color',
    },
    {
      key: 'fontSize',
      name: '文字大小',
      type: 'Number',
    }
  ],
  config: {
    bgColor: 'rgba(47,84,235,1)',
    logo: [
      {
        uid: '001',
        name: 'image.png',
        status: 'done',
        url: 'http://h5.dooring.cn/uploads/3_1740be8a482.png',
      },
    ],
    logoText: '页头Header',
    fontSize: 20,
    color: 'rgba(255,255,255,1)',
    height: 50,
    // fixed: 0
  },
};

export default Header;
