import React from 'react';
import { Button, Form, Input, Modal, Icon } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

let MyModalForm = React.createClass({
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
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    return (
      <div>
        <Button type="primary" onClick={this.showModal}><Icon type="plus" />添加</Button>
        <Modal title="添加商品" visible={this.state.visible} onOk={this.handleSubmit} onCancel={this.hideModal}>
          <Form horizontal form={this.props.form}>
            <FormItem {...formItemLayout} label="用户名">
              <Input {...getFieldProps('username', {})} type="text" autoComplete="off" />
            </FormItem>
            <FormItem {...formItemLayout} label="密码">
              <Input {...getFieldProps('password', {})} type="password" autoComplete="off" />
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  },
});

MyModalForm = createForm()(MyModalForm);

export default MyModalForm;