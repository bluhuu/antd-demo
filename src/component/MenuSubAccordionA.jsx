import React from 'react';
import { Menu, Icon } from 'antd';

var SubMenu = Menu.SubMenu;

var MenuSubAccordionA = React.createClass({
  // getInitialState: function() {
  //   return {
  //     current: '1',
  //     openKeys: [],
  //     loading: false,
  //     data:[]
  //   };
  // },
  // fetch: function(params = {}) {
  //   var _self = this;
  //   this.setState({
  //     loading: true
  //   });
  //   $.ajax({
  //     url: this.props.url,
  //     // url: "/elink_scm_web/menuTreeAction/loadAccordion.do",
  //     data: params,
  //     dataType: "json",
  //     success: function(result) {
  //       console.log(result.total);
  //       console.log(result.rows);
  //       var resultData = result.rows || result;
  //       _self.setState({
  //         loading: false,
  //         data: resultData
  //       });
  //     },
  //   });

  // },
  // componentDidMount: function() {
  //   this.fetch({
  //     node:this.props.id,
  //     nodeID:this.props.id
  //   });
  // },
  // handleClick(e) {
  //   this.props.addTab(e);
  //   this.setState({
  //     current: e.key,
  //     openKeys: e.keyPath.slice(1),
  //   });
  // },
  // onToggle(info) {
  //   this.setState({
  //     openKeys: info.open ? info.keyPath : info.keyPath.slice(1),
  //   });
  // },

  subMenu: function(){
    return React.createElement("Menu.Item",{key:"ez-led"},"Hello, React!");
    //return(<Menu.Item key={"index-" + repo.id}>{repo.text}</Menu.Item>);
  },

  render: function() {
    var repos = this.props.data.tree;
    //console.log("data:",repos);

    var subList={};
    for(var i=0;i<repos.length;i++){
      var repo = repos[i];
      console.log("---",repos[i].text,repos[i]);
      var repoList =[];
      //console.log("log: ",repo.text);
      if(!repo.leaf){
        //console.log("log: ",repo.text);
        for(var y=0;y<repo.tree.length;y++){
          if(repo.tree[y].leaf){
            repoList.push(<Menu.Item key={"index-" + repo.tree[y].id}>{repo.tree[y].text}</Menu.Item>);
          }
        }
        subList[repo.text] = repoList;
        //console.log(subList);
      }
    }
    //console.log(subList);
    var repoList =[];
    for(var i=0;i<repos.length;i++){
      console.log("###",repos[i].text,repos[i]);
      var repo = repos[i];
      if(repo.leaf){
        repoList.push(<Menu.Item key={"index-" + repo.id}>{repo.text}</Menu.Item>);
      }else{
        repoList.push(React.createElement(Menu.SubMenu,{key:repo.id,title:repo.text},subList[repo.text]));
      }
    }



    //repoList.push(React.createElement(Menu.SubMenu,{key:"ez-led",title:"xyz"},repoList2));

    // var repoList = repos.map(function (repo) {
    //   if(repo.leaf && !(repo instanceof Array)){
    //     console.log("repoList: ",repo);
    //     return(
    //       <Menu.Item key={"index-" + repo.id}>{repo.text}</Menu.Item>
    //       )
    //   }
      // else{
      //   return (
      //     <SubMenu key={repo.id} title={<span><Icon type="appstore" /><span>{repo.text}</span></span>}>
      //     </SubMenu>
      //   );
      // }
    //});

    return (
      <Menu theme = "dark" mode="inline">
        <Menu.SubMenu key={this.props.data.id} title={<span><Icon type="appstore" /><span>{this.props.data.text}</span></span>}>
          {repoList}
        </Menu.SubMenu>
      </Menu>
    );
  },
});
export default MenuSubAccordionA;