import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import GlobalStyle from 'components/Common/GlobayStyle'
import Introduction from 'components/Main/Introduction'
import Footer from 'components/Common/Footer'
import CategoryList from 'components/Main/CategoryList'

const CATEGORY_LIST = {
  All: 3,
  React: 2,
  PWA: 2,
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const IndexPage: FunctionComponent = function () {
  return (
    <Container>
      <GlobalStyle />
      <Introduction />
      <CategoryList selectedCategory="All" categoryList={CATEGORY_LIST} />
      <Footer />
    </Container>
  )
}

export default IndexPage
