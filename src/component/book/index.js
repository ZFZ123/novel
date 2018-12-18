import React, { Component } from 'react';
import {Icon } from 'antd-mobile';
import SwipeableViews from 'react-swipeable-views';
import Directory from '../Directory';

import './index.less'

 class Home extends Component {
     constructor(props) {
         super(props);
         this.state = {
             id:localStorage.getItem('capter_id'),
             title:'',
             capter:[],//将章节分页
             paragraph:[],//将文本内容分成段落
             text:'',
             touchStatus:"none",
             directoryShow:'none',
             currentCapter:''
         }
     }
     isMenu(item){
         this.setState({title:item.title})
         var touchStatus;
         if(this.state.touchStatus=='none'){
             touchStatus='flex';
         }else{
             touchStatus='none';
         }
         this.setState({touchStatus:touchStatus})
     }
     getData(type,id){
        if(id){

        }else{
            var id =localStorage.getItem('capter_id')
            if(id){

            }else{
                id=1
            }

        }
        if(type=='+'){
            id = parseInt(id)+1
        }if(type=='-'){
            id= parseInt(id)-1<1?1: parseInt(id)-1
        }

            fetch('http://www.zhufangzhou.com:3000/booktext?id='+id)
                .then((response)=>{
                    if(response.status===200){
                        response.json().then((respData)=>{
                            var text = respData.data.content;
                            var title =  respData.data.title
                            var capterNum = 444;//每页最大字数
                            var length = Math.ceil(text.length/capterNum)
                            var index = 0;
                            var capter
                            var arr =[]
                            for(let i = 1;i<=length;i++){
                                capter = text.substr(index,capterNum);
                                arr.push({"capter":capter,"title":title})
                                index = capterNum*i
                            }
                            var newcapter
                            if(type=='-'){
                                 newcapter = arr.concat(this.state.capter)
                            }else {
                                 newcapter = this.state.capter.concat(arr)
                            }

                            this.setState({capter:newcapter})
                            localStorage.setItem('capter_id',id);
                            this.setState({id: id});
                        })
                    }
                })
                .catch((error)=>{
                    console.log(error);
                })
    }
     back(){
         this.props.history.push('/home')
     }
     initParagraph(data){//处理段落
          var paragraph = data.split('    ');
          return paragraph
      }
     onSwitching(index,type){//滑动时回调

         if(index==this.state.capter.length-1){
             this.getData('+')
         }
         this.setState({touchStatus:'none'})
     }
     onChangeIndex(index,fromIndex){
         if(index==0){
             this.getData('-')
             this.setState({capter:[]})
             console.log(index,fromIndex)
         }

     }
     showDirectories(){
         this.setState({'directoryShow':'block'})
         console.log(this.state.directoryShow)
     }
     changeHandler(e) {
         this.setState({
             currentCapter: e
         });

         this.setState({'directoryShow':'none'})
         this.setState({touchStatus:'none'})
         this.setState({
             "capter":[]
         })
         this.getData("",e+1)
     }
     componentWillMount(){
         this.setState({'directoryShow':'none'})
         this.getData()
     }
    render(){
        return (
            <div className="book" >
                <SwipeableViews onSwitching={this.onSwitching.bind(this)} onChangeIndex={this.onChangeIndex.bind(this)}>
                    {
                        this.state.capter.map((item,index)=>{
                        return (
                                <div className="text" key={index} onClick={this.isMenu.bind(this,item)}>

                                    <h2 className="title">
                                        {item.title}
                                    </h2>
                                    {this.initParagraph(item.capter).map((ele,index)=>{
                                        return(
                                            <p className="paragraph" key={index}>{ele}</p>
                                        )
                                    })}
                                </div>
                        )
                    })
                    }
                </SwipeableViews>
                <div className="top_Nav" style={{display:this.state.touchStatus}}>
                    <Icon type="left" color="#fff" size="lg" className="icon_left" onClick={this.back.bind(this)}/>
                    <h2>{this.state.title}</h2>
                    <Icon type="ellipsis" color="#fff" size="lg" className="icon_right"/>
                </div>

              <div className="bottom_Nav" style={{display:this.state.touchStatus}}>
                  <li>夜间</li>
                  <li>设置</li>
                  <li>缓存</li>
                  <li onClick={this.showDirectories.bind(this)}>目录</li>
              </div>
                <Directory  directoryShow={this.state.directoryShow} chooseCapter={this.changeHandler.bind(this)}></Directory>
            </div>
        )
    }
}
export default Home