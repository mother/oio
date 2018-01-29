import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classNames from 'classnames'
import styles from './styles.less'

// TODO: This component will have more functionality
export default class Titlebar extends Component {
   static propTypes = {
      children: PropTypes.node,
      className: PropTypes.string,
      flush: PropTypes.bool,
      size: PropTypes.string,
      title: PropTypes.string,
      titleClassName: PropTypes.string
   }

   static defaultProps = {
      size: 'medium'
   }

   render() {
      const titlebarStyles = [this.props.className]
      titlebarStyles.push(styles[this.props.size])

      if (this.props.flush) {
         titlebarStyles.push(styles.flush)
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
