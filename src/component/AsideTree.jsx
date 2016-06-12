import React from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
var myStyle = {
  width:'20%',
  fontSize: 100,
  color: '#FF0000',
  float: 'left'
};

const NavbarSide = React.createClass({
  
  render() {
    return (
        <aside className="ant-layout-sider" style={myStyle}>
          <div className="ant-layout-logo"></div>
          <Menu mode="inline" //theme="dark"
                defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
            <SubMenu key="sub1" title={<span><Icon type="user" />导航一</span>}>
              <Menu.Item key="1"> <a href="/docs/practice/cases"><span>实践</span></a></Menu.Item>
              <Menu.Item key="2">选项2</Menu.Item>
              <Menu.Item key="3">选项3</Menu.Item>
              <Menu.Item key="4">选项4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="laptop" />导航二</span>}>
              <Menu.Item key="5">选项5</Menu.Item>
              <Menu.Item key="6">选项6</Menu.Item>
              <Menu.Item key="7">选项7</Menu.Item>
              <Menu.Item key="8">选项8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title={<span><Icon type="notification" />导航三</span>}>
              <Menu.Item key="9">选项9</Menu.Item>
              <Menu.Item key="10">选项10</Menu.Item>
              <Menu.Item key="11">选项11</Menu.Item>
              <Menu.Item key="12">选项12</Menu.Item>
            </SubMenu>
          </Menu>
        </aside>
    );}
});
export default NavbarSide;

