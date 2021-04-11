import React, { useRef, useState, useMemo, useCallback, useEffect, memo } from 'react'
import { 
  Button, 
  Input, 
  Select, 
  Popover, 
  Modal, 
  Result, 
  Dropdown, 
  Tooltip, 
  message, 
  Alert,
  Upload,
  Badge
} from 'antd'
import {
  ArrowLeftOutlined,
  MobileOutlined,
  DownloadOutlined,
  CopyOutlined,
  DeleteOutlined,
  SketchOutlined,
  AuditOutlined,
  UndoOutlined,
  RedoOutlined,
  FileAddOutlined,
  SaveOutlined,
  DownOutlined,
  UploadOutlined,
  InstagramOutlined
} from '@ant-design/icons'
import { history } from 'umi'
import QRCode from 'qrcode.react'
import { saveAs } from 'file-saver'
import io from 'socket.io-client'
import classnames from 'classnames'
import Loading from 'components/LoadingCp'
import ModalTpl from 'components/ModalTpl'
import cateTpl from 'components/ModalTpl/cate'
import MyUpload from 'components/PanelComponents/Upload';
import Color from 'components/PanelComponents/Color';
import req from '@/utils/req'
import { uuid, serverUrl } from '@/utils/tool';
import Logo from '@/assets/logo.svg';

import styles from './index.less'

const vipLoginUrl = `${serverUrl}/iH5/manage/h5/config`;

const socket = io(serverUrl);

const { TextArea } = Input;
const { Option } = Select;

