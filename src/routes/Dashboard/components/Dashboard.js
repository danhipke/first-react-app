import React from 'react'

export const Dashboard = (props) => {
  const listJSX = props.dashboard.dashboardItems.map((item, i) => {
    let itemJSX
    if (props.editedItemIndex === i) {
      itemJSX = <p><b><u>{item.label}</u></b></p>
    } else {
      itemJSX = <p>{item.label}</p>
    }
    return <h4
      key={i}
      id={i}
      draggable='true'
      onDragOver={props.handleOnDragOver}
      onDragStart={props.handleOnDragStart}
      onDrop={props.handleOnDrop}
      onClick={props.itemOnEdit}
      style={{ cursor: 'pointer' }}>
      {itemJSX}
    </h4>
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
