import React from 'react'
import { Layout, Menu, Breadcrumb, Button, Row, Col, Card, Avatar, Icon, Input, BackTop, Divider } from 'antd';
import ItemList from './../containers/ItemList'
import CardWrapper from './../components/CardWrapper'
import { themeColors, highlightThemeShades, primaryThemeShades } from './../theme'
import SearchFilter from './../components/SearchFilter'
import SearchTopBar from './../components/SearchTopBar'
import DateChartContainer from './../components/DateChartContainer'
import PolicySiderKeywordSearchInput from './../components/PolicySiderKeywordSearchInput'

const SearchView = (props) => {
  return (
    <Row style={{width: "100%"}}>
        <Col span={6} style={{height: "100vh", background: primaryThemeShades[3], boxShadow: "5px 0 5px -5px #333", zIndex: 50, overflowY: "scroll"}}>
            <div style={{padding: 8}}>
                <Divider style={{marginTop: 0, marginBottom: 8}}><span style={{color: "white"}}><small>Policy and Legisation Tracker</small></span></Divider>
                <PolicySiderKeywordSearchInput />
                <CardWrapper style={{background: themeColors[3], border: "none"}} bodyStyle={{textAlign: "center", padding: 0}}>
                    <Card.Grid style={{width: '25%',textAlign: 'center', fontSize: "1em", background: "white", color: themeColors[0]}}><Icon type="link" /></Card.Grid>
                    <Card.Grid style={{width: '25%',textAlign: 'center', fontSize: "1em", background: "white", color: themeColors[0]}}><Icon type="share-alt" /></Card.Grid>
                    <Card.Grid style={{width: '25%',textAlign: 'center', fontSize: "1em", background: "white", color: themeColors[0]}}><Icon type="tag" /></Card.Grid>
                    <Card.Grid style={{width: '25%',textAlign: 'center', fontSize: "1em", background: "white", color: themeColors[0]}}><Icon type="setting" /></Card.Grid>
                </CardWrapper>
                <Divider><span style={{color: "white"}}><small><Icon type="area-chart" /> Trending Legislation</small></span></Divider>

                <Card bordered={false} body={{background: "rgba(256,256,256,0.1)"}} bodyStyle={{padding: 0, background: "none"}}>
                    <Card 
                        >
                        <Card.Meta
                            title={<small><Icon type="star-o" /> National Redress Scheme for Institutional Child Sexual Abuse (Consequential Amendments) Bill 20186</small>}
                            description="+ 223 views since last week"
                            />
                    </Card>
                    <Card>
                        <Card.Meta
                            title={<small><Icon type="star-o" /> National Redress Scheme for Institutional Child Sexual Abuse (Consequential Amendments) Bill 20186</small>}
                            description="+ 223 views since last week"
                            />
                    </Card>
                    <Card>
                        <Card.Meta
                            title={<small><Icon type="star-o" /> National Redress Scheme for Institutional Child Sexual Abuse (Consequential Amendments) Bill 20186</small>}
                            description="+ 223 views since last week"
                            />
                    </Card>
                    <Card>
                        <Card.Meta
                            title={<small><Icon type="star-o" /> National Redress Scheme for Institutional Child Sexual Abuse (Consequential Amendments) Bill 20186</small>}
                            description="+ 223 views since last week"
                            />
                    </Card>
                    <Card>
                        <Card.Meta
                            title={<small><Icon type="star-o" /> National Redress Scheme for Institutional Child Sexual Abuse (Consequential Amendments) Bill 20186</small>}
                            description="+ 223 views since last week"
                            />
                    </Card>
                </Card>
            </div>
            
        </Col>
        <Col span={18} style={{height: "100vh", overflowY: "scroll", padding: "16px 8px"}}>
            <SearchFilter />
            <SearchTopBar />
            <Card style={{marginBottom: 8, padding: 0}} bodyStyle={{height: 200, width: "100%", display: "flex", justifyContent: "center", alignContent: "center"}}>
                <DateChartContainer />
            </Card>
            <ItemList />
        </Col>
    </Row>
  )
}

export default SearchView