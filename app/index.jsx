import React from 'react'
import ReactDom from 'react-dom'

// 通用样式
import './static/css/common.less'

import Todo from './containers/Todo'

// 性能测试
import Perf from 'react-addons-perf'
if (__DEV__) {
    window.Perf = Perf
}

ReactDom.render(
  <Todo/>,
  document.getElementById('root')
)
