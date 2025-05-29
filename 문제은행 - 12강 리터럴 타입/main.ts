/*
문제 1. 웹 애플리케이션에서 사용할 버튼의 스타일을 선택하는 함수를 작성하세요.
리터럴 타입 정의:
 - 버튼 스타일: "primary", "secondary", "danger".

함수 작성:
 - 함수 이름: getButtonClass.
 - 입력: 버튼 스타일(리터럴 타입).
 - 출력: 스타일에 따라 CSS 클래스를 반환.
 */
function getButtonClass(style: "primary" | "secondary" | "danger"): string {
  return `btn-${style}`;
}

console.log(getButtonClass("primary")); // "btn-primary"
console.log(getButtonClass("secondary")); // "btn-secondary"
console.log(getButtonClass("danger")); // "btn-danger"
// console.log(getButtonClass("unknown")); // 오류 발생

/*
문제 2. 서버에서 데이터를 요청할 때 발생하는 상태를 처리하는 함수를 작성하세요.
리터럴 타입 정의:
 - 요청 상태: "loading", "success", "error".

함수 작성:
 - 함수 이름: handleRequestState.
 - 입력: 요청 상태(리터럴 타입).
 - 출력: 상태에 따라 메시지를 반환.
 */
function handleRequestState(state: "loading" | "success" | "error"): string {
  return state === "loading"
    ? "Loading, please wait..."
    : state === "success"
    ? "Request successful!"
    : "There was an error processing your request.";
}

console.log(handleRequestState("loading")); // "Loading, please wait..."
console.log(handleRequestState("success")); // "Request successful!"
console.log(handleRequestState("error")); // "There was an error processing your request."
// console.log(handleRequestState("unknown")); // 오류 발생
