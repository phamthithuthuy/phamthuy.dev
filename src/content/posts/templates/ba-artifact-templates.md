---
title: "BA Artifact Templates"
pubDatetime: 2026-07-10T03:46:44+00:00
description: "Note này cung cấp template copy-ready cho các artifact BA thường xuyên tạo ra: User Story, Acceptance Criteria (Gherkin + Checklist), Definition of Ready/Done…"
tags: ["ba", "templates"]
draft: false
---
> Note này cung cấp template copy-ready cho các artifact BA thường xuyên tạo ra:
> User Story, Acceptance Criteria (Gherkin + Checklist), Definition of
> Ready/Done checklist, Decision Log, và Open Question Register. Không dạy lý
> thuyết — dùng để copy-paste vào Jira, Confluence hoặc email.

## Note này dùng để làm gì

Mở note khi bạn cần viết story, AC, hoặc decision log và muốn có template nhanh
thay vì nghĩ format từ đầu. Tất cả template đều đã được dùng trong ShopFlow và
các note thực hành. Đọc kèm note dạy kỹ năng tương ứng (không thay thế).

## 1. User Story Template

```markdown
**Story ID:** [SF-XX]
**Epic:** [SF-1 Online Shop Sales and Inventory MVP]
**Priority:** [High / Medium / Low]

---

Là <role>,
tôi muốn <objective>,
để <value>.

---

**Acceptance Criteria:** (xem bên dưới, chọn Gherkin hoặc Checklist)

**Notes / Context:**
- [dependency, constraint, assumption liên quan]
- [wireframe link nếu có]

**Estimate:** [Fibonacci: 1, 2, 3, 5, 8, 13]
**Sprint:** [Sprint X]
```

Ví dụ ShopFlow:

```markdown
**Story ID:** SF-3
**Epic:** SF-1 Online Shop Sales and Inventory MVP
**Priority:** High

---

Là Khách hàng,
tôi muốn tạo đơn hàng từ catalog,
để mua hàng không cần gọi điện.

---

**Notes / Context:**
- Stock check phải atomic (reject toàn bộ order nếu một item thiếu — SF-11)
- Payment mock, không tích hợp gateway thật (SF-4)

**Estimate:** 5
**Sprint:** Sprint 1
```

## 2. Acceptance Criteria Template

### 2A. Gherkin (cho story có flow rõ)

```gherkin
Given <precondition / context>
When <trigger / action>
Then <expected outcome>
  And <additional condition>
```

Ví dụ ShopFlow `SF-3`:

```gherkin
Given Khách hàng đã đăng nhập và có 2 sản phẩm trong giỏ
When Khách hàng bấm "Đặt hàng"
Then Hệ thống kiểm tra availableStock của từng item trong một transaction
  And Nếu tất cả item có availableStock >= quantity, tạo order với status PENDING_PAYMENT
  And Nếu bất kỳ item nào thiếu, reject toàn bộ order với message "Sản phẩm [tên] chỉ còn [availableStock]"
```

### 2B. Checklist (cho constraint, UI, permission)

```markdown
- [ ] <điều kiện observable>
- [ ] <điều kiện observable>
- [ ] <failure / edge case>
```

Ví dụ ShopFlow `SF-2`:

```markdown
- [ ] Sản phẩm hiển thị ảnh, tên, giá
- [ ] Có thể lọc theo danh mục
- [ ] Ảnh hiển thị đúng trên mobile (responsive)
- [ ] Khi không có sản phẩm nào: hiển thị "Chưa có sản phẩm nào trong danh mục này"
```

## 3. Definition of Ready (DoR) Checklist

Copy checklist này vào mỗi story trước refinement:

```markdown
## Definition of Ready — [SF-XX]

- [ ] Story: role, objective, value (để...) đủ và rõ
- [ ] AC: ≥ 2 AC verifiable, bao gồm ít nhất 1 failure/exception path
- [ ] Dependency: đã xác định và resolved / có owner + due date
- [ ] UI/UX: wireframe hoặc mockup đã sẵn sàng (nếu story có màn hình)
- [ ] Estimate được: team có đủ context để estimate
- [ ] Testable: tester xác nhận có thể viết test case từ AC
- [ ] Không có open question blocking

**Ready:** [Yes / No]
**Gap (nếu No):** [mô tả + owner + due date]
```

## 4. Definition of Done (DoD) Checklist

```markdown
## Definition of Done — [SF-XX]

- [ ] Code hoàn thành và đã review
- [ ] Unit test pass (coverage theo team convention)
- [ ] AC verified — tester xác nhận tất cả AC pass
- [ ] Không có lỗi P1/P2 chưa resolved
- [ ] Wireframe/design đã được UX confirm (nếu có thay đổi)
- [ ] Tài liệu liên quan đã được cập nhật
- [ ] Demo được cho stakeholder (nếu cần)
```

