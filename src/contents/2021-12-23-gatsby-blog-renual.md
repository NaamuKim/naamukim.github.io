---
date: '2021-12-23'
title: 'gatsbyjs를 이용한 블로그 리뉴얼'
categories: ['React', 'Blog']
summary: 'Jekyll에서 gatsby로 블로그를 바꾸면서...'
thumbnail: "./gatsby.png"
---


# gatsbyjs를 이용한 블로그 리뉴얼

Jekyll을 이용한 블로그를 이용하다보니 커스터마이징이 어렵다는 문제를 느꼈다.

## 🤷‍♂️그래서 왜 gatsby인데?

### 1. react를 이용한 개발이 용이하다.

메인 스택이 react인 내가 커스터마이징하는 데 부담이 없는 언어라는 게 크게 작용했따. 처음부터 끝까지 내가 다 개발을 해야하는 상황에서 익숙한 언어와 프레임워크로의 개발은 개발에 쏟는 시간을 단축시켜줄 것이 분명했다.

### 2. SEO(검색 엔진 최적화)

유저의 사용성과 검색 엔진 최적화 

두 키워드는 블로그라는 글을 읽고 생각을 공유하는 플랫폼에서 제일 중요하다고 생각한다.

gatsby의 특징은 build과정에서 마크업이 생긴다는 것이다.

그러기에 next를 정적인 웹에서는 ssr과 같은 효과를 낸다.

이를 통해 검색 엔진 최적화와 유저에게 로딩시간이 없는 포스트 제공이라는 이득을 챙겨갈 수 있었다.

### 3. graphql과 함께라면 db가 필요없다.

개발나무심기 블로그는 글을 보여주고 나를 소개하는 데에 힘을 줘야한다.

db를 활용해야하는 비즈니스 로직이 없는 상황에서 metatdata만 이용하면 db없이 글을 포함한 화면을 잘 보여줄 수 있다.

그러면 gatsby가 어떤 플러그인들로 블로그를 쉽게 만들수 있게 도와주는 지 알아보자.

## 🙋‍♂️gatsby가 제공하는 다양한 플러그인

seo를 위해 gatsby가 만들어 놓은 플러그인들

- **[gatsby-plugin-robots-txt](https://www.gatsbyjs.org/packages/gatsby-plugin-robots-txt/)**: **`robot.txt`** 자동 생성
- **[gatsby-plugin-sitemap](https://www.gatsbyjs.org/packages/gatsby-plugin-sitemap/)**: 빌드 시 sitemap 자동 생성(의미있는 sitemap인지 확인 필요)
- **[gatsby-plugin-canonical-urls](https://www.gatsbyjs.org/packages/gatsby-plugin-canonical-urls/)**: canonical 이슈 해결
- **[gatsby-plugin-react-helmet](https://www.gatsbyjs.org/packages/gatsby-plugin-react-helmet)**: meta tag를 쉽게 바꿀 수 있음

이미지 lazy-loading을 위해 gatsby가 만들어 놓은 플러그인들

- **[gatsby-image](https://www.gatsbyjs.org/packages/gatsby-image/)**: GraphQL 쿼리를 사용하여 advanced image loading 구현

## 무엇을 개발했는가?

- 글들 리스트를 보여주는 홈화면
- 개별 글들을 보여주는 Post화면
- 404페이지

내 블로그를 리뉴얼하고 싶고 타입스크립트를 연습하고 싶어 간단하게 블로그를 리뉴얼해보았다.

추가하고 싶은 것들이 많다.

일단 나를 소개하는 페이지와 배너의 three.js를 이용한 무언가를 좀 넣어놓고싶다.

또 매일매일 개발하며 느낀 것들이 많은데 얼른 글로 적어 나와 똑같은 문제를 겪는 사람들에게 공유하고 싶다.

## 마무리

블로그를 새로 배포한 지 이틀이 지났다. 

gatsby를 이용하여 만든 블로그는 나의 스택에 잘 어울렸고 예상치 못한 단점은 딱히 없었다.

하지만 gatsby를 이용하면 마주칠 수 밖에 없는 버그들이 있고 다음 포스팅은 이에 대해 해보겠다.