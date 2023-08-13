import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import "./search.scss"
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { languages } from "../../../utils"
import { withRouter } from 'react-router';
import logger from 'redux-logger';


class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedDoctor: {},
    }
  }

  componentDidMount() {
    this.props.fetchAllDoctors()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelected = this.buildDataInputSelect(this.props.allDoctors)
      this.setState({
        listDoctors: dataSelected
      })
    }
  }

  buildDataInputSelect = (inputData) => {
    let result = []
    let language = this.props.language
    console.log("unputData", inputData);
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {}
        let labelVi = `${item.lastName} ${item.firstName}`
        let labelEn = `${item.firstName} ${item.lastName} `

        object.label = language === languages.VI ? labelVi : labelEn
        object.value = item.id
        result.push(object)
      })
    }
    return result
  }

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedDoctor: selectedOption });
    if (selectedOption) {
      // Chuyển tới trang mới với ID của bác sĩ được chọn
      this.props.history.push(`/detail-doctor/${selectedOption.value}`);
    }
  };

  render() {
    let language = this.props.language
    console.log("state sreach", this.state);
    return (
      <div className='search-container'>
          <Select
            value={this.state.selectedDoctor}
            onChange={this.handleChangeSelect}
            options={this.state.listDoctors}
            placeholder="Enter a search term"
            className={"fas fa-search"}
          />
        </div>
      
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allScheduletime: state.admin.allScheduletime,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
