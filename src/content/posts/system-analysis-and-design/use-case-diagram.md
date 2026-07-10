---
title: "Use Case Diagram và Use Case Specification"
pubDatetime: 2026-07-10T05:08:34.038Z
description: "Note này hướng dẫn cách vẽ Use Case Diagram đúng chuẩn UML và viết Use Case Specification (đặc tả text) chi tiết. Nó trả lời câu hỏi: \"Ai (Actor) có thể làm gì…"
tags: ["ba", "system-analysis-and-design"]
draft: false
---
> Note này hướng dẫn cách vẽ Use Case Diagram đúng chuẩn UML và viết Use Case Specification (đặc tả text) chi tiết. Nó trả lời câu hỏi: "Ai (Actor) có thể làm gì (Goal) với hệ thống (System Boundary)?".

## Note này dùng để làm gì

Mở note khi bạn cần phân tích các hành vi cấp cao của hệ thống dựa trên yêu cầu người dùng, hoặc khi cần một tài liệu chi tiết cho đội dev/QA về cách một luồng nghiệp vụ phức tạp hoạt động. Đọc sau khi xác định **System Boundary** và trước khi viết **Sequence Diagram** hoặc **State Machine**.

## 1. Use Case Diagram (Biểu đồ) vs Use Case Specification (Đặc tả)

Nhiều BA nhầm lẫn Use Case chỉ là một cái biểu đồ hình oval. Thực tế, Use Case gồm 2 phần:
1. **Use Case Diagram:** Cung cấp cái nhìn tổng quan toàn hệ thống (chim bay).
2. **Use Case Specification:** Văn bản chi tiết hóa từng hình oval đó (đi vào mặt đất).

> **Lưu ý:** Biểu đồ Use Case sinh ra không phải để mô tả Thứ tự (Flow). Muốn mô tả thứ tự, hãy dùng **Activity Diagram**. Use Case chỉ quan tâm đến **Goal (Mục tiêu)**.

## 2. Các thành phần trong Use Case Diagram

```plantuml UML Use Case Diagram — Quản lý Đơn hàng ShopFlow
@startuml
skinparam defaultFontSize 15
left to right direction

actor "Khách hàng" as Customer
actor "Nhân viên kho" as WarehouseStaff
actor "Hệ thống Thanh toán (VNPay)" as PaymentGateway <<External>>

rectangle "ShopFlow - Order Management" {
  usecase "SF-3: Đặt hàng (Checkout)" as UC_Checkout
  usecase "SF-4: Thanh toán online" as UC_Payment
  usecase "SF-11: Cập nhật tồn kho" as UC_Inventory
  usecase "Theo dõi trạng thái đơn" as UC_Track
  
  UC_Checkout ..> UC_Inventory : <<include>>
  UC_Checkout <.. UC_Payment : <<extend>> (nếu chọn thẻ)
}

Customer --> UC_Checkout
Customer --> UC_Track
WarehouseStaff --> UC_Inventory
UC_Payment --> PaymentGateway
@enduml
```

### Giải thích Notation UML:
*   **Actor (Người/Hệ thống ngoài):** Hình người. Dùng role (Khách hàng), không dùng tên riêng.
*   **System Boundary (Ranh giới):** Hình chữ nhật bọc ngoài. Thể hiện ranh giới hệ thống ta đang xây dựng (ShopFlow).
*   **Use Case (Mục tiêu):** Hình oval (động từ + danh từ). Vd: Đặt hàng.
*   **Include:** Luôn luôn xảy ra. Vd: Đặt hàng thì bắt buộc phải (include) Cập nhật tồn kho.
*   **Extend:** Tùy chọn xảy ra. Vd: Đặt hàng có thể (extend) Thanh toán online (chỉ khi khách chọn thẻ, nếu COD thì không).

## 3. Cấu trúc Use Case Specification chuẩn

Một Use Case text chuẩn phải đủ các thành phần sau để không gây tranh cãi:

**Tên Use Case:** UC-ORD-001 Đặt hàng (Checkout)
**Tham chiếu:** Epic `SF-1`, Requirement `SF-3`
**Actor chính:** Khách hàng (Customer)
**Actor phụ:** Không

*   **Pre-conditions (Điều kiện tiên quyết):** Khách hàng đã có ít nhất 1 sản phẩm trong giỏ hàng. Khách hàng đã đăng nhập hoặc nhập email guest.
*   **Post-conditions (Điều kiện hậu quyết):** Đơn hàng được tạo với trạng thái "Pending". Tồn kho (`available`) bị trừ tương ứng. Email xác nhận được gửi.
*   **Trigger:** Khách hàng bấm nút "Tiến hành Checkout" tại màn hình Giỏ hàng.

**Normal Flow (Luồng chính - Happy Path):**
1. Hệ thống hiển thị form thông tin giao hàng và chọn phương thức thanh toán.
2. Khách hàng nhập địa chỉ và chọn phương thức COD.
3. Khách hàng bấm "Xác nhận Đặt hàng".
4. Hệ thống kiểm tra tồn kho (include UC_Inventory). Tồn kho đủ.
5. Hệ thống lưu đơn hàng, cập nhật tồn kho, và sinh mã đơn hàng (Order ID).
6. Hệ thống hiển thị màn hình "Đặt hàng thành công".

**Alternate Flows (Luồng phụ):**
*   **A1 - Khách hàng chọn Thanh toán VNPay:** Tại bước 2, nếu khách chọn VNPay, hệ thống gọi (extend) UC_Payment. Sau khi thanh toán xong quay lại bước 5.
*   **A2 - Khách muốn sửa giỏ hàng:** Tại bước 1, khách bấm "Quay lại giỏ hàng", hệ thống chuyển hướng về trang Cart. Kết thúc Use Case.

**Exception Flows (Luồng ngoại lệ - Lỗi):**
*   **E1 - Hết hàng đột xuất:** Tại bước 4, hệ thống phát hiện tồn kho `available` < số lượng đặt (do có người vừa mua). Hệ thống báo lỗi "Sản phẩm X không đủ số lượng" và chặn đặt hàng.
*   **E2 - Lỗi hệ thống lưu trữ:** Tại bước 5, database timeout, hệ thống báo lỗi "Vui lòng thử lại sau" và không trừ tồn kho.

## 4. Anti-pattern (Những lỗi sai phổ biến)

*   **Biến Use Case thành Sơ đồ quy trình (Flowchart):** Dùng nét đứt mũi tên nối các Use Case với nhau (Bấm Login -> Xem danh sách -> Chọn hàng). Sai hoàn toàn UML.
*   **CRUD Use Case:** Vẽ 4 hình oval "Thêm User", "Sửa User", "Xóa User". Hãy gộp thành 1 Use Case "Quản lý User" (Manage User) để sơ đồ bớt rác.
*   **Thiếu Pre/Post condition:** Dẫn đến QA không biết setup data mẫu thế nào để test.

## 5. Checklist Review Use Case

- [ ] Sơ đồ đã bọc ranh giới hệ thống (System Boundary) chưa?
- [ ] Actor có phải là một vai trò, thay vì một cá nhân không?
- [ ] Tên Use Case có bắt đầu bằng động từ không?
- [ ] Đặc tả text đã liệt kê đủ luồng chính, luồng phụ, và ngoại lệ chưa?
- [ ] Tồn kho, database state có được định nghĩa rõ ràng ở Post-condition chưa?

