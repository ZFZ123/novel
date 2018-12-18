import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import './index.less'
import { NavBar, Icon ,Tabs, Badge } from 'antd-mobile';
const tabs = [
    { title: <Badge text={''}>我的书架</Badge> },
    { title: <Badge text={''}>发现好书</Badge> },

];

class nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book_num:[{'name':"遮天","author":"辰东"}]
        }
    }
    goPush(){//跳转路由
        this.props.history.push('/bookCon')
    }
    render(){
           return(
               <div>
                   <NavBar
                       mode="dark"
                       icon={<Icon type="left" />}
                       onLeftClick={() => console.log('onLeftClick')}
                       rightContent={[
                           <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                           <Icon key="1" type="ellipsis" />,
                       ]}
                   >私人小说</NavBar>
                       <Tabs tabs={tabs}
                             initialPage={0}
                             onChange={(tab, index) => { console.log('onChange', index, tab); }}
                             onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                       >
                           <div style={{  height: '150px', backgroundColor: '#fff' }}>
                               {this.state.book_num.map((ele,index)=> {
                                       return (
                                       <li key={index} className="book_item" onClick={()=>this.goPush()}>
                                           <img src={require('../../assets/img/book1.jpg')} alt=""/>
                                           <p>{ele.name}</p>
                                           <p>作者：{ele.author}</p>
                                       </li>
                                       )
                               })}
                           </div>
                           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                               Content of second tab
                           </div>

                       </Tabs>
               </div>
           )
   }
}
export default withRouter(nav)