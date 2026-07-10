---
title: "Backlog Refinement cho BA"
pubDatetime: 2026-07-09T22:37:09.080Z
description: "Note này giúp BA chuẩn bị và dẫn backlog refinement hiệu quả: chọn item nào cần refined, xác định ready/not ready, và ghi lại decision mở để sprint sau không l…"
tags: ["ba", "agile-delivery"]
draft: false
---
> Note này giúp BA chuẩn bị và dẫn backlog refinement hiệu quả: chọn item nào
> cần refined, xác định ready/not ready, và ghi lại decision mở để sprint sau
> không lặp lại câu hỏi cũ. Refinement không phải là "họp đọc story" — nó là
> buổi làm rõ ambiguity trước khi team cam kết.

## Note này dùng để làm gì

Mở note trước mỗi buổi refinement, khi backlog ngày càng dài nhưng story vẫn
mơ hồ, hoặc khi dev/test liên tục hỏi lại "cái này nghĩa là gì" trong sprint.
Đọc sau [User Story & AC](/posts/agile-delivery/user-story-and-acceptance-criteria).

## 1. Refinement không phải là sprint planning mini

| Là | Không phải là |
|---|---|
| Làm rõ requirement, AC, dependency, UI/UX trước sprint | Chốt scope sprint (đó là planning) |
| Tách story quá lớn, thêm AC thiếu | Estimate chính xác đến giờ (đó là planning) |
| Xác định item "ready" cho sprint tới | Demo hoặc review (đó là sprint review) |
| Phát hiện gap, assumption, open question | Quyết định priority (đó là PO) |

## 2. Definition of Ready (DoR): story đủ chín để vào sprint

| Tiêu chí | Câu hỏi kiểm | Ai chịu trách nhiệm |
|---|---|---|
| **Story rõ ràng** | Role, objective, value (để...) có đủ không? | BA |
| **Acceptance Criteria** | Có ≥ 2 AC verifiable, gồm ít nhất 1 failure path? | BA |
| **Dependency resolved** | Story có phụ thuộc API, team khác, hoặc story khác? Ai đã confirm? | BA + Tech Lead |
| **UI/UX ready** | Có wireframe/mockup cho màn hình liên quan? Nếu chưa, ai đang làm? | BA + Designer |
| **Estimate được** | Team có đủ context để estimate không? | BA cung cấp context |
| **Testable** | Tester có thể viết test case từ AC không? | BA + Tester |

Item không đạt DoR → **không vào sprint**. BA ghi rõ gap và owner, chuyển về
"Not Ready" trong backlog.

## 3. Chuẩn bị refinement

Trước buổi refinement, BA chuẩn bị:

1. Chọn 3–5 item từ top backlog (ưu tiên item cho sprint tới).
2. Mỗi item có: story + AC hiện tại, wireframe/mockup nếu có, dependency đã biết.
3. Đánh dấu câu hỏi mở: "cần team input về feasibility", "cần PO chốt rule".
4. Gửi pre-read ít nhất 1 ngày trước.
5. Timebox: 60–90 phút, không quá 2 giờ.

## 4. Trong refinement

| Bước | Hoạt động | Output |
|---|---|---|
| 1. BA trình bày | đọc story, AC, context (2–3 phút/item) | team hiểu need |
| 2. Team hỏi | dev/test nêu ambiguity, feasibility concern | list question |
| 3. Làm rõ | BA trả lời hoặc ghi open question | AC cập nhật hoặc gap có owner |
| 4. Split nếu cần | nếu story > 8 điểm, tách ngay trong buổi | story mới |
| 5. Estimate sơ bộ | team estimate bằng Fibonacci (không cam kết) | story point estimate |
| 6. Chốt ready/not ready | dựa trên DoR checklist | item vào Ready hoặc quay lại Not Ready |

## 5. Decision log: thứ BA phải ghi lại

Mỗi buổi refinement tạo ra decision và open question. Ghi ngay, không để trong
đầu:

| Field | Ví dụ |
|---|---|
| **Decision** | "Payment mock sẽ trả về success/failure/error 3 trạng thái" |
| **Context** | "Vì MVP chưa tích hợp payment gateway thật (`SF-4` constraint)" |
| **Người quyết định** | "PO + Tech Lead, ngày 15/07" |
| **Impact** | "Không cần mock timeout/retry; dev ước lượng giảm từ 5 xuống 3 điểm" |
| **Dissent / Alternative** | "Tester đề xuất mock cả timeout để test UI — ghi nhận, sẽ làm ở Sprint 2" |

