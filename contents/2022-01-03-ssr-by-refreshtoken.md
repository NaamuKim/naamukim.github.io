---
date: '2022-01-03'
title: 'refreshToken만 있을경우에 유저 정보 Server Side Rendering'
categories: ['Next.js','Redux']
summary: 'redux와 next사용하여 refreshtoken만 가지고 있는 유저 정보 불러오기'
thumbnail: "./next.png"
---

저번에는 accesstoken을 ssr하여 관리하는 방법을 알아보았다. 이번 글에서는 refreshToken을 이용하여 accessToken을 받아오는 일을 서버사이드렌더링 하는 내용을 담고 있다.

유저의 정보를 서버사이드 렌더링 할 때, 만료되지 않은 액세스 토큰이 있다면, 사용자 정보 요청 후 리덕스에 담아주는 방법으로 문제를 풀었다면 액세스 토큰이 만료됐고 리프레쉬 토큰만 남아있다면 어떻게 사용자 정보를 ssr할 수 있을 지 알아보겠다.

액세스 토큰과 리프레쉬 토큰을 확인하여 유저 정보를 ssr하는 과정은

1. context.req.headers에 쿠키가 있는 지 확인한다.
2. 액세스 토큰이 있다면 이를 이용해 정보를 불러온다
3. 액세스 토큰이 없고 리프레쉬 토큰만 있다면 토큰도 재발급 받고, 사용자 정보를 재요청한다.
4. 받아온 정보들을 리덕스와 cookie에 세팅한다.

이런식의 코드를 내정보를 사용해야하는 페이지 하단에 넣어두고

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
      } else if(parseCookies["refreshToken"]) {
				 context.store.dispatch({
					type: NEW_TOKEN_REQUEST,
          data: parsedCookie["refreshToken"],
				}
    }
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);
```

saga 코드들을 살펴보면

```jsx
function newTokenAPI(data) {
  return axios.get("/auth/refresh-token", {
    headers: {
      "x-refresh-token": data,
    },
  });
}

function* refreshToken(action) {
  try {
    const result = yield call(newTokenAPI, action.data);
    const { accessToken, refreshToken, info } = result.data.data;
    yield put(
      newhTokenSuccess({ accessToken, refreshToken, info, setCookie })
    );
    cookie.save("accessToken", accessToken, {
      path: "/",
    });
    cookie.save("refreshToken", refreshToken, {
      path: "/",
    });
  } catch (err) {
    yield put(newTokenFailure());
  }
}
```

이런 코드를 사용하여 새로운 토큰을 받아오고 처리하면 된다.

reducer같은 경우엔 refreshToken을 이용하여 새 토큰을 받아오지 못하는 경우(NEW_TOKEN_FAILURE)에 로그아웃을 시켜줘야한다. NEW_TOKEN_SUCCESS에 경우 받아온 나의 정보들을 스토어에 넣어주면 된다.

두 포스트를 통해 next로 jwt를 ssr하는 방법을 알아보았다. 

jwt를 이용한 방식으로 SSR하는 건 복잡하다. 하지만  브라우저에서 관리하는 토큰으로는 ssr이 안되기 때문에 프론트 서버에 저장된 쿠키를 이용하여 요청을 보낸다고 생각하면 

getServerSideProps에서 토큰을 집어낸다음 서버로 요청할 때 헤더에 토큰을 붙여준다.

이 개념으로 생각하면 CSR을 한번만 더 풀어내는 방식과 같으므로 CSR과 유사하게 문제를 해결할 수 있다.
