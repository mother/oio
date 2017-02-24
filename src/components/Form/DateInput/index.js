import React, { Component } from 'react'

import classNames from 'classnames'

import styles from './styles.less'
import formStyles from '../styles.less'

const currentDateZeroed = new Date()
currentDateZeroed.setHours(0, 0, 0, 0)

export default class DateInput extends Component {
   static propTypes = {
      // className: React.PropTypes.string,
      enableTime: React.PropTypes.bool,
      error: React.PropTypes.string,
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      // name: React.PropTypes.string,
      // onBlur: React.PropTypes.func,
      onChange: React.PropTypes.func,
      // placeholder: React.PropTypes.string,
      touched: React.PropTypes.bool,
      value: React.PropTypes.object
   }

   static defaultProps = {
      value: currentDateZeroed
   }

   static contextTypes = {
      OIOStyles: React.PropTypes.object
   }

   constructor(props, context) {
      super(props, context)

      this.handleDayChange = this.handleDayChange.bind(this)
      this.handleHourBlur = this.handleHourBlur.bind(this)
      this.handleHourChange = this.handleHourChange.bind(this)
      this.handleMeridiemChange = this.handleMeridiemChange.bind(this)
      this.handleMinuteBlur = this.handleMinuteBlur.bind(this)
      this.handleMinuteChange = this.handleMinuteChange.bind(this)
      this.handleMonthChange = this.handleMonthChange.bind(this)
      this.handleYearChange = this.handleYearChange.bind(this)

      const now = new Date()

      let meridiem = 'a'

      let hour = (props.value.getHours() || 0).toString()
      if (Number(hour) > 12) {
         meridiem = 'p'
         hour = (Number(hour) - 12).toString()
      }

      let minute = (props.value.getMinutes() || 0).toString()
      if (minute.length === 1) minute = `0${minute}`

      this.state = {
         day: (props.value.getDate() || now.getDate()).toString(),
         hour,
         meridiem,
         minute,
         month: (props.value.getMonth() || now.getMonth()).toString(),
         year: (props.value.getFullYear() || now.getFullYear()).toString()
      }
   }

   handleChange() {
      let hour = this.state.hour
      if (this.state.meridiem === 'p') hour = (Number(hour) + 12).toString()

      if (this.state.year && this.state.month && this.state.day) {
         const daysInMonth = new Date(this.state.year, Number(this.state.month) + 1, 0).getDate()
         if (Number(this.state.day) > daysInMonth) {
            return this.setState({ day: daysInMonth }, () => this.handleChange())
         }
      }

      const value = this.props.enableTime
         ? new Date(this.state.year, this.state.month, this.state.day, hour, this.state.minute)
         : new Date(this.state.year, this.state.month, this.state.day)

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

   handleHourBlur(event) {
      let value = event.target.value
      if (Number(value) > 12) value = '12'
      this.setState({ hour: value }, () => this.handleChange())
   }

   handleHourChange(event) {
      let value = event.target.value
      value = value.replace(/[^\d]/g, '')
      value = value.replace(/^0+/, '')
      if (value.length <= 2) {
         this.setState({ hour: value }, () => this.handleChange())
      }
   }

   handleMeridiemChange(event) {
      const value = event.target.value
      this.setState({ meridiem: value }, () => this.handleChange())
   }

   handleMinuteBlur(event) {
      let value = event.target.value
      if (value.length === 1) value = `0${value}`
      if (Number(value) > 59) value = '59'
      this.setState({ minute: value }, () => this.handleChange())
   }

   handleMinuteChange(event) {
      let value = event.target.value
      value = value.replace(/[^\d]/g, '')
      if (value.length <= 2) {
         this.setState({ minute: value }, () => this.handleChange())
      }
   }

   handleMonthChange(event) {
      const value = event.target.value
      this.setState({ month: value }, () => this.handleChange())
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
                  onChange={this.handleMonthChange}
                  value={this.state.month}>
                  <option value="0">January</option>
                  <option value="1">February</option>
                  <option value="2">March</option>
                  <option value="3">April</option>
                  <option value="4">May</option>
                  <option value="5">June</option>
                  <option value="6">July</option>
                  <option value="7">August</option>
                  <option value="8">September</option>
                  <option value="9">October</option>
                  <option value="10">November</option>
                  <option value="11">December</option>
               </select>
               <input
                  className={classNames([styles.input, styles.day])}
                  onChange={this.handleDayChange}
                  placeholder="Day"
                  type="tel"
                  value={this.state.day}
               />
               {this.props.enableTime &&
                  <span>
                     <input
                        className={classNames([styles.input, styles.hour])}
                        onBlur={this.handleHourBlur}
                        onChange={this.handleHourChange}
                        placeholder="12"
                        type="tel"
                        value={this.state.hour}
                     />
                     <span>:</span>
                     <input
                        className={classNames([styles.input, styles.minute])}
                        onBlur={this.handleMinuteBlur}
                        onChange={this.handleMinuteChange}
                        placeholder="00"
                        type="tel"
                        value={this.state.minute}
                     />
                     <select
                        className={classNames([styles.select, styles.meridiem])}
                        onChange={this.handleMeridiemChange}
                        value={this.state.meridiem}>
                        <option value="a">am</option>
                        <option value="p">pm</option>
                     </select>
                  </span>
               }
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
