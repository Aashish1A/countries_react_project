import React from 'react'
import { useRouteError } from 'react-router-dom'

const Error = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div>Something went wrong please check and resolve the error. {error.status}</div>
  )
}

export default Error