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
      onChange: React.PropTypes.func,
      // placeholder: React.PropTypes.string,
      touched: React.PropTypes.bool
      // value: React.PropTypes.string
   }

   static defaultProps = {
      value: new Date()
   }

   static contextTypes = {
      OIOStyles: React.PropTypes.object
   }

   constructor(props, context) {
      super(props, context)

      this.handleDayChange = this.handleDayChange.bind(this)
      this.handleYearChange = this.handleYearChange.bind(this)

      const now = new Date()
      this.state = {
         day: now.getDate(),
         month: now.getMonth(),
         year: now.getFullYear()
      }
   }

   componentWillReceiveProps(props) {
   }

   handleChange() {
      const value = new Date(this.state.year, this.state.month, this.state.day)
      if (this.props.onChange) {
         this.props.onChange(null, value)
      }
   }

   handleDayChange(event) {
      let value = event.target.value
      value = value.replace(/[^\d]/g, '')
      value = value.replace(/^0+/, '')
      if (value.length <= 2) {
         this.setState({ day: value }, () => this.handleChange())
      }
   }

   handleYearChange(event) {
      let value = event.target.value
      value = value.replace(/[^\d]/g, '')
      value = value.replace(/^0+/, '')
      if (value.length <= 4) {
         this.setState({ year: value }, () => this.handleChange())
      }
   }

   render() {
      return (
         <div className={formStyles.container}>
            {this.props.label && <label htmlFor={this.props.id}>{this.props.label}</label>}
            <div className={styles.container}>
               <input
                  className={classNames([styles.input, styles.year])}
                  onChange={this.handleYearChange}
                  placeholder="Year"
                  type="tel"
                  value={this.state.year}
               />
               <select
                  className={classNames([styles.select, styles.month])}
                  value={this.state.month}>
                  <option value="0">January</option>
                  <option value="1">February</option>
                  <option value="2">March</option>
                  <option value="3">April</option>
                  <option value="4">May</option>
                  <option value="5">January</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">December</option>
               </select>
               <input
                  className={classNames([styles.input, styles.day])}
                  onChange={this.handleDayChange}
                  placeholder="Day"
                  type="tel"
                  value={this.state.day}
               />
               <input className={classNames([styles.input, styles.time])} placeholder="Time" type="tel" />
               <select className={classNames([styles.select, styles.meridiem])}>
                  <option value="am">am</option>
                  <option value="pm">pm</option>
               </select>
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
