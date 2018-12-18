import React, { Component } from 'react';
import './index.less'

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            name:'',
            password:'',
            login_status:false
        }
    }
    handelChangeName(e){
        this.setState({
            name:e.target.value
        })
    }
    handelChangePassword(e){
        this.setState({
            password:e.target.value
        })
    }
    login(name,password){
        fetch('http://www.zhufangzhou.com:3000/login?name='+name+'&password='+password,{
            data:{

            },
            method: 'post',
        })
            .then((response)=>{
                if(response.status===200){
                    response.json().then((respData)=>{
                       if(respData.data.status=='success'){
                           localStorage.setItem('login_status',true)
                           this.props.history.push('/home')
                       }
                    })
                }
            })
            .catch((error)=>{
                console.log(error);
            })
    }
    render(){
        return (
            <div className="login">
                <div className="form_login">
                    <h2>登录</h2>
                    <p>
                        <label className="label">
                            <img src={require('../../assets/img/login_people.png')} alt=""/>
                        </label>
                        <input type="text" value={this.state.name} onChange={this.handelChangeName.bind(this)}/>
                    </p>
                    <p>
                        <label className="label">
                            <img src={require('../../assets/img/login_pass.png')} alt=""/>
                        </label>
                        <input type="password" value={this.state.password} onChange={this.handelChangePassword.bind(this)}/>
                    </p>
                    <p>
                        <button onClick={()=>{this.login(this.state.name,this.state.password)}}>登录</button>
                    </p>
                </div>
            </div>
        )
    }

}