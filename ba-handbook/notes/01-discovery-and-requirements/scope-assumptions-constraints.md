# Scope, Assumptions và Constraints cho BA

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

## 5. Running case

- **Fact:** policy hiện tại yêu cầu đăng nhập bằng tài khoản công ty.
- **Constraint:** authentication phải dùng corporate identity, source là policy
  SEC-12; Security owner xác nhận.
- **Assumption:** tên người phê duyệt được hiển thị cho requester.
- **Open question:** Security xác nhận visibility trước thứ Sáu.
- **Dependency:** bước kiểm tra ngân sách cần Finance service trả kết quả; API
  owner và SLA chưa rõ.
- **Risk:** nếu API không sẵn sàng cho release 1, cần option manual approval.

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

- [[problem-framing-and-business-objectives|Problem Framing & Business Objectives]]
- [[stakeholder-analysis-and-engagement|Stakeholder Analysis & Engagement]]
- [[requirement-elicitation|Requirement Elicitation]]
- [[current-state-and-future-state-analysis|Current & Future State Analysis]]

