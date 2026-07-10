# BA Handbook Notes

> Index cho các markdown notes thực hành trong BA handbook. Note được tổ chức theo 9 nhóm bám vòng đời phân tích nghiệp vụ. Mở file này để chọn nhóm cần học, rồi đi vào README của từng nhóm.
>
> Trước khi thêm hoặc sửa note, đọc [[note-guidelines|Note guidelines]].

---

## Nhóm chủ đề

| Nhóm | Dùng khi | Trạng thái | Index |
|---|---|---|---|
| 00 — Foundations | cần hiểu vai trò BA, SDLC, hệ tài liệu trước khi vào việc | có note | [[00-foundations/README\|00 — Foundations]] |
| 01 — Discovery & Requirements | khai thác và làm rõ yêu cầu trước khi thiết kế | có note | [[01-discovery-and-requirements/README\|01 — Discovery & Requirements]] |
| 02 — System Analysis & Design | bóc tách, ưu tiên, mô hình hóa hệ thống | có note | [[02-system-analysis-and-design/README\|02 — System Analysis & Design]] |
| 03 — Specification | viết đặc tả và truy vết yêu cầu (SRS, RTM) | scaffold | [[03-specification/README\|03 — Specification]] |
| 04 — Agile Delivery | biến requirement thành backlog và giao giá trị | có note | [[04-agile-delivery/README\|04 — Agile Delivery]] |
| 05 — Domain Knowledge | nắm nghiệp vụ theo domain cụ thể | scaffold | [[05-domain-knowledge/README\|05 — Domain Knowledge]] |
| 06 — Soft Skills | giao tiếp, facilitation, đàm phán scope | có note | [[06-soft-skills/README\|06 — Soft Skills]] |
| 07 — Tools | dùng Jira, Confluence, Figma, SQL cho BA | scaffold | [[07-tools/README\|07 — Tools]] |
| 08 — Templates | template copy-ready khi viết tài liệu | có note | [[08-templates/README\|08 — Templates]] |

"scaffold" = đã có README + `_conventions.md`, nội dung nằm trong Planned scope, chưa có note.

---

## Mở từ đâu?

### Nếu mới vào nghề hoặc vào dự án mới

1. [[ba-role-and-sdlc|Vai trò BA và vị trí trong dự án]]
2. [[ba-documentation-types|Hệ tài liệu BA phải biết]]
3. [[agile-vs-waterfall-for-ba|Agile vs Waterfall cho BA]]

Hiểu mình kết nối ai, ra artifact gì ở mỗi pha, và mô hình dự án ảnh hưởng cách làm việc thế nào, trước khi đi sâu vào elicitation.

### Nếu đang học Agile BA từ đầu

1. [[agile-concepts-for-ba|Agile cho Business Analyst]]
2. [[requirement-elicitation|Requirement Elicitation cho BA]]
3. [[case-study-to-agile-ba-delivery|Từ case study ra backlog Agile cho BA]]
4. [[user-story-and-acceptance-criteria|User Story và Acceptance Criteria cho BA]]
5. [[backlog-refinement|Backlog Refinement cho BA]]
6. [[change-request-and-impact-analysis|Change Request và Impact Analysis cho BA]]
7. [[ba-artifact-templates|BA Artifact Templates]]

### Nếu đang phân tích và thiết kế hệ thống

1. [[functional-decomposition-diagram|Functional Decomposition Diagram (FDD)]]
2. [[moscow-prioritization|MoSCoW cho BA]]
3. [[system-analysis-common-principles|4 nguyên tắc chung khi phân tích hệ thống]]
4. [[crud-operations|Nguyên tắc CRUD cho BA]]
5. [[use-case-diagram|Use Case cho BA]]
6. [[fdd-vs-use-case|FDD vs Use Case: chọn cái nào]]

Dùng FDD để bóc tách hệ thống, MoSCoW để chốt tính năng chính, 4 nguyên tắc chung như checklist chống sót module nền, CRUD để soát đủ thao tác dữ liệu, Use Case để mô tả chi tiết từng tính năng, và note so sánh để chọn đúng công cụ.

### Nếu đang làm bài case study hoặc phân tích requirement

