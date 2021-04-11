// import * as mesService from '../services/editorService'
// import { router } from 'umi'
// import schema from 'components/DynamicEngine/schema'
import schema from 'components/BasicShop/schema';
import { uuid } from '@/utils/tool';

const pointData = localStorage.getItem('pc_userData') || "[]"
const pageConfig = localStorage.getItem('pc_pageConfig') || "{}"

function overSave(name, data) {
  localStorage.setItem(name, JSON.stringify(data))
}

export default {
  namespace: 'editorModal',
  state: {
    pointData: JSON.parse(pointData),
    curPoint: null,
    pageConfig: JSON.parse(pageConfig),
    userPages: []
  },
  reducers: {
    addPointData(state, { payload }) {
      let pointData = [...state.pointData, payload]
      overSave('pc_userData', pointData)
      // 组装editableEl
      const { config, h, type, category } = payload.item
      const editableEl = schema[type].editData
      return { 
        ...state, 
        pointData, 
        curPoint: {...payload, item: { config, h, type, category, editableEl }}
      }
    },
    modPointData(state, { payload }) {
      const { id } = payload
      const pointData = state.pointData.map(item => {
        if(item.id === id) {
          return payload
        }
        return { ...item }

      })
      overSave('pc_userData', pointData)
      // 组装editableEl
      const { config, h, type, category } = payload.item
      const editableEl = schema[type].editData
      return { 
        ...state, 
        pointData,
        curPoint: {...payload, item: { config, h, type, category, editableEl }}
      }
    },
    copyPointData(state, { payload }) {
      const { id } = payload
      const pointData = []
      state.pointData.forEach(item => {
        pointData.push({ ...item })
        if(item.id === id) {
          pointData.push({ ...item, id: uuid(6, 10) })
        }
      })
      overSave('pc_userData', pointData)

      return { 
        ...state, 
        pointData
      }
    },
    delPointData(state, { payload }) {
      const { id } = payload
      const pointData = state.pointData.filter(item => item.id !== id)
      overSave('pc_userData', pointData)
      return {
        ...state, 
        pointData,
        curPoint: null
      }
    },
    importTplData(state, { payload }) {
      const { pageConfig, tpl } = payload;
      overSave('pc_userData', tpl)
      overSave('pc_pageConfig', pageConfig)
      return { 
        ...state, 
        pointData: payload, 
        pageConfig,
        curPoint: null
      }
    },
    addUserPage(state, { payload }) {
      let userPages = [...state.userPages, payload]
      overSave('pc_userPages', userPages)
      return { 
        ...state,
        pointData: [],
        userPages
      }
    },
    modePageConfig(state, { payload }) {
      overSave('pc_pageConfig', payload)
      return { 
        ...state, 
        pageConfig: payload
      }
    },
    clearAll(state) {
      overSave('pc_userData', [])
      overSave('pc_pageConfig', {})
      return {
        ...state, 
        pointData: [],
        curPoint: null
      }
    }
  },
  effects: {
    // 更新一条数据模型信息
    // *modifyDataModel({ payload }, { call, put }) {
    //   const modifyDataModel = yield call(mesService.modifyDataModel, payload)
    //   const activate = yield call(mesService.activateModifiedTableDataModel, modifyDataModel.dataModelId)
    //   const responseMessage = yield call(mesService.getDetailDataModel, { dataModelId: activate.dataModelId, showDataModelFieldFlag: true })
    //   yield put({
    //     type: 'receiveDetailDataModel',
    //     payload: responseMessage && responseMessage
    //   })
    // },

    // 创建一条数据模型
    // *createDataModel({ payload }, { call, put }) {
    //   const responseMessage = yield call(mesService.createDataModel, payload)
    //   if (responseMessage.dataModelId) {

    //     router.push({
    //       pathname: '/dataModel/view',
    //       query: { id: responseMessage.dataModelId }
    //     })
    //   }
    // },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        // Subscription 语义是订阅，用于订阅一个数据源，然后根据条件 dispatch 需要的 action。数据源可以是当前的时间、
        // 服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等
        // if (pathname !== '/dataModel/view') {
        //   dispatch({ type: 'initDetail', data: {} })
        // }
      })
    }
  }
}
