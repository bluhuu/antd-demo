import React from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

const MenuAccordion = React.createClass({
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
      url: "/elink_scm_web/menuTreeAction/loadAccordion.do",
      data: params,
      dataType: "json",
      success: function(result) {
        console.log(result.total);
        console.log(result.rows);
        _self.setState({
          loading: false,
          data: result.rows
        });
      },
    });

  },
  componentDidMount: function() {
    this.fetch({});
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
        <SubMenu key="sub10" title={<span><Icon type="appstore" /><span>商品管理</span></span>}>
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
        </SubMenu>
      </Menu>
    );
  },
});
export default MenuAccordion;