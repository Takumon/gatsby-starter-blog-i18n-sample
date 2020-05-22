import React from 'react'
import Tag from './tag'

const Tags = ({value}) => {
  return (
    <div style={{display: 'flex', marginBottom: '12px'}}>
      {value.map(tag => <Tag value={tag}/>)}
    </div>
  )
}

export default Tags

