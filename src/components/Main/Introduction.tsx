import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

const Background = styled.div`
  width: 100%;
  color: #070d0d;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 768px;
  height: 100px;
  margin: 0 auto;
`

const TitleDiv = styled.div`
  padding-top: 20px;
  display: flex;
  font-size: 20px;
`

const Title = styled.div`
  font-weight: 700;
  padding-right: 5px;
`

const SubTitle = styled.div`
  font-weight: 600;
  color: #56fca2;
`

const Introduction: FunctionComponent = () => {
  return (
    <Background>
      <Wrapper>
        <TitleDiv>
          <Title>Dev</Title>
          <SubTitle>Namu</SubTitle>
        </TitleDiv>
      </Wrapper>
    </Background>
  )
}

export default Introduction
