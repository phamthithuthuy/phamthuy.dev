# Conventions — Agile Delivery

> File này **mở rộng** [[note-guidelines|Note guidelines]] cho riêng nhóm `04-agile-delivery`. Chỉ thêm hoặc siết chặt luật chung. Nếu mâu thuẫn luật chung, **luật chung thắng** và phải sửa file này — không tạo exception âm thầm.

## Phạm vi

Áp dụng cho mọi note trong folder này: Agile concepts, case study → backlog, user story/AC, refinement, change request, estimation.

## Hard rules

| Rule | Vì sao |
|---|---|
| User story viết theo mẫu **"Là `<role>`, tôi muốn `<mục tiêu>`, để `<giá trị>`"**. | Thiếu vế "để…" là story không rõ giá trị, dễ làm sai ưu tiên. |
| Mỗi story phải có **Acceptance Criteria kiểm chứng được** trước khi coi là ready. | Không có AC thì không có cách xác nhận "done"; vi phạm DoR. |
| AC viết theo **một style nhất quán trong cùng một note**: hoặc Gherkin (Given/When/Then), hoặc checklist — không trộn trong cùng story. | Trộn style làm reviewer khó đọc và khó tự động hóa test. |
| Mọi **decision, dependency, open question** trong refinement phải được ghi lại, không để ở trí nhớ. | BA thường phải giải trình lại quyết định cũ; xem [[backlog-refinement\|Backlog Refinement]]. |

## Default conventions

Được lệch nếu ghi rõ lý do trong note:

- **AC mặc định dùng Gherkin** (Given/When/Then) cho story có luồng rõ; dùng checklist cho story dạng ràng buộc/UI đơn giản.
- **Thang estimate mặc định**: Fibonacci story point (1, 2, 3, 5, 8, 13). Nếu team thật dùng thang khác, ghi rõ trong note.
- Story lớn hơn 8 điểm nên cân nhắc **split** trước khi vào sprint.

## Local vocabulary

- **Sprint slice**: phần backlog được chọn để giao trong một sprint.
- **Ready / Not ready**: trạng thái theo DoR; xem [[agile-concepts-for-ba|Agile cho BA]].
- **Pain point**: vấn đề gốc của stakeholder, điểm khởi đầu khi đi từ case study ra backlog.

## Khi nào KHÔNG áp dụng

- Spike/research item có thể không theo mẫu story chuẩn, nhưng phải ghi rõ nó là spike.
- Khi convention của team thật khác (ví dụ team dùng job story thay user story) → theo team, ghi rõ lý do.

## Related

- [[note-guidelines|Note guidelines]]
- [[README|Index nhóm 04]]
