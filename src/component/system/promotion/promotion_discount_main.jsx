import React from 'react';
import { Button, Icon  } from 'antd';
import Promotion_discount_table from './Promotion_discount_table';
import Promotion_discount_form from './Promotion_discount_form';
import Promotion_discount_modal from './Promotion_discount_modal';

var formStyle = {
  'padding': '2px 4px',
  'background': '#eee',
  'border': '1px solid #d9d9d9',
  'borderRadius': '6',
  'marginBottom': '4',
}

let Promotion_discount_main = React.createClass({
  getInitialState() {
    return {
      url:"/elink_scm_web/promotionAction/query.do",
      pageSize:8
    };
  },
  //从form查询数据
  query(paras){
    console.log("query: ",paras);
    this.refs.table.fetch(paras);
  },
  //导出Excel
  exportExcel(paras){
    console.log("exportExcel: ",paras);
    this.refs.table.exportExcel(paras);
  },
  doDelete(){
    this.refs.table.confirmDelete();
  },
  getRows(){
    console.log("doEdit");
    return this.refs.table.getRows();
  },
  render() {
    return (
      <div>
        <Promotion_discount_form query={this.query} exportExcel={this.exportExcel}/>
          <div style={formStyle}>
            <Promotion_discount_modal query={this.query}/>
            <Promotion_discount_modal edit query={this.query} getRows={this.getRows}/>
            <Button type="primary" onClick={this.doDelete} size="small" style={{marginLeft:5}} ><Icon type="delete" />删 除</Button>
          </div>
        <Promotion_discount_table ref="table" pageSize={this.state.pageSize} url={this.state.url} />
      </div>
    )},
});

export default Promotion_discount_main;
