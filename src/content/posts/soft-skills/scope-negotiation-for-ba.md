---
title: "Đàm phán scope cho BA"
pubDatetime: 2026-07-09T22:37:09.080Z
description: "Note này giúp BA xử lý tình huống stakeholder muốn thêm, sửa hoặc bỏ requirement mà không có evidence hoặc ưu tiên rõ. Đàm phán scope không phải là \"nói không\"…"
tags: ["ba", "soft-skills"]
draft: false
---
> Note này giúp BA xử lý tình huống stakeholder muốn thêm, sửa hoặc bỏ requirement
> mà không có evidence hoặc ưu tiên rõ. Đàm phán scope không phải là "nói không";
> nó là quá trình biến kỳ vọng và giới hạn thành quyết định có cơ sở.

## Note này dùng để làm gì

Mở note khi PO muốn tất cả story vào Sprint 1, stakeholder nói "cái này dễ mà,
làm thêm đi", hoặc bạn cần bảo vệ scope MVP trước yêu cầu mở rộng không có
evidence. Đọc sau [Scope, Assumptions &
Constraints](/posts/discovery-and-requirements/scope-assumptions-constraints) (phần artifact) và
[Facilitation cho BA](/posts/soft-skills/facilitation-for-ba) (phần kỹ năng).

## 1. Tâm thế đàm phán scope

Không phải "BA vs stakeholder". Là "cả hai cùng nhìn vào constraint và tìm
cách tốt nhất trong giới hạn đó."

| Tâm thế sai | Tâm thế đúng |
|---|---|
| "Tôi phải bảo vệ team khỏi yêu cầu vô lý" | "Tôi giúp stakeholder thấy trade-off giữa điều họ muốn và điều khả thi" |
| "Không được — đây là scope đã chốt" | "Nếu thêm X, mình phải bỏ Y hoặc lùi Z. Chị chọn thế nào ạ?" |
| "Để tôi hỏi team rồi trả lời" | "Đây là impact estimate sơ bộ. Mình cần [role] xác nhận trước khi chốt." |

## 2. Ba câu hỏi trước khi đồng ý bất kỳ thay đổi nào

| Câu hỏi | Mục đích |
|---|---|
| "Vấn đề gì sẽ được giải quyết nếu mình làm điều này?" | Buộc stakeholder trace về outcome, không chỉ "thấy hay" |
| "Nếu không làm điều này trong MVP, hậu quả là gì?" | Đo urgency thật — nếu hậu quả = 0, đây là nice-to-have |
| "Mình sẵn sàng đánh đổi gì? (bỏ story nào, lùi deadline, tăng cost?)" | Biến "thêm" thành trade-off, không phải "xin thêm" |

## 3. Framing: cách nói "không" mà không nói "không"

| Thay vì nói | Nên nói |
|---|---|
| "Không được, hết capacity rồi." | "Mình có thể làm, nếu mình dời `SF-7` sang Sprint 3. Chị thấy ổn không ạ?" |
| "Cái này không nằm trong scope." | "Tính năng này giải quyết vấn đề gì ạ? Mình thử xem nó có overlap với story nào đã có không." |
| "Team không làm được đâu." | "Để em check feasibility với team và trả lời chị trước [ngày]. Em muốn chắc là mình estimate đúng." |
| "Yêu cầu này vô lý." | "Mình cùng nhìn constraint hiện tại: 2 sprint, 3 người. Với constraint này, mình phải ưu tiên 3 story nào quan trọng nhất?" |

### Cặp câu nên nói / câu nên tránh

| Tình huống | Câu nên tránh | Câu nên nói |
|---|---|---|
| Stakeholder muốn thêm 5 tính năng vào Sprint 1 | "Không thể, team không đủ người." | "Với capacity hiện tại (13 điểm/sprint), mình chọn được 3 story. Trong 5 tính năng chị vừa nêu, tính năng nào nếu thiếu thì MVP fail?" |
| Stakeholder nói "cái này dễ mà, làm thêm đi" | "Dễ đâu mà dễ." | "Dạ, mình cùng xem impact: nếu thêm cái này, `SF-5` sẽ bị lùi ít nhất 3 ngày. Mình có nên lùi `SF-5` không ạ?" |
| Sếp muốn đẩy deadline sớm hơn | "Không kịp đâu ạ." | "Để đạt deadline đó, mình cần cắt 2 story khỏi Sprint 1. Em đề xuất giữ 3 story core. Sếp thấy có ổn không?" |

## 4. Kỹ thuật đàm phán thực tế

| Kỹ thuật | Khi dùng | Ví dụ |
|---|---|---|
| **Trade-off triangle** | stakeholder muốn thêm scope | "Mình có 3 thứ: scope, time, quality. Nếu thêm scope, mình cần thêm time hoặc giảm quality. Chị chọn cái nào?" |
| **Anchor vào objective** | yêu cầu mới không rõ giá trị | "Điều này giúp mình đạt mục tiêu 'giảm order vượt stock xuống 0' như thế nào ạ?" |
| **Option menu** | stakeholder muốn một thứ cụ thể | "Mình có 3 cách giải quyết nhu cầu này: (A) làm ngay nhưng bỏ `SF-X`, (B) làm Sprint 2, (C) làm đơn giản hơn." |
| **Data over opinion** | tranh luận không có cơ sở | "Mình thử kiểm tra: có bao nhiêu khách hàng thực sự cần tính năng này? Em đề xuất survey nhanh 10 khách." |
| **Timebox** | stakeholder không quyết được | "Mình dành 5 phút cho quyết định này. Nếu chưa chốt được, mình ghi open question và quay lại [ngày]." |

