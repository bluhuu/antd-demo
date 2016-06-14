import React from 'react';
import { Menu, Icon } from 'antd';
import MenuAccordion from '../component/MenuAccordion';

var SubMenu = Menu.SubMenu;

var MenuAccordion2 = React.createClass({
  getInitialState: function() {
    return {
      current: '1',
      openKeys: [],
      loading: false,
      data:[]
    };
  },
  fetch: function(params = {}) {
    var _self = this;
    this.setState({
      loading: true
    });
    $.ajax({
      url: this.props.url,
      // url: "/elink_scm_web/menuTreeAction/loadAccordion.do",
      data: params,
      dataType: "json",
      success: function(result) {
        console.log(result.total);
        console.log(result.rows);
        var resultData = result.rows || result;
        _self.setState({
          loading: false,
          data: resultData
        });
      },
    });

  },
  componentDidMount: function() {
    this.fetch({
      node:this.props.id,
      nodeID:this.props.id
    });
  },
  handleClick(e) {
    this.props.addTab(e);
    this.setState({
      current: e.key,
      openKeys: e.keyPath.slice(1),
    });
  },
  onToggle(info) {
    this.setState({
      openKeys: info.open ? info.keyPath : info.keyPath.slice(1),
    });
  },
  render: function() {
    var repos = this.state.data;
    var repoList = repos.map(function (repo) {
      if(repo.leaf){
        return(
          <Menu.Item key={repo.id}>{repo.text}</Menu.Item>
          )
      }else{
        return (
          <SubMenu key={repo.id} title={<span><Icon type="appstore" /><span>{repo.text}</span></span>}>
            <MenuAccordion id={repo.id} url="/elink_scm_web/menuTreeAction/tree.do"/>
          </SubMenu>
        );
      }
    });

    return (
      <Menu onClick={this.handleClick}
        style={{ width: 240 }}
        openKeys={this.state.openKeys}
        onOpen={this.onToggle}
        onClose={this.onToggle}
        selectedKeys={[this.state.current]}
        theme = "dark"
        mode="inline"
      >
{/*        <SubMenu key="sub10" title={<span><Icon type="appstore" /><span>商品管理</span></span>}>
          <Menu.Item key="101">单品管理</Menu.Item>
          <SubMenu key="sub11" title="商品价格管理">
            <Menu.Item key="111">群组价管理</Menu.Item>
            <Menu.Item key="112">协议价管理</Menu.Item>
            <Menu.Item key="113">会员等级价管理</Menu.Item>
          </SubMenu>
          <Menu.Item key="102">商品上下架设置</Menu.Item>
          <Menu.Item key="103">商品品牌设置</Menu.Item>
          <Menu.Item key="104">商品分类管理</Menu.Item>
          <Menu.Item key="105">商品库存管理</Menu.Item>
        </SubMenu>*/}
        {repoList}
      </Menu>
    );
  },
});
export default MenuAccordion2;