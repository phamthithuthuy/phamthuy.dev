# Conventions — System Analysis & Design

> File này **mở rộng** [[note-guidelines|Note guidelines]] cho riêng nhóm `02-system-analysis-and-design`. Chỉ thêm hoặc siết chặt luật chung. Nếu mâu thuẫn luật chung, **luật chung thắng** và phải sửa file này — không tạo exception âm thầm.

## Phạm vi

Áp dụng cho mọi note trong folder này: FDD, MoSCoW, nguyên tắc phân tích, CRUD, Use Case, và các modeling diagram tương lai (Activity, Sequence, State, Wireframe).

## Hard rules

| Rule | Vì sao |
|---|---|
| Mọi diagram phải ghi rõ **notation** đang dùng (UML, BPMN, hay free-form) ngay đầu phần ví dụ. | Người đọc sau không đoán nhầm ký hiệu; trộn notation làm diagram vô nghĩa. |
| Use Case mô tả phải có đủ: **actor, trigger, pre-condition, post-condition, normal flow, exception flow**. | Thiếu một mục là spec hở; đây là khung tối thiểu để dev/test đọc được. |
| Tên **actor** dùng vai trò, không dùng tên người hay tên phòng ban cụ thể (ví dụ "Customer", không "chị Lan"). | Spec phải bền khi nhân sự đổi. |
| Khi bóc tính năng "Quản lý X", **bắt buộc soát đủ CRUD** rồi mới bỏ bớt case có lý do. | Chống sót thao tác dữ liệu — xem [[crud-operations\|CRUD cho BA]]. |

## Default conventions

Được lệch nếu ghi rõ lý do trong note:

- **Độ sâu FDD mặc định 3 cấp**: Hệ thống → Nhóm chức năng → Tính năng. Sâu hơn chỉ khi một nhánh thực sự phức tạp.
- **UML là notation mặc định** cho Use Case và Sequence; BPMN mặc định cho Activity/process flow.
- Diagram phức tạp ưu tiên nhúng/tham chiếu file vẽ (draw.io) thay vì mô tả dài bằng chữ.

## Local vocabulary

- **Module nền**: nhóm chức năng dễ bị sót — Data, Notification, Report/Dashboard, Setting/Setup. Xem [[system-analysis-common-principles|4 nguyên tắc chung]].
- **Nhánh chính (main branch)**: nhánh cấp 1 của FDD, thường là Must-have sau khi chạy [[moscow-prioritization|MoSCoW]].

## Khi nào KHÔNG áp dụng

- Phác thảo nháp trong lúc brainstorm chưa cần đủ 6 mục Use Case — nhưng note lưu vào handbook thì phải đủ.

## Related

- [[note-guidelines|Note guidelines]]
- [[README|Index nhóm 02]]
