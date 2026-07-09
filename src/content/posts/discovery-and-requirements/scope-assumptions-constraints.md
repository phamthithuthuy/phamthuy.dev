---
title: "Scope, Assumptions và Constraints cho BA"
pubDatetime: 2026-06-19T07:11:15+00:00
description: "Note này giúp BA làm rõ boundary và uncertainty trong discovery. Scope nói phần thay đổi đang xét; assumption nói điều đang tin nhưng chưa chắc; constraint nói…"
tags: ["ba", "discovery-and-requirements"]
draft: false
---
> Note này giúp BA làm rõ boundary và uncertainty trong discovery. Scope nói
> phần thay đổi đang xét; assumption nói điều đang tin nhưng chưa chắc; constraint
> nói giới hạn có nguồn mà solution phải tôn trọng.

## Note này dùng để làm gì

Mở note khi project “cứ phình ra”, các bên gọi preference là constraint, hoặc
decision đang dựa trên giả định không ai sở hữu.

## 1. Đừng trộn sáu loại uncertainty

| Loại | Định nghĩa làm việc | Ví dụ |
|---|---|---|
| In scope | capability/process/segment sẽ được phân tích hoặc thay đổi | gửi, duyệt và theo dõi yêu cầu mua thiết bị |
| Out of scope | chủ động không xử lý trong boundary hiện tại | quản lý vòng đời tài sản sau khi nhận |
| Assumption | điều tạm tin để tiếp tục, cần kiểm chứng | Manager luôn duyệt trước Finance |
| Constraint | giới hạn có nguồn/authority | chỉ tài khoản công ty được truy cập |
| Dependency | outcome phụ thuộc bên/activity khác | Finance cung cấp API ngân sách |
| Risk/issue | sự kiện chưa xảy ra / vấn đề đã xảy ra | vendor trễ API / API test đang unavailable |

Preference “team muốn dùng tool X” chưa chắc là constraint. Hỏi nguồn: policy,
contract, regulation, budget, architecture decision hay chỉ thói quen?

## 2. Scope theo nhiều chiều

Đừng chỉ liệt kê feature. Mô tả boundary theo:

- **Outcome/capability:** thay đổi khả năng nào?
- **Process:** bắt đầu/kết thúc ở event nào?
- **Stakeholder/segment:** ai được phục vụ hoặc bị ảnh hưởng?
- **Data:** entity/data class nào được dùng?
- **System/interface:** hệ thống nào thuộc boundary, hệ thống nào chỉ dependency?
- **Time/release:** scope của discovery khác scope release đầu ra sao?

Ví dụ: release đầu cho phép tạo, duyệt và xem trạng thái; tích hợp mua hàng với
vendor portal là out of scope, nhưng chuẩn bị data contract có thể vẫn in scope.

## 3. Assumption register

Mỗi assumption cần:

| Field | Ví dụ |
|---|---|
| Statement | Finance có thể phản hồi kiểm tra ngân sách trong 4 giờ làm việc |
| Evidence hiện có | một cuộc trao đổi với Finance Ops |
| Impact nếu sai | SLA end-to-end và notification rule phải đổi |
| Validation method | phân tích timestamp 100 request gần nhất |
| Owner / due date | Finance Ops Lead / 25-06 |
| Status | Open, Validated, Rejected, Expired |

Assumption hết hạn nếu context thay đổi. “Validated” phải kèm evidence, không chỉ
đổi status.

## 4. Dependency và constraint phải có direction

Ghi “phụ thuộc Finance” là vô dụng. Ghi rõ **cái gì cần cái gì, trước thời điểm
nào, ai sở hữu và failure response**. Với constraint, ghi source/authority, phạm
vi, ngày hiệu lực và cách xin exception nếu có.

## 5. Running case: ShopFlow

**Scope của ShopFlow `SF-1` theo sáu chiều (§2):**

| Chiều | In scope | Out of scope |
|---|---|---|
| Outcome/capability | 8 luồng: browse catalog, create order, payment mock, delivery status, manage stock, receive stock, return, low stock alert | tích hợp payment gateway thật, tích hợp đơn vị vận chuyển, loyalty program, multi-shop |
| Process | từ lúc khách browse catalog đến lúc nhận hàng hoặc return | sourcing supplier, kế toán, báo cáo thuế |
| Stakeholder/segment | 1 chủ shop, 2 nhân viên kho, khách hàng của shop (B2C) | supplier, bên vận chuyển thứ ba |
| Data | Product, Customer, Order, OrderItem, Payment, InventoryItem, StockMovement, ReturnRequest (`SF-10`) | customer analytics, recommendation engine data |
| System/interface | Spring Boot backend + Vue 3 frontend; in-memory DB cho MVP | ERP, accounting system, SMS/email gateway |
| Time/release | MVP Sprint 1–2: `SF-2` catalog + `SF-3` order + `SF-6` stock | Sprint 3+: `SF-8` return, `SF-9` alert |

