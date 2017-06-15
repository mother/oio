import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import convertColor from '../../utils/convertColor'
import Text from '../Text'
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
      const primaryColorRGB = convertColor(primaryColor)

      const tabs = content.map((tab) => {
         const tabStyle = {
            color: primaryColor
         }

         const activeStyle = {
            borderBottom: `4px solid
            rgba(${primaryColorRGB.r},
            ${primaryColorRGB.g},
            ${primaryColorRGB.b}, 0.7)`
         }

         return (
            <NavLink
               exact={tab.exact}
               to={tab.link}
               key={tab.name}
               style={tabStyle}
               isActive={tab.isActive}
               activeClassName={style.active}
               activeStyle={activeStyle}>
               {tab.name}
            </NavLink>
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
