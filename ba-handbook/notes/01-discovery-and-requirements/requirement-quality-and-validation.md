# Requirement Quality và Validation cho BA

> Note này giúp BA kiểm tra requirement được viết đủ tốt và đúng nhu cầu trước
> handoff. Verification hỏi “mô tả có chất lượng không”; validation hỏi “đây có
> phải điều stakeholder cần để đạt outcome không”.

## Note này dùng để làm gì

Mở note sau synthesis, trước analysis/specification/backlog hoặc khi review phát
hiện các bên hiểu cùng một câu theo nhiều cách.

## 1. Verification khác validation

| Hoạt động | Câu hỏi | Evidence |
|---|---|---|
| Verification | requirement có clear, consistent, feasible, testable? | peer/dev/test review, checklist, example |
| Validation | requirement có giải đúng need/outcome trong context? | stakeholder walkthrough, prototype/model, scenario playback |

Một requirement viết hoàn hảo vẫn có thể giải sai problem. Sign-off chứng minh
ai đã approve phiên bản nào, không tự chứng minh requirement đúng.

```plantuml Requirement Quality và Validation — lifecycle có nhánh rework
@startuml
[*] --> Draft
Draft --> Reviewed : peer/dev/test verification
Reviewed --> NeedsRework : ambiguity, conflict, infeasible
NeedsRework --> Draft : revise + evidence
Reviewed --> Validated : stakeholder confirms need/outcome
Validated --> NeedsRework : critical open question / changed evidence
Validated --> Approved : authority accepts baseline
Approved --> NeedsRework : approved change request
Approved --> [*]
@enduml
```

State là model tham chiếu. Team có thể dùng workflow khác, nhưng transition phải
có evidence và owner.

## 2. Quality criteria

| Criterion | Test nhanh |
|---|---|
| Necessary | trace được về need/objective không? |
| Atomic | câu có nhiều obligation nối bằng “và” không? |
| Clear/unambiguous | hai reader độc lập có hiểu giống nhau không? |
| Feasible | constraint/technology/time có cho phép không? |
| Consistent | có xung đột requirement/rule khác không? |
| Complete-enough | actor, condition, outcome, exception quan trọng đã có? |
| Testable | có thể quan sát pass/fail không? |
| Traceable | source, rationale, downstream artifact đã link chưa? |

“Complete” phụ thuộc stage và risk; discovery không cần giả vờ có mọi chi tiết
của SRS.

## 3. Running case: sửa requirement mơ hồ

**Trước:** “Hệ thống phải thông báo nhanh cho người dùng khi trạng thái thay đổi.”

Vấn đề: “nhanh”, “người dùng”, event và channel chưa rõ; cũng chưa trace need.

**Sau review:**

> Khi approval owner đổi trạng thái một request, requester và người có action kế
> tiếp phải nhận được status mới, actor tạo thay đổi và action còn thiếu. Channel
> và delivery threshold đang là open question do Product/Operations sở hữu.

- **Fact:** requester đang hỏi status qua chat.
- **Assumption:** notification chủ động tốt hơn self-service đơn thuần.
- **Validation:** walkthrough ba scenario với Employee, Manager, Procurement.
- **Open question:** delivery threshold, channel và failure handling.

Note không bịa threshold để làm câu trông “testable”. Nó để lộ gap có owner.

### Running case: ShopFlow

**Áp quality criteria (§2) cho một requirement trong ShopFlow `SF-3`:**

| Criterion | Test với requirement “hệ thống phải kiểm tra stock trước khi nhận order” |
|---|---|
| Necessary | ✅ Trace về objective Epic `SF-1`: giảm order vượt stock từ 3 lần/tháng xuống 0 |
| Atomic | ✅ Một obligation duy nhất: check stock; không trộn với “và gửi email xác nhận” |
| Clear | ⚠️ “kiểm tra stock” chưa rõ: check tại thời điểm add to cart hay lúc submit? → làm rõ: check lúc submit |
| Feasible | ✅ Có `SF-10` domain model với InventoryItem; backend check được |
| Consistent | ⚠️ Cần kiểm tra không xung đột với `SF-15` (manual stock adjustment sau kiểm kho) — nếu stock điều chỉnh thủ công giữa lúc check và commit? → thêm rule atomic reserve `SF-11` |
| Testable | ✅ `SF-13` QA scenario: tạo order với 5 items, kho chỉ còn 3 → expect reject |
| Traceable | ✅ Source: interview chủ shop; downstream: `SF-11` Stock Validation, `SF-13` QA |

