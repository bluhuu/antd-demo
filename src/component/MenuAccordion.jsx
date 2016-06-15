import React from 'react';
import { Menu, Icon } from 'antd';
import MenuSubAccordionA from './MenuSubAccordionA'

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
        var repos = this.state.data;
        console.log("render: ", repos); //完整树结构s

        // var repoList = this.renderList(repos);
        var repoList = repos.map(function(repo) {
            if (repo.leaf) {
                return (
                    <Menu.Item key={repo.id}>{repo.text}</Menu.Item>
                )
            } else {
                return (
                    <MenuSubAccordionA key={repo.id} data={repo} />
                );
            }
        });

        console.log("repoList: ", repoList);

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