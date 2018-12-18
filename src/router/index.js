import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import login from "../component/login";
import home from "../component/home";
import welcome from "../component/welcome";
import book from "../component/book";

// react-router4 不再推荐将所有路由规则放在同一个地方集中式路由，子路由应该由父组件动态配置，组件在哪里匹配就在哪里渲染，更加灵活
export default class RouteConfig extends Component{
  render(){
      var login_status = localStorage.getItem('login_status');
      var comp
      if(login_status){
          comp = home
      }else{
          comp = login
      }
    return(
      <HashRouter>
        <Switch>
          <Route path="/" exact component={comp} />
          <Route path="/login" exact component={login} />
          <Route path="/home" exact component={home} />
          <Route path="/welcome" exact component={welcome} />
          <Route path="/bookCon" exact component={book} />

          {/*<Redirect to="/login" />*/}
        </Switch>
      </HashRouter>
    )
  }
}
