import React from 'react'
import { Layout, Menu, Breadcrumb, Button, Row, Col, Card, Avatar, Icon, Input, BackTop } from 'antd';
import ItemList from './../containers/ItemList'
import CardWrapper from './../components/CardWrapper'
import { themeColors, highlightThemeShades, primaryThemeShades } from './../theme'
import SearchFilter from './../components/SearchFilter'
import SearchTopBar from './../components/SearchTopBar'
import DateChartContainer from './../components/DateChartContainer'

export default (props) => {
  return (
    <Row gutter={16} style={{width: "100%"}}>
        <Col span={6} style={{height: "100vh", background: primaryThemeShades[3], boxShadow: "5px 0 5px -5px #333", zIndex: 50}}>
            <div style={{padding: 8}}>
                <Input.Search
                    placeholder="Enter some keywords"
                    onSearch={value => console.log(value)}
                    enterButton
                    size="large"
                    style={{marginBottom: 16, borderRadius: 0}}
                />
                
                
                <CardWrapper style={{background: themeColors[3]}} bodyStyle={{textAlign: "center", padding: 0}}>
                    <Card.Grid style={{width: '25%',textAlign: 'center', fontSize: "1.5em", background: "white", color: themeColors[0]}}><Icon type="link" /></Card.Grid>
                    <Card.Grid style={{width: '25%',textAlign: 'center', fontSize: "1.5em", background: "white", color: themeColors[0]}}><Icon type="share-alt" /></Card.Grid>
                    <Card.Grid style={{width: '25%',textAlign: 'center', fontSize: "1.5em", background: "white", color: themeColors[0]}}><Icon type="tag" /></Card.Grid>
                    <Card.Grid style={{width: '25%',textAlign: 'center', fontSize: "1.5em", background: "white", color: themeColors[0]}}><Icon type="setting" /></Card.Grid>
                </CardWrapper>
                <CardWrapper>
                <Card.Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title="Aboriginal Land Rights Amendment (Local Aboriginal Land Councils) Bill 2016"
                    description="An Act to amend the Aboriginal Land Rights Act 1983 to provide for the making of performance improvement orders by the New South Wales Aboriginal Land Council; and for other purposes."
                />
                </CardWrapper>
                <CardWrapper>
                    <strong>Type:</strong>	Government
                    <br /><br /><strong>Status:</strong>	Assented on Wed 1 Mar 2017 - Act No 1 of 2017 (GG No. 30, 03/03/2017, p. 546)
                    <br /><br /><strong>Origin:</strong>	Legislative Assembly
                    <br /><br /><strong>Member with Carriage:</strong>	Williams, Leslie (Mitchell, Sarah)
                    <br /><br /><strong>Act number:</strong>	1/2017
                </CardWrapper>
            </div>
            
        </Col>
        <Col span={18} style={{height: "100vh", overflowY: "scroll", padding: "16px 8px"}}>
            <SearchFilter />
            <SearchTopBar />
            <Card style={{padding: 0}} bodyStyle={{height: 220, padding: 8, width: "100%"}}>
                <DateChartContainer />
            </Card>
            <ItemList />
        </Col>
    </Row>
  )
}