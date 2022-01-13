---
date: '2021-12-30'
title: 'Next.js에서 redux로 jwt 서버사이드 렌더링하기'
categories: ['Next.js','Redux']
summary: '쿠키를 이용하여 토큰을 서버사이드 렌더링하기'
thumbnail: "./next.png"
---
이 글은 react와 next를 사용한 프로젝트에서 redux를 통해 jwt를 이용하여 사용자 정보를 서버사이드 렌더링 하는 것을 다룬다.

대게 웹에서 jwt를 다룰 때 로컬스토리지나 세션 스토리지를 사용하곤 한다.

하지만 ssr을 이용하게 되면 프론트 서버는 로컬스토리지가 없어 사용자의 정보를 가져올 수가 없다.

그렇기에 나의 경우는 쿠키로부터 토큰을 관리하는 방식을 사용했다.

토큰을 관리하는 과정을 정리하면

1. 로그인하면 액세스 토큰과 리프레쉬 토큰을 받는다.
2. 쿠키와 리덕스에 두 토큰을 넣어놓는다.
3. 헤더에 액세스 토큰을 붙여놓는다.
4. 새로고침 시 프론트 서버에 있는 쿠키를 바탕으로 내 정보를 불러온다.

리덕스 사가를 이용한 로그인 코드이다

```jsx
function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data.
    });
    axios.defaults.headers.common["x-access-token"] =
      result.data.accessToken;
  
    cookie.save("accessToken", accessToken, {
      path: "/",
    });
    cookie.save("refreshToken", refreshToken, {
      path: "/",
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}
```

코드를 설명하면 로그인 요청이 되면 시작되는 코드인데 

1. 성공 시 데이터를 리덕스 스토어에 넣는다
2. 앞으로 서버로 정보를 요청할 때 기본적으로 헤더에 access-token이 들어가게끔 한다.
3. 쿠키에 토큰을 저장한다.

이걸 이용해서 서버 사이드 렌더링을 하는 코드를 살펴보면

```jsx
export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const parsedCookie = context.req
      ? cookie.parse(context.req.headers.cookie || "")
      : "";
    if (context.req && parsedCookie) {
      if (parsedCookie["accessToken"]) {
        context.store.dispatch({
          type: LOAD_MY_INFO_REQUEST,
          data: parsedCookie["accessToken"],
        });
      }
    }
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);
```

프론트 서버에 있는 쿠키를 쪼개서 내 정보에 대한 요청을 보내는 코드이다.

사용자 정보를 요청하는 비동기 코드를 알아보면

```jsx
function loadMyInfoAPI(data) {
  return axios.get("/auth/me", {
    headers: {
      "x-access-token": data,
    },
  });
}
```

위에 서버사이드 렌더링을 하는 코드에서 쿠키에 있는 토큰을 넣어주면 헤더에 그 토큰을 다시 넣고 정보를 요청한다.

그리하여 받는 나의 정보를 다시 저장한다.

```jsx
function* loadMyInfo(action) {
  try {
    const result = yield call(loadMyInfoAPI, action.data);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data.data,
    });
   
    cookie.save("accessToken", accessToken, {
      path: "/",
    });
    cookie.save("refreshToken", refreshToken, {
      path: "/",
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}
```

이러한 방식을 이용하면 만료가 되지 않는 토큰의 관리를 할 수 있다. 

하지만 리프레쉬 토큰을 이용해서 만료된 액세스 토큰을 바꿔올 수 없는 문제가 있다.

리프레쉬 토큰을 관리하는 코드와 로그아웃 시 토큰 관리로 다음 포스트를 업로드 하겠다.