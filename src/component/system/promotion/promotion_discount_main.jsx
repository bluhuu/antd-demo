import React from 'react';
import Promotion_discount_table from './Promotion_discount_table';
import Promotion_discount_form from './Promotion_discount_form';

let Promotion_discount_main = React.createClass({
  getInitialState() {
    return {
      url:"/elink_scm_web/promotionAction/query.do",
      pageSize:8
    };
  },
  //从form查询数据
  query(FieldsValue){
    console.log("FieldsValue:",FieldsValue);
    this.refs.table.setParams(FieldsValue);
  },
  render() {
    return (
      <div>
        <Promotion_discount_form query={this.query}/>
        <Promotion_discount_table
          ref="table"
          pageSize={this.state.pageSize}
          url={this.state.url} />
      </div>
    )},
});

export default Promotion_discount_main;
