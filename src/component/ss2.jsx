三列栅格式的表单排列方式，常用于数据表格的高级搜索。
有部分定制的样式代码，由于输入标签长度不确定，需要根据具体情况自行调整。
import { Form, Input, Row, Col, Button, DatePicker } from 'antd';
const FormItem = Form.Item;

ReactDOM.render(
  <Form horizontal className="ant-advanced-search-form">
    <Row gutter={16}>
      <Col sm={8}>
        <FormItem
          label="搜索名称"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
        >
          <Input placeholder="请输入搜索名称" size="default" />
        </FormItem>
        <FormItem
          label="较长搜索名称"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
        >
          <DatePicker size="default" />
        </FormItem>
        <FormItem
          label="搜索名称"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
        >
          <Input placeholder="请输入搜索名称" size="default" />
        </FormItem>
      </Col>
      <Col sm={8}>
        <FormItem
          label="搜索名称"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
        >
          <Input placeholder="请输入搜索名称" size="default" />
        </FormItem>
        <FormItem
          label="较长搜索名称"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
        >
          <DatePicker size="default" />
        </FormItem>
        <FormItem
          label="搜索名称"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
        >
          <Input placeholder="请输入搜索名称" size="default" />
        </FormItem>
      </Col>
      <Col sm={8}>
        <FormItem
          label="搜索名称"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
        >
          <Input placeholder="请输入搜索名称" size="default" />
        </FormItem>
        <FormItem
          label="较长搜索名称"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
        >
          <DatePicker size="default" />
        </FormItem>
        <FormItem
          label="搜索名称"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
        >
          <Input placeholder="请输入搜索名称" size="default" />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span={12} offset={12} style={{ textAlign: 'right' }}>
        <Button type="primary" htmlType="submit">搜索</Button>
        <Button>清除条件</Button>
      </Col>
    </Row>
  </Form>
, mountNode);