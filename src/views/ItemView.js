import React from 'react'
import { Layout, Menu, Breadcrumb, Button, Row, Col, Card, Avatar, Icon, Input, BackTop, Timeline, Divider, List, Tag } from 'antd';
import ItemList from './../containers/ItemList'
import CardWrapper from './../components/CardWrapper'
import { themeColors, highlightThemeShades, primaryThemeShades } from './../theme'
import { Link } from 'react-router-dom'
import DateChartContainer from './../components/DateChartContainer'
import { ResponsiveWaffle } from '@nivo/waffle'
import { ResponsivePie } from '@nivo/pie'

const WAFFLE_DATA = [
    {
      "id": "startup",
      "label": "Tag-Startup",
      "value": 27.7,
      "color": "#468df3"
    },
    {
      "id": "tax",
      "label": "Tag-Tax",
      "value": 23.3,
      "color": "#ba72ff"
    },
    {
      "id": "innovation",
      "label": "Tag-Innovation",
      "value": 32.1,
      "color": "#a1cfff"
    }
  ]

const PIE_DATA = [
    {
      "id": "Neutral",
      "label": "Neutral",
      "value": 299,
      "color": "hsl(71, 70%, 50%)"
    },
    {
      "id": "Negative",
      "label": "Negative",
      "value": 513,
      "color": "hsl(5, 70%, 50%)"
    },
    {
      "id": "Positive",
      "label": "Positive",
      "value": 129,
      "color": "hsl(115, 70%, 50%)"
    }
  ]

const DATA = {
    title: "Tax Laws Amendment (Tax Incentives for Innovation) Bill 2016",
    type: "Government",
    portfolio: "Treasury",
    originatingHouse: "House of Representatives",
    status: "Act",
    parliamentNo: 44,
    link: "https://www.aph.gov.au/Parliamentary_Business/Bills_Legislation/Bills_Search_Results/Result?bId=r5648",
    permaLink: "http://parlinfo.aph.gov.au/parlInfo/search/display/display.w3p;query=Id%3A%22legislation%2Fbillhome%2Fr5648%22",
    summary: "Amends the: Income Tax Assessment Act 1997, Income Tax Assessment Act 1936 and Taxation Administration Act 1953 to: create an early stage investor regime that provides tax incentives for qualifying investors through a non-refundable tax offset and capital gains tax exemption on innovation related investments; require early stage innovation companies to report on specific innovation related investments; and provide a mechanism for Innovation Australia to provide guidance about whether particular investment activities are ineligible activities; Income Tax Assessment Act 1997 to: provide non-refundable carry-forward tax offsets for limited partners in early stage venture capital limited partnerships (ESVCLP); provide for a capital gains tax exemption for fixed and unit trust beneficiaries of partners in ESVCLPs; and exclude small entities from eligible venture capital investment auditor requirements; Venture Capital Act 2002 to increase the maximum fund size for ESVCLPs to $200 million; Income Tax Assessment Act 1997 and Venture Capital Act 2002 to: remove the requirement that an ESVCLP divest an investment in an entity once the value of the entity’s assets exceeds $250 million; provide that an entity can invest in another entity and remain an eligible venture capital investment; and enable foreign venture capital funds of funds to hold more than 30 per cent of the committee capital of an ESVCLP and extend their access to capital gains tax and other income tax concessions in relation to eligible venture capital investments; and Income Tax Assessment Act 1936 and Taxation Administration Act 1953 to enable a managed investment trust to disregard its investment in, and through, an ESVCLP or venture capital limited partnership when determining if it is a trading trust.",
    notes: ["An electronic version of this Act is available on the Federal Register of Legislation (www.legislation.gov.au)"],
    progress: [
        {
            type: "House of Representatives",
            items: [
                {
                    title: "Introduced and read a first time",
                    date: "16 Mar 2016"
                },
                {
                    title: "Second reading moved",
                    date: "16 Mar 2016"
                },
                {
                    title: "Lapsed at prorogation",
                    date: "15 Apr 2016"
                },
                {
                    title: "Restored to Notice Paper"	,
                    date: "02 May 2016"
                },
                {
                    title: "Second reading debate: Bill resumed at point of interruption",
                    date: "02 May 2016"
                },
                {
                    title: "Second reading agreed to",
                    date: "02 May 2016"
                },
                {
                    title: "Third reading agreed to",
                    date: "02 May 2016"
                },
            ]
        }
        ,
        {
            type: "Senate",
            items: [
                {
                    title: "Introduced and read a first time",
                    date: "03 May 2016"
                },
                {
                    title: "Second reading moved",
                    date: "03 May 2016"
                },
                {
                    title: "Second reading debate",
                    date: "03 May 2016"
                },
                {
                    title: "Second reading debate"	,
                    date: "04 May 2016"
                },
                {
                    title: "Second reading agreed to",
                    date: "04 May 2016"
                },
                {
                    title: "Committee of the Whole debate",
                    date: "04 May 2016"
                },
                {
                    title: "Third reading agreed to",
                    date: "04 May 2016"
                },
            ]
        },
        {
            type: "",
            items: [
                {
                    title: "Finally passed both Houses",
                    date: "04 May 2016"
                },
                {
                    title: "Assent - Act no: 54, Year: 2016",
                    date: "05 May 2016"
                }
            ]
        }
    ],
    documents: {
        textOfBill: [
            {
                title: "First Reading",
                sources: [
                    {
                        type: "word",
                        link: ""
                    },
                    {
                        type: "pdf",
                        link: ""
                    },
                    {
                        type: "html",
                        link: ""
                    },
                ]
            },
            {
                title: "As passed by both Houses",
                sources: [
                    {
                        type: "word",
                        link: ""
                    },
                    {
                        type: "pdf",
                        link: ""
                    },
                    {
                        type: "html",
                        link: ""
                    },
                ]
            },
        ],
        explanatoryMemoranda: [{
            title: "Exaplanatory Memorandum",
            sources: [
                {
                    type: "word",
                    link: ""
                },
                {
                    type: "pdf",
                    link: ""
                },
                {
                    type: "html",
                    link: ""
                },
            ]
        }],
        transcriptOfSpeeches: [
            {
                title: "All second reading speeches",
                link: ""
            },
            {
                title: "Minister's second reading speeches",
                link: ""
            },
        ],
        proposedAmendments: [{
            title: "Australian Greens [sheet 7916]",
            by: "MCKIM, Sen Nick",
            byLink: "https://www.aph.gov.au/Senators_and_Members/Parliamentarian?MPID=JKM",
            where: "Senate",
            sources: [
                {
                    type: "word",
                    link: ""
                },
                {
                    type: "pdf",
                    link: ""
                },
                {
                    type: "html",
                    link: ""
                },
            ]
        }],
        billsDigest: [
            {
                title: "Bills Digest",
                sources: [
                    {
                        type: "word",
                        link: ""
                    },
                    {
                        type: "pdf",
                        link: ""
                    },
                    {
                        type: "html",
                        link: ""
                    },
                ]
            },
        ]
    },
    impacts: [
        {
            change: "Bill is amended",
            impact: "Minor Compliance Cost & Reporting Implications for Venture Capital Firms and Advisors",
            chance: "100% chance of occuring"
        },
        {
            change: "Bill is amended",
            impact: "Tax Offsets of 3.5% or 38.5% are available for costs incurred on eligible activities",
            chance: "100% chance of occuring"
        }
    ]
}



