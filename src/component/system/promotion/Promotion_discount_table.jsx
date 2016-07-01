import React from 'react';
import {Table, Button, message, Modal} from 'antd';
import * as $ from 'jquery';
import columns from './columns';
const confirm = Modal.confirm;

let Promotion_discount_table = React.createClass({
    getDefaultProps() {
        return {
            pageSize: 10
        };
    },
    getInitialState() {
        return {
            selectedRowKeys: [],
            selectedRows:[],
            data: [],
            pagination: {pageSize:this.props.pageSize,current:1},
            loading: false,
            para: {}  //查询参数
        };
    },
    getRows(){
      return this.state.selectedRows;
    },
    //换页
    handleTableChange(pagination, filters, sorter) {
        this.state.pagination.current=pagination.current;
        this.fetch();
    },
    //从服务器删除所选数据
    doDelete(selectedRowKeys){
      var _self = this;
      let params ={};
      params.deleteData=JSON.stringify({'removed':selectedRowKeys});
      if(selectedRowKeys){
        $.ajax({
          url: "/elink_scm_web/promotionAction/delete.do",
          data: params,
          dataType: "json",
          success: function(result) {
            if(result.success){
              message.success(selectedRowKeys + ' 已被成功删除！',3);
              _self.setState({selectedRowKeys: []});
              _self.fetch();
            }else{
              message.error(selectedRowKeys + ' 删除失败： '+ result.msg,6);
            }
          },
          error: function(){
              console.log("删除出错：请稍后再试！");
          },
        });
      }else{
        message.warn("请选择要删除的促销活动！",6);
      }
    },
    confirmDelete(){
      var _self = this;
      let selectedRowKeys = this.state.selectedRowKeys;
      console.log(selectedRowKeys.length);
      if(selectedRowKeys.length > 0){
        confirm({
          title: '您是否确认要删除:',
          content: selectedRowKeys.toString(),
          onOk() {
            _self.doDelete(selectedRowKeys);
          },
          onCancel() {
            message.info('已取消！',3);
          },
        });
      }else{
        message.warn("请选择要删除的促销活动！",6);
      }
    },
    //从服务器获取数据
    fetch(para) {
        if(para){
          this.state.para=para;
          this.state.pagination.current=1;
        }
        let params = {
            limit: this.state.pagination.pageSize,
            start: (this.state.pagination.current - 1) * this.state.pagination.pageSize,
            ...this.state.para
        };
        let _self = this;
        _self.setState({loading: true});
        $.ajax({
            url: _self.props.url,
            data: params,
            dataType: "json",
            success: function(result) {
                let pagination = _self.state.pagination;
                pagination.total = result.total;
                //当前页为空返回到上一页
                if(result.rows && result.rows.length!='0' || _self.state.pagination.current==1){
                  _self.setState({
                    loading: false,
                    data: result.rows,
                    pagination,
                    selectedRowKeys: [],
                    selectedRows:[],
                  });
                }else{
                  _self.state.pagination.current--;
                  _self.fetch();
                }
            },
            error: function(){
                console.log("出错：Promotion 获取表单数据失败！");
            },
        });
    },
    componentDidMount() {
        this.fetch();
    },
    //行首选择框
    onSelectChange(selectedRowKeys,selectedRows) {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({
          'selectedRowKeys':selectedRowKeys,
          'selectedRows':selectedRows
        });
    },
    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {selectedRowKeys,onChange: this.onSelectChange,};
        return (
                <Table  rowSelection={rowSelection}
                        columns = {columns}
                        dataSource = {this.state.data}
                        scroll={{ x: true, y: 300 }}
                        pagination = {this.state.pagination}
                        loading = {loading}
                        onChange = {this.handleTableChange}
                        rowKey = {record => record.S_PROMOTION_ID}
                        bordered  />
        );
    },
});

export default Promotion_discount_table;
