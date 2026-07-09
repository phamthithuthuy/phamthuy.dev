---
title: "Stakeholder Analysis và Engagement cho BA"
pubDatetime: 2026-06-19T07:11:15+00:00
description: "Note này giúp BA tìm đúng người để lấy evidence, xác định ai bị ảnh hưởng và ai có quyền quyết định. Stakeholder map chỉ có giá trị khi nó dẫn tới engagement p…"
tags: ["ba", "discovery-and-requirements"]
draft: false
---
> Note này giúp BA tìm đúng người để lấy evidence, xác định ai bị ảnh hưởng và ai
> có quyền quyết định. Stakeholder map chỉ có giá trị khi nó dẫn tới engagement
> plan và được cập nhật khi scope thay đổi.

## Note này dùng để làm gì

Mở note khi bắt đầu discovery, chuẩn bị elicitation plan, thiếu người xác nhận
business rule hoặc các bên đưa ra yêu cầu xung đột.

## 1. Tìm stakeholder từ công việc, không từ sơ đồ tổ chức

Quét sáu hướng:

1. ai thực hiện hoặc nhận kết quả của process;
2. ai quyết định/approve/chi tiền;
3. ai tạo, sở hữu hoặc dùng data;
4. ai build, test, operate và support solution;
5. ai chịu risk, compliance hoặc audit;
6. ai bị ảnh hưởng nhưng ít quyền lên tiếng.

```plantuml Stakeholder Analysis — luồng thông tin quanh yêu cầu mua thiết bị
@startuml
left to right direction
actor Employee
actor Manager
actor Procurement
actor Finance
actor IT
actor Security
rectangle "Yêu cầu mua thiết bị\n(scope discovery)" as Scope #LightBlue
Employee --> Scope : need · status pain
Manager --> Scope : approval rule
Procurement --> Scope : process · vendor data
Finance --> Scope : budget control
IT --> Scope : device standard
Security --> Scope : access · audit constraint
Scope --> Employee : outcome · status
note bottom of Scope
BA cần cả người biết quy trình,
người quyết định và người chịu impact.
end note
@enduml
```

Sơ đồ không nói ai “quan trọng hơn”. Nó cho thấy loại information/evidence cần
lấy và gap nếu một role chưa tham gia.

## 2. Stakeholder register đủ dùng

| Field | Ý nghĩa |
|---|---|
| Role/segment | dùng vai trò, không khóa vào tên người |
| Impact | solution/process thay đổi công việc của họ ra sao? |
| Knowledge/evidence | họ biết rule, behavior hay data nào? |
| Influence/authority | họ tư vấn, approve hay có quyền veto? |
| Interest/concern | outcome/risk nào họ quan tâm? |
| Availability/channel | tiếp cận khi nào và bằng cách nào? |
| Engagement owner | ai chịu trách nhiệm giữ họ trong vòng thông tin? |

Power/interest matrix giúp chọn mức engagement nhưng dễ tạo nhãn cố định. Một
end user ít quyền vẫn có evidence thiết yếu; sponsor nhiều quyền chưa chắc biết
workflow thực tế.

## 3. RACI không thay stakeholder analysis

RACI trả lời ai Responsible/Accountable/Consulted/Informed cho một activity. Nó
không thể hiện impact, concern, knowledge gap hay cách tạo trust. Dùng RACI sau
khi activity và decision boundary đủ rõ, không dùng nó để “tìm stakeholder”.

## 4. Engagement theo nhu cầu thông tin

| Context | Engagement phù hợp | Cần cẩn thận |
|---|---|---|
| knowledge cá nhân/nhạy cảm | 1:1 interview | confidentiality, proxy bias |
| rule xung đột giữa nhiều bên | workshop có decision owner | power imbalance |
| hành vi thực tế | observation + playback | consent, observer effect |
| approver ít thời gian | concise pre-read + decision request | đừng gửi raw notes |
| impacted group lớn | sample interview rồi survey | sampling và wording bias |

Mỗi engagement phải có objective và output. “Giữ stakeholder informed” chưa đủ;
hãy ghi họ cần biết gì, để quyết định/hành động gì, ở cadence nào.

## 5. Running case: gap dễ bỏ sót

Fact từ Procurement chưa đủ để chốt approval flow:

- Manager biết ngữ cảnh team nhưng không sở hữu budget rule.
- Finance sở hữu threshold nhưng không thấy pain point hằng ngày.
- IT biết device standard; Security biết quyền xem/audit.
- Employee là người chịu impact nhưng không có approval authority.

