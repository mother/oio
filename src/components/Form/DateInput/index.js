import React, { Component } from 'react'

import classNames from 'classnames'

import styles from './styles.less'
import formStyles from '../styles.less'

const currentDateZeroed = new Date()
currentDateZeroed.setHours(0, 0, 0, 0)

export default class DateInput extends Component {
   static propTypes = {
      defaultValue: React.PropTypes.object,
      enableTime: React.PropTypes.bool,
      error: React.PropTypes.string,
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      name: React.PropTypes.string,
      onChange: React.PropTypes.func,
      rules: React.PropTypes.array,
      touched: React.PropTypes.bool,
      value: React.PropTypes.object
   }

   static defaultProps = {
      defaultValue: currentDateZeroed
   }

   static contextTypes = {
      OIOForm: React.PropTypes.object,
      OIOStyles: React.PropTypes.object
   }

   constructor(props) {
      super(props)

      this.handleDayBlur = this.handleDayBlur.bind(this)
      this.handleDayChange = this.handleDayChange.bind(this)
      this.handleHourBlur = this.handleHourBlur.bind(this)
      this.handleHourChange = this.handleHourChange.bind(this)
      this.handleMeridiemChange = this.handleMeridiemChange.bind(this)
      this.handleMinuteBlur = this.handleMinuteBlur.bind(this)
      this.handleMinuteChange = this.handleMinuteChange.bind(this)
      this.handleMonthChange = this.handleMonthChange.bind(this)
      this.handleYearBlur = this.handleYearBlur.bind(this)
      this.handleYearChange = this.handleYearChange.bind(this)

      this.state = {
         error: props.error,
         value: this.prepareState(props.value || props.defaultValue)
      }
   }

   componentDidMount() {
      if (this.context.OIOForm && this.props.name) {
         this.context.OIOForm.setDefaultValue(this.props.name, this.valueToDate(this.state.value))
         this.context.OIOForm.setRules(this.props.name, this.props.rules)
      }
   }

   componentWillReceiveProps(nextProps) {
      // TODO: If name changes, need to remove form value corresponding to old name

      const stateIsUntouched = (
         !this.state.value ||
         this.datesAreEqual(this.state.value, this.prepareState(this.props.defaultValue))
      )

      if (nextProps.value && stateIsUntouched) {
         this.setState({ value: this.prepareState(nextProps.value) })

         if (this.context.OIOForm) {
            this.context.OIOForm.setValue(this.props.name, this.valueToDate(nextProps.value))
         }
      }

      if (this.context.OIOForm) {
         this.setState({
            error: this.context.OIOForm.getErrors().errors[this.props.name]
         })
      }
   }

   datesAreEqual(dateOne, dateTwo) {
      return (
         dateOne.day === dateTwo.day &&
         dateOne.hour === dateTwo.hour &&
         dateOne.meridiem === dateTwo.meridiem &&
         dateOne.minute === dateTwo.minute &&
         dateOne.month === dateTwo.month &&
         dateOne.year === dateTwo.year
      )
   }

   prepareState(value) {
      let meridiem = 'a'
      let hour = (value.getHours() || 0).toString()
      if (Number(hour) > 12) {
         meridiem = 'p'
         hour = (Number(hour) - 12).toString()
      } else if (Number(hour) === 0) {
         hour = '12'
      }

      let minute = (value.getMinutes() || 0).toString()
      if (minute.length === 1) minute = `0${minute}`

      return {
         day: value.getDate().toString(),
         hour,
         meridiem,
         minute,
         month: value.getMonth().toString(),
         year: value.getFullYear().toString()
      }
   }

   handleChange() {
      // Ensure day is correct given the entered year/month
      const daysInMonth = new Date(
         this.state.value.year,
         Number(this.state.value.month) + 1,
         0
      ).getDate()

      if (Number(this.state.value.day) > daysInMonth) {
         this.setState({
            value: {
               ...this.state.value,
               day: daysInMonth
            }
         }, () => this.handleChange())
      }

      const date = this.valueToDate(this.state.value)

      if (this.context.OIOForm) {
         this.context.OIOForm.setValue(this.props.name, date)
      }

      if (this.props.onChange) {
         this.props.onChange(date)
      }
   }

   handleDayBlur(event) {
      let value = event.target.value
      if (!value.length) value = currentDateZeroed.getDate().toString()
      this.setState({
         value: {
            ...this.state.value,
            day: value
         }
      }, () => this.handleChange())
   }

