/*
문제 1. 다양한 데이터 타입을 입력받아, 입력에 따라 다른 처리를 수행하는 함수를 작성하세요.
입력은 다음 세 가지 형태 중 하나입니다:
 - 숫자 배열: 배열의 합계를 반환합니다.
 - 문자열 배열: 배열의 모든 문자열을 연결한 결과를 반환합니다.
 - 객체 { message: string }: message 속성을 대문자로 변환한 문자열을 반환합니다.
*/
type InputData = number[] | string[] | { message: string };

function sumArray(arr: number[]): number {
  return arr.reduce((acc, cur) => acc + cur, 0);
}
function joinString(arr: string[]): string {
  return arr.join("");
}
function upperString(obj: { message: string }): string {
  return obj.message.toUpperCase();
}

function processInput(input: InputData): number | string {
  if (Array.isArray(input)) {
    if (typeof input[0] === "number") return sumArray(input as number[]);
    if (typeof input[0] === "string") return joinString(input as string[]);
  }
  if ("message" in input) return upperString(input);

  throw new Error("유효하지 않은 타입");
}

console.log(processInput([1, 2, 3])); // 6
console.log(processInput(["hello", "world"])); // "helloworld"
console.log(processInput({ message: "TypeScript" })); // "TYPESCRIPT"
// console.log(processInput(42)); // 에러 발생

/*
문제 2. 다음 조건을 만족하는 코드를 작성하세요.
아래와 같은 두 개의 클래스를 정의합니다:
 - Car 클래스: brand(브랜드 이름, 문자열) 속성을 가집니다.
 - Bike 클래스: type(바이크 종류, 문자열) 속성을 가집니다.

입력값이 Car 또는 Bike의 인스턴스일 수 있는 vehicle을 받아 다음 규칙에 따라 처리하는 함수를 작성하세요:
 - Car이면 브랜드 이름을 대문자로 반환합니다.
 - Bike이면 바이크 종류 앞에 "Bike: "를 추가하여 반환합니다
*/
class Car {
  constructor(public brand: string) {}
}
class Bike {
  constructor(public type: string) {}
}

function processVehicle(vehicle: Car | Bike): string {
  if ("brand" in vehicle) return vehicle.brand.toUpperCase();
  if ("type" in vehicle) return `Bike: ${vehicle.type}`;

  throw new Error("유효하지 않은 타입");
}

// 정답지의 정답
function processVehicle_answer(vehicle: Car | Bike): string {
  if (vehicle instanceof Car) {
    return vehicle.brand.toUpperCase();
  } else if (vehicle instanceof Bike) {
    return `Bike: ${vehicle.type}`;
  } else {
    throw new Error("유효하지 않은 Vehicle 타입입니다.");
  }
}

const myCar = new Car("Tesla");
const myBike = new Bike("Mountain");

console.log(processVehicle(myCar)); // "TESLA"
console.log(processVehicle(myBike)); // "Bike: Mountain"
// console.log(processVehicle("unknown")); // 에러 발생x

/*
문제 3. in을 활용한 사용자 관리
시스템에는 두 종류의 사용자가 있습니다:
 - Admin 사용자: { type: "admin"; permissions: string[] }
 - User 사용자: { type: "user"; email: string }
 
rocessUser라는 함수를 작성하세요. 함수는 입력으로 Admin 또는 User 객체를 받아 다음과 같이 처리합니다:
 - Admin: 권한 목록(permissions)을 ,로 연결한 문자열을 반환합니다.
 - User: 이메일 주소(email)을 반환합니다
*/
type Admin = { type: "admin"; permissions: string[] };
type User = { type: "user"; email: string };

function processUser(user: Admin | User): string {
  if (user.type === "admin") return user.permissions.join(",");
  if (user.type === "user") return user.email;

  throw new Error("유효하지 않은 타입");
}

// 정답지의 정답
function processUser_answer(user: Admin | User): string {
  if ("permissions" in user) {
    return user.permissions.join(",");
  } else if ("email" in user) {
    return user.email;
  }
  throw new Error("유효하지 않은 타입");
}

