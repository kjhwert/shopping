# Products

여기는 사실 그렇게 고도화 되어있지 않다보니 크게 비즈니스 로직과 UI 로직을 구분하는게 어렵지는 않겠지만,
그럼에도 불구하고 상품을 장바구니에 담는 기능과 상품의 UI를 구성하는 로직은 별도로 관리할 수 있을 것 같아.
이걸 목적으로 한번 분리를 해보자.

1. 상품 UI를 별도의 컴포넌트로 분리하고
2. props로 handling 로직(장바구니 추가/삭제)을 전달.