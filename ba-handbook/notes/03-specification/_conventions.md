# Conventions — Specification

> File này **mở rộng** [[note-guidelines|Note guidelines]] cho riêng nhóm `03-specification`. Chỉ thêm hoặc siết chặt luật chung. Nếu mâu thuẫn luật chung, **luật chung thắng**.

## Phạm vi

Áp dụng cho note về SRS/FRS, BRD, NFR spec, và Requirements Traceability Matrix (RTM).

## Hard rules

| Rule | Vì sao |
|---|---|
| Mỗi requirement trong spec phải có **ID duy nhất, ổn định** (ví dụ `FR-001`, `NFR-003`). | Không có ID thì không truy vết được và không tham chiếu được trong RTM. |
| Requirement phải **kiểm chứng được** (testable): tránh từ mơ hồ như "nhanh", "thân thiện", "dễ dùng". | Spec không testable thì không nghiệm thu được. |
| RTM phải truy vết được tối thiểu **requirement ↔ use case/story ↔ test case**. | Đây là giá trị cốt lõi của traceability: biết cái gì ảnh hưởng cái gì khi thay đổi. |
| NFR phải có **tiêu chí đo được** (con số, ngưỡng, điều kiện). | NFR không số là NFR vô nghĩa. |

## Default conventions

- Prefix ID mặc định: `FR-` (functional), `NFR-` (non-functional), `BR-` (business rule).
- Cấu trúc SRS mặc định bám template trong `library/10-templates/`; lệch thì ghi rõ.

## Local vocabulary

- **Testable requirement**: requirement viết sao cho có thể tạo được ít nhất một test case xác nhận đúng/sai.
- **Traceability**: khả năng lần ngược-xuôi giữa requirement và artifact liên quan.

## Khi nào KHÔNG áp dụng

- Dự án rất nhỏ có thể gộp BRD vào SRS — nhưng vẫn phải giữ ID và tính testable.

## Related

- [[note-guidelines|Note guidelines]]
- [[README|Index nhóm 03]]
- [[../mapping/README|Study Map & Source Mapping]]
