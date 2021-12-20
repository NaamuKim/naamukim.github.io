import React, { FunctionComponent, useMemo } from 'react'
import styled from '@emotion/styled'
import Template from 'components/Common/Template'
import Introduction from 'components/Main/Introduction'
import CategoryList, { CategoryListProps } from 'components/Main/CategoryList'
import PostList, { PostType } from 'components/Main/PostList'
import { graphql } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import queryString, { ParsedQuery } from 'query-string'

export type PostFrontmatterType = {
  title: string
  date: string
  categories: string[]
  summary: string
  thumbnail: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
}

export type PostListItemType = {
  node: {
    id: string
    frontmatter: PostFrontmatterType
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

type IndexPageProps = {
  location: {
    search: string
  }
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        siteUrl: string
      }
    }
    allMarkdownRemark: {
      edges: PostListItemType[]
    }
  }
}

const IndexPage: FunctionComponent<IndexPageProps> = ({
  location: { search },
  data: {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
    allMarkdownRemark: { edges },
  },
}) => {
  const parsed: ParsedQuery<string> = queryString.parse(search)
  const selectedCategory: string =
    typeof parsed.category !== 'string' || !parsed.category
      ? 'All'
      : parsed.category

  const categoryList = useMemo(
    () =>
      edges.reduce(
        (
          list: CategoryListProps['categoryList'],
          {
            node: {
              frontmatter: { categories },
            },
          }: PostType,
        ) => {
          categories.forEach(category => {
            if (list[category] === undefined) list[category] = 1
            else list[category]++
          })

          list['All']++

          return list
        },
        { All: 0 },
      ),
    [],
  )
  return (
    <Template title={title} description={description} url={siteUrl}>
      <Introduction />
      <CategoryList
        categoryList={categoryList}
        selectedCategory={selectedCategory}
      />
      <PostList posts={edges} selectedCategory={selectedCategory} />
    </Template>
  )
}

export default IndexPage

export const getPostList = graphql`
  query getPostList {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 768, height: 400)
              }
            }
          }
        }
      }
    }
  }
`
