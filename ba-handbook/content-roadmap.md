# BA Handbook Content Gap Analysis & Roadmap

> Audit ngày 2026-06-18. File này là backlog nội dung, không phải index note đã
> tồn tại. Chỉ tạo file mới khi bắt đầu viết và phải hoàn thành theo quality bar
> trong [[notes/note-guidelines|Note guidelines]]; không tạo placeholder rỗng.

## 1. Kết luận audit

Handbook hiện có khung tổ chức tốt nhưng chưa phủ xong toàn bộ công việc BA.
Nhóm `01-discovery-and-requirements` đã hoàn thành scope v1 ngày 2026-06-18:

- Có 35 file Markdown và **14 practical note**: 3 Foundations + 11 Discovery.
- Discovery v1 có đủ 11 note và 9 PlantUML đã qua parser/build.
- `02`, `04`, `08` vẫn khai báo tổng cộng **12 file trong Current scope nhưng
  các file đó chưa tồn tại**.
- `03`, `05`, `06`, `07` mới chỉ có `README.md` và `_conventions.md`.
- Chưa có `ba-handbook/README.md`, dù nhiều file đang link tới nó.
- Chưa có nội dung bao phủ đầy đủ strategy analysis, BA planning, requirements
  life cycle, validation/UAT, transition và solution evaluation.
- `library/`, `collections/`, `mapping/`, `pipelines/` được guideline và các note
  tham chiếu nhưng không tồn tại trong handbook hiện tại.
- 14 file scaffold cũ còn dòng rác `</content>` ở cuối file.
- Importer hiện rewrite được 15 wikilink và hạ 35 lượt wikilink không resolve
  thành plain text. Phần lớn link hỏng sẽ được xử lý khi hoàn thành P1 bên dưới.

### Mức ưu tiên

- **P0 — Integrity:** sửa cấu trúc và lời hứa sai trong index trước khi viết thêm.
- **P1 — Core path:** hoàn thành các file mà handbook đang tuyên bố là đã có.
- **P2 — Full BA lifecycle:** lấp các khoảng trống để handbook dùng được từ
  problem framing đến đánh giá giải pháp.
- **P3 — Expansion:** mở rộng tool, template và domain khi core path đã ổn định.

## 2. Ma trận coverage hiện tại

| Năng lực BA | Coverage hiện tại | Kết luận |
|---|---|---|
| BA planning & monitoring | chỉ chạm nhẹ trong note vai trò | thiếu |
| Strategy analysis / problem framing | có problem, current/future, option | đạt scope v1 |
| Elicitation & collaboration | 11 note Discovery, gồm interview/workshop/NFR/validation | đạt scope v1 |
| Requirements life cycle management | chưa có | thiếu nghiêm trọng |
| Requirements analysis & design definition | có roadmap, không có note | thiếu nghiêm trọng |
| Specification & traceability | scaffold | thiếu nghiêm trọng |
| Agile delivery | có roadmap, không có note | thiếu nghiêm trọng |
| Validation, UAT & transition | gần như chưa có | thiếu nghiêm trọng |
| Solution evaluation | không có nhóm | thiếu nghiêm trọng |
| Communication & facilitation | scaffold | thiếu |
| Technical literacy & tools | scaffold | thiếu |
| Domain knowledge | chủ ý để trống tới khi có nguồn thật | hợp lý |
| Copy-ready templates | có roadmap, không có template | thiếu |

## 3. P0 — File và việc cần làm trước batch nội dung

### `ba-handbook/README.md`

File entry point của toàn handbook, cần có:

- handbook dành cho ai, giúp giải quyết việc gì và không cố thay thế tài liệu nào;
- bản đồ thư mục và phân biệt `notes`, source/evidence, template, roadmap;
- ba reading path: BA mới, BA vào dự án mới, BA đang xử lý một requirement;
- trạng thái thật của từng nhóm: `available`, `planned`, `conditional`;
- quy tắc bằng chứng, cách dùng glossary và cách báo nội dung chưa kiểm chứng;
- cách note được import lên blog và loại file nào không publish;
- link tới `notes/README.md`, `notes/note-guidelines.md`, `glossary.md` và file này.

