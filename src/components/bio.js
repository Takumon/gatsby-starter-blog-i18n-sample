/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"
import { LocaleContext, I18nContext } from './layout'


const Bio = () => {
  const locale = useContext(LocaleContext)
  const i18n = useContext(I18nContext)


  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }

      allSitemetadataJson {
        edges {
          node {
            locale
            author {
              name
              summary
            }
            social {
              twitter
            }        
          }
        }
      }
    }
  `)

  const { author, social } = data.allSitemetadataJson.edges.map(e => e.node).find(n => n.locale === locale)
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p>
      {i18n.t('Written by')} <strong>{author.name}</strong> {author.summary}
        {` `}
        <a href={`https://twitter.com/${social.twitter}`}>
          {i18n.t('twitter-follow')}
        </a>
      </p>
    </div>
  )
}

export default Bio
