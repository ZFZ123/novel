import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'

import './index.less'

class nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
           dir:[]
        }
    }
    goPush(){//跳转路由
        this.props.history.push('/bookCon')
    }
    componentWillMount(){
        this.getDir()
    }
    handleval(item){
        this.props.chooseCapter(item);
         console.log(item)
    }
    getDir(){
        fetch('http://www.zhufangzhou.com:3000/directory')
            .then((response)=>{
                if(response.status===200){
                    response.json().then((respData)=>{

                        this.setState({'dir':respData.data.data})
                    })
                }
            })
            .catch((error)=>{
                console.log(error);
            })
    }
    render(){
           return(
            <div className="dir" style={{display:this.props.directoryShow}}>
                <h2>目录</h2>
                <div>
                    {
                        this.state.dir.map((item,index)=>{
                            return (
                                <li key={index} className="dir_li" onClick={ this.handleval.bind(this,index)} >{index+1}、{item.title}</li>
                            )
                        })
                    }
                </div>
            </div>
           )
   }
}
export default withRouter(nav)