import '../common/lib';
import App from '../component/App_pag';
import ReactDOM from 'react-dom';
import React from 'react';
import Header from '../component/Header';
import NavbarSide from '../component/AsideTree2'

//import BrowserDemo from '../component/BrowserDemo';
// import Breadcrumb from '../components/breadcrumb/index';
import { Menu, Icon } from 'antd';
import AsideTree from '../component/AsideTree';
ReactDOM.render(
    <div className="ant-layout-container">
  {/*
      <Header></Header>
      <AsideTree></AsideTree>
  */}
      <div className="ant-layout-main" style={{float:'right',width:'100%'}}>
        <div className="ant-layout-container">
          <div className="ant-layout-content">
            <div style={{ height: 590 }}>
              <App url="/elink_scm_web/sproductAction/query.do"/>
              {/*内容区域*/}
            </div>
          </div>
        </div>
      </div>
    </div>
    , document.getElementById('react-content'));

ReactDOM.render(
    <div className="ant-layout-side">
      <NavbarSide />
    </div>
    , document.getElementById('react-side'));

