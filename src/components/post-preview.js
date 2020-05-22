import React from "react"
import Img from 'gatsby-image'
import { Link } from "gatsby"

import { rhythm } from "../utils/typography"
import Tags from "./tags"



const PostPreview = ({node}) => {
  const title = node.frontmatter.title || node.fields.slug

  return (
    <article key={node.fields.slug} style={{
      border: '1px solid gray',
      borderRadius: '4px',
      marginBottom: '48px',
    }}>
      <div>
        <Img fluid={node.frontmatter.cover.childImageSharp.fluid} />
      </div>
      <div style={{
        padding: '8px',
      }} >
        <header>
          <h3
            style={{
              marginBottom: rhythm(1 / 4),
            }}
          >
            <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
              {title}
            </Link>
          </h3>
          <small>{node.frontmatter.date}</small>
        </header>
        <Tags value={node.frontmatter.tags} />
        <section>
          <p
            dangerouslySetInnerHTML={{
              __html: node.frontmatter.description || node.excerpt,
            }}
          />
        </section>
      </div>

    </article>
  )
}

export default PostPreview