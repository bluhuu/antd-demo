import React from 'react';
import {Table} from 'antd';
import * as $ from 'jquery';

const columns = [
        {
            title : '品名',
            width : 150,
            sortable : true,
            dataIndex : 'Name'
        },{
            title : '商品编码',
            width : 100,
            sortable : true,
            dataIndex : 'S_Product_ID'
        },{
            title : '搜索码',
            width : 100,
            sortable : true,
            dataIndex : 'Value'
        },{
            title : '通用名',
            width : 150,
            sortable : true,
            dataIndex : 'MedicineName'
        }, {
            title : '商品名',
            width : 150,
            sortable : true,
            dataIndex : 'ProductName'
        }, {
            title : '规格',
            width : 120,
            sortable : true,
            dataIndex : 'ProductSpec'
        }, {
            title : '剂型',
            width : 80,
            sortable : true,
            dataIndex : 'ProductStyleName'
        }, {
            title : '生产厂家',
            width : 150,
            sortable : true,
            dataIndex : 'Manufacturer'
        }, {
            title : '单位',
            width : 50,
            sortable : true,
            dataIndex : 'UOMName'
        },{
            title : '零售单位',
            width : 100,
            sortable : true,
            dataIndex : 'RetailUOMName'
        },{
            title : '零售转批发单位系数',
            width : 120,
            sortable : true,
            dataIndex : 'UOMRatio'
        }, {
            title : 'ERP商品编码',
            width : 100,
            sortable : true,
            dataIndex : 'ProductCode'

        }
];

const App = React.createClass({
            getInitialState() {
                return {
                    data: [],
                    pagination: {pageSize:8,current:1},
                    loading: false,
                };
            },
            handleTableChange(pagination, filters, sorter) {
                const pager = this.state.pagination;
                pager.current = pagination.current;
                this.setState({
                    pagination: pager,
                });
                this.fetch({
                    limit: pagination.pageSize,
                    start: (pagination.current - 1) * pagination.pageSize,
                    sortField: sorter.field,
                    sortOrder: sorter.order,
                    ...filters,
                });
            },
            fetch(params = {}) {
                console.log('请求参数：', params);
                var _self = this;
                this.setState({
                    loading: true
                });
                $.ajax({
                    url: "/elink_scm_web/sproductAction/query.do",
                    data: params,
                    dataType: "json",
                    success: function(result) {
                        const pagination = _self.state.pagination;
                        pagination.total = result.total;
                        //console.log(result.total);
                        //console.log(result.rows);
                        _self.setState({
                            loading: false,
                            data: result.rows,
                            pagination,
                        });
                    },
                });

            },
            componentDidMount() {
                this.fetch({
                    limit: this.state.pagination.pageSize,
                    start: (this.state.pagination.current - 1) * this.state.pagination.pageSize
                });
            },
            render() {
                return ( < Table columns = {columns}
                                dataSource = {this.state.data}
                                pagination = {this.state.pagination}
                                loading = {this.state.loading}
                                onChange = {this.handleTableChange} />
                        );
            },
});

export default App;