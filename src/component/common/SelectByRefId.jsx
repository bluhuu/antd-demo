import { Select } from 'antd';
const Option = Select.Option;

let SelectByRefId = React.createClass({
  getInitialState() {
    return {
      data: [],
    };
  },
  getDefaultProps() {
    return {
      url: '/elink_scm_web/baseAction/refList.do'
    };
  },
  fetchRefList(params = {}) {
    var _self = this;
    $.ajax({
        url: this.props.url,
        data: params,
        dataType: "json",
        success: function(result) { //{"total":2,"rows":[{"id":"CL","name":"分类"},{"id":"SP","name":"单品"}]}
            _self.setState({
                data: result.rows,
            });
          },
        });
      },
  componentDidMount() {
    this.fetchRefList({
        id: this.props.refId
      });
    },
  handleProvinceChange(value) {
    this.setState({
      cities: cityData[value],
      secondCity: cityData[value][0],
    });
  },
  onSecondCityChange(value) {
    this.setState({
      secondCity: value,
    });
  },

  render() {
    const refOptions = this.state.data.map(dat => <Option key={dat.id}>{dat.name}</Option>);
    return (
        <Select value={this.state.data[0].name} style={{ width: 90 }}>
          {refOptions}
        </Select>
    );
  },
});

export default SelectByRefId;

