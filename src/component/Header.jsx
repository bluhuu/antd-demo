import React from 'react';
const Header = React.createClass({
  render() {
    return (
        <header id="header" class="clearfix">
          <div class="row">
            <div class="nav col-xs-0 col-sm-17 col-md-18 col-lg-20">
              <ul class="ant-menu ant-menu-horizontal  ant-menu-light ant-menu-root" role="menu"
                  aria-activedescendant="" id="nav" tabindex="0">
                <li class="ant-menu-item" role="menuitem" aria-selected="false">
                  <a href="/"><span>首页</span></a>
                </li>
                <li class="ant-menu-item" role="menuitem" aria-selected="false">
                  <a href="/docs/practice/cases"><span>实践</span></a>
                </li>
                <li class="ant-menu-item" role="menuitem" aria-selected="false">
                  <a href="/docs/pattern/navigation"><span>模式</span></a>
                </li>
                <li class="ant-menu-item-selected ant-menu-item" role="menuitem" aria-selected="true">
                  <a href="/docs/react/introduce"><span>组件</span></a>
                </li>
                <li class="ant-menu-item" role="menuitem" aria-selected="false">
                  <a href="/docs/spec/introduce"><span>语言</span></a>
                </li>
                <li class="ant-menu-item" role="menuitem" aria-selected="false">
                  <a href="/docs/resource/download"><span>资源</span></a>
                </li>
              </ul>
            </div>
          </div>
        </header>
    );}
});
export default Header;

