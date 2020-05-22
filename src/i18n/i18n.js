import i18next from 'i18next'
import { initReactI18next } from 'react-i18next';

import en from './en.json'
import ja from './ja.json'

const resources =  { en, ja }

i18next
.use(initReactI18next)
.init({
  debug: true,
  resources,
  fallbackLng: 'ja',
  interpolation: {
    escapeValue: false
  },
})

export default i18next