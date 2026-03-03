# 이미지 관리 및 운영 가이드 (기초)

실제 시공 사진을 관리하는 가장 단순한 두 가지 방법을 안내해 드립니다.

## 방법 1: 로컬 프로젝트 내 저장 (가장 쉬운 시작)
개발 단계에서 가장 빠르고 간편한 방법입니다.

1. **폴더 생성**: `public/projects/{id}/` 구조로 폴더를 만듭니다.
   - 예: `public/projects/p_001/`
2. **이미지 넣기**: 해당 폴더에 `cover.webp`, `01.webp`, `before.webp` 등의 파일을 넣습니다.
3. **JSON 수정**: `data/projects.json`의 URL을 다음과 같이 변경합니다.
   - `"url": "/projects/p_001/cover.webp"` (앞에 `public`은 생략합니다.)

## 방법 2: 외부 저장소 사용 (추천: R2)
운영 단계에서 권장되는 방식으로, 이미 제안해 주셨던 방식입니다.

1. **버킷 업로드**: Cloudflare R2 버킷에 `projects/{id}/` 폴더 규칙으로 사진을 올립니다.
2. **도메인 연결**: R2 버킷에 연결된 퍼블릭 도메인을 사용합니다.
3. **JSON 수정**: `data/projects.json`의 URL을 전체 경로로 작성합니다.
   - `"url": "https://your-r2-domain.com/projects/p_001/cover.webp"`

---

## 폴더 규칙 권장안 (최저 복잡도 운영)
실수가 적고 관리가 쉬운 규칙은 다음과 같습니다.

| 파일명 | 역할 | 비고 |
| :--- | :--- | :--- |
| `cover.webp` | 대표 이미지 | 목록 페이지 및 상세 히어로 섹션 |
| `01.webp`, `02.webp`... | 갤러리 이미지 | 순서대로 번호 부여 |
| `before.webp`, `after.webp` | 비교 사진 | Before/After 섹션용 |

### 다음 단계 제안
직접 찍으신 사진 파일이 있다면 `public/projects/` 폴더 아래에 모델명이나 프로젝트 ID별로 정리해서 넣어주세요. 제가 그 경로에 맞춰서 `projects.json` 파일을 업데이트해 드릴 수 있습니다!
