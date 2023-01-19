import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Input, Label, InputProps } from 'reactstrap'
import classnames from 'classnames'


const TextareaCounter = (props: InputProps) => {
  const value: any = props.value
  return (
    <>
      <div className='form-label-group mb-0'>
        <Input
          type='textarea'
          {...props}
        />
        <span
          className={classnames('position-absolute textarea-counter-value float-right end-0', {
            'bg-danger': value.length > 20
          })}
          >
          {`${value.length}/20`}
        </span>
      </div>
    </>
  )
}
export default TextareaCounter
