/*
문제1. 상품(Product)과 할인(Discount) 정보를 병합하여 새로운 타입을 정의하고, 할인 적용 후의 가격을 계산하는 함수를 작성하세요.
Product 타입:
 - id: 숫자
 - name: 문자열
 - price: 숫자

Discount 타입:
 - discountPercentage: 숫자

Product & Discount 타입을 기반으로 할인된 가격을 반환하는 함수를 작성하세요:
 - 함수 이름: calculateDiscountedPrice
 - 입력: 교차 타입 객체
 - 출력: 할인된 가격(숫자)
*/
interface Product__ {
  id: number;
  name: string;
  price: number;
}
interface Discount__ extends Product__ {
  discountPercentage: number;
}

function calculateDiscountedPrice__(item: Discount__): number {
  return item.price * (1 - item.discountPercentage / 100);
}

const discountedProduct__ = {
  id: 101,
  name: "Laptop",
  price: 1000,
  discountPercentage: 20,
};

console.log(calculateDiscountedPrice__(discountedProduct__));

/*
문제2. 아래의 조건에 따라 복합 데이터를 처리하는 타입을 정의하고, 관련된 함수를 작성하세요.
ContactInfo 타입:
 - phone: 문자열
 - address: 문자열

OrderInfo 타입:
 - orderId: 숫자
 - items: 문자열 배열

ContactInfo & OrderInfo 타입을 기반으로, 주문 요약 정보를 출력하는 함수를 작성하세요:
 - 함수 이름: printOrderSummary
 - 입력: 교차 타입 객체
 - 출력: 전화번호와 주문 아이디를 포함한 문자열
*/
interface ContactInfo {
  phone: string;
  address: string;
}
interface OrderInfo extends ContactInfo {
  orderId: number;
  items: string[];
}

function printOrderSummary_(order: OrderInfo): string {
  return `Order ${order.orderId} (Phone: ${order.phone})`;
}

const orderDetails_ = {
  phone: "123-456-7890",
  address: "123 Main St",
  orderId: 2023,
  items: ["Laptop", "Mouse"],
};

console.log(printOrderSummary_(orderDetails_)); // "Order 2023 (Phone: 123-456-7890)"

/*
문제3. 사용자 프로필과 활동 기록 병합
기본 사용자 정보(Profile):
 - id: 사용자 고유 ID (숫자)
 - name: 사용자 이름 (문자열)
 - email: 이메일 주소 (문자열)

사용자 활동 기록(Activity):
 - lastLogin: 마지막 로그인 시간 (Date 객체)
 - actions: 사용자가 수행한 작업 목록 (문자열 배열)

Profile & Activity 타입을 기반으로 다음 요구사항을 만족하는 코드를 작성하세요:
 - mergeUserData: 사용자 프로필과 활동 기록을 병합하여 새로운 객체를 반환하는 함수.
 - getUserSummary: 병합된 데이터를 입력받아 사용자 요약 정보를 반환하는 함수:
 - 출력 형식: "사용자 [id] - [name] ([email]) - 마지막 로그인: [lastLogin]"
*/
interface BasicProfile {
  id: number;
  name: string;
  email: string;
}
interface Activity {
  lastLogin: Date;
  actions: string[];
}
type UserData = BasicProfile & Activity;

function mergeUserData(profile: BasicProfile, activity: Activity): UserData {
  return { ...profile, ...activity };
}

function getUserSummary(user: UserData): string {
  return `사용자${user.id} - ${user.name} (${
    user.email
  }) - 마지막 로그인: ${user.lastLogin.toISOString()}`;
}

const profile = { id: 1, name: "Alice", email: "alice@example.com" };
const activity = {
  lastLogin: new Date("2024-01-01T10:00:00Z"),
  actions: ["login", "viewed dashboard", "logout"],
};

const mergedUser = mergeUserData(profile, activity);
console.log(getUserSummary(mergedUser));
// 출력 예시: "사용자 1 - Alice (alice@example.com) - 마지막 로그인: 2024-01-01T10:00:00Z"
