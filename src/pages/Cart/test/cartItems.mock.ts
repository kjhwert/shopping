import { CartItem } from "../../../stores/cart/types";

const cartItemsMock: CartItem[] = [
  {
    product: {
      item_no: 927850,
      item_name: "메이커스 투명케이스",
      detail_image_url:
        "https://img.29cm.co.kr/next-product/2020/12/14/3cfbcfb2cd5842939861b4add12397fe_20201214160430.jpg?width=500",
      price: 23000,
      score: 640,
    },
    count: 1,
    discountPrice: 23000,
    checked: true,
  },
  {
    product: {
      item_no: 363559,
      item_name: "WOOD GLOVES",
      detail_image_url:
        "https://img.29cm.co.kr/next-product/2019/04/25/4fe7eda3069d4cdb867636faf36ad5a3_20190425135058.jpg?width=500",
      price: 3000,
      score: 220,
    },
    count: 1,
    discountPrice: 3000,
    checked: true,
  },
  {
    product: {
      item_no: 870160,
      item_name:
        "위키오 3in1 거치대형 무선충전기 아이폰, 갤럭시, 스마트워치, 무선이어폰 동시충전",
      detail_image_url:
        "https://img.29cm.co.kr/next-product/2021/01/21/af916f6191f24a84b076e74e613a4795_20210121114833.jpg?width=500",
      price: 39900,
      score: 190,
      availableCoupon: false,
    },
    count: 1,
    discountPrice: 39900,
    checked: true,
  },
];

export default cartItemsMock;