class ItemView extends React.Component {
    state = {
        collapsed: false,
      };
      toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      }
    render() {
        const fileType = (type) => {
            switch(type){
                case 'word':
                    return <Icon type="file-word" />
                case 'pdf':
                    return <Icon type="file-pdf" />
                default:
                    return <Icon type="file" />
            }
        }
        const fileItem = (item) => (
            <List.Item>
                <List.Item.Meta
                    title={<small>{item.title}</small>}
                    />
                {item.sources.map(i => (
                    <a>{fileType(i.type)}</a>
                ))}
            </List.Item>
        )
        
        return (
            <div>
            <Layout.Header style={{background: primaryThemeShades[3], boxShadow: "0 5px 5px -5px #333", zIndex: 100, position: "fixed", left: 0, top: 64, width: "100%"}}>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <div>
                        <Button ghost style={{marginRight: 16}} onClick={this.toggle}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            /> {this.state.collapsed ? 'Show' : 'Hide'} Changelog
                        </Button>
                        <Link to="/home"><Button ghost style={{marginRight: 16}}><strong><Icon type="rollback" /> Go Back</strong></Button></Link>
                        <Button ghost ><strong><Icon type="eye-o" /> Watching</strong></Button>
                    </div>
                    <Button ghost icon="setting" shape="circle" style={{float: "right"}}/>
                </div>  
            </Layout.Header>
            <Layout style={{zIndex: 0, padding: "0 0px", marginTop: 64, background: "white"}}>
                    <Layout.Sider
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                        collapsedWidth={0}
                        width={300}
                        style={{background: primaryThemeShades[3], boxShadow: "5px 0 5px -5px #333"}}
                        >
                        <div style={{height: "100vh", padding: 16, paddingTop: 4}}>
                            <Divider><h5 style={{color: "white"}}>Change Log</h5></Divider>
                            <div style={{height: "90vh", overflow: "scroll"}}>
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
                        </div>
                    </Layout.Sider>
                    <Layout style={{minheight: "100vh", padding: 16,height: "100vh", overflow: "scroll", background: "white"}}> 
                        <div>
                            <Row style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <Col span={4}>
                                    <Card 
                                    bordered={false}
                                    style={{height: 140, width: 140, background: "rgba(0,0,0,0.5)" }} 
                                    cover={<img alt="example" src="http://www.whistlingwhiletheywork.edu.au/wp-content/uploads/2017/09/australia-logo.jpg" />}/>
                                </Col>
                                <Col span={20}>
                                    <h1 style={{fontWeight: 800, fontSize: "2.4em", margin: 0, color: primaryThemeShades[3]}}>{DATA.title}</h1>
                                    <div>
                                            <Tag><strong>Type:</strong> {DATA.type}</Tag>
                                            <Tag><strong>Portfolio:</strong> {DATA.portfolio}</Tag>
                                            <Tag><strong>Status:</strong> {DATA.status}</Tag>
                                            <Tag><strong>Origin:</strong> {DATA.originatingHouse}</Tag>
                                        </div>
                                </Col>
                            </Row>
                            <Row gutter={8} style={{paddingTop: 16}}>
                                <Col span={16}>
                                    <Card style={{boxShadow: "inset 0 -25px 50px -35px rgba(0, 0, 0, 1)"}} bodyStyle={{height: 500, overflow: "scroll", padding: 0}}>
                                        <Card bordered={false}>
                                            <Card.Meta
                                                title="Short Summary"
                                                description="Amends the: Income Tax Assessment Act 1997, Income Tax Assessment Act 1936 and Taxation Administration Act 1953 to create an early stage investor regime that provides tax incentives for qualifying investors through a non-refundable tax offset and capital gains tax exemption on innovation related investments."
                                            />
                                            <Divider>Analysis & Compliance</Divider>
                                            <ul style={{lineHeight: "1.5em", textAlign: "justify"}}>
                                                <li>Aims to better improve investor interest in start-ups with underdeveloped and emerging products lacking the lack of pre-established support that traditionally attracts VC funding.</li>
                                                <li>Implicit in the definition of innovation is the requirement that the company is developing a new or significantly improved type of innovation such as a product, process, service, marketing or organisational method.</li>
                                                <li>A qualifying ESIC must have the potential to successfully scale its business. As the company increases its share of the market or enters into new markets, the company needs to have operating leverage, where existing revenues can be multiplied through incurring a reduced or minimal increase in operating costs.</li>
                                                <li>Must be an incorporated entity and must have incurred eligible R&D expenditure or notional deductions of at least $20,000</li>
                                            </ul>
                                        </Card>
                                        <Card bordered={false} style={{marginTop: 8, textAlign: "justify"}} bodyStyle={{}}>
                                            <Card.Meta
                                                title="Full Summary"
                                                description={DATA.summary}
                                            />
                                        </Card>
                                    </Card>
                                </Col>
                                <Col span={8}> 
                                    <Card bodyStyle={{paddingTop: 8,height: 500, overflow: "scroll"}}>
                                        <Divider>Documents & Transcripts</Divider>
                                        <Divider orientation="left"><strong><small>Text of bill</small></strong></Divider>
                                        {DATA.documents.textOfBill.map(item => fileItem(item))}
                                        <Divider orientation="left"><strong><small>Explanatory memoranda</small></strong></Divider>
                                        {DATA.documents.explanatoryMemoranda.map(item => fileItem(item))}
                                        <Divider orientation="left"><strong><small>Transcript of speeches</small></strong></Divider>
                                        {DATA.documents.transcriptOfSpeeches.map(item => <div><small><a>{item.title}</a></small></div>)}
                                        <Divider orientation="left"><strong><small>Proposed amendments</small></strong></Divider>
                                        {DATA.documents.proposedAmendments.map(item => fileItem(item))}
                                        <Divider orientation="left"><strong><small>Bills digest</small></strong></Divider>
                                        {DATA.documents.billsDigest.map(item => fileItem(item))}
                                        <Divider orientation="left"><strong><small>Notes</small></strong></Divider>
                                        <small>{DATA.notes}</small>
                                    </Card>
                                </Col>
                            </Row>
                            <Card style={{marginTop: 8}}>
                                <Row gutter={32}>
                                    <Col span={14}>
                                        <Divider><h3>Amendment Impacts</h3></Divider>
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={DATA.impacts}
                                            renderItem={(item, i) => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    avatar={<Avatar>{i+1}</Avatar>}
                                                    title={item.change}
                                                    description={item.chance}
                                                    />
                                                {item.impact}
                                            </List.Item>
                                            )}
                                        />
                                        <Divider><h3>Bill Events</h3></Divider>
                                        <div style={{height: 600, overflow: "scroll", paddingBottom: 16}}>
                                            {DATA.progress.map(item => {
                                                return (
                                                    <React.Fragment>
                                                        <Divider>{item.type}</Divider>
                                                        {item.items.map((dateItem)=> <Card style={{marginBottom: 8}}>
                                                            <Card.Meta
                                                                title={<small>{dateItem.title}</small>}
                                                                description={<small>{dateItem.date}</small>}
                                                                /></Card>)}
                                                    </React.Fragment>
                                                )
                                            })}
                                        </div>
                                    </Col>
                                    <Col span={10} >
                                        <Divider><h3>Relevance</h3></Divider>
                                        <div style={{height: 400}}>
                                            <ResponsiveWaffle
                                                data={WAFFLE_DATA}
                                                total={100}
                                                rows={10}
                                                columns={10}
                                                fillDirection="top"
                                                padding={2}
                                                margin={{
                                                    "top": 10,
                                                    "right": 10,
                                                    "bottom": 10,
                                                    "left": 10
                                                }}
                                                theme={{
                                                    "tooltip": {
                                                        "container": {
                                                            "fontSize": "13px"
                                                        }
                                                    },
                                                    "labels": {
                                                        "textColor": "#555"
                                                    }
                                                }}
                                                colorBy="id"
                                                borderColor="inherit:darker(0.3)"
                                                animate={true}
                                                motionStiffness={90}
                                                motionDamping={11}
                                            />
                                        </div>
                                        <Divider><h3>Bill's Public Response (<a>source</a>)</h3></Divider>
                                        <div style={{height: 400}}>
                                            <ResponsivePie
                                                data={PIE_DATA}
                                                margin={{
                                                    "top": 40,
                                                    "right": 0,
                                                    "bottom": 80,
                                                    "left": 0
                                                }}
                                                innerRadius={0.5}
                                                padAngle={1}
                                                cornerRadius={13}
                                                colors="nivo"
                                                colorBy="id"
                                                borderWidth={2}
                                                borderColor="inherit:darker(0.2)"
                                                enableRadialLabels={false}
                                                radialLabelsSkipAngle={5}
                                                radialLabelsTextXOffset={6}
                                                radialLabelsTextColor="#333333"
                                                radialLabelsLinkOffset={0}
                                                radialLabelsLinkDiagonalLength={16}
                                                radialLabelsLinkHorizontalLength={24}
                                                radialLabelsLinkStrokeWidth={1}
                                                radialLabelsLinkColor="inherit"
                                                enableSlicesLabels={false}
                                                slicesLabelsSkipAngle={10}
                                                slicesLabelsTextColor="#333333"
                                                animate={true}
                                                motionStiffness={90}
                                                motionDamping={15}
                                                theme={{
                                                    "tooltip": {
                                                        "container": {
                                                            "fontSize": "13px"
                                                        }
                                                    },
                                                    "labels": {
                                                        "textColor": "#555"
                                                    }
                                                }}
                                                legends={[
                                                    {
                                                        "anchor": "bottom",
                                                        "direction": "row",
                                                        "translateY": 56,
                                                        "itemWidth": 100,
                                                        "itemHeight": 18,
                                                        "symbolSize": 18,
                                                        "symbolShape": "circle"
                                                    }
                                                ]}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                    </Layout>
            </Layout>
        </div>
        )
  }
}

export default ItemView

const Message = () => (
    <CardWrapper hoverable style={{borderRadius: 0}}>
        <Card.Meta
            title={<small>Second reading transcript has been uploaded.</small>}
            description={<div><small>12:34:12 13 March 2018 | <a>VIEW</a></small></div>}
        />
    </CardWrapper>)

/*<Col span={6} style={{height: "100vh", overflow: "scroll", paddingTop: 16, paddingBottom: 16}}>
                    <div>
                        
                    </div>
                </Col>  */