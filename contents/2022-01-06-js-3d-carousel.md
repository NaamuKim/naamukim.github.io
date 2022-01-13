---
date: '2022-01-06'
title: 'vanillaJs를 이용한 3d-carousel'
categories: ['Design']
summary: 'tranform-style: preserve-3d를 이용하여 원근감을 준 이미지 캐루셀'
thumbnail: "./vanilla.png"
---

#### 이 글은 vanillajs로 만든 3d-carousel 방식을  다룬다.





![carousel.gif](./images/carousel.gif)


이런 식으로 원근감이 느껴지는 캐루셀을 만들기 위해서는
크기를 다르게 하는 방법도 있겠지만 css에 

```css
.carousel-list{
    transform-style: preserve-3d;
}
```

를 이용하여 전체 이미지 리스트를 3d로 바꿔줄 수 있다.
그리고 이제 js를 활용하여 버튼 클릭 이벤트 시 회전할 수 있게 해준다.

일단 prev버튼을 클릭할 시 생기는 이벤트를 정리하면

1. center에 있는 이미지와 왼쪽 이미지를 특정한다.
2. 왼쪽에 있는 이미지를 가운데에 보내주고 가운데에 있는 이미지는 오른쪽으로 보내준다.
3. 그에 맞게 다른 이미지들도 한칸씩 원주를 따라 돌려준다.

또 next버튼을 클릭할 시 생기는 이벤트를 정리하면

1. center에 있는 이미지와 오른 이미지를 특정한다.
2. 오른에 있는 이미지를 가운데에 보내주고 가운데에 있는 이미지는 왼쪽으로 보내준다.
3. 그에 맞게 다른 이미지들도 한칸씩 원주를 따라 돌려준다.

```jsx
const onClickPrev = () => {
		const carItem = document.querySelectorAll(".carousel-item");
		if (carItem.length > 1) {
			const nowItem = document.querySelector(".now");
			const prev = carItem[carItem.length - 1];
			carList.insertBefore(prev, carItem[0]);
			nowItem.classList.remove("now");
			prev.classList.add("now");
			changeTransform();
		}
	};

const onClickNext = () => {
		const carItem = document.querySelectorAll(".carousel-item");
		if (carItem.length > 1) {
			const nowItem = document.querySelector(".now");
			const next = nowItem.nextElementSibling;
			carList.appendChild(nowItem);
			next.classList.add("now");
			changeTransform();
		}
	};
```

changeTransform 함수는 

- 창이 처음 로드 될 때
- prev 버튼이 클릭 될 때
- next 버튼이 클릭 될 때
- 이미지를 업로드 할 때

이렇게 4번 정도 사용하므로 따로 함수로 만들어주었다. 

```jsx
const changeTransform = () => {
		const items = document.querySelectorAll(".carousel-item");

		items.forEach((e, i) => {
			//이렇게 사용하면 degree*i가 원주 상에 아이템이 있어야할 각도가 된다.
			const degree = 360 / items.length;
			//Y축은 원 가운데에서 높게 솟은 축
			if (items.length > 1) {
				e.style.transform = `rotateY(${
					i * degree
				}deg) translateZ(250px) rotateY(-${i * degree}deg)`; //앞을 보게끔 rotate시켜줌
			}
			//5개 보다 많을 떄는 보여야하는 것들을 먼저 세팅해주고 안 보이는 것들을 degree*i에 배치시킨다.
			if (items.length >= 5) {
				if (i === 0) {
					e.style.transform = "rotateY(0deg) translateZ(250px)";
				} else if (i === 1) {
					e.style.transform =
						"rotateY(72deg) translateZ(250px) rotateY(-72deg)";
				} else if (i === 2) {
					e.style.transform =
						"rotateY(144deg) translateZ(250px) rotateY(-144deg) translateX(400px)";
				} else if (i === items.length - 2) {
					e.style.transform =
						"rotateY(216deg) translateZ(250px) rotateY(-216deg) translateX(-400px)";
				} else if (i === items.length - 1) {
					e.style.transform =
						"rotateY(288deg) translateZ(250px) rotateY(-288deg)";
				} else {
					e.style.transform = `rotateY(${
						i * degree
					}deg) translateZ(250px) rotateY(-${i * degree}deg)`;
				}
			}
		});
	};
```

코드를 설명하면 z축은 사용자 눈과 가까워지는 축이므로 z축을 이동시켜 원근감을 조절할 수 있다.
Y축은 우리의 캐루셀이 도는 원주의 중심이 되는 축이다. 
이 원주를 바탕으로 rotateY(ㅁㅁㅁdeg)할 경우 평면인 이미지도 같이 회전하기 때문에 rotateY(-ㅁㅁㅁdeg)로 앞을 바라볼 수 있게 해주었다.
X축은 화면에 가로방향으로 뻗은 축이어서 이미지가 5개가 넘어가면 5개가 보일 수 있게 세팅해주었다.



style.transform에서 세 축을 기반하여 회전시키는 것이 생각보다 어려웠다. 

이 글을 보시는 분들이 3d-carousel을 쉽게 구현하길 바란다.
