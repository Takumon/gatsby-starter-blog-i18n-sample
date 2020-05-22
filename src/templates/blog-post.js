import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import Tags from "../components/tags"


const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const { previous, next, locale, supportedLangs } = pageContext
  
  return (
    <Layout
      location={location}
      locale={locale}
      titleKey={'title'}
      defaultSlug={post.fields.defaultSlug}
      supportedLangs={supportedLangs}
    >
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        imagePath={post.frontmatter.cover.childImageSharp.fluid.src}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {post.frontmatter.date}
          </p>
        </header>
        <Tags value={post.frontmatter.tags} />
        <div>
          <Img fluid={post.frontmatter.cover.childImageSharp.fluid} />
        </div>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        defaultSlug
      }
      frontmatter {
        title
        tags
        date(formatString: "MMMM DD, YYYY")
        description
        cover {
          childImageSharp {
            fluid(maxWidth: 1920, maxHeight: 1024, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
            resize(width: 1280, quality: 90) {
              src
            }
          }
        }
      }
    }
  }
`
