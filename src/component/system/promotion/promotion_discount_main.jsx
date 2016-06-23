import React from 'react';
import Promotion_discount_table from './Promotion_discount_table';
import Promotion_discount_form from './Promotion_discount_form';

let Promotion_discount_main = React.createClass({
  render() {
    return (
      <div>
        <Promotion_discount_form />
        <Promotion_discount_table url="/elink_scm_web/promotionAction/query.do"/>
      </div>
    )},
});

export default Promotion_discount_main;