### `ba-handbook/source-register.md`

Khuyến nghị cho bản handbook standalone. File này cần:

- danh sách nguồn chuẩn được chấp nhận: IIBA/BABOK, Scrum Guide, OMG UML/BPMN,
  tài liệu chính thức của tool và tài liệu domain;
- trường bắt buộc cho mỗi source: title, owner, version/date, URL/path, phạm vi,
  note đang sử dụng source;
- quy tắc phân biệt nguồn primary, secondary và kinh nghiệm dự án;
- trạng thái `verified`, `needs review`, `unavailable`;
- cách thay thế các link ma tới `library/`, `collections/`, `mapping/` nếu không
  khôi phục source vault gốc.

> Không tự tạo lại PDF hoặc lesson note trong các thư mục ma. Hoặc khôi phục đúng
> source vault gốc, hoặc chuyển handbook sang mô hình standalone với
> `source-register.md` rồi sửa các `Internal Sources` tương ứng.

### Việc integrity không cần file mới

- Sửa `notes/README.md` và README từng nhóm: mọi note chưa có phải nằm trong
  `Planned scope`, không được nằm trong `Current scope` hay “Tất cả notes hiện có”.
- Xóa dòng rác `</content>` khỏi 17 file.
- Sửa convention notation: UML Activity Diagram dùng notation UML; BPMN process
  model dùng BPMN. Không gọi BPMN là notation mặc định của Activity Diagram.
- Quyết định cách publish `glossary.md`; file có tồn tại nhưng importer hiện không
  đưa nó vào resolution map, làm mọi `[[glossary]]` trong bài blog thành plain text.
- Xóa các wikilink ví dụ giả như `[[basename]]`, `[[note khác]]`, `[[...]]` khỏi
  vùng mà link checker coi là link thật, hoặc đặt chúng trong code span/code block.

## 4. P1 — Hoàn thành core path đang được handbook hứa hẹn

Discovery đã hoàn thành. Còn 12 file ở các nhóm khác đang được liệt kê như thể đã
tồn tại; viết theo thứ tự dưới đây để đóng broken wikilink còn lại.

### 4.1 Discovery & Requirements — hoàn thành 2026-06-18

#### `notes/01-discovery-and-requirements/requirement-elicitation.md`

Đã triển khai đầy đủ cùng 10 note bổ trợ trong README của nhóm. Baseline đã dùng:

- output của elicitation: fact, pain point, requirement, business rule,
  assumption, constraint và open question;
- cách lập elicitation plan: mục tiêu, stakeholder, thông tin cần lấy, kỹ thuật,
  agenda, cách ghi nhận và cách xác nhận;
- decision matrix chọn interview, workshop, observation, document analysis,
  survey, prototype;
- quy trình trước/trong/sau buổi elicitation;
- cách tách requirement khỏi solution được đề xuất quá sớm;
- ví dụ xuyên suốt từ lời nói mơ hồ đến requirement đã xác nhận;
- anti-pattern, checklist completeness và link tới các note chuyên sâu.

### 4.2 System Analysis & Design

#### `notes/02-system-analysis-and-design/functional-decomposition-diagram.md`

- FDD là gì, không phải UML và khác organization chart/process flow thế nào;
- input cần có, quy tắc đặt tên theo chức năng và độ sâu ba cấp mặc định;
- cách đi từ scope đến module, feature và leaf function;
- kiểm tra MECE có kiểm soát, scope boundary và traceability về requirement;
- một ví dụ hoàn chỉnh, lỗi phân rã theo màn hình/phòng ban và checklist review.

#### `notes/02-system-analysis-and-design/moscow-prioritization.md`

