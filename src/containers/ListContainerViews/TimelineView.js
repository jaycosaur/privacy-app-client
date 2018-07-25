import React from 'react'
import { Divider } from 'antd';

export default (props) => {
  return (
    <div style={{padding: "0 32px"}}>
        {
            props.itemRender&&props.itemRender.map((i, j)=>(
                [
                    <Divider>{props.grouping[j]}</Divider>,
                    i
                ]
            ))
        }
    </div>
  )
}
