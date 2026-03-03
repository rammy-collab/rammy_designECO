# Lessons Learned - an-design-match

## 환경 및 인프라
### 1. Windows PowerShell 실행 정책 (Execution Policy)
- **문제**: Windows 환경에서 `npm` 또는 `npx`를 실행할 때 `PSSecurityException` 보안 오류가 발생함.
- **원인**: 기본 실행 정책이 `Restricted`로 설정되어 있어 스크립트 실행이 차단됨. PowerShell 버전 `npm`은 `.ps1` 파일을 참조하므로 정책의 영향을 받음.
- **해결 시도 및 결과**:
    - **1차 (PS Bypass)**: `powershell -ExecutionPolicy Bypass` 명령 -> 사용자 환경에 따라 여전히 제한될 수 있음.
    - **2차 (CMD/Direct)**: PowerShell 대신 CMD를 사용하거나 `npm.cmd`를 직접 호출하여 정책 검사를 우회함.
- **교훈**: Windows 사용자 환경은 다양하므로 가장 확실한 CMD 기반 가이드를 우선 제공해야 함. 또한 "보안 오류"를 "설치 안 됨"으로 오해할 수 있으므로 메시지 구분을 명확히 안내해야 함.

### 2. Next.js 15/16 동적 라우팅 (`params`)
- **문제**: 상세 페이지 진입 시 404 오류 발생.
- **원인**: Next.js 15 버전부터 `params`와 `searchParams`가 **Promise**로 변경되어 `await` 없이 접근할 경우 데이터 로드가 실패함.
- **해결책**: `generateMetadata` 및 `Page` 컴포넌트에서 `params`를 `await` 처리하도록 수정.
- **교훈**: 최신 Next.js 프레임워크 사용 시 파라미터 전달 방식의 변경 사항(Breaking Changes)을 우선 점검해야 함.

### 3. Next.js 외부 이미지 설정 (`next/image`)
- **문제**: 외부 URL 이미지 로딩 런타임 에러 발생.
- **원인**: `next/image`는 보안을 위해 `next.config.ts`에 등록되지 않은 도메인을 차단함.
- **해결책**: `remotePatterns`에 `picsum.photos` 및 리다이렉트 호스트(`fastly.picsum.photos`) 추가.
- **교훈**: 이미지 호스팅 서비스 사용 시 리다이렉트되는 최종 도메인까지 고려하여 설정해야 함.

## 프로젝트 관리
### 1. 사용자 정의 규칙 준수
- **원인**: 초기 작업 시 프로젝트 내부 `tasks/` 폴더 구조를 생략함.
- **해결책**: 세션 시작 시 사용자 규칙을 검토하고 `tasks/todo.md`, `tasks/lessons.md`를 즉시 생성하여 관리함.
