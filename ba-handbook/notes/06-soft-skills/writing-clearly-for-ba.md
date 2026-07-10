# Viết rõ ràng cho BA

> Note này giúp BA viết requirement, AC, email và tài liệu không mơ hồ, không đa
> nghĩa — sao cho hai người đọc hiểu cùng một ý. Viết rõ ràng không phải tài
> năng; nó là kỹ năng có thể rèn bằng quy tắc cụ thể.

## Note này dùng để làm gì

Mở note khi bạn review requirement và thấy từ mơ hồ ("nhanh", "tốt", "thân
thiện"), khi dev/test hiểu khác nhau về cùng một AC, hoặc khi bạn viết email
mà stakeholder không hành động. Đọc sau
[[requirement-quality-and-validation|Requirement Quality & Validation]].

## 1. Ba nguyên tắc

| Nguyên tắc | Nghĩa là | Test nhanh |
|---|---|---|
| **Cụ thể hóa** | thay từ mơ hồ bằng con số, điều kiện, hoặc ví dụ | "Nhanh" → "< 3 giây p95"; "Dễ dùng" → "hoàn thành task trong < 2 phút, lần đầu không cần hướng dẫn" |
| **Một ý một câu** | không nhồi nhiều obligation vào một câu | Nếu câu có 2 chữ "và" → tách |
| **Viết cho người đọc** | dùng ngôn ngữ của audience (dev khác PO, tester khác sponsor) | Audience của tài liệu này là ai? Họ cần biết gì để làm việc? |

## 2. Từ mơ hồ → cụ thể

| Từ mơ hồ (cấm) | Thay bằng | Ví dụ |
|---|---|---|
| Nhanh / chậm | thời gian cụ thể + percentile | "< 3 giây p95 cho 1000 order/ngày" |
| Tốt / chất lượng | tiêu chí observable | "Không có lỗi P1 trong 30 ngày sau release" |
| Thân thiện / dễ dùng | task success rate + time | "85% user hoàn thành checkout trong < 2 phút, lần đầu" |
| Nhiều / ít | con số hoặc range | "Hỗ trợ tối đa 50 sản phẩm trong catalog" |
| Đôi khi / thỉnh thoảng | tần suất + evidence | "3 lần/tháng (nguồn: sổ ghi chép tháng 6)" |
| Quan trọng / ưu tiên | priority + rationale | "Priority High: vì 65% khách survey nói họ từng gọi hỏi trạng thái" |

### Cặp câu nên viết / câu nên tránh

| Tình huống | Viết mơ hồ (tránh) | Viết rõ (nên) |
|---|---|---|
| Performance requirement | "Hệ thống phải chạy nhanh." | "Khi khách bấm Đặt hàng, hệ thống kiểm tra stock và tạo order trong < 3 giây p95." |
| UI feedback | "Hiển thị thông báo thân thiện khi lỗi." | "Khi stock thiếu: hiển thị message 'Sản phẩm [tên] chỉ còn [availableStock]. Vui lòng giảm số lượng hoặc chọn sản phẩm khác.'" |
| Scope giới hạn | "Có thể mở rộng sau." | "Phiên bản MVP hỗ trợ catalog không quá 50 sản phẩm và 3 danh mục. Hỗ trợ > 1000 sản phẩm là ngoài scope MVP." |
| Permission | "Chỉ admin mới xem được." | "Chỉ user có role = SHOP_OWNER mới xem được danh sách payment. Nhân viên kho (role = WAREHOUSE_STAFF) không có quyền truy cập." |

## 3. Viết cho audience

Cùng một thông tin, viết khác cho từng audience:

| Audience | Họ cần gì | Cách viết |
|---|---|---|
| **Developer** | đủ chi tiết để code, không thừa | "API `POST /orders` nhận body: `{customerId, items: [{productId, quantity}]}`. Response: `{orderId, status, items: [{productId, quantity, availableStock, fulfilled}]}`. Nếu item nào `quantity > availableStock` → 422 với message từng item." |
| **Tester** | đủ scenario để viết test case | "Happy: order 2 sản phẩm đủ stock → 201. Failure: order với 1 sản phẩm thiếu stock → 422, message chứa tên sản phẩm + availableStock. Edge: order 0 sản phẩm → 400." |
| **PO / Sponsor** | đủ context để quyết định | "Hiện tại 3 lần/tháng order vượt stock. Sau MVP: 0 lần/tháng. Để đạt được, Sprint 1 cần `SF-3` Create Order + `SF-11` Stock Validation." |
| **End user (manual)** | đủ đơn giản để làm theo | "Để đặt hàng: 1. Chọn sản phẩm từ danh mục. 2. Bấm 'Thêm vào giỏ'. 3. Vào Giỏ hàng, bấm 'Đặt hàng'. 4. Xem mã đơn và trạng thái." |

## 4. Self-review: kiểm tra trước khi gửi

Trước khi gửi requirement hoặc AC cho team, BA tự kiểm tra:

| Test | Câu hỏi | Ví dụ sửa |
|---|---|---|
| **Hai người đọc** | Nếu đưa câu này cho 2 dev, họ có hiểu giống nhau không? | "Hệ thống phải thông báo nhanh" → 2 dev: 1 nghĩ popup, 1 nghĩ email. Sửa: "Hiển thị toast message trong < 1 giây sau khi order được tạo." |
| **Không "và"** | Câu có > 1 obligation không? | "Hệ thống phải kiểm tra stock và tạo order và gửi email" → tách 3 AC riêng |
| **Testable** | Tester có thể viết test case từ câu này không? | "Hệ thống phải bảo mật" → không testable. Sửa: "Payment mock không được log số thẻ. Chỉ log event `payment_attempt` với orderId, amount, status." |
| **Actor rõ** | Ai làm? Hệ thống hay user? | "Order được tạo" → bị động. "Khách hàng tạo order" hoặc "Hệ thống tạo order khi Khách hàng bấm Đặt hàng." |

### Running case: ShopFlow

**Trước khi review (AC mơ hồ của `SF-3` ban đầu):**

```markdown
- [ ] Hệ thống phải kiểm tra hàng trước khi bán
- [ ] Hiển thị thông báo nếu thiếu hàng
- [ ] Tạo order nhanh chóng
- [ ] Bảo mật thông tin khách hàng
```

**Sau khi review (AC rõ, 1 style, Gherkin):**

```gherkin
Given Khách hàng đã đăng nhập và có 2 sản phẩm trong giỏ
When Khách hàng bấm "Đặt hàng"
Then Hệ thống kiểm tra availableStock của từng item trong một transaction
  And Nếu tất cả item có availableStock >= quantity, tạo order với status PENDING_PAYMENT
  And Nếu bất kỳ item nào thiếu, reject toàn bộ order với message: "Sản phẩm [tên] chỉ còn [availableStock]. Vui lòng giảm số lượng hoặc chọn sản phẩm khác."
  And Thời gian phản hồi < 3 giây p95
  And Payment mock không lưu hoặc log số thẻ — chỉ log event payment_attempt với orderId, amount, status, timestamp
```

**Phân tích sự khác biệt:**

| AC cũ (mơ hồ) | Vấn đề | AC mới (rõ) |
|---|---|---|
| "kiểm tra hàng trước khi bán" | Không rõ kiểm tra lúc nào, kiểm tra cái gì | "kiểm tra availableStock của từng item trong một transaction" |
| "nếu thiếu hàng" | Thiếu bao nhiêu? Một phần hay tất cả? | "reject toàn bộ order" với message cụ thể |
| "nhanh chóng" | Không testable | "< 3 giây p95" |
| "bảo mật thông tin khách hàng" | Không rõ bảo mật cái gì, cách gì | "không lưu hoặc log số thẻ — chỉ log event payment_attempt với orderId, amount, status" |

**Viết email cho stakeholder — trước và sau:**

Trước (dài, không kết luận):
> "Chào chị, cuối tuần qua em đã phân tích requirement của mình. Em đã xem xét
> 5W1H và thấy mình cần làm rõ một số điểm. Đầu tiên, về vấn đề kiểm tra
> stock..."

Sau (pyramid principle, 5 dòng):
> "Chào chị, em đề xuất 3 quyết định cho `SF-3`:
> 1. Kiểm tra stock lúc submit (không phải add-to-cart).
> 2. Nếu thiếu → reject toàn bộ order (không bán lẻ từng món).
> 3. Mock payment, chưa tích hợp VNPay.
>
> Em cần chị confirm trước thứ Tư để team bắt đầu Sprint 1. Chi tiết AC trong link Jira bên dưới."

**Bài học:** "Viết rõ ràng" không có nghĩa là viết dài. Nó có nghĩa là viết
đủ để người đọc **hành động** mà không cần hỏi lại. AC mơ hồ làm lãng phí thời
gian của team hơn bất kỳ thứ gì khác — vì mỗi câu hỏi "cái này nghĩa là gì?"
đều làm gián đoạn sprint.

## Anti-patterns

| Anti-pattern | Vì sao nguy hiểm | Cách sửa |
|---|---|---|
| Dùng từ mơ hồ ("nhanh", "tốt", "thân thiện") | không testable, không implementable | thay bằng con số, điều kiện, ví dụ |
| Một câu AC chứa nhiều obligation | dev làm một phần, bỏ phần kia; tester không biết pass/fail thế nào | tách mỗi obligation thành 1 AC riêng |
| Viết cho mình đọc | dev/tester/PO không hiểu | xác định audience trước khi viết |
| Email dài, kể chuyện thời gian | stakeholder bận không đọc, bỏ lỡ action item | pyramid: kết luận → lý do → evidence |
| Dùng bị động ("được tạo", "được xử lý") | không rõ ai chịu trách nhiệm | dùng chủ động: "Khách hàng tạo order", "Hệ thống reject nếu thiếu stock" |

## Checklist nhanh

- Tôi có dùng từ mơ hồ ("nhanh", "tốt", "nhiều") không? Đã thay bằng số chưa?
- Mỗi câu AC có đúng 1 obligation không? Tách những câu có "và" chưa?
- Nếu đưa cho 2 dev, họ có hiểu giống nhau không?
- Tester có viết được test case từ AC này không?
- Tôi đã viết cho audience của tài liệu này chưa? (dev khác PO)
- Văn bản có dùng câu chủ động thay vì bị động không?

## References

- [Plainlanguage.gov](https://www.plainlanguage.gov/) — nguyên tắc viết rõ ràng cho tài liệu chính phủ, áp dụng được cho requirement.
- [IIBA — BABOK Guide](https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/) — yêu cầu về viết requirement trong Requirements Analysis and Design Definition.

## Related

- [[requirement-quality-and-validation|Requirement Quality & Validation]]
- [[critical-thinking-and-structured-thinking|Tư duy phản biện & Có cấu trúc cho BA]]
- [[user-story-and-acceptance-criteria|User Story & AC cho BA]]