- nghĩa thực dụng của Must/Should/Could/Won't và cách chốt timebox;
- tiêu chí Must có thể kiểm chứng, không dựa vào cảm giác stakeholder;
- workshop ưu tiên, xử lý xung đột và ghi rationale/owner/date;
- quan hệ với dependency, risk, value, effort và release scope;
- ví dụ trước/sau, anti-pattern “mọi thứ đều Must” và khi không nên dùng MoSCoW.

#### `notes/02-system-analysis-and-design/system-analysis-common-principles.md`

- giải thích Data, Notification, Report/Dashboard, Setting/Setup là heuristic,
  không phải bốn module bắt buộc của mọi hệ thống;
- câu hỏi rà soát cho từng nhóm và dấu hiệu nên loại bỏ;
- ví dụ áp dụng trên một hệ thống cụ thể;
- các phần thường bị bỏ sót ngoài heuristic: permission, audit, error/recovery,
  integration, migration, observability;
- checklist dùng sau FDD và trước khi viết use case/spec.

#### `notes/02-system-analysis-and-design/crud-operations.md`

- xác định entity trước khi lập CRUD matrix;
- CRUD ở mức dữ liệu khác workflow nghiệp vụ thế nào;
- permission, validation, lifecycle state, bulk operation, import/export,
  archive/restore và audit trail;
- trường hợp cố ép CRUD sẽ làm sai bài toán;
- ví dụ CRUD matrix và checklist completeness.

#### `notes/02-system-analysis-and-design/use-case-diagram.md`

- phân biệt use case model, use case diagram và textual use case specification;
- system boundary, actor, association, include, extend, generalization;
- cách tìm use case từ user goal, không từ nút bấm/màn hình;
- textual spec đủ actor, trigger, pre/post-condition, normal, alternate và
  exception flow;
- mapping use case sang requirement, AC và test case;
- ví dụ PlantUML kèm spec, anti-pattern lạm dụng include/extend.

#### `notes/02-system-analysis-and-design/fdd-vs-use-case.md`

- decision matrix theo câu hỏi cần trả lời, audience, giai đoạn và độ chi tiết;
- cùng một case được mô tả bằng FDD và Use Case để thấy hai góc nhìn;
- trace từ nhánh FDD sang use case và trường hợp chỉ cần một trong hai;
- anti-pattern dùng diagram để trang trí hoặc duy trì hai artifact không đồng bộ.

### 4.3 Agile Delivery

#### `notes/04-agile-delivery/agile-concepts-for-ba.md`

- phân biệt Agile mindset, Scrum framework và Kanban method;
- Scrum accountabilities, events, artifacts và commitments;
- nói rõ BA không phải accountability chính thức trong Scrum; cách năng lực BA
  được Product Owner/team thực hiện tùy tổ chức;
- product goal → epic/feature → story/task và điểm nào là convention của tool;
- refinement là hoạt động liên tục; DoR là team convention, không phải artifact
  chính thức của Scrum;
- vai trò thực tế của BA trong planning, refinement, review và discovery;
- glossary, anti-pattern và checklist onboarding một Agile team.

#### `notes/04-agile-delivery/case-study-to-agile-ba-delivery.md`

- một case study duy nhất đi xuyên problem → outcome → stakeholder → scope;
- pain point, business rule, assumption, constraint và open question;
- cách tạo product goal, backlog, story map, sprint slice, priority và estimate;
- traceability từ evidence tới story và AC;
- các decision gate và lý do loại/hoãn requirement;
- output mẫu cuối cùng đủ để dùng làm bài thực hành.

#### `notes/04-agile-delivery/user-story-and-acceptance-criteria.md`

- user story là placeholder cho conversation, không phải mini-spec;
- mẫu role/goal/value, INVEST và cách tránh role giả;
- AC checklist so với Given/When/Then, business rule so với AC;
- happy path, boundary, permission, validation và exception;
- kỹ thuật split story theo workflow step, rule, operation, data hoặc scenario;
- ví dụ story tốt/xấu và checklist ready.

#### `notes/04-agile-delivery/backlog-refinement.md`