## 5. Decision Log Template

```markdown
| ID | Ngày | Decision | Context | Người quyết định | Impact | Dissent |
|---|---|---|---|---|---|---|
| DL-01 | YYYY-MM-DD | [quyết định gì] | [vì sao cần quyết định] | [tên + role] | [ảnh hưởng tới story/estimate/schedule] | [ý kiến khác, nếu có] |
```

Ví dụ ShopFlow:

```markdown
| ID | Ngày | Decision | Context | Người quyết định | Impact | Dissent |
|---|---|---|---|---|---|---|
| DL-01 | 2026-07-15 | Stock check lúc submit, atomic (reject toàn bộ nếu thiếu 1 item) | SF-3 refinement: không rõ check lúc add-to-cart hay submit | PO (chủ shop) | Dev SF-11: dùng transaction, không cần optimistic lock ở MVP | Tester đề xuất partial accept — ghi nhận cho Sprint 2 |
| DL-02 | 2026-07-15 | availableStock = on_hand − reserved, tính runtime | SF-6 refinement: không rõ có cần lưu cột availableStock | Tech Lead | Bỏ field availableStock khỏi SF-14 DB schema | — |
```

## 6. Open Question Register Template

```markdown
| ID | Open Question | Owner | Due Date | Status | Resolution |
|---|---|---|---|---|---|
| OQ-01 | [câu hỏi] | [tên] | YYYY-MM-DD | Open / Resolved / Expired | [câu trả lời hoặc lý do expired] |
```

Ví dụ ShopFlow:

```markdown
| ID | Open Question | Owner | Due Date | Status | Resolution |
|---|---|---|---|---|---|
| OQ-01 | Ai được phép override stock validation? | Chủ shop | 2026-07-20 | Open | — |
| OQ-02 | Return window bao lâu? 7 ngày hay 14 ngày? | Chủ shop | 2026-07-22 | Resolved | 7 ngày kể từ ngày nhận hàng |
| OQ-03 | Dữ liệu sổ cũ có cần migrate không? | Chủ shop | 2026-07-18 | Resolved | Không — nhập stock đầu kỳ thủ công 1 lần |
```

## 7. Elicitation Note Template

Dùng cho interview, observation, hoặc workshop. Copy-paste và điền.

```markdown
## Elicitation: [Activity Type] — [Date]

**Objective:** [sau activity này, tôi phải biết / quyết định được gì?]
**Participant:** [role, không phải tên]
**Technique:** [interview / observation / workshop]
**Duration:** [phút]

---

### Raw Notes

| Quote / Observation | Interpretation | Assumption | Follow-up |
|---|---|---|---|
| "[trích dẫn trực tiếp]" | [BA diễn giải] | [điều đang giả định] | [cần kiểm gì / hỏi ai] |
```

### Running case: ShopFlow

Tất cả template trên đều được dùng trong dự án ShopFlow:

| Template | ShopFlow Jira |
|---|---|
| User Story | `SF-2`..`SF-9` (8 story, mỗi story theo template) |
| AC — Gherkin | `SF-3` Create Order, `SF-6` Manage Stock, `SF-7` Receive Stock, `SF-8` Return |
| AC — Checklist | `SF-2` Browse Catalog, `SF-4` Payment, `SF-5` Delivery, `SF-9` Alert |
| DoR Checklist | Áp dụng trong refinement Sprint 1 cho `SF-2`, `SF-3`, `SF-6` |
| Decision Log | Ghi trong mỗi buổi refinement (xem [Backlog Refinement](/posts/agile-delivery/backlog-refinement)) |
| Open Question Register | 3 open question từ workshop kick-off (xem [Requirements Workshop](/posts/discovery-and-requirements/requirements-workshop)) |

**Bài học:** Template không thay thế tư duy. Một story viết đúng template nhưng
không có value ("để...") vẫn là story kém. Template là checklist chống quên; kỹ
năng phân tích mới là thứ làm cho artifact có giá trị.

## References

- [Atlassian — User Stories](https://www.atlassian.com/agile/project-management/user-stories) — template và hướng dẫn viết story.
- [Cucumber — Gherkin Reference](https://cucumber.io/docs/gherkin/reference/) — syntax chuẩn cho Gherkin.

## Related

- [User Story & AC cho BA](/posts/agile-delivery/user-story-and-acceptance-criteria)
- [Backlog Refinement cho BA](/posts/agile-delivery/backlog-refinement)
- [Requirement Elicitation](/posts/discovery-and-requirements/requirement-elicitation)
- [Agile Concepts cho BA](/posts/agile-delivery/agile-concepts-for-ba)

