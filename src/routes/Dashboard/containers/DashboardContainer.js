import React from 'react'
import { connect } from 'react-redux'
import {
  dashboardVisitsIncrement,
  dashboardAddItem,
  dashboardEditItem,
  dashboardReorderItems
} from '../modules/dashboard'
import Dashboard from '../components/Dashboard'

const mapDispatchToProps = {
  dashboardVisitsIncrement: () => dashboardVisitsIncrement(1),
  dashboardAddItem: (value) => dashboardAddItem(value),
  dashboardEditItem: (value) => dashboardEditItem(value),
  dashboardReorderItems: (value) => dashboardReorderItems(value)
}

const mapStateToProps = (state) => ({
  dashboard : state.dashboard,
  session: state.session
})

class DashboardContainer extends React.Component {
  static propTypes = {
    dashboardVisitsIncrement: React.PropTypes.func.isRequired,
    dashboardAddItem: React.PropTypes.func.isRequired,
    dashboardEditItem: React.PropTypes.func.isRequired,
    dashboard: React.PropTypes.object.isRequired,
    dashboardReorderItems: React.PropTypes.func.isRequired,
    session: React.PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.inputOnChange = this.inputOnChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.itemOnEdit = this.itemOnEdit.bind(this)
    this.handleOnDragStart = this.handleOnDragStart.bind(this)
    this.handleOnDrop = this.handleOnDrop.bind(this)
    this.handleOnDragOver = this.handleOnDragOver.bind(this)

    this.state = {
      inputValue: '',
      editedItemIndex: null,
      draggedItemIndex: null
    }
  }

  componentDidMount () {
    this.props.dashboardVisitsIncrement()
  }

  handleOnDragStart (e) {
    const id = e.target.id
    this.setState({ draggedItemIndex: id })
  }

  handleOnDragOver (e) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  handleOnDrop (e) {
    const droppedItemId = e.currentTarget.id
    let reorderVal = {
      start: parseInt(this.state.draggedItemIndex),
      end: parseInt(droppedItemId)
    }

    // the div ids have to be numbers to reorder correctly
    // and the start and end value has to be different (otherwise reorder is not required)
    const reorderIsCorrect = !isNaN(reorderVal.start) && !isNaN(reorderVal.end) && reorderVal.start !== reorderVal.end

    if (reorderIsCorrect) {
      this.props.dashboardReorderItems(reorderVal)
    }

    this.setState({ draggedItemIndex: null })
  }

  inputOnChange (e) {
    this.setState({ inputValue: e.target.value })
  }

  itemOnEdit (e) {
    const editedItemIndex = parseInt(e.currentTarget.id)
    const editedItem = this.props.dashboard.dashboardItems[editedItemIndex]
    this.setState({ inputValue: editedItem.label, editedItemIndex: editedItemIndex })
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
    if (this.props.session.isNotLoggedIn) {
      return <h4>Please login in order to access your dashboard</h4>
    }

    return (
      <Dashboard {...this.props}
        handleOnDragOver={this.handleOnDragOver}
        handleOnDrop={this.handleOnDrop}
        handleOnDragStart={this.handleOnDragStart}
        editedItemIndex={this.state.editedItemIndex}
        itemOnEdit={this.itemOnEdit}
        inputValue={this.state.inputValue}
        inputOnChange={this.inputOnChange}
        onSubmit={this.onSubmit} />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
