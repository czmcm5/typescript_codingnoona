// 문제 1. 다음 변수들의 타입을 지정해주세요
let userName: string;
let userAge: number;
let isAdmin: boolean;

userName = "Alice";
userAge = 25;
isAdmin = true;

// ------------
// 문제 2. 아래 변수들에 적절한 타입과 초기값을 지정하세요.
let productName: string = "오징어땅콩";
let productPrice: number = 1500;
let isAvailable: boolean = true;

console.log(
  `상품명: ${productName}, 가격: ${productPrice}, 재고 여부: ${isAvailable}`
);

// ------------
// 문제 3. 두 숫자를 더하는 함수를 작성하고, 함수의 매개변수와 반환값에 타입을 지정하세요.
function addNumbers(a: number, b: number): number {
  return a + b;
}

console.log(addNumbers(5, 3));

// ------------
// 문제 4. 주어진 값을 받아 문자열로 변환하는 함수를 작성하세요. 값이 null 또는 undefined라면 "값이 없습니다"를 반환합니다
// 피드백 - stringifyValue에 제네릭 타입이 불필요 합니다.
// function stringifyValue<T>(value: T): string {
//   if (value == null) return "값이 없습니다.";
//   return String(value);
// }

// 명예의 전당 - 값을 받아  보여주는  함수를  더 효율적인 방식
function stringifyValue_another(value: unknown): string {
  return (value ?? "값이 없습니다").toString();
}

function stringifyValue(value: string | null | undefined): string {
  if (value == null) return "값이 없습니다";
  return value;
}

console.log(stringifyValue("Hello")); // "Hello"
console.log(stringifyValue(null)); // "값이 없습니다"
console.log(stringifyValue(undefined)); // "값이 없습니다"

// ------------
// 문제 5. 아래 함수는 두 값을 비교하여 결과를 반환합니다. 느슨한 동등성(==)과 엄격 동등성(===)의 차이를 이해하고, 함수의 동작 결과를 예측하세요.
function compareValues(a: unknown, b: unknown): string {
  if (a === b) {
    return "엄격한 동등성";
  } else if (a == b) {
    return "느슨한 동등성";
  } else {
    return "동등하지 않음";
  }
}

console.log(compareValues(5, "5")); // 느슨한 동등성
console.log(compareValues(null, undefined)); // 느슨한 동등성
console.log(compareValues(false, 0)); // 느슨한 동등성
console.log(compareValues(NaN, NaN)); // 동등하지 않음
console.log(compareValues(42, 42)); // 엄격한 동등성

// ------------
// 문제 6. 주어진 값이 원시 타입인지 아닌지 확인하는 함수를 작성하세요.
function isPrimitive(value: unknown): boolean {
  return value === null || value !== Object(value);
}

console.log(isPrimitive("Hello"));
console.log(isPrimitive(42));
console.log(isPrimitive(false));
console.log(isPrimitive(null));
console.log(isPrimitive(undefined));
console.log(isPrimitive({}));
console.log(isPrimitive([]));