### Running case: ShopFlow

**Tình huống 1: Chủ shop muốn thêm "tích hợp VNPay thật" giữa Sprint 1.**

Chủ shop: "Tôi vừa hỏi bên VNPay, họ nói tích hợp dễ lắm. Mình làm luôn đi,
khỏi mock."

BA (anchor vào objective + trade-off triangle):
> "Dạ, để em cùng nhìn lại mục tiêu Sprint 1 của mình: mình cần browse → order
> → stock check end-to-end. Nếu mình thêm VNPay, em estimate sơ bộ cần thêm 5–8
> điểm, tức là mình phải bỏ `SF-6` Manage Stock khỏi Sprint 1. Không có stock
> management, mình vẫn có order, nhưng mình không giải quyết được vấn đề 'bán
> vượt stock' — là vấn đề số 1 mình muốn giải quyết. Chị muốn ưu tiên VNPay
> hơn kiểm soát stock không ạ?"

Chủ shop: "Thôi, vậy mock đi. Nhưng nhớ làm VNPay sau nha."

→ BA không nói "không". BA cho thấy trade-off và để chủ shop quyết định.

**Tình huống 2: Dev muốn refactor toàn bộ codebase giữa Sprint 1.**

Dev: "Code hiện tại viết vội quá, cần refactor lại hết. Em cần 2 ngày."

BA (option menu):
> "Mình có 3 option: (A) refactor ngay — `SF-3` bị lùi 2 ngày, có thể không kịp
> demo Sprint 1; (B) refactor 1 phần liên quan tới `SF-3`, phần còn lại để
> Sprint 2; (C) ghi technical debt vào backlog, xử lý sau MVP. Tech Lead thấy
> option nào cân bằng nhất?"

Tech Lead chọn (B). `SF-3` chỉ lùi 0.5 ngày.

**Tình huống 3: Stakeholder (khách hàng sample) phàn nàn "không có app mobile".**

Khách hàng: "Sao không làm app đi? Web trên điện thoại khó dùng quá."

BA (data over opinion + anchor vào objective):
> "Dạ, em ghi nhận ạ. Cho em hỏi thêm: chị dùng web trên điện thoại thấy khó ở
> điểm nào ạ? Mình thử xem có thể sửa web cho dễ dùng hơn trên mobile không.
> App mobile sẽ cần thêm 2–3 tháng, trong khi mình muốn có gì đó xài được trong
> 2 tuần."

Khách hàng: "À, chủ yếu nút Đặt hàng nhỏ quá, khó bấm."

→ BA ghi: sửa nút Đặt hàng lớn hơn trên mobile-responsive (fix không mất công,
không cần app).

**Bài học:** Đàm phán scope thành công không phải là BA "thắng". Là quyết định
được đưa ra dựa trên **evidence, trade-off và constraint**, không phải dựa trên
ai nói to hơn. BA cung cấp structure cho quyết định đó.

## Anti-patterns

| Anti-pattern | Vì sao nguy hiểm | Cách sửa |
|---|---|---|
| Luôn nói "được" với stakeholder | scope creep, team burnout | luôn yêu cầu trade-off: "nếu thêm X, bỏ gì?" |
| Luôn nói "không" mà không giải thích | mất trust, stakeholder tìm đường vòng | giải thích constraint, đưa option |
| Đàm phán một mình, không có data | opinion vs opinion, ai quyền lực hơn thắng | mang data (estimate, capacity, survey) vào đàm phán |
| Hứa "để kiểm tra rồi trả lời" rồi im | mất trust, stakeholder tự quyết định | luôn trả lời đúng hạn, kể cả khi chưa có câu trả lời cuối |
| Tự quyết thay vì để decision owner quyết | BA chịu trách nhiệm cho quyết định không phải của mình | BA đưa option + impact; decision owner quyết |

## Checklist nhanh

- Tôi có đang coi đàm phán là "bảo vệ team" thay vì "tìm giải pháp trong constraint" không?
- Trước khi nói "có" hoặc "không", tôi đã hỏi: vấn đề gì? urgency? trade-off?
- Tôi có đưa ít nhất 2–3 option cho mỗi yêu cầu không?
- Tôi có dùng data (estimate, capacity, survey) thay vì opinion không?
- Decision owner có phải là người quyết định cuối cùng không? (không phải BA)
- Tôi có ghi lại quyết định + rationale không?

## References

- [IIBA — BABOK Guide](https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/) — negotiation và conflict resolution trong business analysis.
- [Harvard Business Review — Negotiation](https://hbr.org/topic/negotiation) — nguyên tắc đàm phán dựa trên lợi ích, không dựa trên vị trí.

## Related

- [Scope, Assumptions & Constraints](/posts/discovery-and-requirements/scope-assumptions-constraints)
- [Facilitation cho BA](/posts/soft-skills/facilitation-for-ba)
- [Tư duy phản biện & Có cấu trúc cho BA](/posts/soft-skills/critical-thinking-and-structured-thinking)
- [Change Request & Impact Analysis](/posts/agile-delivery/change-request-and-impact-analysis)

