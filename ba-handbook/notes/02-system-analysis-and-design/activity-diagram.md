# Activity Diagram (Biểu đồ Hoạt động)

> Note này hướng dẫn cách vẽ UML Activity Diagram để mô tả luồng (flow) của một Use Case. Nó trả lời câu hỏi: "Để đạt được mục tiêu, hệ thống và người dùng phải đi qua những bước nào, rẽ nhánh ra sao?"

## Note này dùng để làm gì

Mở note khi bạn đã có **Use Case** (VD: Khách hàng đặt hàng) nhưng Dev hỏi: "Luồng chạy như thế nào? Xảy ra lỗi ở bước 2 thì đi về đâu?". 
Activity Diagram mạnh hơn Flowchart (lưu đồ thuật toán) ở chỗ nó hỗ trợ **Swimlanes** (chia làn) và **Concurrency** (chạy song song).

## 1. Các thành phần cơ bản (Basic Notation)

Trước khi vào sơ đồ phức tạp, hãy nhìn cấu trúc cơ bản của một luồng nghiệp vụ.

```plantuml Ký hiệu cơ bản của Activity Diagram
@startuml
skinparam defaultFontSize 14

start
:Nhập thông tin đăng nhập;
if (Thông tin hợp lệ?) then (Đúng)
  :Tạo Session;
  :Chuyển hướng về Home;
else (Sai)
  :Hiển thị lỗi;
  stop
endif
stop

@enduml
```

**Giải nghĩa:**
*   **Điểm bắt đầu (Initial Node):** Vòng tròn đen đặc (`start`). Chỉ có 1 điểm bắt đầu.
*   **Hành động (Action):** Hình chữ nhật bo góc (`:Tên hành động;`).
*   **Rẽ nhánh (Decision / Merge):** Hình thoi (`if/else`). Chỉ có 1 đường vào nhưng nhiều đường ra, và chỉ 1 đường ra được đi tiếp.
*   **Điểm kết thúc (Final Node):** Vòng tròn đen có viền ngoài (`stop`). Có thể có nhiều điểm kết thúc.

## 2. Activity Diagram với Swimlane & Chạy song song (ShopFlow Case Study)

Dưới đây là một sơ đồ thực tế cho Use Case **SF-3: Đặt hàng và Thanh toán** của ShopFlow. Sơ đồ này dùng **Swimlanes** (Làn) để phân rõ trách nhiệm ai làm việc gì, và **Fork/Join** để xử lý song song.

```plantuml ShopFlow Checkout Activity Diagram
@startuml
skinparam defaultFontSize 14

|Khách hàng|
start
:Bấm "Tiến hành Checkout";
:Chọn phương thức thanh toán;

|Hệ thống ShopFlow|
if (Phương thức?) then (COD)
  :Tạo đơn hàng (Trạng thái: Pending);
else (VNPay)
  fork
    :Tạo đơn hàng (Trạng thái: Draft);
  fork again
    :Gọi API tạo link thanh toán;
  end fork
  
  |Cổng VNPay|
  :Hiển thị màn hình quét mã QR;
  
  |Khách hàng|
  :Thực hiện quét mã QR;
  
  |Cổng VNPay|
  if (Thanh toán thành công?) then (Có)
    :Gửi Webhook IPN Success;
    
    |Hệ thống ShopFlow|
    :Cập nhật đơn hàng (Trạng thái: Paid);
  else (Không / Timeout)
    |Cổng VNPay|
    :Gửi Webhook IPN Failed;
    
    |Hệ thống ShopFlow|
    :Hủy đơn hàng (Trạng thái: Cancelled);
    stop
  endif
endif

|Hệ thống ShopFlow|
:Trừ số lượng Tồn kho;
:Gửi Email xác nhận;
stop

@enduml
```

**Các khái niệm nâng cao trong sơ đồ trên:**
*   **Swimlanes (Làn bơi):** Chia theo Actor (`|Khách hàng|`, `|Hệ thống|`). Giúp dev biết API nào gọi ở Front-end, API nào xử lý ở Back-end.
*   **Fork (Chia luồng song song):** Thanh ngang mập chia 1 luồng thành 2 luồng chạy cùng lúc (Tạo đơn nháp VÀ Gọi API lấy link thanh toán cùng lúc).
*   **Join (Gộp luồng):** Đợi tất cả các luồng song song chạy xong mới đi tiếp.

## 3. Khi nào dùng Activity Diagram vs BPMN?

Nhiều BA nhầm lẫn giữa UML Activity và BPMN (Business Process Model and Notation).
*   **Dùng UML Activity:** Khi bạn mô tả logic của **1 tính năng phần mềm** (như luồng Checkout ở trên). Trọng tâm là hệ thống.
*   **Dùng BPMN:** Khi bạn mô tả **quy trình kinh doanh của cả công ty**. (VD: Quy trình Nhập hàng vào kho, có liên quan đến Kế toán, Thủ kho, Máy in mã vạch, Xe tải...). Trọng tâm là con người và phòng ban.

## 4. Anti-pattern (Lỗi sai phổ biến)

*   **Vẽ sơ đồ mạng nhện:** Một Activity có quá nhiều nhánh đan chéo nhau. *Giải pháp:* Tách các luồng phụ thành các biểu đồ nhỏ (Sub-activity).
*   **Thiếu Final Node:** Mọi luồng dù đúng hay sai (exception) đều phải kết thúc ở một Final Node (`stop`). Không được để mũi tên cụt.
*   **Lạm dụng Swimlane:** Thêm làn cho những Actor không hề có tương tác trong luồng đó.

## 5. Checklist Review 

- [ ] Sơ đồ có duy nhất 1 điểm bắt đầu (Initial Node) chưa?
- [ ] Mọi rẽ nhánh (Decision) đều có điều kiện rõ ràng (Guard condition) và phủ kín các trường hợp (Ví dụ: >0 và <=0) chưa?
- [ ] Luồng có rớt vào ngõ cụt không, hay tất cả đều dẫn đến Final Node?
- [ ] Các hành động song song (Fork) đã được gộp lại (Join) chưa?
