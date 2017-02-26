import React from 'react'
import DashboardItem from '../components/DashboardItem'

export const Dashboard = (props) => {
  const listJSX = props.dashboard.dashboardItems.map((item, i) => {
    let selected = false
    if (props.editedItemIndex === i) {
      selected = true
    } else {
      selected = false
    }
    return <DashboardItem
      key={i}
      index={i}
      itemOnEdit={props.itemOnEdit}
      label={item.label}
      selected={selected} />
  })

  return (
    <div style={{ margin: '0 auto' }} >
      <h2>Dashboard vists: {props.dashboard.visitsCount}</h2>
      <form onSubmit={props.onSubmit}>
        <input
          value={props.inputValue}
          type='input'
          placeholder='type a value here'
          style={{ width: 300 }}
          onChange={props.inputOnChange} />
        <input
          type='submit'
          value={props.editedItemIndex === null ? 'Add New Item To List' : 'Edit Item'} />
      </form>
      {listJSX}
    </div>
  )
}

Dashboard.propTypes = {
  dashboard: React.PropTypes.object.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  inputOnChange: React.PropTypes.func.isRequired,
  itemOnEdit: React.PropTypes.func.isRequired,
  inputValue: React.PropTypes.string.isRequired,
  editedItemIndex: React.PropTypes.number,
  onChange: React.PropTypes.func
}

export default Dashboard
