# Document Analysis cho BA

> Note này giúp BA khai thác tài liệu hiện có (policy, form, log, spec, contract)
> để tìm business rule, term, data definition và discrepancy. Document analysis
> rẻ và không làm gián đoạn ai, nhưng tài liệu có thể lỗi thời — luôn kiểm tra
> owner và version.

## Note này dùng để làm gì

Mở note khi có sẵn policy, quy trình, form mẫu, log hệ thống hoặc spec cũ và
bạn cần trích xuất rule, term, constraint mà không làm phiền stakeholder. Đọc
[[elicitation-technique-selection|Elicitation Technique Selection]] trước.

## 1. Khi nào dùng và không dùng

| Dùng khi | Không dùng khi |
|---|---|
| có policy/quy trình/form đã được ban hành | không có tài liệu nào (hoặc tài liệu không ai biết tới) |
| cần hiểu rule hiện hành, term chuẩn, data field | cần hiểu hành vi thực tế khác tài liệu (dùng observation) |
| cần baseline để so sánh với "cách làm thật" | tài liệu không có owner, không có version — không biết còn hiệu lực |
| stakeholder không có thời gian hoặc không muốn bị làm phiền | cần context và motivation đằng sau rule (dùng interview) |

**Weakness chính:** outdated artifact (tài liệu cũ hơn thực tế), thiếu context
(vì sao rule này tồn tại), và interpretation bias (BA đọc rule theo cách có
lợi cho solution). Bù bằng interview với author + triangulate với observation.

## 2. Các loại tài liệu và BA khai thác gì

| Loại tài liệu | BA tìm gì | Ví dụ |
|---|---|---|
| **Policy / SOP** | business rule, authority, sequence constraint | "Đơn > 1 triệu cần Manager duyệt trước Finance" |
| **Form / Template** | data field, mandatory/optional, allowed value | form yêu cầu có trường "mã ngân sách" nhưng không có trường "mã phòng ban" |
| **System log / Report** | volume, frequency, error pattern, peak | 18/50 yêu cầu tháng trước phải hỏi lại trạng thái |
| **Contract / SLA** | legal constraint, timeframe, penalty | "Supplier phải giao trong 48h, phạt 5% nếu trễ" |
| **Spec cũ / Legacy doc** | term definition, data model, interface | entity "Order" có 12 trường nhưng chỉ 5 trường thực sự được dùng |
| **Email / Chat log** (có consent) | pain point, workaround, communication breakdown | "Tôi gửi request tuần trước, giờ vẫn chưa thấy ai duyệt" |

## 3. Quy trình document analysis

1. **Xác định document:** tên, owner, version, ngày hiệu lực.
2. **Đọc với câu hỏi:** tôi cần biết gì? (rule? term? data field? gap?)
3. **Trích xuất và phân loại:** fact, business rule, term, constraint, open question.
4. **So sánh chéo:** document nói gì, interview nói gì, observation thấy gì?
5. **Xác nhận với owner:** "Tôi hiểu rule này là X, có đúng không?"

### Running case: ShopFlow

BA phân tích sổ ghi chép order của chủ shop để tìm pattern trước khi thiết kế
`SF-3` Create Order:

**Document:** Sổ ghi chép tay, tháng 6/2026, chủ shop.

**Câu hỏi cần trả lời:**
- Những mặt hàng nào thường bị order vượt stock?
- Order thường có bao nhiêu item?
- Có pattern nào về thời điểm order vượt stock?

**Trích xuất từ sổ:**

| Ngày | Order | Kết quả | Ghi chú của chủ shop |
|---|---|---|---|
| 03/06 | Khách A: 5 món | Giao 3, thiếu 2 | "Gọi xin lỗi, khách cancel" |
| 12/06 | Khách B: 2 món | OK | — |
| 18/06 | Khách C: 4 món | Giao 2, thiếu 2 | "Khách đồng ý nhận 2 món, hẹn giao bù" |
| 25/06 | Khách D: 3 món | Giao 3 OK sau khi gọi supplier gấp | "May có supplier giao kịp" |

