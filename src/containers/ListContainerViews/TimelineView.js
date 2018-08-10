import React from 'react'
import { Divider } from 'antd';

export default (props) => {
    console.log(props.itemRender)
    const data = {}
    props.itemRender.forEach((val, index)=>{
        data[props.grouping[index]]=data[props.grouping[index]]?[...data[props.grouping[index]],val]:[val]
    })

    console.log(data)

    return (
        <div style={{padding: "0 32px"}}>
            {
                data&&Object.keys(data).map((key)=>(
                    [
                        <Divider>{key}</Divider>,
                        ...data[key]
                    ]
                ))
            }
        </div>
    )
}
