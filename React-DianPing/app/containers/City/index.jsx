import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

import Header from '../../components/Header'
import CurrentCity from '../../components/CurrentCity'
import CityList from '../../components/CityList'
import * as userInfoActionsFromOtherFile from '../../actions/userinfo.js'
import LocalStore from '../../util/localStore.js'
import { CITYNAME } from '../../config/localStoreKey.js'

class City extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = () => PureRenderMixin.shouldComponentUpdate
    }
    render() {
        return (
            <div>
                <Header title="选择城市" />
                <CurrentCity cityName={this.props.userinfo.cityName} />
                <CityList changeFn={this.changeCity.bind(this)}/>
            </div>
        )
    }
    changeCity(newCity) {
        if (newCity == null) {
            return
        }
        // 修改 redux
        const userinfo = this.props.userinfo
        userinfo.cityName = newCity
        this.props.userInfoActions.update(userinfo)
        // 修改 localstorage
        LocalStore.setItem(CITYNAME, newCity)
        // 跳转到首页
        hashHistory.push('/')
    }
}

// redux react 绑定
function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}
function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(City)