**Assumption cần kiểm chứng:** Security chỉ cần được informed. Nếu access policy
là constraint bắt buộc, Security phải được consulted hoặc approve phần liên quan.

### Running case: ShopFlow

Áp quét sáu hướng (§1) cho ShopFlow `SF-1`:

| Hướng quét | Stakeholder ShopFlow | Evidence / decision họ nắm |
|---|---|---|
| 1. thực hiện/nhận kết quả process | Nhân viên kho | workflow nhập hàng `SF-7`, kiểm stock `SF-6`, cập nhật delivery `SF-5` |
| 2. quyết định/approve/chi tiền | Chủ shop | duyệt boundary "không payment/shipper thật", quyết định rule return `SF-8`, threshold low stock `SF-9` |
| 3. tạo/sở hữu/dùng data | Khách hàng | browse catalog `SF-2`, tạo order `SF-3` — tạo ra order data và payment event |
| 4. build/test/operate | Developer / Tester | nhận AC từ mỗi story, viết QA scenario (`SF-13`, `SF-16`, `SF-19`) |
| 5. risk/compliance/audit | Chủ shop (kiêm) | quy định return window, audit stock movement `SF-6` |
| 6. bị ảnh hưởng nhưng ít quyền | Khách hàng | không có quyền quyết định nhưng chịu impact của stock validation fail, delivery delay |

**Stakeholder register rút gọn cho ShopFlow:**

| Role | Impact | Knowledge | Influence | Engagement |
|---|---|---|---|---|
| Chủ shop | solution thay cách quản lý shop thủ công → tự động | business rule (return, threshold, pricing) | **approve** | workshop kick-off + decision request hàng sprint |
| Nhân viên kho | workflow nhập/xuất/kiểm đổi từ sổ giấy → màn hình | hành vi thực tế lúc nhận hàng, kiểm stock | **consulted** | observation tại kho + playback prototype |
| Khách hàng | trải nghiệm mua hàng đổi từ chat/điện thoại → web | pain point thật lúc hết hàng, chờ trạng thái | **informed** (MVP) | sample interview 3-5 khách quen |

**Lưu ý về conflict of interest:** Trong shop nhỏ, Chủ shop kiêm luôn compliance/audit (hướng 2 và 5 là cùng một người). Với enterprise, đây là hai role tách biệt — BA phải kiểm tra segregation of duties và không được gộp chung chỉ vì "một người nói là đủ".

**Gap dễ bỏ sót:** Nhân viên kho là internal stakeholder nhưng BA mới thường chỉ làm việc với Chủ shop (người ký duyệt). Hậu quả: pre-condition nhập hàng `SF-7` (supplier giao thiếu/muộn), exception lúc kiểm stock `SF-15` (hàng hỏng khi kiểm) không ai phát hiện cho tới sprint thực thi. Engagement plan cho Nhân viên kho: observation 1 buổi sáng lúc nhận hàng supplier + playback wireframe `SF-38` trước khi dev.

## 6. Anti-patterns

| Anti-pattern | Cách sửa |
|---|---|
| chỉ làm việc với sponsor | thêm người thực hiện, vận hành và chịu impact |
| actor là “chị Lan” | dùng role; tên người nằm ở contact field |
| power thấp = không cần hỏi | tách authority khỏi evidence/impact |
| map stakeholder một lần | review khi scope, rule hoặc decision thay đổi |
| mời mọi người vào mọi cuộc họp | chọn engagement theo information need |

## 7. Checklist nhanh

- Đã có người thực hiện, quyết định, sở hữu data, vận hành và chịu risk chưa?
- Ai có evidence trực tiếp, ai chỉ có opinion?
- Ai bị ảnh hưởng nhưng đang thiếu tiếng nói?
- Decision owner cho từng vấn đề là ai?
- Technique/channel có phù hợp concern và power dynamic không?
- Register có owner và thời điểm review không?

## References

- [IIBA — BABOK Guide](https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/) — khung Elicitation and Collaboration và stakeholder engagement.
- [UK Government Service Manual — Choose participants](https://www.gov.uk/service-manual/user-research/find-user-research-participants) — nguyên tắc chọn đúng nhóm người dùng thay vì chỉ dùng stakeholder dễ tiếp cận.

## Related

- [Requirement Elicitation](/posts/discovery-and-requirements/requirement-elicitation)
- [Stakeholder Interview](/posts/discovery-and-requirements/stakeholder-interview)
- [Requirements Workshop](/posts/discovery-and-requirements/requirements-workshop)
- [Scope, Assumptions & Constraints](/posts/discovery-and-requirements/scope-assumptions-constraints)


