import React from 'react';
import { Tabs } from 'antd';
import Single_sproduct_mgr from '../component/Single_sproduct_mgr';
import Single_sproduct_Modal from '../component/Single_sproduct_Modal';
const TabPane = Tabs.TabPane;

const CTabs = React.createClass({
  getInitialState() {
    this.newTabIndex = 0;
    const panes = [
      <TabPane tab="首 页" key="1"><Single_sproduct_Modal/><Single_sproduct_mgr url="/elink_scm_web/sproductAction/query.do"/></TabPane>,
    ];
    return {
      activeKey: panes[0].key,
      panes,
    };
  },
  onChange(activeKey) {
    this.setState({ activeKey });
  },
  onEdit(targetKey, action) {
    this[action](targetKey);
  },
  add(e) {
    const panes = this.state.panes;
    //const activeKey = `newTab${this.newTabIndex++}`;
    const activeKey = e.key;
    var tabTitle = e.domEvent.target.innerHTML;
    // 加一个是否有此tab的开关，没有就添加，有就路过
    var flag = true;
    for (var i = 0, len = panes.length; i < len; i++) {
      if (panes[i].key == activeKey) {
        flag = false;
      }
    }
    if(flag) {
      if(e.key == "101"){
        panes.push(<TabPane tab="单品管理" key={activeKey}><Single_sproduct_Modal/><Single_sproduct_mgr url="/elink_scm_web/sproductAction/query.do"/></TabPane>);
      }
      else {
        panes.push(<TabPane tab={tabTitle} key={activeKey}>新页面</TabPane>);
      }
    }
    this.setState({ panes, activeKey });
  },
  remove(targetKey) {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  },
  render() {
    return (
      <div>
        <Tabs hideAdd onChange={this.onChange} activeKey={this.state.activeKey}
          type="editable-card" onEdit={this.onEdit}
        >
          {this.state.panes}
        </Tabs>
      </div>
    );
  },
});
export default CTabs;
// ReactDOM.render(<Demo />, mountNode);