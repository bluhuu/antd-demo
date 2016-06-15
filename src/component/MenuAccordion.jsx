import React from 'react';
import { Menu, Icon } from 'antd';
// import MenuSubAccordionA from './MenuSubAccordionA'

var SubMenu = Menu.SubMenu;

var MenuAccordion = React.createClass({
    getInitialState: function() {
        return {
            current: '1',
            openKeys: [],
            loading: false,
            data: []
        };
    },
    fetch: function(params = {}) {
        var _self = this;
        this.setState({
            loading: true
        });
        $.ajax({
            url: this.props.urlA,
            data: params,
            dataType: "json",
            async: false,
            success: function(result) {
                var resultList = result.rows || result;
                _self.setState({
                    loading: false,
                    data: resultList
                });
                _self.fetchLeaf(resultList);
            },
        });
    },
    fetchLeaf: function(resultData) {
        var _self = this;
        for (var i = 0, len = resultData.length; i < len; i++) {
            if (!resultData[i].leaf) {
                $.ajax({
                    url: this.props.urlB,
                    data: {
                        node: resultData[i].id,
                        nodeID: resultData[i].id
                    },
                    dataType: "json",
                    async: false,
                    success: function(result) {
                        var resultList = result.rows || result;
                        resultData[i].tree = resultList;
                        _self.fetchLeaf(resultData[i].tree);
                    },
                });
            }
        }
        _self.setState({
            loading: false,
            data: resultData
        });
    },
    componentDidMount: function() {
        this.fetch({
            node: this.props.id,
            nodeID: this.props.id
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
        var _self = this;
        var repos = this.state.data; //一级目录数组
        console.log("render: ", repos); //完整树结构s
// ----
        var subList = {};
        for (var i = 0; i < repos.length; i++) {
            var repo = repos[i];
            // console.log("---", repos[i].text, repos[i]);
            var repoList = [];
            //console.log("log: ",repo.text);
            if (!repo.leaf) {
                //console.log("log: ",repo.text);
                for (var j = 0; j < repo.tree.length; j++) {
                    if (repo.tree[j].leaf) {
                        repoList.push(<Menu.Item key={repo.tree[j].id}>{repo.tree[j].text}</Menu.Item>);
                    }else{
                        var repoListK = [];
                        for(var k = 0; k < repo.tree[j].tree.length; k++){
                            if(repo.tree[j].tree[k].leaf){
                                repoListK.push(<Menu.Item key={repo.tree[j].tree[k].id}>{repo.tree[j].tree[k].text}</Menu.Item>);
                            }else{

                            }
                        }
                        repoList.push(<SubMenu key={repo.tree[j].id} title={<span><Icon type="appstore" /><span>{repo.tree[j].text}</span></span>}>{repoListK}</SubMenu>);
                    }
                }
                subList[repo.text] = repoList;
                //console.log(subList);
            }
        }
// ---
        console.log(subList);

        var repoList = [];
        for (var i = 0; i < repos.length; i++) {
            var repo = repos[i];
            // 一级目录
            if (repo.leaf) {
                repoList.push(<Menu.Item key={repo.id}>{repo.text}</Menu.Item>);
            } else {
                //repoList.push(React.createElement(Menu.SubMenu, {key: repo.id, title: repo.text }, ));
                repoList.push(<SubMenu key={repo.id} title={<span><Icon type="appstore" /><span>{repo.text}</span></span>}>{subList[repo.text]}</SubMenu>);
            }
        }




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
        {repoList}
      </Menu>
        );
    },
});
export default MenuAccordion;