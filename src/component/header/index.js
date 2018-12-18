import React, { Component } from 'react';
import './index.less'
import { Button } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';//引入ant-design样式

export default class Header extends Component {
    render() {
        return (
            <header className="header">
                <h2 className="title">私人小说</h2>
            </header>

        )
    }
}