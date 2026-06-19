---
title: "Non-functional Requirements cho BA"
pubDatetime: 2026-06-18T18:14:08.198Z
description: "Note này giúp BA khai thác quality expectation thành NFR có context và measure. “Nhanh”, “dễ dùng”, “bảo mật cao” là chủ đề cần làm rõ, chưa phải requirement c…"
tags: ["ba", "discovery-and-requirements"]
draft: false
---
> Note này giúp BA khai thác quality expectation thành NFR có context và measure.
> “Nhanh”, “dễ dùng”, “bảo mật cao” là chủ đề cần làm rõ, chưa phải requirement
> có thể thiết kế hoặc kiểm thử.

## Note này dùng để làm gì

Mở note trong discovery khi solution có expectation về performance, availability,
security, privacy, accessibility hoặc operation. Note này tập trung **elicitation**;
format NFR formal thuộc nhóm Specification.

## 1. Phân biệt ba loại

- **Functional requirement:** hệ thống/capability làm gì.
- **Quality attribute requirement:** làm tốt tới mức nào trong condition cụ thể.
- **Constraint:** giới hạn solution phải tuân theo, ví dụ corporate identity.

NFR vẫn phải trace về stakeholder/outcome. Copy checklist 100 dòng không tạo ra
requirement nếu không biết ai cần, trong context nào và vì sao.

## 2. Quality attribute scenario

```plantuml Non-functional Requirement — cấu trúc quality attribute scenario
@startuml
left to right direction
rectangle "Source" as S
rectangle "Stimulus" as ST
rectangle "Environment" as E
rectangle "Artifact / system" as A
rectangle "Response" as R
rectangle "Response measure" as M
S --> ST : tạo sự kiện
ST --> A : trong
E ..> A : điều kiện vận hành
A --> R : phản ứng
R --> M : đo bằng
@enduml
```

Ví dụ performance:

> Trong giờ làm việc bình thường (**environment**), khi một employee đã đăng nhập
> (**source**) mở request của mình (**stimulus**), service trạng thái (**artifact**)
> trả status và current owner (**response**) trong dưới 2 giây ở percentile đã
> thống nhất (**measure**).

Con số “2 giây” trong case là giả định cần Product/Architecture/Test xác nhận,
không phải chuẩn chung.

## 3. Taxonomy đủ dùng để hỏi

| Nhóm | Câu hỏi discovery |
|---|---|
| Performance/scalability | volume, peak, latency/throughput ở percentile nào? |
| Availability/reliability | thời gian phục vụ, downtime, recovery, data loss chấp nhận? |
| Security/privacy | ai được làm/xem gì, data nhạy cảm nào, audit/retention? |
| Usability/accessibility | user/context/device, task success, tiêu chuẩn nào? |
| Compatibility/interoperability | system/version/protocol/data contract nào? |
| Supportability/observability | log, alert, diagnosis, support owner và SLA? |
| Compliance | regulation/policy nào, jurisdiction/version/authority? |

Không phải project nào cũng cần mọi nhóm. Chọn theo risk và context.

## 4. Running case

| Candidate | Source/condition | Measure/open question |
|---|---|---|
| requester xem status | employee, giờ làm việc | target latency và percentile cần test xác nhận |
| chỉ người liên quan xem attachment | Security policy | role-permission matrix và audit event |
| approval vẫn hoạt động khi Finance service lỗi | Procurement/Operations | fallback, recovery time và data consistency chưa chốt |
| employee dùng bàn phím hoàn thành submission | accessibility need | standard/acceptance method cần owner xác nhận |

Trade-off phải lộ ra: cache giúp latency nhưng có thể làm status cũ; audit chi
tiết tăng traceability nhưng ảnh hưởng privacy/storage.

## 5. Anti-patterns

| Anti-pattern | Cách sửa |
|---|---|
| “hệ thống phải nhanh” | thêm source, stimulus, condition, response, measure |
| mọi metric dùng average | chọn percentile/worst case theo risk |
| security = login | hỏi authorization, data, audit, abuse/recovery |
| copy taxonomy thành requirement | chỉ giữ item có stakeholder/risk/source |
| BA tự đặt threshold | ghi assumption và xác nhận với owner kỹ thuật/nghiệp vụ |

## 6. Checklist nhanh

- Đây là quality attribute hay constraint?
- Stakeholder/risk nào tạo nhu cầu?
- Scenario đủ source, stimulus, environment, artifact, response, measure chưa?
- Baseline/target và cách đo có owner không?
- Peak, failure, recovery và privacy condition đã xét chưa?
- Trade-off và assumption có hiển thị không?

## References

- [IIBA — BABOK Guide](https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/) — solution requirements và quality-related analysis.
- [ISO/IEC/IEEE 29148:2018](https://www.iso.org/standard/72089.html) — chuẩn requirements engineering, dùng làm baseline khi review đặc tính requirement.

## Related

- [Requirement Elicitation](/posts/discovery-and-requirements/requirement-elicitation)
- [Stakeholder Analysis & Engagement](/posts/discovery-and-requirements/stakeholder-analysis-and-engagement)
- [Scope, Assumptions & Constraints](/posts/discovery-and-requirements/scope-assumptions-constraints)
- [Requirement Quality & Validation](/posts/discovery-and-requirements/requirement-quality-and-validation)


