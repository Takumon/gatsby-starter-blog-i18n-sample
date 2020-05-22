import React, { useContext } from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

import locales from '../i18n/locales'
import { LocaleContext } from './layout'

const LocalizedLink = ({ to, ...props }) => {
  const locale = useContext(LocaleContext)
  const path = locales[locale].default ? to : `/${locale}${to}`
  return <Link to={path} {...props} />
}

LocalizedLink.propTypes = {
  to: PropTypes.string.isRequired,
}

export default LocalizedLink
