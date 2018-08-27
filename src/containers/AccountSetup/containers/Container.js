import React from 'react'
import Card from '@material-ui/core/Card';

const WindowContainer = (props) => {
    return (
                <Card elevation={24}>
                    {props.children}
                </Card>
    )
}
export default WindowContainer