- mục tiêu, input, output, participant và preparation;
- làm rõ value, scope, AC, dependency, risk, open question và estimate;
- tiêu chí Ready là agreement của team, không phải chuẩn bắt buộc toàn ngành;
- cách ghi decision và parking lot;
- facilitation agenda, ví dụ một item từ Not ready thành Ready;
- anti-pattern biến refinement thành status meeting hoặc solution design độc thoại.

#### `notes/04-agile-delivery/change-request-and-impact-analysis.md`

- phân biệt defect, clarification, scope change và change request;
- intake và baseline: cái gì thay đổi so với quyết định nào;
- impact dimensions: value, scope, process, data, UI, integration, security,
  compliance, test, operation, cost và timeline;
- option analysis: accept, reject, defer, split, workaround;
- đường xử lý trong Waterfall, Agile và hybrid;
- decision log, approval, traceability và ví dụ hoàn chỉnh.

### 4.4 Templates

#### `notes/08-templates/ba-artifact-templates.md`

Không nên trở thành một file khổng lồ chứa mọi template. Dùng nó làm **template
catalog**:

- bảng artifact → dùng khi nào → input → owner → link template chuyên biệt;
- quick templates ngắn: open-question log, assumption log, decision log;
- quy tắc chọn artifact tối thiểu theo context;
- cảnh báo template không thay thế tư duy và không phải mọi dự án cần mọi file;
- ví dụ “minimum viable documentation set” cho Waterfall, Agile và hybrid.

## 5. P2 — File còn thiếu để phủ đủ vòng đời BA

### 5.1 Foundations, planning và strategy

| File cần viết | Nội dung chính phải có |
|---|---|
| `notes/00-foundations/babok-overview.md` | sáu knowledge area, task/output ở mức bản đồ, underlying competencies, techniques, perspectives; cách dùng BABOK để tra cứu chứ không học thuộc |
| `notes/00-foundations/business-analysis-approach-and-plan.md` | predictive/adaptive approach, deliverable, activity, estimate, stakeholder engagement, governance, information management, performance measure |
| Discovery & strategy v1 | Đã hoàn thành trong `notes/01-discovery-and-requirements/`; xem README nhóm |

### 5.2 Discovery chuyên sâu

| File cần viết | Nội dung chính phải có |
|---|---|
| Discovery chuyên sâu v1 | Đã hoàn thành trong `notes/01-discovery-and-requirements/`; mở rộng technique chuyên biệt ở v2 khi có nhu cầu |

### 5.3 Analysis và modeling

| File cần viết | Nội dung chính phải có |
|---|---|
| `notes/02-system-analysis-and-design/activity-diagram.md` | UML Activity notation, action/control/object flow, decision/merge, fork/join, swimlane, khi dùng thay BPMN |
| `notes/02-system-analysis-and-design/business-process-modeling-bpmn.md` | process boundary, event, activity, gateway, pool/lane, message flow, as-is/to-be và model validation |
| `notes/02-system-analysis-and-design/sequence-diagram.md` | lifeline, message, sync/async, alt/opt/loop, system sequence vs design sequence, mức chi tiết phù hợp BA |
| `notes/02-system-analysis-and-design/state-machine.md` | state, event, transition, guard, action, terminal state; phát hiện transition/exception bị thiếu |
| `notes/02-system-analysis-and-design/wireframing-for-ba.md` | user goal, screen flow, annotation, state/error/empty/loading, responsive/accessibility, handoff và giới hạn với UI design |
| `notes/02-system-analysis-and-design/business-rules-and-decision-tables.md` | rule type, source/owner, decision table/tree, conflict/completeness, effective date và traceability |
| `notes/02-system-analysis-and-design/data-modeling-and-erd.md` | entity, attribute, identifier, relationship, cardinality, conceptual/logical model, business rule và normalization ở mức BA |
| `notes/02-system-analysis-and-design/data-dictionary.md` | field definition, type/format, allowed value, source, sensitivity, null/default, owner, lineage và example |
| `notes/02-system-analysis-and-design/interface-and-integration-analysis.md` | system context, producer/consumer, contract, mapping, sync/async, error/retry/idempotency, SLA và ownership |
| `notes/02-system-analysis-and-design/role-permission-matrix.md` | role, resource/action, least privilege, segregation of duties, default/exception, approval và audit |

