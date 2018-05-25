import React from 'react'
import { Card } from 'antd'

export default (props) => (
    <Card hoverable={props.hoverable} style={{marginBottom: 16, ...props.style}} bodyStyle={props.bodyStyle}>
      {props.children}
    </Card>
    )
