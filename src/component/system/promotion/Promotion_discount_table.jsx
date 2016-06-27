import React from 'react';
import {Table, Button} from 'antd';
import * as $ from 'jquery';
import columns from './columns.js'
import downloadFile from '../../common/downloadFile.js';

let Promotion_discount_table = React.createClass({
    getDefaultProps() {
        return {
            pageSize: 10
        };
    },
    getInitialState() {
        return {
            selectedRowKeys: [],
            data: [],
            pagination: {pageSize:this.props.pageSize,current:1},
            loading: false,
            para: {}
        };
    },
    //换页
    handleTableChange(pagination, filters, sorter) {
        this.state.pagination.current=pagination.current;
        this.fetch();
    },
    //从form获取参数，刷新页面
    setParams(para){
        this.state.para=para;
        this.state.pagination.current=1;
        this.fetch();
    },
    //从服务器获取数据
    fetch() {
        let params = {
            limit: this.state.pagination.pageSize,
            start: (this.state.pagination.current - 1) * this.state.pagination.pageSize,
            ...this.state.para,
        };
        var _self = this;
        this.setState({loading: true});
        $.ajax({
            url: this.props.url,
            data: params,
            dataType: "json",
            success: function(result) {
                let pagination = _self.state.pagination;
                pagination.total = result.total;
                _self.setState({
                    loading: false,
                    data: result.rows,
                    pagination,
                });
            },
            error: function(){
                console.log("出错：Promotion 获取表单数据失败！");
            },
        });
    },
    componentDidMount() {
        this.fetch();
    },
    //导出Excel
    exportExcel(params){
        let cols = [...columns];
        //---shim---
        for (let i=cols.length-1;i>=0;i--){
            if(cols[i].dataIndex){
                cols[i].id=cols[i].dataIndex;
                cols[i].name=cols[i].title;
            }else{
                console.log("exportExcel--for--else--");
            }
        }
        //---
        params.columns=JSON.stringify(cols);
        params.title = "折扣管理";
        var _self = this;
        this.setState({loading: true});
        $.ajax({
            url: "/elink_scm_web/promotionAction/promotionListExport.do",
            data: params,
            dataType: "json",
            success: function(result) {
                _self.setState({
                    loading: false,
                });
                downloadFile("/elink_scm_web/appAction/downfile.do?targetFile="+result.file);
            },
            error: function(){
                console.log("出错：Promotion 获取表单数据失败！");
            },
        });
    },
    //行首选择框
    onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    },
    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {selectedRowKeys,onChange: this.onSelectChange,};
        return (
            <div>
                <Table  rowSelection={rowSelection}
                        columns = {columns}
                        dataSource = {this.state.data}
                        scroll={{ x: true, y: 300 }}
                        pagination = {this.state.pagination}
                        loading = {this.state.loading}
                        onChange = {this.handleTableChange}
                        rowKey = {record => record.S_PROMOTION_ID}
                        bordered  />
            </div>
        );
    },
});

export default Promotion_discount_table;
