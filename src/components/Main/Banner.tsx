import React, { FunctionComponent, useState, useEffect } from 'react'
import styled from '@emotion/styled'

const BannerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 768px;
  margin: 50px auto 0;
`

const IntroductionDiv = styled.div`
  font-size: 30px;
  line-height: 150%;
`

const Banner: FunctionComponent = () => {
  const [Text, setText] = useState('')
  const [ArrayCount, setArrayCount] = useState(0)
  const [Count, setCount] = useState(0)
  const intro = [
    '유저의 공감을 이끌어내는',
    '끝까지 만들려는 의지를 가진',
    '문제 해결을 즐기는',
  ]
  const handleAfterAction = () => {
    setText('')
    setCount(0)
    if (ArrayCount !== intro.length - 1) setArrayCount(ArrayCount + 1)
    else setArrayCount(0)
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setText(Text + intro[ArrayCount][Count]) // 이전 set한 문자 + 다음 문자
      setCount(Count + 1) // 개수 만큼 체크
    }, 200)
    if (Count === intro[ArrayCount].length) {
      // Count를 따로 두지 않고 Text.length 체크도 가능
      clearInterval(interval)
      setTimeout(function () {
        handleAfterAction()
      }, 200)
    }
    return () => clearInterval(interval) // 언마운트시 setInterval을 해제합니다
  })
  return (
    <BannerWrapper>
      <IntroductionDiv>
        <span>안녕하세요</span>
        <br />
        <span>{Text}</span>
        <br />
        <span>
          웹 프론트엔드 개발자 <strong>김지원</strong>입니다.
        </span>
      </IntroductionDiv>
    </BannerWrapper>
  )
}

export default Banner