**Assumption register cho ShopFlow (§3):**

| Statement | Evidence | Impact nếu sai | Validation method | Owner | Status |
|---|---|---|---|---|---|
| Stock database luôn đồng bộ với stock thực tế | quan sát 1 buổi: shop nhỏ, ít biến động | nếu sai: `SF-11` atomic check không đủ, cần thêm cycle count `SF-15` | kiểm tra 3 lần/ngày trong 1 tuần: DB vs đếm thực tế | Nhân viên kho | Open |
| Khách hàng sẵn sàng dùng web thay vì gọi điện/chat | interview 3 khách quen: 2/3 nói "tiện hơn" | nếu sai: adoption thấp, vẫn phải duy trì kênh chat | survey 10 khách sau 2 tuần dùng thử | Chủ shop | Open |
| Mock payment đủ cho MVP, không cần integration thật | constraint từ Epic `SF-1` | nếu sai: không test được flow payment thật → rủi ro khi integrate thật sau này | N/A (là constraint, không cần validate) | Chủ shop | Accepted |

**Constraint có source/authority:**

| Constraint | Source | Authority |
|---|---|---|
| Không tích hợp payment gateway thật (`SF-4` mock) | Epic `SF-1` | Chủ shop (quyết định MVP scope) |
| Không tích hợp đơn vị vận chuyển (`SF-5` manual update) | Epic `SF-1` | Chủ shop |
| Authentication đơn giản, chưa có RBAC | Team decision (MVP) | Tech lead + Chủ shop |
| Java 21 + Spring Boot 3.3.x + Vue 3 | Tech stack decision | Developer team |

**Dependency có direction:**

| Consumer | Provider | Cần gì | Trước thời điểm | Owner |
|---|---|---|---|---|
| `SF-4` Payment mock | Backend team | API endpoint `POST /orders/{id}/payments` | Sprint 1 planning | Backend lead |
| `SF-5` Delivery status | Nhân viên kho | cập nhật trạng thái thủ công sau mỗi lần giao | mỗi ngày trong Sprint 2 | Nhân viên kho |
| `SF-7` Receive stock | Supplier | phiếu giao hàng (paper) để đối chiếu khi nhập | mỗi lần giao hàng | Nhân viên kho |

**Risk/issue:**

| Risk | Impact | Mitigation |
|---|---|---|
| Nhân viên kho không quen dùng web trên điện thoại | `SF-5` delivery update + `SF-7` receiving bị chậm adoption | prototype mobile-first sớm + training 1 buổi + hỗ trợ tuần đầu |
| Mock payment không phát hiện được edge case của payment thật | lúc integrate thật phát sinh rework | ghi rõ assumption trong `SF-4` AC; team aware |

## 6. Anti-patterns

| Anti-pattern | Cách sửa |
|---|---|
| out of scope = “mọi thứ khác” | ghi boundary theo process/data/system |
| assumption không owner/deadline | đưa vào register và ưu tiên theo impact |
| preference được gọi là constraint | yêu cầu source và authority |
| dependency không direction | ghi provider, consumer, deliverable, date |
| scope freeze quá sớm trong discovery | dùng scope hypothesis và change rationale |

## 7. Checklist nhanh

- In/out scope có đủ capability, process, stakeholder, data và system không?
- Mỗi assumption có impact-if-false, owner và validation method không?
- Constraint có source/authority không?
- Dependency có direction, deliverable và due date không?
- Risk và issue có bị trộn không?
- Scope change có rationale và decision owner không?

## References

- [IIBA — BABOK Guide](https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/) — khung cho strategy, requirements life cycle và quản lý thông tin liên quan.
- [UK Government Service Manual — Discovery phase](https://www.gov.uk/service-manual/agile-delivery/how-the-discovery-phase-works) — discovery dùng để hiểu constraint, risk và problem trước khi cam kết build.

## Related

- [Problem Framing & Business Objectives](/posts/discovery-and-requirements/problem-framing-and-business-objectives)
- [Stakeholder Analysis & Engagement](/posts/discovery-and-requirements/stakeholder-analysis-and-engagement)
- [Requirement Elicitation](/posts/discovery-and-requirements/requirement-elicitation)
- [Current & Future State Analysis](/posts/discovery-and-requirements/current-state-and-future-state-analysis)


