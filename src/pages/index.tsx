// Gatsby supports TypeScript natively!
import React from "react"
import { PageProps, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostPreview from "../components/post-preview"

type Data = {
  allMarkdownRemark: {
    edges: {
      node: {
        excerpt: string
        frontmatter: {
          title: string
          date: string
          description: string
          tags: [string]
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
      {posts.map(({ node }) => <PostPreview key={node.fields.slug} node={node} />)}
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
            tags
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
