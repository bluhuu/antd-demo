import React from 'react';
import CTabs from '../component/CTabs';
import NavbarSide from '../component/NavbarSide';
const Contents = React.createClass({
  add() {
    console.log(123);
    this.refs.Rctabs.add();
  },
  render() {
    return (
        <div>
          <nav className="navbar-default navbar-side" role="navigation">
            <NavbarSide />
          </nav>
          <div id="page-wrapper" className="border table-bordered">
              <div id="page-inner">
                <div className="row">
                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="board">
                      <div className="panel panel-primary">
                        <input type="button" value="test" onClick={this.add} />
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
    );}
});
export default Contents;

