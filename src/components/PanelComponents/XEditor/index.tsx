import React, { useState, useEffect, memo } from 'react'
import req from '@/utils/req'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import styles from './index.less'

const controls = [
  {
    key: 'bold',
    text: <b>加粗</b>
  },
  'undo', 'redo', 'emoji', 'list-ul', 'list-ol', 'blockquote', 'text-align',
  'font-size', 'line-height', 'letter-spacing', 'text-color',
  'italic', 'underline', 'link', 'media'
]


export default memo(function XEditor(props:any) {
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState())

  const {
    defaultValue = '',
    onSave
  } = props

  const myUploadFn = (param) => {
    const fd = new FormData()
    fd.append('file', param.file)
  
    req.post('/files/upload/free', fd, {
      headers: {
        'x-requested-with': localStorage.getItem('user') || '',
        'authorization': localStorage.getItem('token') || '',
        'Content-Type':'multipart/form-data'
      },
      onUploadProgress: function (event) {
        // 上传进度发生变化时调用param.progress
        console.log(event.loaded / event.total * 100)
        param.progress(event.loaded / event.total * 100)
      },
    }).then(res => {
      console.log(res)
      // 上传成功后调用param.success并传入上传后的文件地址
      param.success({
        url: res.url,
        meta: {
          id: Date.now(),
          title: res.filename,
          alt: '趣谈前端'
        }
      })
    }).catch(err => {
      param.error({
        msg: '上传失败.'
      })
    })
  }

  const submitContent = () => {
    const htmlContent = editorState.toHTML()
    onSave && onSave(htmlContent)
  }

  const handleEditorChange = (editorState) => {
    setEditorState(editorState)
    if(onSave) {
      const htmlContent = editorState.toHTML()
      onSave(htmlContent)
    }
  }

  useEffect(() => {
    const htmlContent = defaultValue
    setEditorState(BraftEditor.createEditorState(htmlContent))
  }, [])
  return <BraftEditor
            value={editorState}
            controls={controls}
            onChange={handleEditorChange}
            onSave={submitContent}
            media={{uploadFn: myUploadFn}}
         />
})
