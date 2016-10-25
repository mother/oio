import React from 'react'
import classNames from 'classnames'
import styles from './styles.less'

// TODO: This component will have more functionality
export default class Titlebar extends React.Component {
   static propTypes = {
      children: React.PropTypes.node,
      className: React.PropTypes.string,
      flush: React.PropTypes.bool,
      size: React.PropTypes.string,
      title: React.PropTypes.string,
      titleClassName: React.PropTypes.string
   }

   static defaultProps = {
      size: 'medium'
   }

   render() {
      const titlebarStyles = [this.props.className]
      //const titlebarClass = this.props.size ? styles[this.props.size] : styles.medium
      titlebarStyles.push(styles[this.props.size])

      if (this.props.flush) {
         titlebarStyles.push(styles['flush'])
      }

      return (
         <div className={classNames(titlebarStyles)}>
            <div className={classNames(styles.title, this.props.titleClassName)}>
               {this.props.title}
            </div>
            {this.props.children}
         </div>
      )
   }
}
