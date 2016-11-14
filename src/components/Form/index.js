import React from 'react'
// import classNames from 'classnames'

const Form = ({ children, onSubmit }) => {
   const onSubmitLocal = (event) => {
      event.preventDefault()
      // console.log(children)
      // onSubmit(data)
   }

   return (
      <form onSubmit={onSubmitLocal}>
         {children}
      </form>
   )
}

Form.propTypes = {
   children: React.PropTypes.node,
   onSubmit: React.PropTypes.func
}

// Form.defaultProps = {
// }

export default Form
