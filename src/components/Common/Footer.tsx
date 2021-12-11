import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

const FooterWrapper = styled.div`
  display: grid;
  width: 100%;
  place-items: center;
  margin-top: auto;
  padding: 50px 0;
  font-size: 12px;
  text-align: center;
`

const Footer: FunctionComponent = () => {
  return (
    <FooterWrapper>
      Thank You for Visiting My Blog 😊
      <br />© 2021 Kim JiWon.
    </FooterWrapper>
  )
}

export default Footer
