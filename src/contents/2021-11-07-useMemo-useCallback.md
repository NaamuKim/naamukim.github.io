---
date: '2021-11-07'
title: 'useMemo와 useCallback'
categories: ['React']
summary: 'useMemo와 useCallback으로 컴포넌트 최적화.'
thumbnail: "./react.jpg"
---

### 1. 일단 HOOKS가 뭘까?

컴포넌트를 클래스가 아닌 함수로 쓰기 위해 REACT에서 React State와 생명주기(lifecycle)를 연동가능하게끔 REACT가 만들어놓은 것이다. 값이 바뀔때 함수가 다시 실행되며 기능이 바뀌고 그 기능에 따른 화면을 return한다.

### 2, useCallback

React Hooks는 state와 달리 함수이기 때문에 state하나가 달라질 때 전체가 리렌더링 된다.

⇒ 만약 함수 중간에 실행시간이 오래 걸리는 함수가 있다면 간단한 변화에도 20초 이상 소요된다.

이런것을 해결하기 위해 React는 "함수를 기억하는 함수를 제공"한다.

한마디로 정리하면 useCallback은

<span style="color:red">"React에서 제공하는 함수를 기억하는 함수"</span>

그래서 어떻게 사용해야 하는가?

```jsx
const onCLickMenu = useCallback(() => {
    setOpenedMenu((prev) => !prev);
  }, []);
```

전형적인 콜백함수 꼴로 구성돼있고 두번째 인자에는 배열이 들어가는데 useCallback 내부함수의 상태값을 넣는다면 그 배열의 값을 입력해주면 값이 바뀔때마다 상태를 저장한다.

```jsx
const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );
```

### 3. useMemo

useCallback과 useMemo가 유사한 느낌을 가져 헷갈릴 수 있는데 이 차이를 생각하면서 머리속에 입력하면 둘을 이해하면서 입력해놓기 더 좋다.

useMemo도 함수 컴포넌트 전체의 리렌더링을 억제해주기 위해 사용된다. 이를 위해 React는 함수의 출력값을 기억해주는(캐싱해주는) 함수를 제공한다.

정리하자면 useMemo는

<span style="color:red">"함수의 출력값을 기억하는 함수".</span>

어떻게 사용하는가?

```jsx
const onCLickMenu = useMemo(() => {
    uploadMyPosts(myPosts)
  }, [myPosts]);
```

이런식으로 콜백함수 꼴로 사용하고 첫번째 인자로는 함수를 호출하고 두번째 인자로는 배열에 기억할 값을 넣어준다.

### 4. 마무리

useCallback과 useMemo에 대해 알아보았다.

키워드로 뭘 기억하는 지 구별해서 두 함수를 정리해놓고 React에서 함수형 컴포넌트를 최적화하면서 적용해보면 둘의 사용성을 점차 알게 될 것이다.