1. [[requirement-elicitation|Requirement Elicitation cho BA]]
2. [[case-study-to-agile-ba-delivery|Từ case study ra backlog Agile cho BA]]
3. [[user-story-and-acceptance-criteria|User Story và Acceptance Criteria cho BA]]
4. [[backlog-refinement|Backlog Refinement cho BA]]
5. [[ba-artifact-templates|BA Artifact Templates]]

### Nếu đang viết hoặc review User Story

1. [[user-story-and-acceptance-criteria|User Story và Acceptance Criteria cho BA]]
2. [[backlog-refinement|Backlog Refinement cho BA]]
3. [[ba-artifact-templates|BA Artifact Templates]]

Nếu story còn mơ hồ, quay lại [[requirement-elicitation|Requirement Elicitation cho BA]] để làm rõ pain point, rule, assumption và dependency.

### Nếu stakeholder đổi requirement hoặc scope

1. [[change-request-and-impact-analysis|Change Request và Impact Analysis cho BA]]
2. [[backlog-refinement|Backlog Refinement cho BA]]
3. [[ba-artifact-templates|BA Artifact Templates]]

---

## Tất cả notes hiện có

### 00 — Foundations

| Note | Dùng khi |
|---|---|
| [[ba-role-and-sdlc|Vai trò BA và vị trí trong dự án]] | cần định vị vai trò BA, bản đồ stakeholder, đầu ra theo pha SDLC, hoặc xem lộ trình nghề |
| [[agile-vs-waterfall-for-ba|Agile vs Waterfall cho BA]] | cần chỉnh cách làm việc và bộ tài liệu theo mô hình dự án |
| [[ba-documentation-types|Hệ tài liệu BA phải biết]] | cần xếp tài liệu vào tầng why/what/how và biết BA làm chủ nhóm nào |

### 01 — Discovery & Requirements

| Note | Dùng khi |
|---|---|
| [[problem-framing-and-business-objectives|Problem Framing & Business Objectives]] | cần tách symptom/problem/solution idea và chốt objective có measure |
| [[current-state-and-future-state-analysis|Current & Future State Analysis]] | cần mô tả as-is, future capability, gap và transition need |
| [[stakeholder-analysis-and-engagement|Stakeholder Analysis & Engagement]] | cần tìm stakeholder, evidence, authority và engagement phù hợp |
| [[scope-assumptions-constraints|Scope, Assumptions & Constraints]] | cần quản boundary, uncertainty, dependency và constraint có nguồn |
| [[requirement-elicitation|Requirement Elicitation cho BA]] | cần khai thác requirement từ stakeholder, case study, tài liệu cũ, hoặc observation thực tế |
| [[elicitation-technique-selection|Elicitation Technique Selection]] | cần chọn technique theo unknown, evidence, bias và context |
| [[stakeholder-interview|Stakeholder Interview]] | cần khai thác context/example qua trao đổi 1:1 |
| [[requirements-workshop|Requirements Workshop]] | cần shared model, alignment hoặc decision nhiều bên |
| [[non-functional-requirements-for-ba|Non-functional Requirements cho BA]] | cần khai thác quality expectation thành scenario có measure |
| [[requirement-quality-and-validation|Requirement Quality & Validation]] | cần verify/validate requirement trước handoff |
| [[solution-options-and-business-case|Solution Options & Business Case]] | cần so sánh option và tạo recommendation cuối discovery |
| [[observation-for-ba|Observation & Contextual Inquiry cho BA]] | cần quan sát workflow thực tế, work-as-done vs work-as-described |
| [[survey-for-ba|Survey cho BA]] | cần đo prevalence, segment signal sau exploratory research |
| [[document-analysis-for-ba|Document Analysis cho BA]] | cần trích xuất rule, term, constraint từ policy, form, log, spec |
| [[prototype-for-elicitation|Prototype cho Elicitation]] | cần feedback sớm về flow/interaction trước khi dev build |

### 02 — System Analysis & Design

