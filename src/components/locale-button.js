import React, { useContext } from 'react'
import { Link } from 'gatsby'
import locales from '../i18n/locales'
import { LocaleContext } from './layout'

const LocaleButton = ({ defaultSlug, supportedLangs }) => {
  const locale = useContext(LocaleContext)

  if(supportedLangs.length === 1) {
    return null
  }

  return (
    <div style={{marginBottom: '12px', background: '#dddddd', borderRadius: '4px' }}>


      {supportedLangs.map(lang => {
        const l = locales[lang]

        const to = l.default ? defaultSlug : `/${l.path}${defaultSlug}`

        return (
            <Link
              key={l.path}
              to={to}
              style={{ boxShadow: 'none' }}
            >
              <button style={l.path === locale ? { background: '#92d40f', margin: '12px' } : { background: '#b0bdb4', margin: '12px' }  }>
                {l.locale}
              </button>
            </Link>
        )
      })}
    </div>
  )
}

export default LocaleButton
