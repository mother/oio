import React, { Component } from 'react'

import classNames from 'classnames'

import styles from './styles.less'
import formStyles from '../styles.less'

export default class DateInput extends Component {
   static propTypes = {
      // className: React.PropTypes.string,
      // enableTime: React.PropTypes.bool,
      error: React.PropTypes.string,
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      // name: React.PropTypes.string,
      // onBlur: React.PropTypes.func,
      // onChange: React.PropTypes.func,
      // placeholder: React.PropTypes.string,
      touched: React.PropTypes.bool
      // value: React.PropTypes.string
   }

   static defaultProps = {
      value: ''
   }

   static contextTypes = {
      OIOStyles: React.PropTypes.object
   }

   /*
   constructor(props, context) {
      super(props, context)
   }
   */

   componentWillReceiveProps(props) {
   }

   render() {
      return (
         <div className={formStyles.container}>
            {this.props.label && <label htmlFor={this.props.id}>{this.props.label}</label>}
            <div className={styles.container}>
               <input className={classNames([styles.input, styles.year])} placeholder="Year" type="tel" />
               <select className={classNames([styles.select, styles.month])}>
                  <option value="" disabled selected>Month</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">January</option>
                  <option value="7">June</option>
                  <option value="8">July</option>
                  <option value="9">August</option>
                  <option value="10">September</option>
                  <option value="11">October</option>
                  <option value="12">December</option>
               </select>
               <input className={classNames([styles.input, styles.day])} placeholder="D" type="tel" />
               <input className={classNames([styles.input, styles.time])} placeholder="Time" type="tel" />
            </div>
            {this.props.touched && this.props.error &&
               <div className={formStyles.error}>
                  {this.props.error}
               </div>
            }
         </div>
      )
   }
}
