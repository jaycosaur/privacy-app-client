import React from 'react'
import SecurityIcon from '@material-ui/icons/Security'

export default () => {
  return (
    <div style={{position: "fixed", bottom: 0, right: 0, zIndex: 1000, margin: 16, padding: 8, background: "green", borderRadius: 100}}>
      <SecurityIcon style={{fontSize: 32, color: "white"}} />
    </div>
  )
}
