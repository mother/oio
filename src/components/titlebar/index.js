import React from 'react'
import styles from './index.less'

// This component will have more functionality
export default class UITitlebar extends React.Component {
   static propTypes = {
      size: React.PropTypes.string,
      title: React.PropTypes.string
   }

   render() {
      const titlebarClass = this.props.size ? styles[this.props.size] : styles.medium

      return (
         <div className={titlebarClass}>
            <div className={styles.title}>{this.props.title}</div>
         </div>
      )
   }
}
