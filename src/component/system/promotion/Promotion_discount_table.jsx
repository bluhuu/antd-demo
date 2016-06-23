import React from 'react';
import {Table, Button} from 'antd';
import * as $ from 'jquery';

const columns = [{
    title: '活动编号',
    width: 120,
    sortable: true,
    dataIndex: 'S_PROMOTION_ID',
    fixed: 'left'
}, {
    title: '促销对象',
    width: 120,
    sortable: true,
    dataIndex: 'PromotionObjectName'
}, {
    title: '促销名称',
    width: 200,
    sortable: true,
    dataIndex: 'PromotionName'
}, {
    title: '促销规则',
    width: 120,
    sortable: true,
    dataIndex: 'PromotionRuleTypeName'
}, {
    title: '可否退货',
    width: 120,
    sortable: true,
    dataIndex: 'ReturnAbled'
}, {
    title: '购满金额',
    width: 120,
    sortable: true,
    dataIndex: 'SBuyAmt'
}, {
    title: '购满件数',
    width: 120,
    sortable: true,
    dataIndex: 'SProductQty'
}, {
    title: '减免类型',
    width: 150,
    sortable: true,
    dataIndex: 'PromotionReduceTypeName'
}, {
    title: '减免金额',
    width: 120,
    sortable: true,
    dataIndex: 'ReductionAmt'
}, {
    title: '减免折扣',
    width: 120,
    sortable: true,
    dataIndex: 'Discount'
}, {
    title: '开始时间',
    width: 150,
    sortable: true,
    dataIndex: 'BeginDate'
}, {
    title: '结束时间',
    width: 150,
    sortable: true,
    dataIndex: 'EndDate'

},
// {
//     title: '操作',
//     key: 'operation',
//     fixed: 'right',
//     width: 150,
//     render: () => <a href="#">操作</a>,
// },
];

const Promotion_discount_table = React.createClass({
            getInitialState() {
                return {
                    selectedRowKeys: [],  // 这里配置默认勾选列
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
                // console.log('请求参数：', params);
                var _self = this;
                this.setState({
                    loading: true
                });
                $.ajax({
                    url: this.props.url,
                    data: params,
                    dataType: "json",
                    success: function(result) {
                        const pagination = _self.state.pagination;
                        pagination.total = result.total;
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
                }, 500);
            },
            onSelectChange(selectedRowKeys) {
                console.log('selectedRowKeys changed: ', selectedRowKeys);
                this.setState({
                    selectedRowKeys
                });
            },
            render() {
                const { loading, selectedRowKeys } = this.state;
                const rowSelection = {selectedRowKeys,onChange: this.onSelectChange,};
                const hasSelected = selectedRowKeys.length > 0;
                return (
                    <div>
                        < Table     rowSelection={rowSelection}
                                    columns = {columns}
                                    dataSource = {this.state.data}
                                    scroll={{ x: true, y: 300 }}
                                    pagination = {this.state.pagination}
                                    loading = {this.state.loading}
                                    onChange = {this.handleTableChange}
                                    rowKey = {record => record.S_Product_ID}
                                    bordered  />
                    </div>
                );
            },
});

export default Promotion_discount_table;