const HeaderComponent = memo((props) => {
  const { pointData, clearData, location, undohandler, redohandler, importTpl, addUserPage, modePageConfig, pageConfig } = props
  const [ showLoading, setShowLoading ] = useState(false)
  const [ showFaceModal, setShowFaceModal ] = useState(false)
  const [showModalTpl, setShowModalTpl] = useState(false)
  const [pageConfVisible, setPageConfVisible] = useState(false)
  const [showModalIframe, setShowModalIframe] = useState(false)
  const [ downStatus, setDownStatus ] = useState(0)  // 0 未下载  1 下载成功  -1 下载失败
  const [saveTplModalVisible, setSaveTplModalVisible] = useState(false)
  const [saveLink, setSaveLink] = useState('')
  const [saveH5Link, setSaveH5Link] = useState('')
  const [zipUrl, setZipUrl] = useState('')
  const [faceUrl, setFaceUrl] = useState('')
  const iptRef = useRef(null)
  const selectRef = useRef(null)

  const config = {
    title: 'dooring温馨提示',
    content: (
      <div>
        新建页面前是否保存已有更改？
      </div>
    ),
    okText: '确定',
    cancelText: '取消',
    onOk() {
      addUserPage && addUserPage(pointData)
      clearData && clearData()
      history.push(`/editor?tid=${uuid(8, 16)}`)
    },
    onCancel() {
      console.log('cancel')
    }
  }

  const toPreview = () => {
    localStorage.setItem('pc_pointData', JSON.stringify(pointData))
    savePreview()
    setTimeout(() => {
      window.open(`${serverUrl}/pc_plus/preview?tid=${props.location.query.tid}`)
    }, 600)
  }

  const toHelp = () => {
    window.open('/pc_plus/help')
  }

  const content = () => {
    const { tid } = location.query || ''
    return <QRCode value={`${window.location.protocol}//${window.location.host}/pc_plus/preview?tid=${tid}`} />
  }

  const pageConfigData = {...pageConfig};

  const handlePageChange = (v, key) => {
    if(key === 'remove') {
      delete pageConfigData['bgImage']
    }else {
      pageConfigData[key] = v
    }
  }

  const handlePageSubmit = () => {
    setPageConfVisible(false);
    modePageConfig && modePageConfig(pageConfigData);
  }

  const pageConfigView = useCallback(() => {
    return <div className={styles.pageConfig}>
      <div className={styles.formControl}>
        <span className={styles.label}>标题:</span>
        <Input defaultValue={pageConfig.title} placeholder="请输入页面标题" onChange={(e) => handlePageChange(e.target.value, 'title')} />
      </div>
      <div className={styles.formControl}>
        <span className={styles.label}>描述:</span>
        <TextArea defaultValue={pageConfig.desc} placeholder="请输入页面描述" onChange={(e) => handlePageChange(e.target.value, 'desc')} />
      </div>
      <div className={styles.formControl}>
        <span className={styles.label}>背景色:</span>
        <Color value={pageConfig.bgColor || 'rgba(255,255,255,1)'} onChange={(v) => handlePageChange(v, 'bgColor')} />
      </div>
      <div className={styles.formControl}>
        <span className={styles.label}>背景图片:</span>
        <div style={{position: 'relative', width: '100%'}}><MyUpload fileList={pageConfig.bgImage || []} onChange={(v) => handlePageChange(v, 'bgImage')} onRemove={(v) => handlePageChange(v, 'remove')} /></div>
      </div>
      <div className={styles.formControl}>
      <span className={styles.label}></span>
        <Button type="primary" style={{marginRight: '20px'}} onClick={handlePageSubmit} block>保存</Button>
      </div>
    </div>
  },[pageConfig])

  const handleSaveTpl = () => {
    setSaveTplModalVisible(true)
    setSaveLink('')
  }

  const handleSelectChange = (v) => {
    selectRef.current = v;
  }

  const handleSaveTplOk = () => {
    if(saveLink) {
      setSaveTplModalVisible(false)
      return
    }
    let name = iptRef.current.state.value
    let cate = selectRef.current
    if(!cate || !name) {
      message.error('模版名称和模版分类不能为空!')
      return
    }
    req.post('/visible/tpl/save', { name, cate, img: faceUrl, tpl: pointData, pageConfig }).then(res => {
      const { tid } = res
      setSaveLink(`${serverUrl}/pc?tid=${tid}&isTpl=1`)
    })
  }

  const handleSaveTplCancel = () => {
    setSaveTplModalVisible(false)
    setSaveLink('')
  }

  const useTemplate = () => {
    setShowModalTpl(true)
  }

  const downLoadJson = () => {
    const json = pointData.map(v => ({...v, item: {config: v.item.config, h: v.item.h, type: v.item.type, category: v.item.category}}))
    const jsonStr = JSON.stringify(json)
    const blob = new Blob([jsonStr], { type: "text/plain;charset=utf-8" })
    saveAs(blob, "template.json")
  }

  const handleSaveCode = () => {
    Modal.confirm({
      title: '确定要下载吗? ',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        setShowLoading(true)
        const sid = localStorage.getItem('sid')
        req.post('/visible/config/generate', { data: pointData, uk: sid }).then(res => {
            // console.log(res)
        }).catch(err => {
          setShowLoading(false)
        })
      }
    }) 
  }

  const toLogin = () => {
    window.location.href = `/h5_plus/login`
  }

  const toBack = () => {
    const { tid } = props.location.query || ''
    history.push({
      pathname: '/',
      query: {
        tid
      },
    });
  };

  const savePreview = () => {
    const { tid } = props.location.query || ''
    req.post('/visible/preview', { tid, tpl: pointData, pageConfig })
  }

  const handleSelectTpl = (pointData) => {
    importTpl && importTpl(pointData)
  }

  const saveContent = useCallback(() => {
    return <div className={styles.saveWrap}>
      <div style={{fontSize: '12px', color: '#ccc'}}>注:发布内容应遵循国家相关法律规定, 否则平台放有权删除内容</div>
      <div style={{textAlign: 'center', padding: '10px 0'}}><QRCode value={saveH5Link} /></div>
      <span className={styles.label}>在线地址: </span><span style={{color: 'rgba(20, 54, 226, 1)', marginLeft: '10px'}}>{ saveH5Link }</span>
    </div>  
  }, [saveH5Link])

  const savePage = () => {
    const { tid } = props.location.query;
    req.post('/visible/h5/save', { tpl: pointData, pageConfig, tid }).then(res => {
      const { tid } = res
      setSaveH5Link(`${serverUrl}/pc?tid=${tid}`)
      // 将保存的h5同步到前台管理
      let h5List = JSON.parse(localStorage.getItem('pc') || '[]')
      h5List.push({n: name, t: tid})
      localStorage.setItem('pc', JSON.stringify(h5List))
    })
  }

  const handleCloseModal = () => {
    setShowLoading(false)
    setDownStatus(0)
  }

  const handleCloseModalTpl = () => {
    setShowModalTpl(false)
  }

  const toVipLogin = () => {
    window.open(vipLoginUrl)
  }

  const newPage = () => {
    Modal.confirm(config);
  }

  const logout = () => {
    req.get('/vip/checkout').then(res => {
      localStorage.clear();
      window.location.reload();
    }).catch(err => {
      localStorage.clear();
      window.location.reload();
    })
  }

  const generateFace = (flag) => {
    // flag 0为默认图片, 1为生成图片
    if(flag) {
      localStorage.setItem('pc_pointData', JSON.stringify(pointData))
      setShowModalIframe(true)
    }else {
      setFaceUrl('http://h5.dooring.cn/uploads/tpl_default_175166661ea.png')
    }
  }

  const generatePoster = () => {
    localStorage.setItem('pc_pointData', JSON.stringify(pointData))
    setShowModalIframe(true)
    setTimeout(() => {
      setShowFaceModal(true)
    }, 3600)
  }

  const deleteAll = () => {
    Modal.confirm({
      title: '确认清空画布?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        clearData()
      }
    });
  }

  const handleReloadPage = () => {
    document.getElementById('previewPage').contentWindow.location.reload()
  }

  useEffect(() => {
    socket.on('connect', function(){
      console.log('connect')
    });
    socket.on('htmlWorked', function(data){
      const { result, message } = data
      if(result !== 'error') {
        setDownStatus(1)
        setZipUrl(`${serverUrl}/${result}`)
      }else {
        setDownStatus(-1)
        setZipUrl(message)
      }
      
    });
    socket.on('disconnect', function(e){
      console.log('disconnect', e)
    });

    // 定义截图子页面句柄函数
    window.getFaceUrl = (url) => {
      setFaceUrl(url)
      setShowModalIframe(false)
    }
  }, [])

  const nickname = localStorage.getItem('nickname')

  const menu = (
    <div className={styles.userList}>
      <div className={styles.userItem} onClick={toVipLogin}>进入会员后台</div>
      <div className={styles.userItem} onClick={logout}>退出</div>
    </div>
  )

  const uploadprops = useMemo(() => ({
    name: 'file',
    showUploadList: false,
    beforeUpload(file, fileList) {
      // 解析并提取excel数据
      let reader = new FileReader();
      reader.onload = function(e) {
        let data = e.target.result;
        importTpl && importTpl(JSON.parse(data))
      };
      reader.readAsText(file);
    }
  }), []);

  return (
    <div className={styles.header}>
        <div className={styles.logoArea}>
          <div className={styles.backBtn} onClick={toBack}><ArrowLeftOutlined /></div>
          <div className={styles.logo} title="Dooring"><a href="http://h5.dooring.cn"><img src={Logo} alt="Dooring-强大的h5编辑器" /></a></div>
        </div>
        <div className={styles.controlArea}>
            <Button type="primary" style={{marginRight: '8px'}} onClick={useTemplate}>模版库</Button>
            <Button type="link" style={{marginRight: '8px'}} onClick={handleSaveTpl} disabled={!pointData.length}>保存模版</Button>
            
            <Tooltip placement="bottom" title="保存并自动发布">
              <Popover placement="bottom" title={null} content={saveContent} trigger="click">
                <Button type="link" style={{ marginRight: '8px' }} onClick={savePage} disabled={!pointData.length}>
                  <SaveOutlined />
                </Button>
              </Popover>
            </Tooltip>

            <Tooltip placement="bottom" title="上传json文件">
              <Upload {...uploadprops}>
                <Button type="link" style={{ marginRight: '8px' }}>
                  <UploadOutlined />
                </Button>
              </Upload>
            </Tooltip>

            <Tooltip placement="bottom" title="新建页面">
              <Button type="link" style={{ marginRight: '6px' }} title="新建页面" onClick={newPage}>
                <FileAddOutlined />
              </Button>
            </Tooltip>

            <Tooltip placement="bottom" title="下载源码">
              <Button type="link" style={{marginRight: '6px'}} onClick={handleSaveCode} disabled={!pointData.length} title="下载源文件"><DownloadOutlined /></Button>
            </Tooltip>
            
            <Tooltip placement="bottom" title="下载json文件">
              <Button type="link" style={{marginRight: '6px'}} title="下载json文件" onClick={downLoadJson} disabled={!pointData.length}><CopyOutlined /></Button>
            </Tooltip>

            <Tooltip placement="bottom" title="真机测试">
              <Popover placement="bottom" title={null} content={content} trigger="click">
                  <Button type="link" style={{marginRight: '6px'}} onClick={savePreview} disabled={!pointData.length} title="真机测试"><MobileOutlined /></Button>
              </Popover>
            </Tooltip>

            <Tooltip placement="bottom" title="撤销">
              <Button type="link" style={{ marginRight: '6px' }} title="撤销" onClick={undohandler}>
                <UndoOutlined />
              </Button>
            </Tooltip>
            
            <Tooltip placement="bottom" title="重做">
              <Button type="link" style={{ marginRight: '6px' }} title="重做" onClick={redohandler} disabled={!pointData.length}>
                <RedoOutlined />
              </Button>
            </Tooltip>

            <Tooltip placement="bottom" title="清空">
              <Button type="link" style={{marginRight: '6px'}} title="清空" onClick={deleteAll} disabled={!pointData.length}><DeleteOutlined /></Button>
            </Tooltip>

            <Tooltip placement="bottom" title="一键生成海报分享图">
              <Badge dot offset={[-18, 10]}>
                <Button type="link" style={{marginRight: '6px'}} onClick={generatePoster} disabled={!pointData.length}><InstagramOutlined /></Button>
              </Badge>
            </Tooltip>

            <Button type="link" style={{marginRight: '6px'}} onClick={toPreview} disabled={!pointData.length} title="预览">预览</Button>
            
            <Button type="link" onClick={toHelp} title="使用帮助">帮助</Button>
        </div>
        <div className={styles.btnArea}>
          <Popover 
            placement="bottom" 
            title="页面配置" 
            content={pageConfigView} 
            trigger="click" 
            visible={pageConfVisible}
            onVisibleChange={(v) => setPageConfVisible(v)}
          >
            <Button type="primary" ghost style={{marginRight: '12px'}}><AuditOutlined />页面设置</Button>
          </Popover>
          {
            nickname ? 
              <Dropdown overlay={menu}>
                <div className={styles.userWrap}>
                  <span className={styles.user}>
                    { nickname }
                  </span>
                  <DownOutlined />
                </div>
              </Dropdown>
              :
              <Button type="primary" onClick={toLogin} style={{marginRight: '12px'}}><SketchOutlined /> 会员入口</Button>
          }
        </div>
        <Modal
          visible={showLoading}
          title="下载结果"
          onCancel={handleCloseModal}
          footer={null}
        >
          {
            downStatus === 0 &&
            <>
              <Loading top={30} />
              <p style={{textAlign: 'center', lineHeight: 4}}>正在下载，请等待10-20秒...</p>
            </>
          }
          {
            downStatus === 1 &&
            <Result
              status="success"
              title="下载完成!"
              subTitle="普通用户一天能下载6次，一共12次"
              extra={[
                <Button type="primary" key="console">
                  <a href={zipUrl} download>立即下载</a>
                </Button>
              ]}
            />
          }
          {
            downStatus === -1 &&
            <Result
              status="error"
              title="下载失败!"
              subTitle="普通用户一天只能下载6次，一共12次"
              extra={[
                <div>{ zipUrl }</div>
              ]}
            />
          }
        </Modal>
    
        <Modal
          title="保存模版"
          visible={saveTplModalVisible}
          onOk={handleSaveTplOk}
          onCancel={handleSaveTplCancel}
          okText={saveLink ? "关闭" : "保存"}
          cancelText="取消"
          width={420}
          closable={false}
          destroyOnClose={true}
        >
          <Alert message="保存模版后意味着你的模版将被更多人看见或使用, 平台有权对不符合模版要求的模版进行删除" type="info" showIcon closable />
          <div className={styles.saveForm}>
            <div className={styles.formIpt}>
              <span>模版名称：</span><Input ref={iptRef} />
            </div>
            <div className={styles.formIpt}>
              <span>模版分类：</span>
              <Select style={{ width: '100%' }} onChange={handleSelectChange}>
                {
                  cateTpl.map((item, i) => <Option value={item} key={i}>{ item }</Option>)
                }
              </Select>
            </div>
            <div className={styles.formIpt}>
              <span>封面设置：</span>
              <Button type="primary" size="small" style={{marginRight: '20px'}} onClick={() => generateFace(1)}>一键生成封面</Button>
            </div>
            {
              !!faceUrl && 
              <div className={classnames(styles.formIpt, styles.imgWrap)}>
                <img src={faceUrl} />
              </div>
            }
            {
              !!saveLink &&
              <>
                <div className={styles.formIpt}>
                  <span>访问链接：</span><Input value={saveLink} />
                </div>
                <span style={{display: 'block', color: 'red', marginTop: '-10px'}}>注意: 刷新页面后模版自动同步到模版库中</span>
              </>
            }
          </div>
        </Modal>
        <Modal
          title="生成封面中...(长时间未反应请点右侧按钮重试)"
          visible={showModalIframe}
          footer={null}
          width={1024}
          closeIcon={<RedoOutlined />}
          destroyOnClose={true}
          onCancel={handleReloadPage}
          maskClosable={false}
        >
          <iframe id="previewPage" src={`/pc_plus/preview?tid=${props.location.query.tid}&gf=1`} style={{width: '100%', border: 'none', height: '600px'}}></iframe>
        </Modal>
        <Modal
          title="封面图(右键复制图片)"
          visible={showFaceModal}
          footer={null}
          width={1024}
          destroyOnClose={true}
          onCancel={() => setShowFaceModal(false)}
        >
          <img src={faceUrl} style={{width: '100%'}} />
        </Modal>
        
        <ModalTpl showModalTpl={showModalTpl} onCloseModalTpl={handleCloseModalTpl} onSelectTpl={handleSelectTpl} />
    </div>
  )
})

export default HeaderComponent