### Running case: ShopFlow

Refinement cho Sprint 1 ShopFlow, chuẩn bị `SF-2`, `SF-3`, `SF-6`:

**Trước refinement (BA chuẩn bị):**
- `SF-2` Browse Catalog: AC checklist có sẵn, wireframe `SF-38` chưa có → đánh dấu gap "cần UI trước Sprint 1".
- `SF-3` Create Order: AC Gherkin đầy đủ, nhưng dependency `SF-11` Stock Validation chưa rõ "kiểm tra stock lúc add-to-cart hay lúc submit?" → đưa vào câu hỏi refinement.
- `SF-6` Manage Stock: dev hỏi "availableStock tính runtime hay lưu DB?" → BA chưa có answer, ghi open question.

**Trong refinement:**

| Story | Câu hỏi từ team | Decision |
|---|---|---|
| `SF-2` Browse Catalog | "Có cần search không?" | Không ở Sprint 1 — để Sprint 2 |
| `SF-3` Create Order | "Stock check ở đâu?" | BA làm rõ: check lúc submit, atomic. Nếu cần check real-time khi add-to-cart → AC bổ sung cho Sprint 2 |
| `SF-6` Manage Stock | "available = on_hand − reserved tính runtime à?" | Tech Lead confirm: tính runtime, không lưu DB. AC cập nhật |

**Decision log:**

| Decision | Context | Người quyết định | Impact |
|---|---|---|---|
| Stock check lúc submit, atomic (reject toàn bộ order nếu thiếu 1 item) | `SF-3` requirement | PO (chủ shop) | Dev `SF-11` dùng transaction; không cần optimistic lock ở MVP |
| `availableStock` = `on_hand` − `reserved`, tính runtime | `SF-6` technical | Tech Lead | Không cần lưu cột `availableStock` trong DB; `SF-14` Inventory Stock Fields bỏ field này |

**Sau refinement:**
- `SF-2`: Ready (gap "UI chưa có wireframe" vẫn open, BA chịu trách nhiệm làm `SF-38` trước Sprint 1).
- `SF-3`: Ready.
- `SF-6`: Ready.
- `SF-7` Receive Stock: Not Ready — thiếu observation nhân viên kho. BA ghi owner: "BA sẽ observe 1 buổi sáng, trước refinement kế tiếp."

**Bài học:** Refinement không làm cho mọi story "sẵn sàng hoàn hảo". Nó làm cho gap hiển thị và có owner. `SF-7` không ready không phải thất bại — đó là output đúng của refinement.

## Anti-patterns

| Anti-pattern | Vì sao nguy hiểm | Cách sửa |
|---|---|---|
| Refinement = đọc to story | không phát hiện ambiguity, lãng phí thời gian | team đọc pre-read, refinement để hỏi và làm rõ |
| Mọi story đều "ready" | gap bị giấu, lộ ra giữa sprint | dùng DoR checklist; ready phải có evidence, không phải "tôi nghĩ nó ổn" |
| Không ghi decision log | sprint sau lặp lại cùng câu hỏi | ghi decision + context + owner, dán link Jira |
| Refinement 3 giờ, 15 story | team mệt, không focus | giới hạn 3–5 story, 60–90 phút |
| BA trả lời mọi câu hỏi | BA thành bottleneck, dev không sở hữu solution | để dev đề xuất approach; BA confirm business rule |

## Checklist nhanh

- Đã chọn 3–5 story từ top backlog chưa?
- Mỗi story có AC + context trước refinement?
- Team đã đọc pre-read trước buổi chưa?
- Mỗi story đã được estimate sơ bộ? Story nào cần split?
- DoR cho từng story: ready hay not ready? Gap có owner + due date?
- Decision và open question đã được ghi lại chưa?

## References

- [Scrum Guide](https://scrumguides.org/) — định nghĩa Product Backlog và trách nhiệm của PO.
- [Atlassian — Backlog Refinement](https://www.atlassian.com/agile/scrum/backlog-refinement) — hướng dẫn thực hành refinement.

## Related

- [Agile Concepts cho BA](/posts/agile-delivery/agile-concepts-for-ba)
- [User Story & AC cho BA](/posts/agile-delivery/user-story-and-acceptance-criteria)
- [Từ case study ra backlog Agile](/posts/agile-delivery/case-study-to-agile-ba-delivery)
- [Change Request & Impact Analysis](/posts/agile-delivery/change-request-and-impact-analysis)

