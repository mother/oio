import React from 'react'
import classNames from 'classnames'
import styles from './styles.less'

// TODO: This component will have more functionality
export default class Titlebar extends React.Component {
   static propTypes = {
      className: React.PropTypes.string,
      size: React.PropTypes.string,
      title: React.PropTypes.string
   }

   render() {
      const titlebarClass = this.props.size ? styles[this.props.size] : styles.medium

      return (
         <div className={classNames(titlebarClass, this.props.className)}>
            <div className={styles.title}>{this.props.title}</div>
         </div>
      )
   }
}
