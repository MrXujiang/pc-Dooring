import React, { memo, useEffect, useRef, useState } from 'react';
import GridLayout from 'react-grid-layout';
import DynamicEngine from 'components/DynamicEngine';
import domtoimage from 'dom-to-image';
import req from '@/utils/req';
import styles from './index.less';
import { LocationDescriptorObject } from 'history-with-query';

const isMac = navigator.platform.indexOf('Mac') === 0;

interface PreviewPageProps {
  location: LocationDescriptorObject;
}
interface PointDataItem {
  id: string;
  item: Record<string, any>;
  point: Record<string, any>;
}

const PreviewPage = memo((props: PreviewPageProps) => {
  const [pointData, setPointData] = useState(() => {
    let pointDataStr = localStorage.getItem('pc_pointData');
    let points;

    try {
      points = JSON.parse(pointDataStr!) || [];
    } catch (err) {
      points = [];
    }
    return points.map((item: PointDataItem) => ({
      ...item,
      point: { ...item.point, isDraggable: false, isResizable: false },
    }));
  });

  const [pageData, setPageData] = useState(() => {
    let pageConfigStr = localStorage.getItem('pc_pageConfig');
    let pageConfig;

    try {
      pageConfig = JSON.parse(pageConfigStr!) || {};
    } catch (err) {
      pageConfig = {};
    }
    return pageConfig
  });

  const vw = window.innerWidth;

  useEffect(() => {
    const { tid, gf } = props.location.query!;
    if(!gf && parent.window.location.pathname === '/preview') {
      req
      .get<any, any>('/visible/preview/get', { params: { tid } })
      .then(res => {
        const { pageConfig, tpl } = res || { pageConfig: {}, tpl: [] };
        // 设置标题
        document.title = pageConfig.title || 'H5-Dooring | 强大的页面可视化编辑神器';
        // 设置数据源
        setPointData(
          tpl.map(item => ({
            ...item,
            point: { ...item.point, isDraggable: false, isResizable: false },
          })),
        );

        setPageData(pageConfig)
      })
      .catch(err => {
        console.error(err);
      });
      return
    }

    setTimeout(() => {
      generateImg((url:string) => {
        parent.window.getFaceUrl(url);
      })
    }, 3000)
    
  }, [props.location.query]);

  const ref = useRef<HTMLDivElement>(null);
  const refImgDom = useRef<HTMLDivElement>(null);

  const generateImg = (cb:any) => {
    domtoimage.toBlob(refImgDom.current, 
      {
        width: 2 * refImgDom.current!.offsetWidth,
        height: 2 * refImgDom.current!.offsetHeight,
        bgcolor: '#fff',
        style: {
          transform: "scale(2)",
          transformOrigin: "top left",
          width: refImgDom.current?.offsetWidth + "px",
          height: refImgDom.current?.offsetHeight + "px"
        }
      }
    )
    .then(function (blob:Blob) {
        const formData = new FormData();
        formData.append('file', blob, 'tpl.jpg');
        req.post('/files/upload/free', formData).then((res:any) => {
          cb && cb(res.url)
        })
    })
    .catch(function (error:any) {
        console.error('oops, something went wrong!', error);
    });
  }

  return (
    <>
      <div ref={ref} style={{width: '100vw', height: '100vh', overflow: 'auto', backgroundColor: pageData.bgColor}}>
        <div ref={refImgDom}>
          <GridLayout
            className={styles.layout}
            cols={24}
            rowHeight={2}
            width={vw}
            margin={[0, 0]}
            style={{
              backgroundColor: pageData.bgColor,
              backgroundImage: pageData.bgImage ? `url(${pageData.bgImage[0].url})` : 'initial',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {pointData.map((value: PointDataItem) => (
              <div className={styles.dragItem} key={value.id} data-grid={value.point}>
                <DynamicEngine {...(value.item as any)} />
              </div>
            ))}
          </GridLayout>
        </div>
      </div>
    </>
  );
});

export default PreviewPage;

