import React from 'react';
import { Button, Form, Input, Modal, Icon, Row, Col, Radio, DatePicker } from 'antd';
import SelectByRefId from '../../common/SelectByRefId';
const createForm = Form.create;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

var formStyle = {
  'padding': '2px 4px',
  'background': '#eee',
  'border': '1px solid #d9d9d9',
  'border-radius': '6',
  'margin-bottom': '4',
}

let Promotion_discount_modal = React.createClass({
  getInitialState() {
    return { visible: false };
  },

  handleSubmit() {
    console.log(this.props.form.getFieldsValue());
    this.hideModal();
  },

  showModal() {
    this.setState({ visible: true });
  },

  hideModal() {
    this.setState({ visible: false });
  },

  render() {
    const { getFieldProps } = this.props.form;

    const formItemLayout = {
      labelCol: { span : 8 },
      wrapperCol: { span : 16 },
    };
    return (
      <div style={formStyle}>
        <Button type="primary" onClick={this.showModal} size="small"><Icon type="plus" />添加</Button>
        <Modal title="添加" width="680" visible={this.state.visible} onOk={this.handleSubmit} onCancel={this.hideModal}>
          <Form horizontal form={this.props.form} style={{padding:"0px 20px"}}>
            <Row gutter={8} >
              <Col span="11" >
                <FormItem {...formItemLayout} label="促销名称:" style={{margin:"3px 0px"}}>
                  <Input {...getFieldProps('username', {})} type="text"  autoComplete="off"/>
                </FormItem>
                <FormItem {...formItemLayout} label="开始时间:" style={{margin:"3px 0px"}}>
                  <DatePicker style={{width:"195"}}/>
                </FormItem>
                <FormItem {...formItemLayout} label="促销规则:" style={{margin:"3px 0px"}}>
                  <SelectByRefId refId="1000451" {...getFieldProps('promotionObject')} style={{width:"195"}}/>
                </FormItem>
                <FormItem {...formItemLayout} label="购满金额:" style={{margin:"3px 0px"}}>
                  <Input {...getFieldProps('username', {})} type="text" autoComplete="off" size="small"/>
                </FormItem>
                <FormItem {...formItemLayout} label="多买多送:" style={{margin:"3px 0px"}}>
                  <RadioGroup style={{'padding-left':'20'}} {...getFieldProps('gender', { initialValue: 'yes' })}>
                    <Radio value="yes">是</Radio> <Radio value="no">否</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem {...formItemLayout} label="促销范围:" style={{margin:"3px 0px"}}>
                  <SelectByRefId refId="1000450" {...getFieldProps('promotionObject')} style={{width:"195"}}/>
                </FormItem>
                <FormItem {...formItemLayout} label="结束时间:" style={{margin:"3px 0px"}}>
                  <DatePicker style={{width:"195"}}/>
                </FormItem>
                <FormItem {...formItemLayout} label="减免类型:" style={{margin:"3px 0px"}}>
                  <SelectByRefId refId="1000452" {...getFieldProps('promotionObject')} style={{width:"195"}}/>
                </FormItem>
                <FormItem {...formItemLayout} label="减免金额:" style={{margin:"3px 0px"}}>
                  <Input {...getFieldProps('username', {})} type="text" autoComplete="off" size="default"/>
                </FormItem>
                <FormItem {...formItemLayout} label="可否退货:" style={{margin:"3px 0px"}}>
                  <RadioGroup style={{'padding-left':'20'}} {...getFieldProps('gender2', { initialValue: 'no' })}>
                    <Radio value="yes">是</Radio> <Radio value="no">否</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
            </Row>
            <FormItem label="规则说明:" labelCol={{ span: 4 }} wrapperCol={{ span: 19 }} style={{margin:"0px 10px 0px -22px"}}>
              <Input type="textarea" rows={5} />
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  },
});

Promotion_discount_modal = createForm()(Promotion_discount_modal);

export default Promotion_discount_modal;
