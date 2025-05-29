/*
문제 1. 배열의 첫 번째 요소를 반환하는 함수를 작성하세요. 배열의 요소 타입에 관계없이 작동해야 합니다.
1.함수 이름: getFirstElement
2.입력: 제네릭 배열
3.출력: 배열의 첫 번째 요소
*/
function getFirstElement<T>(array: T[]): T | undefined {
  return array[0];
}

console.log(getFirstElement([1, 2, 3])); // 1
console.log(getFirstElement(["a", "b", "c"])); // "a"
console.log(getFirstElement([])); // undefined

/*
문제 2 숫자 배열인지 문자열 배열인지 확인하는 함수를 작성하세요.
함수 이름: isNumberArray
입력: 제네릭 배열
출력:
 - 배열이 숫자 배열이면 true.
 - 그렇지 않으면 false.
*/
function isNumberArray<T>(array: T[]): boolean {
  return array.every((el) => typeof el === "number");
}

console.log(isNumberArray([1, 2, 3])); // true
console.log(isNumberArray(["a", "b", "c"])); // false
console.log(isNumberArray([])); // true (빈 배열은 숫자 배열로 간주)

/*
문제3. 다음 조건을 만족하는 조건부 타입과 함수를 작성하세요.
조건부 타입 정의
 - 타입 이름: IsArray<T>
 - 입력 타입 T가 배열 타입이면 true를 반환합니다.
 - 그렇지 않으면 false를 반환합니다.

 조건부 타입을 활용하는 함수
 - 함수 이름: checkArrayType
 - 입력: unknown 타입의 값.
 - 출력: 입력값이 배열이면 "This is an array."를, 그렇지 않으면 "This is not an array."를 반환합니다.
*/
type IsArray<T> = T extends any[] ? true : false;

function checkArrayType(value: unknown): string {
  if (Array.isArray(value)) return "This is an array.";

  return "This is not an array.";
}

console.log(checkArrayType([1, 2, 3])); // "This is an array."
console.log(checkArrayType("Hello")); // "This is not an array."
console.log(checkArrayType({ key: "value" })); // "This is not an array."

/*
문제4. 객체의 모든 속성에 대해 기본값을 추가하는 타입을 작성하세요.
유틸리티 타입 정의:
 - 타입 이름: WithDefault<T>
 - 입력: 객체 타입 T
 - 출력: 모든 속성 값의 타입이 [originalType, defaultType]의 튜플로 변경된 타입.

테스트:
 - WithDefault<T>를 활용하여 객체 타입을 변환하고, 변환된 타입의 객체를 작성하세요.
*/
type WithDefault<T> = {
  [k in keyof T]: [T[k], T[k]];
};

type Original = { id: number; name: string; isActive: boolean };
type WithDefaults = WithDefault<Original>;

// 기대 결과:
// type WithDefaults = {
//   id: [number, number];
//   name: [string, string];
//   isActive: [boolean, boolean];
// }

const testData: WithDefaults = {
  id: [0, 1],
  name: ["1", "2"],
  isActive: [true, false],
};

/*
문제5. 키와 값을 받아 객체를 생성하는 함수를 작성하세요.
함수 이름: createObject
입력:
 - key: 키 (제네릭 타입 K)
 - value: 값 (제네릭 타입 V)
출력:
 - { key: value } 형태의 객체
*/
function createObject<K extends string | number | symbol, V>(
  key: K,
  value: V
): { [P in K]: V } {
  return { [key]: value } as { [P in K]: V };
}

console.log(createObject("id", 123)); // { id: 123 }
console.log(createObject("name", "Alice")); // { name: "Alice" }

/*
문제 6. 사용자 정보를 나타내는 객체 배열에서 특정 속성만 추출하는 함수를 작성하세요.
함수 이름: pluck
입력:
 - 객체 배열: 제네릭 타입 배열
 - 속성 이름: 제네릭 타입
출력:
 - 속성 값 배열
*/
function pluck<T, K extends keyof T>(array: T[], key: K): T[K][] {
  return array.map((item) => item[key]);
}

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

console.log(pluck(users, "id")); // [1, 2]
console.log(pluck(users, "name")); // ["Alice", "Bob"]
