import React from 'react'
import LocalizedLink from './localized-link'

const Tag = ({ value }) => {
  return (
    <div style={{
      border: '1px solid gray',
      borderRadius: '4px',
      padding: '4px',
      marginRight: '8px',
    }}>
      <LocalizedLink to={`/tags/${value}`}>{value}</LocalizedLink>
    </div>
  )
}

export default Tag
