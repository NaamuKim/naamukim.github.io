---
date: '2022-01-10'
title: 'js로 좋은 코드 짜는 것에 대해'
categories: ['js']
summary: 'js clean code tips'
thumbnail: "./vanilla.png"
---

이 글은 클린코드 서적을 기반으로 js에서 좋은 코드를 짜기 위한 생각을 어떻게 할 수 있을 지를 다룬다.

프로젝트와 공부를 진행하며 수정과 삭제, 추가를 반복해나가겠다.

### 1. 이미지 소스가 바뀌는 부분들을 객체로 묶어놓는다.

이미지 파일의 경로를 입력해 놓는 것은 굉장히 길다. 몇번 안 쓰이더라도 같은 컴포넌트 안에서 이미지가 바뀌는 부분은 객체로 저장해놓고 이름을 지정해 사용과 리팩터링에 유용하다.

이미지가 바뀌거나 내용이 달라졌을 때 해당 객체만 수정하여 리팩터링한다.

예제 코드
```jsx
const starImageSourceMap = {
	empty: "./src/images/icon_empty_star.png",
	half: "./src/images/icon_half_star.png",
	full: "./src/images/icon_star.png",
};
```

### 2. 변수를 만들 때 Object Destructing(비구조화 할당)이 가능한가 생각하자

js와 다른 언어가 크게 무슨 점이 다르냐를 생각해보면 js는 브라우저에서 실행되기 때문에 DOM을 움직일 수 있고 이에 따라 DOM 객체들을 다룰 때가 많다.

나 같은 경우엔 event 객체를 다룰 때 정말 많은 변수들을 선언하고는 했다.

```jsx
const newTarget = event.target;
const currentUserPoint = event.offsetX;
const targetDatasetPoint = newTarget.point;
```

이런 코드의 문제는 코드가 길어질뿐만아니라 이름을 알고있어야하는 변수가 너무 많아진다.

또 변수 이름 짓기를 고민해야하는데 드는 비용도 적지 않을 것이다.

이럴 때 “아 event랑 target객체였지?” 라는 생각을 기반으로 비구조화 할당하면 된다.

예제코드

```jsx
const { target, offsetX: currentUserPoint } = event; 
const { point } = target.dataset;
```

이렇게 줄이고 나면 앞으로 target, offsetX, point를 변수로 이용가능하다.

비구조화 할당 시 기본값 설정

비구조화 할당시 기본값을 부여하고 싶다면 대입연산자를 사용하면 된다.\

예제코드
```jsx
const { drawableLimitIndex = -1, isOverHalf = false } = payload;
```

이렇게 코드를 사용할 경우 payload에서 값이 부여되지 않는다면 직접 설정한 기본값이 들어갈 것이다.

이는 값을 줄 경우와 안 줄경우를 나누어 함수 재사용도 용이하게 만들어 줄 수 있다.

비구조화 할당시 이름 바꾸기

위 코드를 다시 가져와보자

```jsx
const { target, offsetX: currentUserPoint } = event; 
```

offsetX: currentUserPoint를 살펴보면 event.offsetX를 currentUserPoint라는 변수로 사용하겠다는 것이다.

이처럼 객체에서 여러 변수를 쓸 때 그 중 일부의 변수명을 쉽게 바꿔줄 수 있다.

이러한 방식으로 변수를 구분해줄 수 있다.

### 3. 조건문을 삼항연산자로 바꿀 방법이 없는 지 생각하자.

삼항연산자는 if문을 짧게 만들어준다.

단 else if가 없는 if문에 한해서

isLoggedIn같은 boolean타입 변수를 사용할 때는 if문을 지양할 필요가 있다.

회원에게 더 저렴한 가격을 제공하는 서비스라고 가정해보자

```jsx
if(isLoggedIn) {
	return '$1.00'
} else {
	return '$2000.00'
}

```

잘 보이는 코드 사용을 위해 4줄을 사용해야한다.
이제 삼항연산자로 줄여보자
```jsx
isLoggedIn ? '$1.00' : '$2000.00'
```

삼항연산자를 사용할 수 있는 지 생각하는 것만으로 꽤 많은 코드 단축이 될 수 있다.