> Di chuyển “Process Modeling and Flow Diagram” khỏi Planned scope của
> `04-agile-delivery` sang nhóm `02`; modeling quy trình không phụ thuộc Agile.

### 5.4 Specification và requirements life cycle

| File cần viết | Nội dung chính phải có |
|---|---|
| `notes/03-specification/brd.md` | objective, background, scope, stakeholder, business requirement/rule, KPI, constraint, risk, approval; khi không cần BRD riêng |
| `notes/03-specification/srs-and-frs.md` | audience, scope, context, functional/NFR/interface/data requirement, ID, priority, rationale, acceptance và glossary |
| `notes/03-specification/writing-non-functional-requirements.md` | measurable quality scenario, operating condition, threshold, measurement method, trade-off và owner |
| `notes/03-specification/requirements-traceability-matrix.md` | source → requirement → design/use case/story → test → release; coverage, orphan link, change impact và maintenance |
| `notes/03-specification/requirements-lifecycle-management.md` | trạng thái requirement, owner, priority, approval, change, trace, reuse, retirement và audit trail |
| `notes/03-specification/baseline-versioning-and-approval.md` | baseline, version, review cycle, approval authority, change after baseline và decision evidence |
| `notes/03-specification/transition-requirements.md` | migration, training, rollout, cutover, coexistence, support và requirement chỉ tồn tại trong chuyển đổi |
| `notes/03-specification/requirement-review-checklist.md` | peer review, stakeholder walkthrough, dev/test review, defect classification, closure và sign-off evidence |

### 5.5 Delivery, validation và transition

| File cần viết | Nội dung chính phải có |
|---|---|
| `notes/04-agile-delivery/prioritization-and-estimation.md` | value/risk/dependency/cost of delay, MoSCoW/RICE/WSJF ở đúng phạm vi, relative estimate, uncertainty và anti-gaming |
| `notes/04-agile-delivery/story-mapping-and-slicing.md` | user journey backbone, activities/tasks, release slice, vertical slicing, dependency và MVP hypothesis |
| `notes/04-agile-delivery/product-backlog-management.md` | ordering, ownership, item states, aging, dependency, technical work, discovery item và backlog health |
| `notes/04-agile-delivery/uat-planning-and-support.md` | objective, participant, environment/data, scenario, entry/exit, defect/feedback triage, evidence và sign-off |
| `notes/04-agile-delivery/defect-triage-and-requirement-clarification.md` | defect vs expected behavior vs change, severity/priority, evidence, owner, decision và spec update |
| `notes/04-agile-delivery/release-readiness-and-transition.md` | requirement coverage, open risk, training, migration, operation/support, rollback và go/no-go input |

### 5.6 Soft skills

| File cần viết | Nội dung chính phải có |
|---|---|
| `notes/06-soft-skills/facilitation-for-ba.md` | outcome, agenda, working agreement, participation, divergence/convergence, conflict, decision và follow-up |
| `notes/06-soft-skills/negotiating-scope.md` | interest vs position, constraint, option/trade-off, saying no with evidence, escalation và decision log |
| `notes/06-soft-skills/writing-clear-requirements.md` | ambiguity, vague qualifier, passive voice, compound requirement, terminology, examples trước/sau |
| `notes/06-soft-skills/active-listening-and-questioning.md` | paraphrase, probe, silence, leading question, confirmation và conversation examples |
| `notes/06-soft-skills/conflict-resolution-and-escalation.md` | conflict type, shared objective, evidence, facilitation, decision authority, escalation threshold |
| `notes/06-soft-skills/stakeholder-communication.md` | audience, information need, channel/cadence, difficult update, executive summary và communication failure |

### 5.7 Nhóm mới: Solution Evaluation