   handleDayChange(event) {
      let value = event.target.value
      value = this.removeNonNumericCharacters(value)
      value = this.removeLeadingZeroes(value)
      if (value.length <= 2) {
         this.setState({
            value: {
               ...this.state.value,
               day: value
            }
         })
      }
   }

   handleHourBlur(event) {
      let value = event.target.value
      if (Number(value) > 12 || !value.length) value = '12'
      this.setState({
         value: {
            ...this.state.value,
            hour: value
         }
      }, () => this.handleChange())
   }

   handleHourChange(event) {
      let value = event.target.value
      value = this.removeNonNumericCharacters(value)
      value = this.removeLeadingZeroes(value)
      if (value.length <= 2) {
         this.setState({
            value: {
               ...this.state.value,
               hour: value
            }
         })
      }
   }

   handleMeridiemChange(event) {
      const value = event.target.value
      this.setState({
         value: {
            ...this.state.value,
            meridiem: value
         }
      }, () => this.handleChange())
   }

   handleMinuteBlur(event) {
      let value = event.target.value
      if (value.length === 1) value = `0${value}`
      if (Number(value) > 59) value = '59'
      if (!value.length) value = '00'
      this.setState({
         value: {
            ...this.state.value,
            minute: value
         }
      }, () => this.handleChange())
   }

   handleMinuteChange(event) {
      let value = event.target.value
      value = this.removeNonNumericCharacters(value)
      if (value.length <= 2) {
         this.setState({
            value: {
               ...this.state.value,
               minute: value
            }
         })
      }
   }

   handleMonthChange(event) {
      const value = event.target.value
      this.setState({
         value: {
            ...this.state.value,
            month: value
         }
      }, () => this.handleChange())
   }

   handleYearBlur(event) {
      let value = event.target.value
      if (!value.length) value = currentDateZeroed.getFullYear().toString()
      this.setState({
         value: {
            ...this.state.value,
            year: value
         }
      }, () => this.handleChange())
   }

   handleYearChange(event) {
      let value = event.target.value
      value = this.removeNonNumericCharacters(value)
      value = this.removeLeadingZeroes(value)
      if (value.length <= 4) {
         this.setState({
            value: {
               ...this.state.value,
               year: value
            }
         })
      }
   }

   removeLeadingZeroes(str) {
      return str.replace(/^0+/, '')
   }

   removeNonNumericCharacters(str) {
      return str.replace(/[^\d]/g, '')
   }

   valueToDate(value) {
      // Check for and apply proper meridiem/hour
      let hour = value.hour
      if (value.meridiem === 'a' && hour === '12') {
         hour = '0'
      } else if (value.meridiem === 'p' && hour !== '12') {
         hour = (Number(hour) + 12).toString()
      }

      return this.props.enableTime
         ? new Date(value.year, value.month, value.day, hour, value.minute)
         : new Date(value.year, value.month, value.day)
   }

   render() {
      return (
         <div className={formStyles.container}>
            {this.props.label && <label htmlFor={this.props.id}>{this.props.label}</label>}
            <div className={styles.container}>
               <select
                  className={classNames([styles.select, styles.month])}
                  onChange={this.handleMonthChange}
                  value={this.state.value.month}>
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
                  onBlur={this.handleDayBlur}
                  onChange={this.handleDayChange}
                  placeholder="Day"
                  type="tel"
                  value={this.state.value.day}
               />
               <input
                  className={classNames([styles.input, styles.year])}
                  onBlur={this.handleYearBlur}
                  onChange={this.handleYearChange}
                  placeholder="Year"
                  type="tel"
                  value={this.state.value.year}
               />
               {this.props.enableTime &&
                  <span>
                     <input
                        className={classNames([styles.input, styles.hour])}
                        onBlur={this.handleHourBlur}
                        onChange={this.handleHourChange}
                        placeholder="12"
                        type="tel"
                        value={this.state.value.hour}
                     />
                     <span>:</span>
                     <input
                        className={classNames([styles.input, styles.minute])}
                        onBlur={this.handleMinuteBlur}
                        onChange={this.handleMinuteChange}
                        placeholder="00"
                        type="tel"
                        value={this.state.value.minute}
                     />
                     <select
                        className={classNames([styles.select, styles.meridiem])}
                        onChange={this.handleMeridiemChange}
                        value={this.state.value.meridiem}>
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
