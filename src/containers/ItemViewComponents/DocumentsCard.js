import CardContainer from './CardContainer'

import React from 'react'

export default () => {
  return (
    <div>
      
    </div>
  )
}

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