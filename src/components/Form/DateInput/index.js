import React, { Component } from 'react'
import classNames from 'classnames'
import moment from 'moment'
import { createOIOFormField } from '..'
import styles from './styles.less'
import formStyles from '../styles.less'

class DateInput extends Component {
   static propTypes = {
      enableTime: React.PropTypes.bool,
      error: React.PropTypes.string,
      id: React.PropTypes.string,
      label: React.PropTypes.string,
      readOnly: React.PropTypes.bool,
      triggerChange: React.PropTypes.func,
      triggerValidation: React.PropTypes.func,
      value: React.PropTypes.oneOfType([
         React.PropTypes.string,
         React.PropTypes.instanceOf(Date)
      ])
   }

   static defaultProps = {
      value: new Date()
   }

   handleChange = (event) => {
      const newDate = this.constructDate()
      this.props.triggerChange(event, newDate, () => {
         this.props.triggerValidation()
      })
   }

   constructDate() {
      const dateComponents = {
         year: this.yearInput.value,
         month: this.monthInput.value,
         day: this.dayInput.value
      }

      if (this.props.enableTime) {
         const meridiem = this.meridiemInput.value
         dateComponents.hour = moment(`${this.hourInput.value}${meridiem}`, 'ha').format('H')
         dateComponents.minute = this.minuteInput.value
      }

      return moment(dateComponents).toDate()
   }

   parseDate(value) {
      const dateObj = moment(value)
      return {
         year: dateObj.format('YYYY'),
         month: Number(dateObj.format('M')) - 1,
         day: dateObj.format('D'),
         hour: dateObj.format('h'),
         minute: dateObj.format('mm'),
         meridiem: dateObj.format('a')
      }
   }

   render() {
      const { year, month, day, hour, minute, meridiem } = this.parseDate(this.props.value)
      const numDaysInMonth = moment(`${year}-${Number(month) + 1}`, 'YYYY-M').daysInMonth()
      const daysInMonth = Array.from(new Array(numDaysInMonth), (x, i) => i + 1)
      const currentYear = (new Date()).getFullYear()
      const years = Array.from(new Array(5), (x, i) => currentYear + i)
      const hours = Array.from(new Array(12), (x, i) => i + 1)
      const minutes = ['00', '15', '30', '45']

      return (
         <div className={formStyles.container}>
            {this.props.label && <label htmlFor={this.props.id}>{this.props.label}</label>}
            <div className={styles.container}>
               <select
                  className={classNames([styles.select, styles.month])}
                  onChange={this.handleChange}
                  readOnly={this.props.readOnly}
                  ref={(input) => { this.monthInput = input }}
                  value={month}>
                  {moment.months().map((m, i) => (
                     <option key={m} value={i}>{m}</option>
                  ))}
               </select>
               <select
                  className={classNames([styles.select, styles.day])}
                  onChange={this.handleChange}
                  readOnly={this.props.readOnly}
                  ref={(input) => { this.dayInput = input }}
                  value={day}>
                  {daysInMonth.map(d => (
                     <option key={d} value={d}>{d}</option>
                  ))}
               </select>
               <select
                  className={classNames([styles.select, styles.year])}
                  onChange={this.handleChange}
                  readOnly={this.props.readOnly}
                  ref={(input) => { this.yearInput = input }}
                  value={year}>
                  {years.map(y => (
                     <option key={y} value={y}>{y}</option>
                  ))}
               </select>

               {this.props.enableTime &&
                  <span>
                     <select
                        className={classNames([styles.select, styles.hour])}
                        onChange={this.handleChange}
                        readOnly={this.props.readOnly}
                        ref={(input) => { this.hourInput = input }}
                        value={hour}>
                        {hours.map(h => (
                           <option key={h} value={h}>{h}</option>
                        ))}
                     </select>
                     <select
                        className={classNames([styles.select, styles.minute])}
                        onChange={this.handleChange}
                        readOnly={this.props.readOnly}
                        ref={(input) => { this.minuteInput = input }}
                        value={minute}>
                        {minutes.map(m => (
                           <option key={m} value={m}>{m}</option>
                        ))}
                     </select>
                     <select
                        className={classNames([styles.select, styles.meridiem])}
                        onChange={this.handleChange}
                        readOnly={this.props.readOnly}
                        ref={(input) => { this.meridiemInput = input }}
                        value={meridiem}>
                        <option value="am">am</option>
                        <option value="pm">pm</option>
                     </select>
                  </span>
               }
            </div>
            {this.props.error &&
               <div className={formStyles.error}>
                  {this.props.error}
               </div>
            }
         </div>
      )
   }
}

export default createOIOFormField()(DateInput)
