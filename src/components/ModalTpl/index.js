import React, { memo, useState, useEffect } from 'react'
import { Modal, Button, Tabs, Empty } from 'antd'
import Loading from '../LoadingCp'
import req from 'utils/req'
import cateTpl from './cate'
import styles from './index.less'

const { TabPane } = Tabs;

export default memo(function ModalTpl(props) {
  const { showModalTpl, onSelectTpl, onCloseModalTpl } = props
  const [isLoading, setLoading] = useState(false)
  const [tpls, setTpls] = useState([])
  const [cates, setCates] = useState({})

  const useTpl = (tid) => {
    const config = {
        title: 'dooring温馨提示',
        content: (
          <div>
            导入模板会覆盖画布已有的数据，确认要导入吗？
          </div>
        ),
        okText: '确定',
        cancelText: '取消',
        onOk() {
            setLoading(true)
            req.get(`/visible/tpl/get?tid=${tid}`).then(res => {
                res && onSelectTpl && onSelectTpl({tpl: res.tpl, pageConfig: res.pageConfig})
                setLoading(false)
                onCloseModalTpl()
            }).catch(err => {
                setLoading(false)
            })
        }
    };
    Modal.confirm(config);
  }

  const handlePaneChange = (key) => {
    setTpls(cates[key] || [])
  }

  useEffect(() => {
    setLoading(true)
    req.get('/visible/tpls/free').then(res => {
        // 对模版数据进行分类
        if(res) {
            const cateObj = {};
            res.forEach(item => {
                const cate = item.cate;
                if(!cate) {
                    cateObj['其他'] ? cateObj['其他'].push(item) : (cateObj['其他'] = [item])
                    return
                }
                cateObj[cate] ? cateObj[cate].push(item) : (cateObj[cate] = [item])
            })
            setCates(cateObj)
            setTpls(cateObj['其他'] || [])
        }
        setLoading(false)
    }).catch(err => {
        setLoading(false)
    })
  }, [])

  return <Modal
            title="选择模版"
            visible={showModalTpl}
            onCancel={onCloseModalTpl}
            destroyOnClose={true}
            width={930}
            footer={null}
        >
            <div className={styles.tplWrap}>
                {
                    !isLoading ? 
                    <Tabs tabPosition="left" defaultActiveKey="其他" onChange={handlePaneChange}>
                        {
                            cateTpl.map((item, i) => {
                                return <TabPane tab={item} key={item}>
                                            <div style={{maxHeight: '480px', width: '100%', overflow: 'auto', display: 'flex', flexWrap: 'wrap'}}>
                                                {
                                                    tpls.length ? tpls.map((item,i) => {
                                                        return <div className={styles.tpl} key={i}>
                                                                    <img src={item.img} alt="dooring可视化" />
                                                                    <div className={styles.btn}><Button type="primary" onClick={() => useTpl(item.tid)}>立即使用</Button></div>
                                                                </div>
                                                    }) : <div style={{marginLeft: '160px', marginTop: '160px'}}><Empty description="还没有该品类模版哦, 我们正在飞速配置中..." /></div>
                                                }
                                            </div>
                                            
                                       </TabPane>
                            })
                        }
                    </Tabs>
                    :
                    <Loading />
                }
            </div>
        </Modal>
})