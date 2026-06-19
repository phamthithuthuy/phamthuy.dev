# 02 — System Analysis & Design

> Nhóm note về phân tích và thiết kế hệ thống: bóc tách chức năng, ưu tiên tính năng, và checklist chống sót module nền. Đây là nơi đặt các note so sánh công cụ mô hình hóa (FDD, Use Case).

## Current scope

- [[functional-decomposition-diagram|Functional Decomposition Diagram (FDD)]] — bóc tách hệ thống thành cây tính năng để viết spec, dựng overview, kiểm soát scope.
- [[moscow-prioritization|MoSCoW cho BA]] — ưu tiên tính năng, chốt nhánh chính cho FDD, hiểu sự dịch chuyển ưu tiên theo giai đoạn.
- [[system-analysis-common-principles|4 nguyên tắc chung khi phân tích hệ thống]] — checklist chống sót Data, Notification, Report/Dashboard, Setting/Setup.
- [[crud-operations|Nguyên tắc CRUD cho BA]] — dùng Create/Read/Update/Delete để bóc tính năng "Quản lý" và phân tích quy trình mà không sót case.
- [[use-case-diagram|Use Case cho BA]] — mô tả chi tiết kịch bản tương tác: actor, trigger, pre/post-condition, normal case, exception.
- [[fdd-vs-use-case|FDD vs Use Case: chọn cái nào]] — khi nào dùng FDD, khi nào dùng Use Case, vì sao làm cả hai không thừa.

## Planned scope

- Activity Diagram — mô hình hóa luồng nghiệp vụ và logic phân nhánh.
- Sequence Diagram — mô tả trình tự tương tác giữa các thành phần.
- State Machine — mô hình hóa vòng đời trạng thái của đối tượng.
- Wireframe — phác giao diện để giao tiếp yêu cầu UI.

Đây là roadmap. Khi viết, bám [[note-guidelines|Note guidelines]] và [[_conventions|Conventions của nhóm]].

## Suggested reading path

1. [[functional-decomposition-diagram|FDD]] — bóc tách hệ thống ở mức tổng thể.
2. [[moscow-prioritization|MoSCoW]] — chốt tính năng chính.
3. [[system-analysis-common-principles|4 nguyên tắc chung]] — rà soát module nền.
4. [[crud-operations|CRUD]] — soát đủ thao tác dữ liệu cho từng đối tượng.
5. [[use-case-diagram|Use Case]] — mô tả chi tiết từng tính năng.
6. [[fdd-vs-use-case|FDD vs Use Case]] — chọn công cụ phù hợp ngữ cảnh.

## Related

- [[README|BA Handbook Notes]]
- [[_conventions|Conventions — System Analysis & Design]]
- [[note-guidelines|Note guidelines]]
- [[../mapping/README|Study Map & Source Mapping]]
