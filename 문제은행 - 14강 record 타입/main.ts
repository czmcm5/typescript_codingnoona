/*
1. 전자상거래 플랫폼에서 지역 코드에 따른 배송비를 계산하는 로직을 작성하세요.
요구사항:
 - 각 지역에 대한 고유 코드와 배송비가 주어집니다: type RegionCode = "US" | "EU" | "ASIA" | "AFRICA";
 - 지역 코드와 배송비를 매핑하는 데이터 구조를 Record 타입으로 정의하세요.

함수 작성:
 - 함수 이름: calculateShippingCost.
 - 입력: 지역 코드(RegionCode)와 배송비 매핑 객체(Record<RegionCode, number>).
 - 출력: 해당 지역의 배송비.

 추가 요구사항:
 - 지원되지 않는 지역 코드가 입력되면 에러를 발생시킵니다.
*/
type RegionCode = "US" | "EU" | "ASIA" | "AFRICA";

const shippingCosts: Record<RegionCode, number> = {
  US: 10,
  EU: 15,
  ASIA: 20,
  AFRICA: 25,
};

function calculateShippingCost(
  region: RegionCode,
  costs: Record<RegionCode, number>
): number {
  if (!(region in costs)) {
    throw new Error(`Unsupported region code: ${region}`);
  }

  return costs[region];
}

console.log(calculateShippingCost("US", shippingCosts)); // 10
console.log(calculateShippingCost("EU", shippingCosts)); // 15
console.log(calculateShippingCost("ASIA", shippingCosts)); // 20
console.log(calculateShippingCost("AFRICA", shippingCosts)); // 25
try {
  console.log(calculateShippingCost("AUSTRALIA" as RegionCode, shippingCosts)); // 에러 발생
} catch (error) {
  console.error(error); // "Unsupported region code: AUSTRALIA"
}

/*
2. 학생들의 점수를 기록하고 평균 점수를 계산하는 문제입니다.
요구사항:
 - 학생 이름(string)과 점수(number)를 매핑하는 데이터를 Record 타입으로 정의하세요.
 - 평균 점수를 계산하는 함수를 작성하세요.

함수 작성:
 - 함수 이름: calculateAverageScore.
 - 입력: 학생 점수 데이터(Record<string, number>).
 - 출력: 모든 학생의 평균 점수(number).
*/
const scores: Record<string, number> = {
  Alice: 85,
  Bob: 92,
  Charlie: 78,
};

function calculateAverageScore(scores: Record<string, number>): number {
  const n = Object.keys(scores).length;
  const total = Object.values(scores).reduce((acc, cur) => acc + cur, 0);

  return total / n;
}

console.log(calculateAverageScore(scores)); // 85

/*
문제3. 쇼핑몰에서 각 제품의 이름과 가격을 매핑하고, 특정 제품의 가격을 업데이트하는 기능을 구현하세요.
요구사항:
 - 제품 이름(string)과 가격(number)을 매핑하는 데이터를 Record 타입으로 정의하세요.
 - 특정 제품의 가격을 업데이트하는 함수를 작성하세요.

함수 작성:
 - 함수 이름: updateProductPrice.
 - 입력: 제품 가격 데이터(Record<string, number>), 업데이트할 제품 이름과 새로운 가격.
 - 출력: 업데이트된 제품 가격 데이터(Record<string, number>).
*/
const prices: Record<string, number> = {
  Laptop: 1000,
  Phone: 500,
  Tablet: 300,
};

function updateProductPrice(
  prices: Record<string, number>,
  product: string,
  newPrice: number
): Record<string, number> {
  return { ...prices, [product]: newPrice };
}

// 테스트 코드
console.log(updateProductPrice(prices, "Phone", 550));
// 기대 출력: { Laptop: 1000, Phone: 550, Tablet: 300 }
