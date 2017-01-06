import React, { Component } from 'react'
import { IndexLink, Link } from 'react-router'
import { Text } from '../Text'

import style from './style.less'

export default class NavTabs extends Component {
   static propTypes = {
      content: React.PropTypes.array
   }

   static defaultProps = {
      content: []
   }

   static contextTypes = {
      OIOStyles: React.PropTypes.object
   }

   render() {
      const content = this.props.content
      const primaryColor = this.context.OIOStyles.primaryColor
      const tabs = content.map((tab) => {
         const TabElement = tab.indexLink ? IndexLink : Link
         const tabStyle = {
            color: primaryColor
         }

         const activeStyle = {
            borderBottom: `2px solid ${primaryColor}`
         }

         return (
            <TabElement
               to={tab.link}
               key={tab.name}
               style={tabStyle}
               activeClassName={style.active}
               activeStyle={activeStyle}>
               {tab.name}
            </TabElement>
         )
      })

      return (
         <div className={style.tabs}>
            <Text size="2" uppercase>
               {tabs}
            </Text>
         </div>
      )
   }
}
