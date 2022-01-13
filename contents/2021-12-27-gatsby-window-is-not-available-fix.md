---
date: '2021-12-27'
title: 'gatsbyjs 버그 잡기(not available)'
categories: ['Blog']
summary: 'window is not available, IntersectionObserver is not available 해결'
thumbnail: "./gatsby.png"
---

이 포스트는 gatsby의 특징과 사용자들이 자주 접할 수 밖에 없는 오류를 다룬다.

## 😨”window is not available”

열심히 코드짜고 글 올린 다음에

```bash
yarn build
```

했더니 window is not available...

잘 생각해야한다. window 객체는 어디있는가?

node.js 환경은 window 객체를 가지고 있지 않다.

우리가 window객체를 사용할 때는 브라우저 위가 아니었는가?

 이를 해결하기 위해 우리는 두 방법 정도가 있을 것이다.

<span style="color:red">“조건문에 감싸서 window가 없는 환경에서도 에러가 안나게 만든다.”</span>

```jsx
if(window===undefined) return
```

<span style="color:red">“useEffect를 사용하여 서버사이드에서는 문제가 안 생기게 만든다.”</span>

```jsx
const useGoBack = ({ navRef }) => {
  useEffect(() => {
    const goBackPage = () => window.history.back()
  })
  /* ... */
}
```

useEffect는 클라이언트 사이드 렌더링 시에 실행되므로 빌드 시에는 실행되지 않아 에러가 생기지 않는다.

## 😨”IntersectionObserver is not available”

이 블로그 같은 경우에는 IntersectionObserver를 사용해서 인피니트 스크롤을 구현했는데

이도 window객체를 사용하는 라이브러리이기에 같은 에러가 발생했다.

따라서 useEffect를 사용하여 문제를 해결했다.

```jsx
useEffect(() => {
    observer.current = new IntersectionObserver((entries, observer) => {
      if (!entries[0].isIntersecting) return

      setCount(value => value + 1)
      observer.unobserve(entries[0].target)
    })
  }, [])
```

코드를 설명하자면

포스트 리스트에 연결된 요소들을 entries 인자에서 하나만 바라본다.

이제 포스트 하나씩 더 볼때마다 setCount에서 1이 올라가서 몇개의 포스트를 확인했는 지 확인할 수 있는 구조이다.

## 마무리

빌드환경과 배포된 환경이 다름을 통해 생기는 문제를 if문과 useEffect를 이용하여 해결하여 보았다.

예상치 못한 오류가 발생했을 때 코드의 문제만 생각하는 게 아니라 환경도 생각해야함을 인지 할 수 있는 예시여서 블로그에도 꼭 소개하고 싶었다.

다음은 검색 엔진 최적화나 웹 접근성을 높인 방법에 대해서 소개하고 싶다.