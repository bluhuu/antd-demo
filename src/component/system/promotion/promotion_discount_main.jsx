import React from 'react';
import Promotion_discount_table from './Promotion_discount_table';
import Promotion_discount_form from './Promotion_discount_form';

let Promotion_discount_main = React.createClass({
  getInitialState() {
    return {
      url:"/elink_scm_web/promotionAction/query.do",
    };
  },
  query(e){
    this.refs.table.fetch(e);
  },
  render() {
    return (
      <div>
        <Promotion_discount_form query={this.query}/>
        <Promotion_discount_table ref="table" url={this.state.url}/>
      </div>
    )},
});

export default Promotion_discount_main;
