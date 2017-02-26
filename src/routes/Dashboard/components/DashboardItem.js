import React from 'react'

class DashboardItem extends React.Component {
  constructor (props) {
    super(props)

    this.itemOnEdit = this.itemOnEdit.bind(this)
  }

  itemOnEdit () {
    this.props.itemOnEdit(this.props.index)
  }

  render () {
    let itemJSX
    if (this.props.selected) {
      itemJSX = <p><b><u>{this.props.label}</u></b></p>
    } else {
      itemJSX = <p>{this.props.label}</p>
    }
    return (
      <h4
        onClick={this.itemOnEdit}
        style={{ cursor: 'pointer' }}>
        {itemJSX}
      </h4>
    )
  }

}

DashboardItem.propTypes = {
  itemOnEdit: React.PropTypes.func.isRequired,
  index: React.PropTypes.number.isRequired,
  selected: React.PropTypes.bool.isRequired,
  label: React.PropTypes.string.isRequired
}

export default DashboardItem
