import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import ProfileImage from 'components/Main/ProfileImage'

const Background = styled.div`
  width: 100%;
  background-color: #070d0d;
  color: #ffffff;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 768px;
  height: 300px;
  margin: 0 auto;
`

const SubTitle = styled.div`
  font-size: 18px;
  font-weight: 400;
`

const Title = styled.div`
  margin-top: 5px;
  font-size: 35px;
  font-weight: 700;
`

const Introduction: FunctionComponent = () => {
  return (
    <Background>
      <Wrapper>
        <ProfileImage />
        <div>
          <Title>개발나무 심기</Title>
          <SubTitle>할 수 있을 것만 같습니다.</SubTitle>
        </div>
      </Wrapper>
    </Background>
  )
}

export default Introduction
