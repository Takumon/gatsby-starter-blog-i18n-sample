import React from "react"
import { Link } from "gatsby"

import i18n from '../i18n/i18n';
import { rhythm, scale } from "../utils/typography"
import LocaleButton from './locale-button'

export const I18nContext = React.createContext(null);
export const LocaleContext = React.createContext(null);


const Layout = ({ location, locale, titleKey, defaultSlug, supportedLangs, children }) => {
  i18n.changeLanguage(locale)


  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {i18n.t(titleKey)}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {i18n.t(titleKey)}
        </Link>
      </h3>
    )
  }
  return (
    <LocaleContext.Provider value={locale} >
      <I18nContext.Provider value={i18n} >
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <header>{header}</header>
          <LocaleButton defaultSlug={defaultSlug} supportedLangs={supportedLangs} />
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </I18nContext.Provider>
    </LocaleContext.Provider>
  )
}

export default Layout