console.log(processUser({ type: "admin", permissions: ["read", "write"] })); // "read,write"
console.log(processUser({ type: "user", email: "user@example.com" })); // "user@example.com"
// console.log(processUser({ type: "guest" })); // 에러 발생

/*
문제 4. 아래와 같은 유니온 타입을 처리하는 함수를 작성하세요:
 - Rectangle 객체: { width: number; height: number }
 - Circle 객체: { radius: number }

함수는 다음 규칙에 따라 동작합니다:
 - Rectangle이면 넓이를 반환합니다. (가로 × 세로)
 - Circle이면 넓이를 반환합니다. (π × 반지름²)
*/
type Rectangle = { width: number; height: number };
type Circle = { radius: number };

function isRectangle(shape: unknown): shape is Rectangle {
  return (
    typeof shape === "object" &&
    shape !== null &&
    "width" in shape &&
    "height" in shape
  );

  // 정답지의 정답
  //   return (
  //     (shape as Rectangle).width !== undefined &&
  //     (shape as Rectangle).height !== undefined
  //   );
}

function calculateArea(shape: Rectangle | Circle): number {
  if (isRectangle(shape)) return shape.width * shape.height;
  if ("radius" in shape) return Math.PI * shape.radius ** 2;

  throw new Error("유효하지 않은 타입");
}

console.log(calculateArea({ width: 10, height: 5 })); // 50
console.log(calculateArea({ radius: 7 })); // 153.93804002589985 (대략 π * 7²)

/*
문제5. 유니온 타입의 문제점과 해결 방법
아래와 같은 두 가지 유니온 타입을 처리하는 함수가 있습니다:
 - Square: { type: "square"; side: number }
 - Circle: { type: "circle"; radius: number }
    calculateArea라는 함수는 두 타입의 넓이를 계산하려고 하지만, 유니온 타입을 제대로 처리하지 않고 사용할 경우 런타임 에러가 발생할 가능성이 생길 수 있다. 이를 해결 방법을 작성하세요.

해결 방법:
 - 식별 가능한 유니온(type 속성)을 사용하여 타입을 안전하게 좁히는 코드를 작성하세요.
 - exhaustiveness check를 추가하여, 새로운 타입이 추가되더라도 타입 안정성을 유지하도록 구현하세요.
*/

type Shape = { side: number } | { radius: number };
type Shape_ =
  | { type: "square"; side: number }
  | { type: "circle"; radius: number };

function calculateArea_(shape: Shape): number {
  const reShape = returnType(shape);

  switch (reShape.type) {
    case "square":
      return reShape.side ** 2;
    case "circle":
      return Math.PI * reShape.radius ** 2;
  }

  exhaustiveCheck(reShape);
}

// 테스트 코드의 인수값을 수정하지 않도록 할 수 잇게
function returnType(shape: Shape): Shape_ {
  if ("side" in shape && "radius" in shape) {
    throw new Error("에러 발생");
  }
  if ("side" in shape) return { type: "square", side: shape.side };
  if ("radius" in shape) return { type: "circle", radius: shape.radius };

  exhaustiveCheck(shape);
}

function exhaustiveCheck(params: never): never {
  throw new Error("에러 발생");
}

console.log(calculateArea_({ side: 5 })); // 기대 출력: 25
console.log(calculateArea_({ radius: 7 })); // 기대 출력: 153.93804002589985

// ----- 정답지의 정답
type Square__ = { type: "square"; side: number };
type Circle__ = { type: "circle"; radius: number };

type Shape__ = Square__ | Circle__;

function calculateArea_answer(shape: Shape__): number {
  switch (shape.type) {
    case "square":
      return shape.side ** 2;
    case "circle":
      return Math.PI * shape.radius ** 2;
    default:
      // Exhaustiveness check
      const _exhaustive: never = shape;
      throw new Error(`Unhandled shape type: ${_exhaustive}`);
  }
}

console.log(calculateArea_answer({ type: "square", side: 5 }));
console.log(calculateArea_answer({ type: "circle", radius: 7 }));
