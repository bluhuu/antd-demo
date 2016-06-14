import React from 'react';
import { Menu, Icon } from 'antd';
import MenuAccordionB from '../component/MenuAccordionB';

var SubMenu = Menu.SubMenu;

var MenuAccordionA = React.createClass({
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
            <MenuAccordionB id={repo.id} url="/elink_scm_web/menuTreeAction/tree.do"/>
          </SubMenu>
        );
      }
    });

    return (
        {repoList}
    );
  },
});
export default MenuAccordionA;