import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

const FooterWrapper = styled.div`
  display: grid;
  place-items: center;
  margin-top: auto;
  font-size: 12px;
  text-align: center;
`

const Footer: FunctionComponent = () => {
  return (
    <FooterWrapper>
      Thank You for Visiting My Blog 😊
      <br />© 2021 JiwonKim, Powered By Gatsby.
    </FooterWrapper>
  )
}

export default Footer
