import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classNames from 'classnames'
import { getWindowSize, getAttributeForCurrentSize } from '../../utils/size'
import styles from './styles.less'

export default class GridCell extends Component {
   static propTypes = {
      children: PropTypes.node,
      className: PropTypes.string,
      colspan: PropTypes.string
   }

   static contextTypes = {
      GridCellStyle: PropTypes.object
   }

   constructor(props) {
      super(props)

      this.state = {
         size: getWindowSize(),
         width: '0',
         gutter: '0'
      }
   }

   componentDidMount() {
      window.addEventListener('resize', this.windowResizeListener, false)
   }

   componentWillUnmount() {
      window.removeEventListener('resize', this.windowResizeListener)
   }

   windowSizeUpdated = () => {
      const windowSize = getWindowSize()
      this.setState({ size: windowSize })
   }

   render() {
      let colspanMultiplier = 1
      const classes = classNames(styles.gridCell, this.props.className)

      if (this.context.GridCellStyle) {
         this.state.width = `${this.context.GridCellStyle.width}px`
         this.state.gutter = `${this.context.GridCellStyle.gutter}`
      }

      if (this.props.colspan) {
         colspanMultiplier = getAttributeForCurrentSize(this.state.size, this.props.colspan)
      }

      const gutter = parseFloat(this.state.gutter)
      const width = parseFloat(this.state.width) * colspanMultiplier

      const cellStyle = {
         width: `${width}px`,
         paddingLeft: `${gutter}px`,
         marginBottom: `${gutter}px`
      }

      return (
         <div className={classes} style={cellStyle} >
            <div className={styles.gridCellInner}>
               {this.props.children}
            </div>
         </div>
      )
   }
}
