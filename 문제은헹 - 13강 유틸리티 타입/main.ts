/*
문제 1. 회원가입 폼 데이터의 일부만 채워진 상태를 처리하기 위해, 모든 속성이 선택적인 타입을 생성하는 문제입니다.\
기본 타입 정의:
 - User: 회원 정보 (이름, 이메일, 비밀번호).
 - Partial을 활용: 모든 속성을 선택 속성으로 변경하는 타입을 생성하세요.

함수 작성:
 - 함수 이름: updateUserForm.
 - 입력: 기존 사용자 데이터와 업데이트된 폼 데이터.
 - 출력: 업데이트된 사용자 데이터.
*/
type User = {
  name: string;
  email: string;
  password: string;
};

function updateUserForm(user: User, updates: Partial<User>): User {
  return { ...user, ...updates };
}

const currentUser = {
  name: "Alice",
  email: "alice@example.com",
  password: "1234",
};
const updatedForm = { email: "new-email@example.com" };

console.log(updateUserForm(currentUser, updatedForm));
// 기대 출력: { name: "Alice", email: "new-email@example.com", password: "1234" }

/*
문제 2. 프로필 페이지에 표시할 사용자 정보에서 필요한 속성만 선택하는 문제입니다.
기본 타입 정의:
 - UserProfile: 사용자 프로필 정보 (아이디, 이름, 이메일, 주소).

Pick을 활용:
 - 프로필 페이지에 필요한 데이터(아이디와 이름)만 추출하는 타입을 정의하세요.

함수 작성:
 - 함수 이름: getProfileSummary.
 - 입력: 전체 사용자 정보.
 - 출력: 필요한 속성만 포함된 객체.
*/
type UserProfile = {
  id: number;
  name: string;
  email: string;
  address: string;
};

function getProfileSummary(
  user: UserProfile
): Pick<UserProfile, "id" | "name"> {
  return { id: user.id, name: user.name };
}

const userProfile = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  address: "123 Main St",
};

console.log(getProfileSummary(userProfile));
// 기대 출력: { id: 1, name: "Alice" }

/*
문제 3. 데이터베이스 저장 시 민감한 정보를 제외하는 문제입니다.
기본 타입 정의:
 - User: 사용자 정보 (이름, 이메일, 비밀번호, 역할).

Omit 활용:
 - 민감한 정보를 제외한 타입을 정의하세요. (비밀번호는 제외)

함수 작성:
 - 함수 이름: filterSensitiveInfo.
 - 입력: 전체 사용자 정보.
 - 출력: 민감한 정보가 제외된 객체.
*/
type User_ = {
  name: string;
  email: string;
  password: string;
  role: string;
};

function filterSensitiveInfo(user: User_): Omit<User_, "password"> {
  const { password, ...rest } = user;
  return rest;
}

const userInfo = {
  name: "Alice",
  email: "alice@example.com",
  password: "1234",
  role: "admin",
};

console.log(filterSensitiveInfo(userInfo));
// 기대 출력: { name: "Alice", email: "alice@example.com", role: "admin" }

/*
문제 4. 팀 관리 시스템을 설계하세요. 각 팀은 여러 멤버로 구성되며, 관리자는 특정 역할에 따라 데이터를 조작할 수 있습니다.
기본 타입 정의: TeamMember
 - TeamMember

함수 작성:
(1) createTeamMember:
 - 새 팀원을 생성하는 함수.
 - Partial을 활용하여 입력 데이터 중 일부만 제공되더라도 기본값으로 초기화합니다.
 - 출력:기본값: role: "developer", isActive: true.

(2) filterTeamMembers:
 - 특정 조건에 맞는 팀원만 필터링하는 함수.
 - Pick을 사용해 필터링 기준을 정의합니다. (예: role: "designer" 또는 isActive: false.)

(3) removeSensitiveInfo:
 - 팀원 목록에서 민감한 정보를 제거하는 함수.
 - Omit을 사용해 이메일 주소를 제외한 데이터를 반환합니다.
*/
type TeamMember = {
  id: number;
  name: string;
  email: string;
  role: "developer" | "designer" | "manager";
  isActive: boolean;
};

function createTeamMember(data: Partial<TeamMember>): TeamMember {
  return {
    id: data.id ?? 0,
    name: data.name ?? "",
    email: data.email ?? "",
    role: data.role ?? "developer",
    isActive: data.isActive ?? true,
  };
}

function filterTeamMembers<K extends keyof TeamMember>(
  members: TeamMember[],
  filter: Pick<TeamMember, K>
): TeamMember[] {
  return members.filter((item) =>
    Object.keys(filter).every((key) => item[key] === filter[key])
  );
}

function removeSensitiveInfo(
  members: TeamMember[]
): Omit<TeamMember, "email">[] {
  return members.map(({ email, ...rest }) => rest);
}

const members: TeamMember[] = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    role: "developer",
    isActive: true,
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@example.com",
    role: "designer",
    isActive: false,
  },
  {
    id: 3,
    name: "Charlie",
    email: "charlie@example.com",
    role: "manager",
    isActive: true,
  },
];

const newMember = createTeamMember({ id: 4, name: "Diana" });
console.log(newMember);
// 기대 출력: { id: 4, name: "Diana", email: "", role: "developer", isActive: true }

const activeDesigners = filterTeamMembers(members, {
  role: "designer",
  isActive: true,
});
console.log(activeDesigners);
// 기대 출력: []

const sanitizedMembers = removeSensitiveInfo(members);
console.log(sanitizedMembers);
// 기대 출력: [{ id: 1, name: "Alice", role: "developer", isActive: true }, ...]