**Phát hiện:**

| Loại | Ghi nhận |
|---|---|
| Fact | 3/4 order trong tháng 6 có vấn đề stock; trung bình order 3–5 item |
| Pattern | Order vượt stock tập trung vào 2 mặt hàng bán chạy (không có đủ stock dự trữ) |
| Business rule ngầm | "Gọi xin lỗi và hủy nếu thiếu" là rule thực tế, nhưng có exception: "khách đồng ý nhận một phần" (25/06) |
| Pain point | Mỗi lần vượt stock mất ~15 phút gọi điện + 1 khách cancel trung bình |
| Discrepancy | Chủ shop nói "tôi luôn kiểm tra kho trước khi nhận order" nhưng sổ cho thấy 3/4 lần vẫn bị vượt — vì sổ stock cũng là sổ tay, không real-time |

**Requirement candidate từ document analysis:**
- `SF-3` phải kiểm tra stock real-time, không dựa vào trí nhớ/sổ tay.
- `SF-11` Stock Validation: atomic check, nhưng cần rule cho partial accept (từ exception 25/06) — BA ghi open question: "Có cho phép khách nhận một phần order khi thiếu không?" → chủ shop quyết định: "Không — reject toàn bộ".

**Triangulate với interview:** BA hỏi chủ shop về ngày 25/06 — "Lần đó chị vẫn giao dù thiếu, vì sao?" → Chủ shop: "Vì khách đó là khách quen 2 năm, tôi không muốn mất." → BA ghi assumption: "Quy tắc 'từ chối toàn bộ' có thể có exception cho khách VIP" — đưa vào backlog cho Sprint 2.

**Bài học:** Document analysis không chỉ tìm rule — nó tìm **discrepancy giữa
những gì stakeholder nói và những gì dữ liệu cho thấy**. Chủ shop nói "tôi luôn
kiểm kho" nhưng sổ ghi chép chứng minh ngược lại. Và nó phát hiện exception
("khách VIP được partial accept") mà chủ shop không nghĩ là "rule" cho tới khi
được hỏi.

## Anti-patterns

| Anti-pattern | Vì sao nguy hiểm | Cách sửa |
|---|---|---|
| Coi document là source of truth tuyệt đối | document có thể lỗi thời hoặc không phản ánh thực tế | triangulate với interview + observation |
| Không kiểm tra owner/version | phân tích tài liệu đã hết hiệu lực | luôn xác nhận version, owner, ngày hiệu lực |
| Copy-paste document thành requirement | document mô tả hiện tại, requirement mô tả tương lai | phân biệt "as-is rule" và "to-be requirement" |
| Bỏ qua discrepancy giữa document và interview | mất cơ hội phát hiện workaround hoặc rule ngầm | so sánh chéo: document vs interview vs observation |
| Phân tích quá nhiều document | paralysis — đọc 200 trang nhưng không ra decision | giới hạn document theo câu hỏi cần trả lời |

## Checklist nhanh

- Document có owner, version, ngày hiệu lực không? Còn hiệu lực không?
- Tôi đang tìm gì trong document này? (rule? term? data? gap?)
- Đã trích xuất fact, rule, term, constraint, open question chưa?
- Document có mâu thuẫn với interview hoặc observation không?
- Đã xác nhận interpretation với document owner chưa?

## References

- [IIBA — BABOK Guide](https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/) — document analysis như một elicitation technique.
- [UK Government Service Manual — Working with existing evidence](https://www.gov.uk/service-manual/user-research/using-existing-evidence) — cách dùng dữ liệu và tài liệu có sẵn trong discovery.

## Related

- [[elicitation-technique-selection|Elicitation Technique Selection]]
- [[stakeholder-interview|Stakeholder Interview]]
- [[observation-for-ba|Observation & Contextual Inquiry cho BA]]
