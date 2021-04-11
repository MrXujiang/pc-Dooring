import React, { memo, useEffect, useState, useMemo, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import GridLayout, { ItemCallback } from 'react-grid-layout';
import { connect } from 'dva';
import DynamicEngine from 'components/DynamicEngine';
import { uuid } from '@/utils/tool';
import req from '@/utils/req';
import { Dispatch } from 'umi';
import { StateWithHistory } from 'redux-undo';
import { Menu, Item, MenuProvider } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';
import styles from './index.less';

interface sizeMapType {
  [name: string]: number
}

const sizeMap:sizeMapType = {
  Carousel: 24,
  Form: 8,
  Header: 24,
  Footer: 24,
  Icon: 1,
  Image: 10,
  WhiteTpl: 24,
  List: 8,
  LongText: 8,
  Notice: 8,
  Card: 6,
  Qrcode: 8,
  Tab: 8,
  Text: 8,
  XButton: 8,
  Audio: 8,
  Video: 8,
  Area: 10,
  Chart: 10,
  Funnel: 10,
  Line: 10,
  Pie: 10,
  Radar: 10,
  XProgress: 10,
  Search: 6,
  Divider: 24
}

interface SourceBoxProps {
  pstate: { pointData: { id: string; item: any; point: any; isMenu?: any }[]; curPoint: any; pageConfig: any; };
  cstate: { pointData: { id: string; item: any; point: any }[]; curPoint: any };
  scaleNum: number;
  canvasId: string;
  allType: string[];
  dispatch: Dispatch;
  dragState: { x: number; y: number };
  setDragState: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >;
}

const SourceBox = memo((props: SourceBoxProps) => {
  const { 
    pstate, 
    scaleNum, 
    canvasId, 
    allType, 
    dispatch,
    dragState, 
    setDragState, 
    cstate,
  } = props;

  const pointData = pstate ? pstate.pointData : {};
  const cpointData = cstate ? cstate.pointData : [];
  const pageConfig = pstate ? pstate.pageConfig : {};

  const [canvasRect, setCanvasRect] = useState([]);
  const [{ isOver }, drop] = useDrop({
    accept: allType,
    drop: (item, monitor) => {
      let parentDiv = document.getElementById(canvasId),
        pointRect = parentDiv.getBoundingClientRect(),
        top = pointRect.top,
        pointEnd = monitor.getSourceClientOffset(),
        y = pointEnd.y < top ? 0 : pointEnd.y - top,
        col = 24, // 网格列数
        cellHeight = 2,
        w = sizeMap[item.type as string];
      // 转换成网格规则的坐标和大小
      let gridY = Math.ceil(y / cellHeight);
      dispatch({
        type: 'editorModal/addPointData',
        payload: {
          id: uuid(6, 10),
          item,
          point: { i: `x-${pointData.length}`, x: 0, y: gridY, w, h: item.h, isBounded: true },
          status: 'inToCanvas'
        },
      });
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      item: monitor.getItem(),
    }),
  });

  const dragStop: ItemCallback = (layout, oldItem, newItem, placeholder, e, element) => {
    const curPointData = pointData.filter(item => item.id === newItem.i)[0];
    dispatch({
      type: 'editorModal/modPointData',
      payload: { ...curPointData, point: newItem },
    });
  };

  const onDragStart: ItemCallback = (layout, oldItem, newItem, placeholder, e, element) => {
    const curPointData = pointData.filter(item => item.id === newItem.i)[0];
    dispatch({
      type: 'editorModal/modPointData',
      payload: { ...curPointData },
    });
  };

  

  const onResizeStop: ItemCallback = (layout, oldItem, newItem, placeholder, e, element) => {
    const curPointData = pointData.filter(item => item.id === newItem.i)[0];
    dispatch({
      type: 'editorModal/modPointData',
      payload: { ...curPointData, point: newItem },
    });
  };

  const handleContextMenuDel = () => {
    if(pstate.curPoint) {
      dispatch({
        type: 'editorModal/delPointData',
        payload: { id: pstate.curPoint.id },
      });
    }
  };

  const handleContextMenuCopy = () => {
    if(pstate.curPoint) {
      dispatch({
        type: 'editorModal/copyPointData',
        payload: { id: pstate.curPoint.id },
      });
    }
  };

  const onConTextClick = (type:string) => {
    if(type === 'del') {
      handleContextMenuDel()
    }else if(type === 'copy') {
      handleContextMenuCopy()
    }
  };

  const MyAwesomeMenu = useCallback(() => (
    <Menu id='menu_id'>
      <Item onClick={() => onConTextClick('copy')}>复制</Item>
      <Item onClick={() => onConTextClick('del')}>删除</Item>
    </Menu>
  ), [onConTextClick]);

  useEffect(() => {
    let { width, height } = document.getElementById(canvasId)!.getBoundingClientRect();
    setCanvasRect([width, height]);
  }, [canvasId]);

  useEffect(() => {
    document.addEventListener('paste', function (event) {
      var items = event.clipboardData && event.clipboardData.items;
      var file = null;
      if (items && items.length) {
          // 检索剪切板items
          for (var i = 0; i < items.length; i++) {
              if (items[i].type.indexOf('image') !== -1) {
                  let file = items[i].getAsFile();
                  const formData = new FormData();
                  formData.append('file', file, file.name);
                  req.post('/files/upload/free', formData).then((res:any) => {
                    dispatch({
                      type: 'editorModal/addPointData',
                      payload: {
                        id: uuid(6, 10),
                        item: {
                          category: "base",
                          config: {
                            align: "center",
                            imgUrl: [
                              { uid: "001", name: file.name, status: "done", url: res.url}
                            ],
                            round: 0,
                            subTitColor: "rgba(0,0,0,1)",
                            subTitFontSize: 16,
                            subTitFontWeight: "400",
                            subTitText: "",
                            titColor: "rgba(0,0,0,1)",
                            titFontSize: 20,
                            titFontWeight: "400",
                            titText: "",
                            translate: [0, 0],
                          },
                          h: 150,
                          type: "Image"
                        },
                        point: { i: `x-${pointData.length}`, x: 0, y: 300, w: 24, h: 150, isBounded: true },
                        status: 'inToCanvas'
                      },
                    });
                  })
                  break;
              }
          }
      }
      // 此时file就是剪切板中的图片文件
    });
  }, [])

  const opacity = isOver ? 0.7 : 1;

  const render = useMemo(() => {
    return (
      <Draggable
        position={dragState}
        handle=".js_box"
        onStop={(e: DraggableEvent, data: DraggableData) => {
          setDragState({ x: data.x, y: data.y });
        }}
      >
        <div className={styles.canvasBox}>
          <MenuProvider id="menu_id">
            <div
              style={{
                transform: `scale(${scaleNum})`,
                position: 'relative',
                width: '100%',
                height: '100%',
              }}
            >
              <div
                id={canvasId}
                className={styles.canvas}
                style={{
                  opacity,
                  backgroundColor: pageConfig.bgColor,
                  backgroundImage: pageConfig.bgImage ? `url(${pageConfig.bgImage[0].url})` : 'initial',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat'
                }}
                ref={drop}
              >
                {pointData.length > 0 ? (
                  <GridLayout
                    className={styles.layout}
                    cols={24}
                    rowHeight={2}
                    width={canvasRect[0] || 0}
                    margin={[0, 0]}
                    onDragStop={dragStop}
                    onDragStart={onDragStart}
                    onResizeStop={onResizeStop}
                  >
                    {pointData.map(value => (
                      <div
                        className={value.isMenu ? styles.selected : styles.dragItem}
                        key={value.id}
                        data-grid={value.point}
                      >
                        <DynamicEngine {...value.item} isTpl={false} />
                      </div>
                    ))}
                  </GridLayout>
                ) : null}
              </div>
            </div>
          </MenuProvider>
        </div>
      </Draggable>
    );
  }, [
    canvasId,
    canvasRect,
    cpointData,
    dragState,
    dragStop,
    drop,
    onDragStart,
    onResizeStop,
    opacity,
    pointData,
    scaleNum,
    setDragState
  ]);
  return <>
          { render }
          <MyAwesomeMenu />
         </>
});

export default connect((state: StateWithHistory<any>) => ({
  pstate: state.present.editorModal,
  cstate: state.present.editorPcModal,
}))(SourceBox);
