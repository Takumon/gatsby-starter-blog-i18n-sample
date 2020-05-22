// Gatsby supports TypeScript natively!
import React from "react"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostPreview from "../components/post-preview"




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
      {posts.map(({ node }) => <PostPreview key={node.fields.slug} node={node} />)}
    </Layout>
  )
}

export default BlogIndex