Nhóm này cần vì lifecycle hiện dừng ở delivery, trong khi BA còn phải đo xem giải
pháp có tạo ra outcome và xử lý limitation hay không.

| File cần viết | Nội dung chính phải có |
|---|---|
| `notes/09-solution-evaluation/README.md` | mục tiêu nhóm, current/planned scope, reading path và related groups |
| `notes/09-solution-evaluation/_conventions.md` | hard rules về baseline, metric source, output vs outcome, attribution, period đo và evidence |
| `notes/09-solution-evaluation/solution-performance-and-kpis.md` | objective → KPI, baseline/target, leading/lagging, data source, frequency, owner và interpretation |
| `notes/09-solution-evaluation/solution-limitations-and-root-causes.md` | observed problem, evidence, solution vs enterprise limitation, root cause, option và recommendation |
| `notes/09-solution-evaluation/post-implementation-review.md` | review timing, expected vs actual outcome, adoption, incident, feedback, lesson và action owner |
| `notes/09-solution-evaluation/benefits-realization-and-feedback-loop.md` | benefit hypothesis, realization period, qualitative/quantitative feedback, backlog response và stop/iterate/scale decision |

Khi tạo nhóm này phải cập nhật taxonomy và đăng ký `_conventions.md` trong
`notes/note-guidelines.md`.

## 6. P3 — Tool, template và domain expansion

### 6.1 Tools & technical literacy

| File cần viết | Nội dung chính phải có |
|---|---|
| `notes/07-tools/jira-and-confluence-for-ba.md` | workflow tối thiểu, field/link/version, documentation hierarchy, decision trail, dashboard và anti-pattern tool-driven process |
| `notes/07-tools/figma-and-drawio-for-ba.md` | wireframe/diagram workflow, annotation, component reuse, review/comment, version/export và handoff |
| `notes/07-tools/sql-for-ba.md` | schema giả định, SELECT/filter/join/group, duplicate/null, validation query, read-only safety và reproducible examples |
| `notes/07-tools/security-and-privacy-requirements-for-ba.md` | authentication/authorization, data classification, privacy, audit, abuse case và cách hỏi security expert; không dạy pentest giả |
| `notes/07-tools/api-and-postman-for-ba.md` | HTTP/resource, request/response, auth, status/error, pagination, idempotency, contract example và test collection cơ bản |
| `notes/07-tools/data-analysis-with-spreadsheets.md` | cleaning, pivot, reconciliation, sample bias, metric definition, reproducibility và data privacy |
| `notes/07-tools/software-architecture-literacy-for-ba.md` | context/container ở mức đọc hiểu, boundary, dependency, sync/async, batch/event và câu hỏi cho architect |

### 6.2 Template chuyên biệt

Mỗi file phải có “khi nào dùng”, input, copy-ready block, ví dụ đã điền và
review checklist. `ba-artifact-templates.md` chỉ làm catalog tới các file này.

| File cần viết | Template cần chứa |
|---|---|
| `notes/08-templates/elicitation-plan-template.md` | objective, participant, question/topic, technique, agenda, evidence, follow-up |
| `notes/08-templates/stakeholder-register-template.md` | role, interest, influence, impact, information need, engagement owner |
| `notes/08-templates/requirement-catalog-template.md` | ID, statement, type, source, rationale, priority, status, owner, acceptance, links |
| `notes/08-templates/use-case-specification-template.md` | actor, trigger, pre/post-condition, main/alternate/exception flow, rule, NFR, trace |
| `notes/08-templates/user-story-and-ac-template.md` | role/goal/value, context, AC, rule, dependency, open question, design/data link |
| `notes/08-templates/brd-template.md` | objective, scope, stakeholder, business requirement/rule, KPI, risk, approval |
| `notes/08-templates/srs-template.md` | context, functional/NFR/interface/data requirements, trace, glossary, approval |
| `notes/08-templates/rtm-template.md` | source, requirement, design/story/use case, test, release, status, owner |
| `notes/08-templates/change-impact-analysis-template.md` | change, baseline, reason, impact dimensions, options, estimate, decision, approval |
| `notes/08-templates/decision-log-template.md` | question, context, options, decision, rationale, owner, date, consequence, revisit trigger |
| `notes/08-templates/uat-plan-template.md` | scope, participant, environment/data, scenario, entry/exit, defect flow, evidence, sign-off |
| `notes/08-templates/data-dictionary-template.md` | entity/field, definition, type, format, allowed value, sensitivity, source, owner |

### 6.3 Domain Knowledge

Không có file domain nào là bắt buộc nếu chưa có dự án và nguồn thật. Chỉ thêm
sau khi có evidence, theo mẫu tên:

- `notes/05-domain-knowledge/ecommerce-order-lifecycle.md` — trạng thái đơn,
  inventory, payment, fulfillment, cancellation, return/refund và exception;
- `notes/05-domain-knowledge/payments-and-reconciliation.md` — authorization,
  capture, settlement, refund, chargeback, reconciliation và failure;
- `notes/05-domain-knowledge/banking-kyc-and-aml.md` — chỉ viết khi có nguồn pháp
  lý theo jurisdiction và ngày hiệu lực;
- `notes/05-domain-knowledge/logistics-shipment-lifecycle.md` — booking, pickup,
  handoff, tracking, delivery, failed delivery, return và SLA.

Các file trên là ví dụ điều kiện, **không tạo chỉ để làm đầy folder**.

## 7. Thứ tự triển khai đề xuất

### Wave 0 — Integrity

1. Viết `ba-handbook/README.md` và `source-register.md`.
2. Sửa Current/Planned scope, dòng `</content>` và source link ma.
3. Quyết định cách publish glossary và policy cho unresolved wikilink.

### Wave 1 — End-to-end tối thiểu

1. `requirement-elicitation.md`.
2. FDD, MoSCoW, CRUD, Use Case và FDD vs Use Case.
3. Agile concepts, User Story/AC, Refinement, Change Impact.
4. `ba-artifact-templates.md` ở vai trò catalog.

### Wave 2 — Correctness và traceability

1. Problem framing, stakeholder analysis, current/future state.
2. Process/data/business-rule modeling.
3. SRS/NFR/RTM và requirements lifecycle.
4. UAT, release readiness và solution evaluation.

### Wave 3 — Scale and reuse

1. Soft skills theo scenario BA.
2. Tool/technical literacy.
3. Template chuyên biệt.
4. Domain note có evidence thật.

## 8. Definition of Done cho mỗi file mới

Một file chỉ được chuyển từ Planned sang Current khi:

- file tồn tại thật và basename đúng với mọi wikilink;
- có một mục đích rõ, audience và thời điểm sử dụng;
- có decision rule hoặc workflow, không chỉ có định nghĩa;
- có ít nhất một example/scenario đủ chi tiết;
- nêu anti-pattern, exception và phạm vi không áp dụng;
- claim quan trọng có nguồn; fact, convention và inference không bị trộn;
- có checklist hoặc output có thể review;
- mọi `Related`, `References`, source link resolve hoặc được đánh dấu rõ là
  unavailable;
- README nhóm và `notes/README.md` được cập nhật cùng commit;
- importer dry-run không tạo thêm unresolved wikilink ngoài allowlist đã giải
  thích.

## 9. Baseline nguồn khi viết

Ưu tiên nguồn chính thống và version/date rõ ràng:

- [IIBA BABOK overview](https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/) — coverage lens cho business analysis;
- [The Scrum Guide](https://scrumguides.org/) — nguồn chuẩn cho Scrum, tránh coi
  convention của Jira/team là thành phần chính thức;
- đặc tả chính thức của OMG cho UML/BPMN khi viết modeling note;
- tài liệu chính thức của tool cho Jira, Confluence, Figma, SQL dialect và
  Postman;
- luật/quy định theo jurisdiction và ngày hiệu lực cho domain regulated.

Không dùng một blog thứ cấp làm nguồn duy nhất cho hard rule.
