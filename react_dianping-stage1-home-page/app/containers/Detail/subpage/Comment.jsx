import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { getCommentData } from '../../../fetch/detail/detail.js'
import ListComponent from '../../../components/CommentList'
import LoadMore from '../../../components/LoadMore'

import './style.less'

class Comment extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            data: [],
            hasMore: false,
            isLoadingMore: false,
            page: 0
        }
    }
    render() {
        return (
            <div className="detail-comment-subpage">
                <h2>用户点评</h2>
                {
                    this.state.data.length
                        ? <ListComponent data={this.state.data} />
                        : <div>{/* 加载中... */}</div>
                }
                {
                    this.state.hasMore
                        ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={() => this.loadMoreData()} />
                        : ''
                }
            </div>
        )
    }
    componentDidMount() {
        this.loadFirstPageData()
    }
    loadFirstPageData() {
        const id = this.props.id
        const result = getCommentData(0, id)
        this.resultHandle(result)
    }
    // 加载更多数据
    loadMoreData() {
        // 记录状态
        this.setState({
            isLoadingMore: true
        })

        const id = this.props.id
        const page = this.state.page
        const result = getCommentData(page, id)
        this.resultHandle(result)

        // 增加 page 技术
        this.setState({
            isLoadingMore: false
        })
    }
    resultHandle(result) {
        result.then(res => {
            return res.json()
        }).then(json => {
            const page = this.state.page
            this.setState({
                page: page + 1
            })
            const hasMore = json.hasMore
            const data = json.data

            this.setState({
                hasMore: hasMore,
                // 拼接之前的数据
                data: this.state.data.concat(data)
            })
        }).catch(ex => {
            if (__DEV__) {
                console.error('详情页获取用户评论数据出错，', ex.message)
            }
        })
    }
}

export default Comment