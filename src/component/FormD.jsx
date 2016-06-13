import React from 'react';
import { Form, Input, Button, Checkbox, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

let FormD = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    console.log('收到表单值：', this.props.form.getFieldsValue());
  },

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div>
      <Form inline onSubmit={this.handleSubmit} style={{padding:"16px 8px", background:"#f8f8f8",  border:"1px solid #d9d9d9",  border:"6px"}}>

        <FormItem
          label="商品:">
          <Input placeholder="商品编码/名称" style={{ width: 100 }}
            {...getFieldProps('product')} />
        </FormItem>

        <FormItem
          label="ERP商品编码:">
          <Input placeholder="" style={{ width: 100 }}
            {...getFieldProps('ERPID')} />
        </FormItem>

        <FormItem
          label="品牌名称:">
          <Input placeholder="" style={{ width: 100 }}
            {...getFieldProps('ERPID')} />
        </FormItem>

      <FormItem
        id="select"
        label="是否活跃:">
        <Select id="select" size="large" defaultValue="yes" style={{ width: 60 }}>
          <Option value="all">全部</Option>
          <Option value="yes">是</Option>
          <Option value="no">否</Option>
        </Select>
      </FormItem>

      <FormItem
        id="select"
        label="是否已上架:">
        <Select id="select" size="large" defaultValue="yes" style={{ width: 60 }}>
          <Option value="all">全部</Option>
          <Option value="yes">是</Option>
          <Option value="no">否</Option>
        </Select>
      </FormItem>

        <Button type="primary" htmlType="submit">查询</Button>&nbsp;&nbsp;&nbsp;
        <Button type="primary" htmlType="Button">导出</Button>
      </Form>
      </div>
    );
  },
});

FormD = Form.create()(FormD);
export default FormD;

// ReactDOM.render(<Demo />, mountNode);