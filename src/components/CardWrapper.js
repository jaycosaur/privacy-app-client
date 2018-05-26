import React from 'react'
import { Card } from 'antd'

export default (props) => (
    <Card hoverable={props.hoverable} style={{marginBottom: 8, ...props.style}} bodyStyle={props.bodyStyle}>
      {props.children}
    </Card>
    )
