import React from 'react';
import CTabs from '../component/CTabs';
import NavbarSide from '../component/NavbarSide';
import MenuAccordion from '../component/MenuAccordion';
const App = React.createClass({
  addTab(e) {
    this.refs.Rctabs.add(e);
  },
  render() {
    return (
      <div>
          <nav className="navbar-default navbar-side" role="navigation">
            {/*<NavbarSide addTab = {this.addTab}/>*/}
            <MenuAccordion />
          </nav>
          <div id="page-wrapper" className="border table-bordered">
              <div id="page-inner">
                <div className="row">
                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="board">
                      <div className="panel panel-primary">
                        <CTabs ref="Rctabs"/>
                      </div>
                    </div>
                  </div>
                </div>
                <footer><p>Copyright 2016版权所有@<a href='http://www.nyysfw.com' target='_blank'>南京医药药事服务有限公司</a> </p>
                </footer>
              </div>
          </div>
        </div>
    );
  }
});
export default App;