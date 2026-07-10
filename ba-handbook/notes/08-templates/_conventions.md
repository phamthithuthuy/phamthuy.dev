# Conventions — Templates

> File này **mở rộng** [[note-guidelines|Note guidelines]] cho riêng nhóm `08-templates`. Chỉ thêm hoặc siết chặt luật chung. Nếu mâu thuẫn luật chung, **luật chung thắng**.

## Phạm vi

Áp dụng cho note chứa template copy-ready: elicitation note, requirement brief, story/AC, refinement note, impact analysis, decision log, SRS.

## Hard rules

| Rule | Vì sao |
|---|---|
| Mỗi template phải đặt trong **code block** để copy nguyên khối, không lẫn văn giải thích vào trong block. | Người dùng copy-paste; lẫn giải thích vào template làm bẩn output. |
| Mỗi template phải có **placeholder rõ ràng** (ví dụ `<tên tính năng>`, `<actor>`), không để ví dụ cụ thể giả làm chỗ điền. | Placeholder mơ hồ khiến người dùng quên thay, để lọt nội dung mẫu vào tài liệu thật. |
| Mỗi template kèm **1–2 dòng "khi nào dùng"** đặt ngoài code block. | Template không có context dễ bị dùng sai chỗ. |

## Default conventions

- Placeholder mặc định bọc trong `<...>`.
- Template dài ưu tiên kèm **một ví dụ đã điền** ngay dưới, tách rõ khỏi template gốc.

## Local vocabulary

- **Placeholder**: chỗ trống cần thay bằng nội dung thật.
- **Copy-ready**: template dùng được ngay, không cần biên tập lại cấu trúc.

## Khi nào KHÔNG áp dụng

- Template quá ngắn (1–2 dòng) có thể không cần ví dụ đã điền.

## Related

- [[note-guidelines|Note guidelines]]
- [[README|Index nhóm 08]]
