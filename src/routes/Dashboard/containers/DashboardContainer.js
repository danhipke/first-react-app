import React from 'react'
import { connect } from 'react-redux'
import {
  dashboardVisitsIncrement,
  dashboardAddItem,
  dashboardEditItem
} from '../modules/dashboard'
import Dashboard from '../components/Dashboard'

const mapDispatchToProps = {
  dashboardVisitsIncrement: () => dashboardVisitsIncrement(1),
  dashboardAddItem: (value) => dashboardAddItem(value),
  dashboardEditItem: (value) => dashboardEditItem(value)
}

const mapStateToProps = (state) => ({
  dashboard : state.dashboard
})

class DashboardContainer extends React.Component {
  constructor (props) {
    super(props)

    this.inputOnChange = this.inputOnChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.itemOnEdit = this.itemOnEdit.bind(this)

    this.state = {
      inputValue: '',
      editedItemIndex: null
    }
  }

  componentDidMount () {
    this.props.dashboardVisitsIncrement()
  }

  inputOnChange (e) {
    this.setState({ inputValue: e.target.value })
  }

  itemOnEdit (itemIndex) {
    const editedItem = this.props.dashboard.dashboardItems[itemIndex]
    this.setState({ inputValue: editedItem.label, editedItemIndex: itemIndex })
  }

  onSubmit (e) {
    e.preventDefault()
    const val = this.state.inputValue
    const editedItemIndex = this.state.editedItemIndex
    if (val && editedItemIndex !== null) {
      this.props.dashboardEditItem({ val, editedItemIndex })
      this.setState({ inputValue: '', editedItemIndex: null })
    } else if (val) {
      this.props.dashboardAddItem(val)
      this.setState({ inputValue: '' })
    } else {
      alert('Value can\'t be empty')
    }
  }

  render () {
    return (
      <Dashboard {...this.props}
        editedItemIndex={this.state.editedItemIndex}
        itemOnEdit={this.itemOnEdit}
        inputValue={this.state.inputValue}
        inputOnChange={this.inputOnChange}
        onSubmit={this.onSubmit} />
    )
  }
}

DashboardContainer.propTypes = {
  dashboardVisitsIncrement: React.PropTypes.func.isRequired,
  dashboardAddItem: React.PropTypes.func.isRequired,
  dashboardEditItem: React.PropTypes.func.isRequired,
  dashboard: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