**Sửa requirement mơ hồ → rõ (theo pattern §3):**

| Trước (mơ hồ) | Sau review (có context + measure) |
|---|---|
| “Hệ thống phải kiểm tra hàng trước khi bán” | Khi khách submit order (`SF-3`), hệ thống phải kiểm tra `availableStock` của từng `OrderItem` trong một transaction. Nếu bất kỳ item nào có `availableStock < quantity`, reject toàn bộ order với message “Sản phẩm [tên] chỉ còn [availableStock]” — không bán lẻ từng món. (AC `SF-11`) |
| “Hệ thống phải hiển thị trạng thái đơn hàng” | Sau khi order được tạo, khách hàng và chủ shop phải xem được trạng thái hiện tại và lịch sử chuyển trạng thái (timestamp + actor). Các trạng thái: Pending Payment → Paid → Preparing → Shipped → Delivered. (`SF-5` AC) |
| “Phải bảo mật” | Payment mock (`SF-4`) không được lưu hoặc log bất kỳ thông tin thẻ nào. Chỉ log event “payment_attempt” với orderId, amount, status (success/failure), timestamp. |

**Validation technique cho ShopFlow (theo §4):**

| Cần validate | Technique | ShopFlow áp dụng |
|---|---|---|
| wording/rule của `SF-11` atomic stock | walkthrough + concrete examples | demo 3 scenario: đủ stock, thiếu 1 item, thiếu tất cả — chủ shop xác nhận behavior |
| flow order status transition | state machine simulation | chạy từng transition Pending Payment→Paid→...; phát hiện thiếu transition “cancelled” sau Pending Payment |
| interaction catalog + order form | low-fi prototype `SF-38`, `SF-43` | khách hàng sample thử browse + đặt hàng; phát hiện nút “Đặt hàng” quá nhỏ trên mobile |
| measurable acceptance | acceptance thinking | mỗi story có 2-3 AC testable; `SF-13` QA checklist cover đủ happy + failure path |

| Cần validate | Technique |
|---|---|
| wording/rule | walkthrough + concrete examples |
| flow/exception | model/scenario simulation |
| interaction | low-fidelity prototype |
| measurable acceptance | test/acceptance thinking |
| value/outcome | trace to objective + stakeholder evidence |

## 5. Anti-patterns

| Anti-pattern | Cách sửa |
|---|---|
| checklist theater | ghi defect/evidence và disposition |
| im lặng = approve | request explicit confirmation và deadline |
| BA tự lấp số liệu thiếu | giữ open question có owner |
| sign-off qua chat không version | lưu artifact/version/authority/date |
| review chỉ với business | thêm dev/test/operation theo risk |

## 6. Checklist nhanh

- Requirement trace được về objective/evidence không?
- Requirement và solution idea có bị trộn không?
- Criteria cần thiết, atomic, clear, feasible, consistent, testable đạt chưa?
- Exception và constraint quan trọng có lộ ra không?
- Fact/assumption/open question có owner không?
- Ai validate need, ai approve baseline, version nào?

## References

- [ISO/IEC/IEEE 29148:2018](https://www.iso.org/standard/72089.html) — baseline chuẩn cho requirements engineering và đặc tính requirement.
- [IIBA — BABOK Guide](https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/) — verification/validation trong requirements analysis and design definition.

## Related

- [[requirement-elicitation|Requirement Elicitation]]
- [[non-functional-requirements-for-ba|Non-functional Requirements]]
- [[scope-assumptions-constraints|Scope, Assumptions & Constraints]]
- [[solution-options-and-business-case|Solution Options & Business Case]]

