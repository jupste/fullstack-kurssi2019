import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'
class Filter extends React.Component {
  filterField = event => {
    this.props.filterChange(event.target.value)
  }
  render() {
    return (
      <div>
        filter inputs
        <input
          type="text"
          name="filter"
          defaultValue=""
          onChange={this.filterField}
        />
      </div>
    )
  }
}
const mapDispatchToProps = {
  filterChange
}

export default connect(
  null,
  mapDispatchToProps
)(Filter)
