# State Machine Diagram cho BA

> Note này hướng dẫn vẽ UML State Machine Diagram. Nó trả lời câu hỏi: "Một thực thể (Entity) sinh ra như thế nào, sống qua những trạng thái nào, bị tác động bởi ai và chết đi ra sao?"

## Note này dùng để làm gì

Mở note khi bạn có một đối tượng dữ liệu phức tạp trong hệ thống. Ví dụ: Đơn hàng (Order), Tài khoản (Account), Yêu cầu nghỉ phép (Leave Request).
Nếu BA không vẽ sơ đồ này, Dev sẽ thả cửa cho phép cập nhật trạng thái "Đã giao hàng" thành "Đang chờ thanh toán" (điều vô lý trong logic kinh doanh).

## 1. Khái niệm cơ bản về Trạng thái và Chuyển tiếp

Một State Diagram không mô tả nhiều đối tượng (như Sequence), nó **chỉ mô tả DUY NHẤT một đối tượng**. 

```plantuml Ký hiệu cơ bản State Diagram
@startuml
skinparam defaultFontSize 14
skinparam maxMessageSize 200
skinparam wrapWidth 200

[*] --> Active : Tạo mới tài khoản
Active --> Locked : Nhập sai pass 5 lần
Locked --> Active : Admin mở khóa
Locked --> [*] : Xóa tài khoản

note left of Active : Trạng thái (State)
note right of Locked : [*] là Điểm bắt đầu/Kết thúc
@enduml
```

**Công thức của một đường nối (Transition):**
`Trạng thái A` --(Sự kiện + Điều kiện bảo vệ)--> `Trạng thái B`

## 2. Vòng đời của Đơn hàng (ShopFlow Case Study)

Dưới đây là vòng đời hoàn chỉnh của một Thực thể **Order** trong hệ thống ShopFlow. Trạng thái của Order không thể nhảy lung tung mà bị khóa chặt bởi các sự kiện (Events).

```plantuml ShopFlow Order Lifecycle
@startuml
skinparam defaultFontSize 15
skinparam maxMessageSize 200
skinparam wrapWidth 200
hide empty description

[*] --> Draft : Khách bấm Checkout

state Draft {
}
note right of Draft: Đơn nháp, đang chờ\nnhập thẻ/chọn phương thức

Draft --> Pending_Payment : Chọn VNPay
Draft --> Processing : Chọn COD

Pending_Payment --> Processing : IPN Success (Đã thanh toán)
Pending_Payment --> Cancelled : IPN Failed / Timeout

Processing --> Shipped : Nhân viên kho quét mã xuất kho
Shipped --> Delivered : Khách hàng xác nhận nhận hàng
Shipped --> Returned : Khách hàng bấm Hoàn trả [Trong 7 ngày]

Delivered --> [*]
Returned --> [*]
Cancelled --> [*]

' Thêm một trạng thái Super state / Global event
state "Hủy đơn hợp lệ" as CanCancel <<choice>>
Processing --> CanCancel : Khách bấm Hủy
CanCancel --> Cancelled : [Đơn chưa xuất kho]
CanCancel --> Processing : [Đã xuất kho - Báo lỗi]

@enduml
```

**Giải nghĩa:**
*   **State (Trạng thái):** Hình chữ nhật bo tròn (Vd: `Pending_Payment`). Là tình trạng hiện tại của dữ liệu.
*   **Event (Sự kiện - Trigger):** Đoạn text trên mũi tên (Vd: `IPN Success`). Là hành động bóp cò làm thay đổi trạng thái.
*   **Guard Condition (Điều kiện bảo vệ):** Nằm trong ngoặc vuông `[ ]`. Sự kiện xảy ra nhưng phải thỏa điều kiện này mới được chuyển trạng thái. (Vd: Khách bấm hoàn trả nhưng phải `[Trong 7 ngày]`).
*   **Choice (Điểm rẽ nhánh):** Hình thoi (Như cái `CanCancel`). Dùng khi 1 sự kiện có thể dẫn ra 2 trạng thái khác nhau dựa vào điều kiện (Guard).

## 3. Lợi ích cực lớn của State Diagram cho Dev & QA

Khi BA bàn giao State Diagram này:
1. **Frontend Dev:** Sẽ biết khi đơn hàng ở `Shipped`, thì phải Ẩn nút "Hủy Đơn", chỉ hiện nút "Hoàn trả".
2. **Backend Dev:** Sẽ viết code chặn (Validation) API. Nếu ai đó cố tình bắn API đổi status từ `Draft` thẳng sang `Delivered`, hệ thống sẽ văng lỗi 400 Bad Request.
3. **QA/Tester:** Sẽ viết Test Case cho các trạng thái không hợp lệ (Negative Test).

## 4. Anti-patterns

| Anti-pattern | Vì sao nguy hiểm | Cách sửa |
|---|---|---|
| **Vẽ nhiều Object trong 1 sơ đồ** | Gây nhầm lẫn logic, dev không biết đang code cho thực thể nào | Mỗi sơ đồ chỉ 1 Entity. Tách State của Order và Product ra. |
| **Nhầm Event với State** | Sai bản chất UML, gây bối rối cho team | Trạng thái là Danh từ/Tính từ (Vd: "Đã gửi Email"). Hành động là Động từ (Vd: "Gửi Email"). |
| **Thiếu Guard Condition** | Lỗ hổng logic (Vd: Hoàn trả bất kỳ lúc nào thay vì dưới 7 ngày) | Luôn gắn điều kiện `[Guard]` cho các event nhạy cảm về thời gian/quyền. |

## 5. Checklist nhanh

Trước khi giao sơ đồ cho Dev, hãy kiểm tra:

- Sơ đồ chỉ focus vào một thực thể (Entity) duy nhất chưa?
- Tên các trạng thái là danh từ/tính từ, chứ không phải động từ (hành động)?
- Có đường nào đi từ Trạng thái Cuối (`[*]`) ngược lại vòng đời không? (Nếu có là sai UML).
- Các chuyển tiếp nhạy cảm đã gắn Điều kiện bảo vệ `[Guard]` chưa?

---

## Mini-glossary

- **State Machine Diagram:** biểu đồ trạng thái, dùng mô tả vòng đời của một thực thể (Entity) duy nhất.
- **State (Trạng thái):** tình trạng của đối tượng tại một thời điểm (hình chữ nhật bo tròn).
- **Event (Sự kiện):** hành động kích hoạt việc chuyển đổi trạng thái (chữ trên mũi tên).
- **Guard (Điều kiện bảo vệ):** điều kiện phải thỏa mãn để Event có tác dụng (trong ngoặc vuông `[]`).
- **Choice (Điểm rẽ nhánh):** điểm một Event có thể dẫn ra nhiều State khác nhau tùy Guard.

## References

- *OMG Unified Modeling Language (UML) Specification v2.5.1*, Section 14 (State Machines).
- *BABOK Guide v3*, Section 10.44 (State Modelling).

## Internal Sources

- [[collections/modeling-and-flow/011 BA-40-UML-SM.pdf|UML State Machine sample]]
- [[mapping/README|Study Map & Source Mapping]]

## Related

- Bối cảnh sự kiện: [[sequence-diagram|Sequence Diagram]]
- Quản lý dữ liệu: [[data-modeling-and-erd|Data Modeling / ERD]]
- Thao tác thực thể: [[crud-operations|CRUD Operations]]
