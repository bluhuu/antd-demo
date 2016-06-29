import React from 'react';
import { Button, Form, Input, Modal, Icon, Row, Col, Radio, DatePicker, message } from 'antd';
import SelectByRefId from '../../common/SelectByRefId';
import '../../common/Format';
const createForm = Form.create;
const FormItem   = Form.Item;
const RadioGroup = Radio.Group;

let Promotion_discount_modal_edit = React.createClass({
  getInitialState() {
    return {
      visible: false,
      rowData: null
     };
  },

  handleSubmit() {
    let _self            =this;
    let params           =this.props.form.getFieldsValue();
    params.PromotionType ="DISCOUNT";
    params.beginDate     =params.beginDate.format('yyyy-MM-dd');
    params.endDate       =params.endDate.format('yyyy-MM-dd');
    $.ajax({
      url     : "/elink_scm_web/promotionAction/save.do",
      data    : params,
      dataType: "json",
      success : function(result) {
        if(result.success){
          _self.props.query();
          message.success(params.name + ' 添加成功！',3);
        }else{
          message.error(params.name + ' 添加失败： '+ result.msg,6);
        }
      },
      error: function(){
        message.error('网络忙，请稍后再试！',6);
      },
    });
    this.hideModal();
  },
  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  },
  componentDidMount() {

  },
  showModal() {
    if(this.props.getRows){
      let selectedRows = this.props.getRows();
      if(selectedRows.length==1){
        console.log(selectedRows);
        this.setState({
          visible: true,
          rowData: selectedRows[0]
        });
      }else if(selectedRows.length > 1){
        message.warn("只能选择一个活动项目！",6);
      }else {
        message.warn("请选择一个活动项目！",6);
      }
    }
  },

  hideModal() {
    this.setState({ visible: false });
  },

  render() {
    const {rowData} = this.state;
    console.log(rowData.PromotionObject);
    console.log(rowData);
    const { getFieldProps } = this.props.form;
    const formItemLayout    = {
      labelCol  : { span : 8 },
      wrapperCol: { span : 16 },
    };
    return (
      <div style={{display:'inline',marginLeft:5}} {...this.props.ss}>
        <Button type="primary" onClick={this.showModal} size="small"><Icon type="edit" />修 改</Button>
        <Modal title="修 改" width="680" visible={this.state.visible} onOk={this.handleSubmit} onCancel={this.hideModal}
              footer={[
                <Button key="back" type="ghost" size="large" style={{width:85}} onClick={this.hideModal}>返 回</Button>,
                <Button key="reset" type="ghost" size="large" onClick={this.handleReset}><Icon type="reload" />重 置</Button>,
                <Button key="submit" type="primary" size="large"  onClick={this.handleSubmit}><Icon type="check" />提 交</Button>
              ]} >
          <Form horizontal form={this.props.form} style={{padding:"0px 20px"}}>
            <Row gutter={16} >
              <Col span="11" >
                <FormItem {...formItemLayout} label="促销名称:" style={{margin:"3px 0px"}}>
                  <Input {...getFieldProps('name', {initialValue:rowData.PromotionName})} type="text"  autoComplete="off"/>
                </FormItem>
                <FormItem {...formItemLayout} label="开始时间:" style={{margin:"3px 0px"}}>
                  <DatePicker style={{width:"195"}} {...getFieldProps('beginDate', {initialValue:rowData.BeginDate})} />
                </FormItem>
                <FormItem {...formItemLayout} label="促销规则:" style={{margin:"3px 0px"}}>
                  <SelectByRefId refId="1000451" {...getFieldProps('promotionRuleType',{initialValue:rowData.PromotionRuleType})} style={{ width: '100%' }}/>
                </FormItem>
                <FormItem {...formItemLayout} label="购满金额:" style={{margin:"3px 0px"}}>
                  <Input {...getFieldProps('SBuyAmt', {initialValue:rowData.SBuyAmt})} type="text" autoComplete="off" size="small"/>
                </FormItem>
                <FormItem {...formItemLayout} label="多买多送:" style={{margin:"3px 0px"}}>
                  <RadioGroup style={{'paddingLeft':'20'}} {...getFieldProps('IsRepeat', {initialValue:rowData.IsRepeat})}>
                    <Radio value="Y">是</Radio> <Radio value="N">否</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem {...formItemLayout} label="促销范围:" style={{margin:"3px 0px"}}>
                  <SelectByRefId refId="1000450" {...getFieldProps('promotionObject',{initialValue:rowData.PromotionObject})} style={{ width: '100%' }}/>
                </FormItem>
                <FormItem {...formItemLayout} label="结束时间:" style={{margin:"3px 0px"}}>
                  <DatePicker style={{width:"195"}} {...getFieldProps('endDate', {initialValue:rowData.EndDate})} />
                </FormItem>
                <FormItem {...formItemLayout} label="减免类型:" style={{margin:"3px 0px"}}>
                  <SelectByRefId refId="1000452" {...getFieldProps('reduceType',{initialValue:rowData.PromotionReduceType})} style={{ width: '100%' }}/>
                </FormItem>
                <FormItem {...formItemLayout} label="减免金额:" style={{margin:"3px 0px"}}>
                  <Input {...getFieldProps('reductionAmt', {initialValue:rowData.ReductionAmt})} type="text" autoComplete="off" size="default"/>
                </FormItem>
                <FormItem {...formItemLayout} label="可否退货:" style={{margin:"3px 0px"}}>
                  <RadioGroup style={{'paddingLeft':'20'}} {...getFieldProps('ReturnAbled', {initialValue:rowData.ReturnAbled})}>
                    <Radio value="Y">是</Radio> <Radio value="N">否</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
            </Row>
            <Row gutter={16} >
              <Col span="22">
                <FormItem label="规则说明:" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                  <Input type="textarea" rows={5} {...getFieldProps('descript', {initialValue:rowData.Description})} />
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  },
});

Promotion_discount_modal_edit = createForm()(Promotion_discount_modal_edit);

export default Promotion_discount_modal_edit;
