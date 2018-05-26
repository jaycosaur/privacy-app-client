import React from 'react'
import CardWrapper from './../components/CardWrapper'
import { itemData } from './../sampledata'
import { Tag, Row, Button, Avatar, Icon, Layout, Card } from 'antd'
import { themeColors, primaryThemeShades, highlightThemeShades } from './../theme'
import { Link } from 'react-router-dom'
const { CheckableTag } = Tag

export default () => {
    return (
        <Layout.Content>
            {itemData.slice(0,8).map((item, i) => (
                <CardWrapper hoverable key={i}>
                    {false&&<Avatar shape="square" icon="exclamation-circle" style={{position: "absolute", right:0 ,top: 0, background:"#FAAD14"}}/>}
                    <ListItem item={item} />
                </CardWrapper>)
            )}
        </Layout.Content>
    )
}

const RowWrap = props => (
    <div style={{padding: "8px 0px"}}>
        {props.children}
    </div>
)

class ListItem extends React.Component{
    state = {
        isExpanded: false
    }
    toggleExpand = () => {
        console.log(this.props.item)
        this.setState(state => {
            return {
                isExpanded: !state.isExpanded
            }
        })
    }
    render(){
        const {item} = this.props
        return(
            <div>
                <RowWrap>
                    <a onClick={this.toggleExpand}><h2 style={{color: primaryThemeShades[3], fontWeight: 400}}><Icon type={this.state.isExpanded?"down":"right"} /> {item.title}</h2></a>
                    <Row>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <small><Link to="/item"><strong>View Item</strong></Link> | <strong>Last Updated:</strong> 4 minutes ago | <strong>Posted Date:</strong> {item.date}</small>
                            <span>
                                <a target="_blank" href={item.explanatoryMemorandum}><Button size="small" type="dashed"><Icon type="file" />Explanatory Memorandum</Button></a>
                                <a target="_blank" href={item.billLink} style={{marginLeft: 16}}><Button size="small" type="dashed"><Icon type="link" />Bill</Button></a>
                            </span>
                        </div>
                    </Row>
                </RowWrap>
                {this.state.isExpanded&&<RowWrap>
                    <p>{item.summary}</p>
                </RowWrap>}
                <RowWrap>
                    {
                        [["Chamber", item.chamber],["Status",item.status],["Portfolio", item.portfolio]].map((item, i) => (
                            <Tag color={themeColors[3]} key={i}>{`${item[0]}: ${item[1]}`}</Tag>
                        ))
                    } 
                </RowWrap>
            </div>
        )
    }
}