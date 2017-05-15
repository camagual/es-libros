import React from 'react';

const FormError = (props) => {
  if(props.error)
    return <a style={{color: '#FF0000'}}>{props.error}</a>
  return null
}

export default FormError
