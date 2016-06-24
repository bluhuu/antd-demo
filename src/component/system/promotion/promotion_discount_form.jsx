import React from 'react';
import { Form, Input, Button, Checkbox, Select, DatePicker, Col } from 'antd';
import SelectByRefId from '../../common/SelectByRefId';
import '../../common/Format';
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

let Promotion_discount_form = React.createClass({

  handleSubmit(e) {
    e.preventDefault();
    //调整参数格式
    let paras = this.props.form.getFieldsValue();
    if(paras.date){
      paras.beginDate = paras.date[0].format('yyyy-MM-dd');
      paras.endDate = paras.date[1].format('yyyy-MM-dd');
    }
    delete paras.date;
    paras.promotionID = paras.promotionID && paras.promotionID.trim();
    paras.name = paras.name && paras.name.trim();
    //发送请求参数
    this.props.query(paras);
  },

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div>
      <Form inline onSubmit={this.handleSubmit} style={{padding:"16px 8px", background:"#f8f8f8",  border:"1px solid #d9d9d9",  border:"6px"}}>
        <FormItem label="活动日期:">
          <RangePicker format="yyyy-MM-dd" style={{ width: 184 }} {...getFieldProps('date')}/>
        </FormItem>

        <FormItem label="促销范围:">
          <SelectByRefId refId="1000450" {...getFieldProps('promotionObject')}/>
        </FormItem>

        <FormItem label="活动编号:">
          <Input placeholder="" style={{ width: 100 }} {...getFieldProps('promotionID')} />
        </FormItem>

        <FormItem label="活动名称:">
          <Input placeholder="" style={{ width: 100 }} {...getFieldProps('name')} />
        </FormItem>

        <Button type="primary" htmlType="submit">查询</Button>&nbsp;
        <Button type="primary" htmlType="button">导出</Button>
      </Form>
      </div>
    );
  },
});

Promotion_discount_form = Form.create()(Promotion_discount_form);
export default Promotion_discount_form;
