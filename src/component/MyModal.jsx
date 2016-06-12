import React from 'React';
import { Modal, Button, Icon } from 'antd';

const MyModal = React.createClass({
  getInitialState() {
    return {
      loading: false,
      visible: false,
    };
  },
  showModal() {
    this.setState({
      visible: true,
    });
  },
  handleOk() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  },
  handleCancel() {
    this.setState({ visible: false });
  },
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}><Icon type="plus" />
          添加
        </Button>
        <Modal
          visible={this.state.visible}
          title="增加商品" onOk={this.handleOk} onCancel={this.handleCancel}
          footer={[
            <Button key="back11" type="ghost" size="large" onClick={this.handleCancel}>返 回</Button>,
            <Button key="submit11" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>
              提 交
            </Button>,
          ]}
        >
          <p>对话框的内容</p>
          <p>对话框的内容</p>
          <p>对话框的内容</p>
          <p>对话框的内容</p>
          <p>对话框的内容</p>
        </Modal>
      </div>
    );
  },
});

export default MyModal;