---
title: "ShopFlow — Hệ thống Bán hàng & Quản lý kho"
description: "Phân tích nghiệp vụ hệ thống bán hàng & quản lý kho end-to-end. Vai trò Business Analyst (nhóm 3 người, dự án học tập từ case study) qua 3 sprint Agile/Scrum: viết user story & acceptance criteria, đặc tả SRS/use case, mô hình hoá quy trình bằng UML/BPMN, rà soát ERD và quản lý backlog trên Jira."
tech:
  - Jira
  - Agile/Scrum
  - UML
  - BPMN
  - SQL
github: "https://github.com/hoangtuan2k5/shopflow"
date: 2026-06-15
---

Hệ thống bán hàng và quản lý kho cho shop online, phân tích end-to-end trong vai
trò **Business Analyst** (nhóm 3 người: BA, Frontend, Backend) qua 3 sprint theo
Agile/Scrum — dự án học tập từ case study.

- **Phân tích yêu cầu**: phân tích case study bán hàng & quản lý kho; xác định 3
  nhóm tác nhân (chủ shop, nhân viên kho, khách hàng) và chuyển hoá thành user
  story kèm tiêu chí chấp nhận (acceptance criteria) cho từng sprint.
- **Đặc tả**: viết tài liệu đặc tả yêu cầu (SRS) và use case cho các luồng danh
  mục sản phẩm, tạo đơn, mô phỏng thanh toán, quản lý tồn kho, nhập hàng, hoàn
  hàng và cảnh báo sắp hết hàng.
- **Mô hình hoá**: dựng activity diagram, sequence diagram và state machine cho
  vòng đời đơn hàng; đặc tả hai trạng thái độc lập cho thanh toán và giao hàng
  để đội phát triển bám sát.
- **Thiết kế dữ liệu**: phối hợp với đội backend rà soát ERD 12 bảng; xác định
  quy tắc nghiệp vụ tồn kho 3 chỉ số (`available = on_hand − reserved`) và yêu
  cầu lưu vết lịch sử hoá đơn (snapshot).
- **Quản lý backlog**: quản lý product backlog trên Jira; tham gia sprint
  planning, refinement và review; nghiệm thu tính năng theo acceptance criteria
  để đảm bảo MVP đúng phạm vi.
- **Bàn giao**: soạn user manual & checklist nghiệm thu cuối dự án; làm cầu nối
  giữa yêu cầu nghiệp vụ và đội Frontend/Backend trong suốt 3 sprint.
