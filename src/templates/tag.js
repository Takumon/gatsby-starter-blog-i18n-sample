// Gatsby supports TypeScript natively!
import React from "react"
import { Link } from "gatsby"
import Img from 'gatsby-image'

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Tags from "../components/tags"

import { rhythm } from "../utils/typography"




const BlogIndex = ({ location, pageContext }) => {
  const { posts, supportedLangs, tagName } = pageContext
  
  console.log(pageContext)
  return (
    <Layout
      location={location}
      locale={pageContext.locale}
      defaultSlug={'/'}
      titleKey={'title'}
      supportedLangs={supportedLangs}
    >
      <SEO title="All posts" />
      <Bio />
      <div>tag = {tagName} </div>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug}>
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
            <div>
              <Img fluid={node.frontmatter.cover.childImageSharp.fluid} />
            </div>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex
