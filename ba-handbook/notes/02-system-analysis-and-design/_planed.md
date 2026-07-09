# Kế hoạch hoàn thiện 02 — System Analysis & Design

> **Trạng thái:** tài liệu làm việc tạm thời, không phải practical note và không
> được publish. Giữ tên `_planed.md` để nhất quán workflow đã dùng cho nhóm 01;
> xóa file khi toàn bộ scope v1 đạt Definition of Done.

## 1. Mục tiêu hoàn thiện

Nhóm `02-system-analysis-and-design` phải giúp BA biến requirement đã được làm rõ
thành một tập model nhất quán để kiểm scope, behavior, data, rule, permission,
integration và UI flow trước khi viết specification hoặc backlog chi tiết.

Người đọc phải làm được:

1. xác định system boundary và external dependency;
2. phân rã capability/function mà không biến FDD thành menu tree;
3. ưu tiên scope có rationale, dependency và timebox;
4. chọn đúng model cho đúng câu hỏi phân tích;
5. mô tả actor goal, flow, interaction và object lifecycle;
6. phân tích business rule, data, CRUD và permission;
7. mô tả interface/integration, error và ownership;
8. tạo wireframe đủ truyền đạt requirement nhưng không giả làm UI design;
9. trace các model về requirement và giữ chúng đồng bộ khi thay đổi.

### Ranh giới của nhóm

Nhóm này trả lời **“solution cần được hiểu và mô hình hóa như thế nào để các bên
cùng kiểm tra?”**.

- Problem, objective, stakeholder và requirement discovery thuộc nhóm `01`.
- ID, wording chính thức, baseline, RTM và cấu trúc SRS thuộc nhóm `03`.
- Story, AC, refinement và sprint slicing thuộc nhóm `04`.
- Template copy-ready thuộc nhóm `08`.
- Note không đi sâu vào code, physical database design hoặc kiến trúc triển khai.

## 2. Baseline và lỗi cần sửa trước khi viết

- Folder hiện chỉ có `README.md` và `_conventions.md`; chưa có practical note.
- Sáu note không tồn tại đang bị ghi sai trong `Current scope`; phải chuyển về
  Planned cho tới khi file đạt Definition of Done.
- `_conventions.md` còn dòng rác `</content>`.
- Convention “BPMN mặc định cho Activity/process flow” đang trộn notation:
  **UML Activity Diagram dùng UML; BPMN Process Model dùng BPMN**.
- `use-case-diagram.md` hiện được mô tả như cả diagram lẫn textual specification;
  note phải phân biệt hai artifact này.
- “Module nền” Data/Notification/Report/Setting chỉ là heuristic rà soát, không
  phải bốn module bắt buộc cho mọi hệ thống.

### Hai file bổ sung ngoài roadmap cũ

- `system-context-and-boundary.md`: boundary phải có trước decomposition,
  integration và permission analysis.
- `analysis-model-selection.md`: decision hub giúp chọn FDD, Use Case, Activity,
  BPMN, Sequence, State, ERD hay wireframe theo câu hỏi cần trả lời.

Scope v1 có **18 practical note**.

## 3. Ánh xạ guideline

Tất cả file là **synthesized practical note**, áp dụng template tại
[Note guidelines](../note-guidelines.md), mục 7.1.

| Mã | Tham chiếu guideline | Yêu cầu áp dụng |
|---|---|---|
| `G1` | §3 — Mô hình thư mục | một note = một mục đích; model khác câu hỏi phải tách note |
| `G2` | §4 — Naming | basename kebab-case, link ổn định; đổi tên phải sửa graph |
| `G3` | §5 — Ngôn ngữ | giải thích tiếng Việt, giữ thuật ngữ notation tiếng Anh |
| `G4` | §6 — Quality bar | model phải giúp ra decision/phát hiện gap, không chỉ định nghĩa ký hiệu |
| `G5` | §7.1 — Note template | có use case của note, example, anti-pattern, checklist, references, related |
| `G6` | §8 — Decision priority | notation chuẩn và context dự án thắng preference cá nhân |
| `G7` | §9 — Review checklist | review correctness, scope, evidence, convention, example, decision value, links |
| `G8` | §10 — Link hygiene | mọi model link tới note upstream/downstream, không có note mồ côi |

### Rule cục bộ sau khi hiệu chỉnh

| Mã | Rule | Cách chứng minh |
|---|---|---|
| `S1` | mọi diagram ghi rõ notation/version hoặc ghi `free-form` | câu mở đầu trước diagram và References |
| `S2` | textual Use Case đủ actor, trigger, pre/post-condition, normal/alternate/exception flow | example + checklist |
| `S3` | actor là role/external system, không phải tên người/phòng ban cụ thể | toàn bộ example |
| `S4` | “Quản lý X” phải soát CRUD rồi mới bỏ operation có rationale | CRUD matrix + exception |
| `S5` | FDD mặc định tối đa 3 cấp, sâu hơn phải có lý do | example/review checklist |
| `S6` | UML Activity, BPMN, Sequence, State không được trộn ký hiệu | mỗi note có notation boundary |
| `S7` | diagram phức tạp phải tách view, không thu nhỏ để nhồi mọi thứ | giới hạn node/lifeline và alt text |
| `S8` | mỗi model phải trace về requirement/rule/source | field mapping hoặc Related artifact |

## 4. Running case dùng xuyên nhóm

Tiếp tục case ShopFlow từ nhóm 01 — dự án bán hàng online cho shop nhỏ (Epic `SF-1`):

> **ShopFlow:** Chủ shop cần hệ thống quản lý bán hàng + tồn kho online. Khách hàng
> browse catalog, tạo order, theo dõi trạng thái. Nhân viên kho quản lý stock, nhập
> hàng từ supplier, cập nhật delivery. Chủ shop xử lý return và nhận alert low stock.
> Boundary: không tích hợp payment gateway thật (`SF-4` mock), không tích hợp đơn vị
> vận chuyển (`SF-5` manual update). Tech stack: Spring Boot 3.3.x, Java 21, Vue 3.

Artifact đầu vào từ Discovery (nhóm 01):

- objective: giảm order vượt stock từ 3 lần/tháng xuống 0;
- future capability: catalog real-time, stock validation atomic, order status tracking;
- 8 User Story `SF-2..SF-9`, domain model `SF-10` (Product, Customer, Order, OrderItem, Payment, InventoryItem, StockMovement, ReturnRequest);
- constraint: không payment/shipper thật; authentication đơn giản MVP;
- assumption cần tiếp tục hiển thị: stock DB đồng bộ với thực tế; khách sẵn sàng dùng web.

Mỗi note chỉ bổ sung một view; actor (Khách hàng, Chủ shop, Nhân viên kho), entity,
state và rule phải nhất quán giữa 18 note.

## 5. Reading path và dependency

```text
system context & boundary
  → FDD → MoSCoW → completeness heuristic
  → business rules → data model → data dictionary → CRUD → permission
  → Use Case → Activity → State → Sequence
  → BPMN / Wireframe / Integration analysis
  → FDD vs Use Case
  → Analysis Model Selection (decision hub + recap)
```

Đây là learning path. Trong dự án thật, model được tạo lặp và song song; evidence
mới có thể làm đổi boundary, rule, data hoặc priority.

## 6. Danh sách file và diagram plan

| # | File | Vai trò | Visual bắt buộc |
|---:|---|---|---|
| 1 | `system-context-and-boundary.md` | chốt boundary/dependency | PlantUML component/context |
| 2 | `functional-decomposition-diagram.md` | phân rã capability/function | PlantUML WBS |
| 3 | `moscow-prioritization.md` | ưu tiên scope | không; decision table canonical |
| 4 | `system-analysis-common-principles.md` | heuristic chống sót | PlantUML component tùy chọn |
| 5 | `crud-operations.md` | soát operation theo entity | PlantUML state tùy chọn; CRUD matrix canonical |
| 6 | `use-case-diagram.md` | actor goal + textual scenario | PlantUML UML Use Case |
| 7 | `fdd-vs-use-case.md` | so sánh hai view | PlantUML WBS + Use Case |
| 8 | `activity-diagram.md` | flow/branch/concurrency | PlantUML UML Activity |
| 9 | `sequence-diagram.md` | interaction theo thời gian | PlantUML UML Sequence |
| 10 | `state-machine.md` | object lifecycle | PlantUML UML State |
| 11 | `business-process-modeling-bpmn.md` | process/collaboration | **BPMN 2.0 SVG, không giả lập bằng PlantUML** |
| 12 | `wireframing-for-ba.md` | UI flow/states | PlantUML Salt tùy chọn + wireframe asset |
| 13 | `business-rules-and-decision-tables.md` | rule completeness/conflict | PlantUML activity tùy chọn; decision table canonical |
| 14 | `data-modeling-and-erd.md` | entity/relationship/cardinality | PlantUML class-as-ERD |
| 15 | `data-dictionary.md` | semantics/format/ownership | không; dictionary table canonical |
| 16 | `interface-and-integration-analysis.md` | contract/error/ownership | PlantUML component + sequence |
| 17 | `role-permission-matrix.md` | authorization/SoD | PlantUML use-case tùy chọn; matrix canonical |
| 18 | `analysis-model-selection.md` | chọn model theo câu hỏi | PlantUML mindmap/free-form |

Khi triển khai theo yêu cầu “làm cả bắt buộc lẫn tùy chọn”, dự kiến có **16 note
có visual**: 15 note có PlantUML và 1 note có BPMN chuẩn. Hai note chủ động không
dùng diagram mặc định là MoSCoW và Data Dictionary; các matrix/table vẫn là
artifact canonical ở nơi diagram không đủ semantics.

## 7. Kế hoạch từng file

### Batch 1 — Boundary, decomposition và scope

#### `system-context-and-boundary.md`

**Nội dung:** system-of-interest; actor/external system; in/out boundary; upstream/
downstream dependency; trust/data boundary; assumption; context diagram review;
khác deployment/component diagram; running case với Identity, Finance, Vendor.

**PlantUML bắt buộc:** component/context diagram, notation ghi `free-form system
context rendered by PlantUML`; không gọi là UML chuẩn nếu dùng icon/component tự do.

#### `functional-decomposition-diagram.md`

**Nội dung:** FDD là functional hierarchy, không phải UML/menu/process; input;
function naming bằng verb+noun; ba cấp mặc định; coverage/MECE có kiểm soát;
scope trace; cách validate với stakeholder; ví dụ request management.

**PlantUML bắt buộc:** WBS diagram ba cấp. Diagram phải có boundary và không đưa
actor/sequence vào cây.

#### `moscow-prioritization.md`

**Nội dung:** định nghĩa Must/Should/Could/Won't theo timebox; test “không có Must
thì outcome/release fail thế nào”; capacity guideline là convention không phải
luật; dependency/risk/value/effort; workshop và rationale; “mọi thứ đều Must”.

**Không dùng PlantUML mặc định:** priority matrix + decision log tốt hơn. Có thể
dùng chart ngoài note nếu có dữ liệu thật, không tạo diagram trang trí.

#### `system-analysis-common-principles.md`

**Nội dung:** Data, Notification, Report/Dashboard, Setting/Setup là heuristic;
câu hỏi rà soát và điều kiện loại từng nhóm; bổ sung permission, audit,
error/recovery, integration, migration, observability; tránh biến heuristic thành
module architecture.

**PlantUML tùy chọn:** component/free-form map các concern quanh core capability,
ghi rõ đây là checklist lens, không phải solution structure.

#### `crud-operations.md`

**Nội dung:** tìm entity trước CRUD; CRUD vs business workflow; CRUD matrix theo
role/entity; validation, bulk/import/export, archive/restore, audit, soft delete;
operation bị loại phải có rationale; ví dụ Request/Attachment/Approval.

**PlantUML tùy chọn:** state diagram ngắn cho entity Request để chứng minh CRUD
không đủ mô tả lifecycle. CRUD matrix vẫn là artifact chính.

### Batch 2 — Behavior modeling

#### `use-case-diagram.md`

**Nội dung:** use case model vs diagram vs textual specification; system boundary;
actor/user goal; association/include/extend/generalization dùng tiết chế; cách tìm
use case; textual spec đủ `S2`; mapping requirement/rule/AC/test; misuse theo nút bấm.

**PlantUML bắt buộc:** UML Use Case Diagram cho request submission/approval/status.

#### `activity-diagram.md`

**Nội dung:** UML Activity notation; initial/final, action, control/object flow,
decision/merge, fork/join, partition; guard mutually exclusive; normal/exception;
khi dùng thay flowchart/BPMN; validate token flow.

**PlantUML bắt buộc:** UML Activity với swimlane, branch và parallel action.

#### `state-machine.md`

**Nội dung:** state/event/transition/guard/action; lifecycle vs process; valid/
invalid transition; terminal/cancel/reopen; state-transition table; phát hiện gap;
mapping state với permission/notification/audit.

**PlantUML bắt buộc:** UML State Machine của Purchase Request.

#### `sequence-diagram.md`

**Nội dung:** lifeline, actor/system boundary, sync/async message, return, alt/opt/
loop; system sequence vs design sequence; error/timeout/retry; tránh đoán internals;
trace message tới interface contract.

**PlantUML bắt buộc:** UML Sequence cho submit request + budget check, có `alt`
success/failure và timeout ownership.

### Batch 3 — Rule, data và access

#### `business-rules-and-decision-tables.md`

**Nội dung:** rule taxonomy (constraint, derivation, decision); source/owner/
effective date; atomic rule; decision table condition/action; completeness,
overlap/conflict; hit policy; trace requirement/test; ví dụ approval threshold.

**PlantUML tùy chọn:** UML Activity/decision tree minh họa flow của một decision
đã được table kiểm completeness; không dùng tree thay table.

#### `data-modeling-and-erd.md`

**Nội dung:** conceptual vs logical vs physical; entity, attribute, identifier,
relationship, cardinality/optionality; associative entity; business rule; history/
effective date; normalization ở mức BA; tránh model theo màn hình.

**PlantUML bắt buộc:** class diagram dùng stereotype/notation như ERD và phải ghi
rõ không phải UML domain class design hoàn chỉnh.

#### `data-dictionary.md`

**Nội dung:** entity/field definition; business meaning; type/format/unit; allowed
value; null/default; source/system of record; sensitivity; owner; lineage; quality
rule; version; ví dụ Request status/budget code.

**Không dùng PlantUML mặc định:** dictionary table là canonical; link sang ERD và
interface mapping thay vì nhồi field vào diagram.

#### `role-permission-matrix.md`

**Nội dung:** subject/role, resource, action, scope/condition; RBAC ở mức BA;
least privilege; segregation of duties; default deny; delegation/emergency access;
approval/audit; permission matrix và negative case.

**PlantUML tùy chọn:** UML Use Case view cho quyền cấp cao; matrix vẫn là source
of truth vì diagram không thể hiện đầy đủ condition/deny.

### Batch 4 — Process, UI và integration

#### `business-process-modeling-bpmn.md`

**Nội dung:** BPMN 2.0 process/collaboration; event, task/sub-process, gateway,
sequence/message flow, pool/lane; token semantics; interrupt/boundary event;
as-is/to-be; model validation; khi dùng BPMN thay UML Activity.

**Visual bắt buộc:** BPMN 2.0 chuẩn xuất SVG từ tool hỗ trợ BPMN. Không dùng
PlantUML Activity rồi gắn nhãn BPMN. Trước implementation phải bổ sung workflow
render/cache hoặc commit SVG source-controlled có file nguồn `.bpmn`.

#### `wireframing-for-ba.md`

**Nội dung:** user goal, task/flow, information hierarchy; low-fidelity boundary;
annotation; permission, validation, empty/loading/error/success state; responsive/
accessibility; prototype vs mockup; handoff và trace requirement.

**PlantUML tùy chọn:** Salt wireframe cho một màn hình request detail; thêm screen
flow asset khi nhiều màn hình. Ghi notation `PlantUML Salt`, không gọi UML.

#### `interface-and-integration-analysis.md`

**Nội dung:** producer/consumer, system context, data/command/event contract;
mapping/validation; sync/async; auth; timeout/retry/idempotency; ordering/duplicate;
error/reconciliation; SLA/ownership/version; example Finance Budget Service.

**PlantUML bắt buộc:** component/context cho boundary và Sequence cho happy path
và timeout/failure. Tối đa hai diagram vì trả lời hai câu hỏi khác nhau.

### Batch 5 — So sánh và chọn model

#### `fdd-vs-use-case.md`

**Nội dung:** FDD trả lời “hệ thống có nhóm chức năng gì”; Use Case trả lời “actor
đạt goal qua tương tác nào”; audience/stage/input/output; cùng một case ở hai view;
trace leaf function tới use case; khi chỉ cần một; synchronization cost.

**PlantUML bắt buộc:** một WBS nhỏ và một UML Use Case nhỏ dùng cùng scope để so
sánh trực tiếp, không reuse ảnh mà thiếu giải thích.

#### `analysis-model-selection.md`

**Nội dung:** decision matrix câu hỏi → model; boundary, decomposition, actor goal,
workflow, collaboration, interaction, lifecycle, data, rule, permission, UI;
minimum model set theo risk; tránh model vì thói quen; traceability giữa model;
criteria dừng modeling.

**PlantUML bắt buộc:** mindmap/free-form “question → model”. Decision matrix vẫn
là artifact canonical vì một question có thể cần nhiều model.

## 8. PlantUML và visual policy

- Trước mỗi diagram ghi rõ notation: `UML 2.5.x`, `BPMN 2.0.x`, `PlantUML WBS`,
  `PlantUML Salt`, `ERD-like class diagram` hoặc `free-form`.
- PlantUML là renderer, không tự biến diagram thành UML chuẩn.
- Mỗi diagram trả lời một câu hỏi; tối đa 12–15 node hoặc 6–8 lifeline mặc định.
- Diagram lớn tách theo stakeholder/question, không thu nhỏ chữ.
- Mỗi fence có alt text cụ thể trên dòng `plantuml`.
- Trước diagram nói người đọc cần nhìn gì; sau diagram rút ra gap/decision.
- Key information phải tồn tại trong prose/table để đảm bảo accessibility.
- SVG cache trong `public/diagrams/` là generated output, không sửa tay.
- BPMN phải dùng source `.bpmn`/tool đúng notation; không đánh đổi semantic
  correctness chỉ để dùng chung plugin PlantUML.

## 9. Kế hoạch triển khai

### Batch 0 — Integrity và convention

1. Xóa `</content>` trong README/convention nhóm.
2. Chuyển sáu file không tồn tại từ Current sang Planned.
3. Sửa rule Activity/BPMN và mở rộng phạm vi convention cho 18 note.
4. Thêm notation/version, traceability và complexity rule (`S1–S8`).
5. Chốt pipeline BPMN trước khi viết note BPMN.

### Batch 1 — Foundation models

Viết System Context, FDD, MoSCoW, completeness heuristic và CRUD.

**Exit:** boundary/entity/function/priority vocabulary nhất quán; bốn visual bắt
buộc/tùy chọn theo plan render được.

### Batch 2 — Behavior models

Viết Use Case, Activity, State và Sequence.

**Exit:** cùng một scenario trace được actor goal → flow → state → interaction;
notation UML không bị trộn.

### Batch 3 — Rule, data và access

Viết Business Rules, ERD, Data Dictionary và Role-Permission Matrix.

**Exit:** rule/data/permission có owner, source và trace; matrix/table canonical
không bị thay bằng diagram thiếu semantics.

### Batch 4 — Process, UI và integration

Viết BPMN, Wireframing và Integration Analysis.

**Exit:** BPMN SVG đúng notation; wireframe có state/annotation; integration có
happy/failure path, contract và owner.

### Batch 5 — Decision guides và integration

Viết FDD vs Use Case và Analysis Model Selection; đồng bộ README/glossary/Related.

**Exit:** reader chọn được minimum model set theo câu hỏi/risk; importer không có
unresolved link từ nhóm 02.

### Batch 6 — Cleanup

1. Chuyển đủ 18 note sang Current scope theo filesystem.
2. Cập nhật `notes/README.md`, content roadmap và glossary.
3. Chạy notation review, link audit, PlantUML parser, BPMN validator và site build.
4. Kiểm tra alt text/render mobile và traceability của running case.
5. Xóa `_planed.md`.

## 10. Source plan

Ưu tiên nguồn primary/recognized và ghi version/date khi viết:

- IIBA BABOK cho analysis techniques, requirements analysis/design definition;
- OMG UML specification cho Use Case, Activity, Sequence, State và class notation;
- OMG BPMN specification cho process/collaboration semantics;
- ISO/IEC/IEEE 29148 cho requirement/interface/traceability quality;
- W3C WCAG cho state/accessibility liên quan wireframe;
- tài liệu PlantUML chính thức cho syntax renderer, không dùng nó làm nguồn
  semantic UML/BPMN;
- security standard/team authority cho authorization, least privilege và audit.

Mỗi References phải nói nguồn hỗ trợ claim nào. Nếu source nội bộ chưa được khôi
phục, không tạo wikilink ma tới `library/`, `collections` hoặc `mapping`.

## 11. Definition of Done nhóm 02

- [ ] đủ 18 practical note trong scope v1;
- [ ] mỗi note tuân `G1–G8` và rule cục bộ `S1–S8`;
- [ ] running case nhất quán về actor, system, entity, state, rule và boundary;
- [ ] mọi diagram ghi đúng notation/version và có alt text;
- [ ] toàn bộ PlantUML bắt buộc + tùy chọn trong plan render thành công;
- [ ] BPMN dùng notation/source/validator BPMN thật, không giả bằng Activity;
- [ ] Use Case example đủ actor, trigger, pre/post-condition và các flow;
- [ ] CRUD operation bị loại có rationale;
- [ ] decision table, CRUD matrix, data dictionary, permission matrix vẫn là
  artifact canonical ở nơi diagram không đủ semantics;
- [ ] mỗi model trace về requirement/rule/source và link tới model liên quan;
- [ ] README nhóm, `notes/README.md`, glossary và content roadmap đồng bộ;
- [ ] importer không publish file bắt đầu bằng `_`;
- [ ] link audit nhóm 02 có 0 unresolved;
- [ ] PlantUML parser, BPMN validation, Astro check và site build thành công;
- [ ] `_planed.md` được xóa sau khi nghiệm thu.

## 12. Chưa đưa vào scope v1

Chỉ tách thành note riêng khi có use case thực tế và source đủ mạnh:

- domain/story mapping nâng cao;
- DMN decision modeling;
- event storming;
- C4 container/component modeling chuyên sâu;
- API specification chi tiết (OpenAPI/AsyncAPI);
- physical database design;
- threat modeling;
- analytics/report metric design chuyên sâu.
