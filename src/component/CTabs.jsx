import React from 'react';
import { Tabs, Button } from 'antd';
import App from '../component/App_pag';
import MyModalForm from '../component/MyModalForm';
const TabPane = Tabs.TabPane;

const CTabs = React.createClass({
  getInitialState() {
    this.newTabIndex = 0;
    const panes = [
      <TabPane tab="首 页" key="1"><MyModalForm/><App url="/elink_scm_web/sproductAction/query.do"/></TabPane>,
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
  add() {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push(<TabPane tab="新建页签" key={activeKey}>新页面</TabPane>);
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