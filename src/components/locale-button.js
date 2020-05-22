import React, { useContext } from 'react'
import { Link } from 'gatsby'
import locales from '../i18n/locales'
import { LocaleContext } from './layout'

const LocaleButton = ({ defaultSlug }) => {
  const locale = useContext(LocaleContext)

  return (
    <div style={{marginBottom: '12px', background: '#dddddd', borderRadius: '4px' }}>
      {Object.keys(locales).map(key => {
        const l = locales[key]

        const to = l.default ? defaultSlug : `/${l.path}${defaultSlug}`

        return (
            <Link
              key={l.path}
              to={to}
              style={{ boxShadow: 'none' }}
            >
              <button style={key === locale ? { background: '#92d40f', margin: '12px' } : { background: '#b0bdb4', margin: '12px' }  }>
                {l.locale}
              </button>
            </Link>
        )
      })}
    </div>
  )
}

export default LocaleButton
