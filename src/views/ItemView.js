import React from 'react'
import { Layout, Menu, Breadcrumb, Button, Row, Col, Card, Avatar, Icon, Input, BackTop } from 'antd';
import ItemList from './../containers/ItemList'
import CardWrapper from './../components/CardWrapper'
import { themeColors, highlightThemeShades, primaryThemeShades } from './../theme'
import { Link } from 'react-router-dom'
import DateChartContainer from './../components/DateChartContainer'

export default (props) => {
  return (
      <div>
        <Layout.Header style={{background: primaryThemeShades[3], boxShadow: "0 5px 5px -5px #333", zIndex: 100, position: "fixed", left: 0, top: 64, width: "100%"}}>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <div>
                    <Link to="/home"><Button ghost style={{marginRight: 16}}><strong><Icon type="rollback" /> Go Back</strong></Button></Link>
                    <Button ghost ><strong><Icon type="eye-o" /> Watching</strong></Button>
                </div>
                <Button ghost icon="setting" shape="circle" style={{float: "right"}}/>
            </div>  
        </Layout.Header>
        <div style={{zIndex: 0, padding: "0 16px", marginTop: 64}}>
            <Row gutter={16}>
                <Col span={18} style={{minheight: "100vh", paddingBottom: "16px", paddingTop: 16}}> 
                    <div>
                        <Row>
                            <Col span={4}>
                                <div style={{height: 140, width: 140, background: "rgba(0,0,0,0.5)" }} />
                            </Col>
                            <Col span={20}>
                                <h1 style={{fontWeight: 800, fontSize: "2.4em"}}>National Redress Scheme for Institutional Child Sexual Abuse (Consequential Amendments) Bill 20186</h1>
                            </Col>
                        </Row>
                        <p>Introduced with the National Redress Scheme for Institutional Child Sexual Abuse Bill 2018, the bill amends the: Social Security Act 1991 and Veterans’ Entitlements Act 1986 to provide that payments made under the National Redress Scheme for Institutional Child Sexual Abuse are exempt from the income test; Bankruptcy Act 1966 to ensure that payments made under the national redress scheme are quarantined from the divisible property of a bankrupt person; Administrative Decisions (Judicial Review) Act 1997 to exempt decisions made under the national redress scheme from judicial review; Freedom of Information Act 1982 to exempt protected information from disclosure under the Act; Social Security (Administration) Act 1999 to enable the use and disclosure of protected information if it is done for the purposes of the national redress scheme; and Age Discrimination Act 2004 to enable the exclusion of children applying to the national redress scheme if they will not turn 18 during the life of the scheme.</p>
                    </div>
                    <Card style={{padding: 0}} bodyStyle={{height: 160, padding: "0px 24px"}}>
                        <DateChartContainer />
                    </Card>
                    <CardWrapper>
                        <strong>Type:</strong>	Government
                        <br /><br /><strong>Status:</strong>	Assented on Wed 1 Mar 2017 - Act No 1 of 2017 (GG No. 30, 03/03/2017, p. 546)
                        <br /><br /><strong>Origin:</strong>	Legislative Assembly
                        <br /><br /><strong>Member with Carriage:</strong>	Williams, Leslie (Mitchell, Sarah)
                        <br /><br /><strong>Act number:</strong>	1/2017
                    </CardWrapper>
                </Col>
                <Col span={6} style={{height: "100vh", overflow: "scroll", paddingTop: 16, paddingBottom: 16}}>
                    <div>
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                    </div>
                </Col>  
            </Row>
        </div>
    </div>
  )
}

const Message = () => (
    <CardWrapper hoverable style={{borderRadius: 0}}>
        <Card.Meta
            title={<small>Second reading transcript has been uploaded.</small>}
            description={<div><small>12:34:12 13 March 2018 | <a>VIEW</a></small></div>}
        />
    </CardWrapper>)
