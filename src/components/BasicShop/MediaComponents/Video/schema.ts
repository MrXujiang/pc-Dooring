import {
  ITextConfigType,
  IUploadConfigType,
  TTextDefaultType,
  TUploadDefaultType,
  TTextAreaDefaultType,
  ITextAreaConfigType,
} from '@/components/PanelComponents/FormEditor/types';

export type TVideoEditData = Array<IUploadConfigType | ITextConfigType | ITextAreaConfigType>;
export interface IVideoConfig {
  poster: TUploadDefaultType;
  url: TTextDefaultType;
  otherCode: TTextAreaDefaultType;
}

export interface IVideoSchema {
  editData: TVideoEditData;
  config: IVideoConfig;
}

const Video: IVideoSchema = {
  editData: [
    {
      key: 'poster',
      name: '视频封面',
      type: 'Upload',
    },
    {
      key: 'url',
      name: '视频链接',
      type: 'Text',
    },
    {
      key: 'otherCode',
      name: '第三方代码',
      type: 'TextArea',
    },
  ],
  config: {
    poster: [
      {
        uid: '001',
        name: 'image.png',
        status: 'done',
        url: 'http://h5.dooring.cn/uploads/1_1740c6fbcd9.png',
      },
    ],
    url: '',
    otherCode: ''
  },
};

export default Video;
