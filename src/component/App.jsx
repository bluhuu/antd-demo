﻿import React from 'react';
import * as $ from 'jquery';
import {Table, Button} from 'antd';

const columns = [{
    title: '商品编号',
    dataIndex: 'S_Product_ID',
}, {
    title: '名 称',
    dataIndex: 'Name',
}, {
    title: '分类号',
    dataIndex: 'S_Classification_ID',
}];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `李大嘴${i}`,
        age: 32,
        address: `西湖区湖底公园${i}号`
    });
}

const App = React.createClass({
            getInitialState() {
                return {
                    S_Product_ID: "",
                    Name: "",
                    S_Classification_ID: "",
                    selectedRowKeys: [0], // 这里配置默认勾选列
                    loading: false,
                };
            },
            componentDidMount: function() {
                this.serverRequest = $.get("/elink_scm_web/sproductAction/query.do", function(result) {
                    var data = JSON.parse(result).rows;
                    console.log(JSON.parse(result).rows);
                    console.log(JSON.parse(result).total);
                    this.setState({
                        data:data,
                    });
                }.bind(this));
            },
            componentWillUnmount: function() {
                this.serverRequest.abort();
            },
            start() {
                this.setState({
                    loading: true
                });

                // 模拟 ajax 请求，完成后清空
                setTimeout(() => {
                    this.setState({
                        selectedRowKeys: [],
                        loading: false,
                    });
                }, 1000);
            },
            onSelectChange(selectedRowKeys) {
                console.log('selectedRowKeys changed: ', selectedRowKeys);
                this.setState({
                    selectedRowKeys
                });
            },
            render() {
                const {
                    loading, selectedRowKeys
                } = this.state;
                const rowSelection = {
                    selectedRowKeys,
                    onChange: this.onSelectChange,
                };
                const hasSelected = selectedRowKeys.length > 0;
                return ( < div >
                        < div style = {
                            {
                                marginBottom: 16
                            }
                        } >
                        < Button type = "primary"
                        onClick = {
                            this.start
                        }
                        disabled = {
                            !hasSelected
                        }
                        loading = {
                            loading
                        } > 操作 < /Button>
                    <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRowKeys.length} 个对象` : ''}</span >
                        < /div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} / >
                        < /div>
        );
    }
});

export default App;