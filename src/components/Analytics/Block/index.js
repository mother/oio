import React, { Component } from 'react'
import Spacer from '../../Spacer'
import Text from '../../Text'
import View from '../../View'
import style from './style.less'

export default class AnalyticsBlock extends Component {
   static propTypes = {
      children: React.PropTypes.node,
      label: React.PropTypes.string,
      tall: React.PropTypes.bool,
      targetValue: React.PropTypes.string,
      value: React.PropTypes.string
   }
   render() {
      // This is temporary
      const aspectRatio = this.props.tall
         ? '1:2'
         : '1:1'

      const targetValue = this.props.targetValue && (
         <div className={style.targetValue}>
            <Text size="2" weight="semibold" uppercase>
               Target Value: {this.props.targetValue}
            </Text>
         </div>
      )

      return (
         <View
            width="100%"
            aspectRatio={aspectRatio}
            padding="30px"
            className={style.block}>
            <Text size="2" weight="bold" className={style.label} uppercase>
               {this.props.label}
            </Text>
            <Spacer size="2" />
            <Text size="9" weight="light" color="white">
               {this.props.value}
            </Text>
            {this.props.children}
            {targetValue}
         </View>
      )
   }
}
