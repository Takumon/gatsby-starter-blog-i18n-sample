// Gatsby supports TypeScript natively!
import React from "react"
import { PageProps, Link, graphql } from "gatsby"
import Img from 'gatsby-image'

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

type Data = {
  site: {
    siteMetadata: {
      title: string
    }
  }
  allMarkdownRemark: {
    edges: {
      node: {
        excerpt: string
        frontmatter: {
          title: string
          date: string
          description: string
          cover: {
            childImageSharp: {
              fluid: object
            }
          }
        }
        fields: {
          slug: string
          defaultSlug: string
        }
      }
    }[]
  }
}

type PageContextType = {
  locale: string
  supportedLangs: [string]
} 

const BlogIndex = ({ data, location, pageContext }: PageProps<Data, PageContextType>) => {
  const posts = data.allMarkdownRemark.edges
  
  console.log(posts[0].node.frontmatter.cover.childImageSharp)
  console.log(posts[1].node.frontmatter.cover.childImageSharp)
  console.log(posts[2].node.frontmatter.cover.childImageSharp)
  console.log(posts[3].node.frontmatter.title)

  return (
    <Layout
      location={location}
      locale={pageContext.locale}
      defaultSlug={'/'}
      titleKey={'title'}
      supportedLangs={pageContext.supportedLangs}
    >
      <SEO title="All posts" />
      <Bio />
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

export const pageQuery = graphql`
  query($locale: String!) {
    allMarkdownRemark(
      filter: { fields: { localePath: { eq: $locale } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            defaultSlug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            cover {
              childImageSharp {
                fluid(
                  maxWidth: 800
                  maxHeight: 560
                  quality: 50
                  traceSVG: { color: "#B6BCCF" }
                ) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`