| Note | Dùng khi |
|---|---|
| [[functional-decomposition-diagram|Functional Decomposition Diagram (FDD)]] | cần bóc tách hệ thống thành cây tính năng để viết spec, dựng overview, kiểm soát scope |
| [[moscow-prioritization|MoSCoW cho BA]] | cần ưu tiên tính năng, chốt nhánh chính cho FDD, hoặc giải thích vì sao một tính năng bị hoãn |
| [[system-analysis-common-principles|4 nguyên tắc chung khi phân tích hệ thống]] | cần checklist chống sót module nền: Data, Notification, Report/Dashboard, Setting/Setup |
| [[crud-operations|Nguyên tắc CRUD cho BA]] | cần bóc tính năng "Quản lý" hoặc quy trình phức tạp ra Create/Read/Update/Delete mà không sót case |
| [[use-case-diagram|Use Case cho BA]] | cần mô tả chi tiết kịch bản tính năng: actor, trigger, pre/post-condition, normal case, exception |
| [[fdd-vs-use-case|FDD vs Use Case: chọn cái nào]] | cần quyết định dùng FDD, Use Case, hay cả hai cho dự án |

### 04 — Agile Delivery

| Note | Dùng khi |
|---|---|
| [[agile-concepts-for-ba|Agile cho Business Analyst]] | cần hiểu khái niệm Agile/Scrum/Kanban, work item types, refinement, DoR/DoD, estimation, prioritization |
| [[case-study-to-agile-ba-delivery|Từ case study ra backlog Agile cho BA]] | cần đi từ case study hoặc scenario thô ra pain point, requirement, backlog item, sprint slice, priority, story point |
| [[user-story-and-acceptance-criteria|User Story và Acceptance Criteria cho BA]] | cần viết story, kiểm tra AC, split story, hoặc review story trước refinement |
| [[backlog-refinement|Backlog Refinement cho BA]] | cần chuẩn bị refinement, xác định ready/not ready, ghi decision, dependency, open questions |
| [[change-request-and-impact-analysis|Change Request và Impact Analysis cho BA]] | cần xử lý đổi requirement/scope, phân tích impact, đưa option và ghi decision |

### 08 — Templates

| Note | Dùng khi |
|---|---|
| [[ba-artifact-templates|BA Artifact Templates]] | cần copy nhanh template user story, AC, DoR/DoD, decision log, open question register, elicitation note |

### 06 — Soft Skills

| Note | Dùng khi |
|---|---|
| [[critical-thinking-and-structured-thinking|Tư duy phản biện & Có cấu trúc cho BA]] | cần khung 5W1H, phân biệt fact/assumption/opinion, hypothesis vs causal chain, pyramid principle |
| [[facilitation-for-ba|Facilitation cho BA]] | cần dẫn workshop/refinement hiệu quả, xử lý dynamics, silent-first |
| [[scope-negotiation-for-ba|Đàm phán scope cho BA]] | cần xử lý kỳ vọng stakeholder, trade-off, nói "không" đúng cách |
| [[writing-clearly-for-ba|Viết rõ ràng cho BA]] | cần viết requirement/AC không mơ hồ, unambiguous, audience-specific |

---

## Khoảng trống nên bổ sung sau

Roadmap chi tiết nằm trong README của từng nhóm (mục Planned scope). Các note dự kiến:

- **00 — Foundations:** BABOK overview (knowledge areas)
- **01 — Discovery:** v1 đã đủ 15 note; có thể mở rộng thêm Contextual Inquiry nâng cao khi có nhu cầu
- **02 — System Analysis & Design:** Activity Diagram, Sequence Diagram, State Machine, Wireframe, BPMN, ERD, Data Dictionary, Permission Matrix, Integration Analysis, System Context, Model Selection
- **02 — System Analysis & Design:** Activity Diagram, Sequence Diagram, State Machine, Wireframe
- **03 — Specification:** SRS/FRS, BRD, Requirements Traceability Matrix (RTM)
- **04 — Agile Delivery:** Prioritization and Estimation, Process Modeling and Flow Diagram
- **05 — Domain Knowledge:** theo domain dự án thực tế
- **06 — Soft Skills:** v1 đã đủ 4 note; có thể mở rộng conflict resolution, storytelling cho BA
- **07 — Tools:** Jira/Confluence, Figma, SQL cho BA
- **08 — Templates:** SRS and Functional Specification

Đây là roadmap, không phải missing content. Khi viết, bám [[note-guidelines|Note guidelines]] ngay từ batch đầu.

## Related

- [[../README|BA Handbook]]
- [[note-guidelines|Note guidelines]]
- [[../glossary|Glossary]]
- [[../mapping/README|Study Map & Source Mapping]]
