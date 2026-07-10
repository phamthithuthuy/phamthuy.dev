# User Story và Acceptance Criteria cho BA

> Note này giúp BA viết user story và acceptance criteria đủ tốt để team phát
> triển và kiểm thử mà không phải đoán. Story không phải là mô tả màn hình; nó
> là cam kết về một lát giá trị cho một actor.

## Note này dùng để làm gì

Mở note khi cần viết story từ requirement đã làm rõ, review story trước
refinement, hoặc khi dev/test phàn nàn "AC mơ hồ". Đọc sau
[[agile-concepts-for-ba|Agile concepts]] và
[[requirement-elicitation|Requirement Elicitation]] (để có requirement đầu vào).

## 1. User story không phải là solution description

| Đây là story | Đây không phải story |
|---|---|
| Là Khách hàng, tôi muốn xem trạng thái đơn hàng, để không phải gọi điện hỏi | "Làm màn hình order status có 5 cột" |
| Là Chủ shop, tôi muốn được cảnh báo khi sản phẩm sắp hết, để kịp nhập hàng trước khi hết | "Thêm notification bell vào header" |

Story trả lời **ai, cần gì, vì sao**. Nó không mô tả layout, màu sắc, hay
animation. Để solution space mở cho team.

## 2. Template chuẩn

> **Là `<role>`, tôi muốn `<objective>`, để `<value>`.**

Thiếu "để..." → không có value → không ưu tiên đúng. Thiếu role → không biết
actor nào cần → không thiết kế đúng permission.

## 3. Acceptance Criteria: chứng minh "done"

AC là điều kiện observable, testable để xác nhận story đã hoàn thành. **Không
có AC = không có Definition of Ready.**

Hai phong cách (chọn một, giữ nhất quán trong cùng một story):

**Gherkin (Given/When/Then):** hợp cho story có flow rõ ràng.

```gherkin
Given Khách hàng đã đăng nhập và đang ở trang catalog
When Khách hàng chọn 2 sản phẩm và bấm "Đặt hàng"
Then Hệ thống kiểm tra stock và tạo order với trạng thái Pending Payment
```

**Checklist:** hợp cho story constraint, UI, permission.

```markdown
- [ ] Nút "Đặt hàng" bị disable khi giỏ hàng trống
- [ ] Chỉ chủ shop xem được danh sách payment
- [ ] Stock check xảy ra ở thời điểm submit, không phải lúc add to cart
```

🛑 **Không trộn Gherkin + checklist trong cùng một story** — làm rối reviewer
và khó tự động hoá test.

## 4. INVEST: test nhanh chất lượng story

| Chữ | Ý nghĩa | Câu hỏi kiểm |
|---|---|---|
| **I**ndependent | story không phụ thuộc story khác | Có thể làm story này trước story kia không? |
| **N**egotiable | chi tiết có thể thương lượng, không phải hợp đồng cứng | Dev có thể đề xuất cách implement khác không? |
| **V**aluable | mang giá trị cho actor/business | Nếu bỏ story này, ai mất gì? |
| **E**stimable | team ước lượng được effort | Story có đủ context để estimate không? |
| **S**mall | làm xong trong 1 sprint | Story có cần split không? |
| **T**estable | AC có thể kiểm tra pass/fail | Tester có thể viết test case từ AC này không? |

## 5. Split story: khi story > 8 điểm hoặc > 1 sprint

| Pattern | Ví dụ trước | Ví dụ sau split |
|---|---|---|
| Theo workflow step | "Tạo và thanh toán order" | "Tạo order" + "Thanh toán order" |
| Theo actor | "Quản lý stock" | "Nhân viên kho xem stock" + "Nhân viên kho nhập hàng" |
| Theo data type | "Quản lý sản phẩm" | "Thêm/sửa sản phẩm" + "Upload ảnh sản phẩm" |
| Theo happy/exception | "Xử lý order" | "Tạo order thành công" + "Xử lý khi stock thiếu" + "Xử lý khi payment fail" |

### Running case: ShopFlow

Tám story `SF-2..SF-9` trong Epic `SF-1` được viết theo template:

| Story | Template | AC style | Điểm |
|---|---|---|---|
| `SF-2` Browse Catalog | Là Khách hàng, tôi muốn xem danh mục sản phẩm, để chọn món trước khi đặt | Checklist (filter hoạt động, ảnh hiển thị, mobile responsive) | 3 |
| `SF-3` Create Order | Là Khách hàng, tôi muốn tạo đơn hàng từ catalog, để mua hàng không cần gọi điện | Gherkin (Given catalog → When bấm Đặt → Then check stock + tạo order) | 5 |
| `SF-4` Simulate Payment | Là Khách hàng, tôi muốn thanh toán an toàn, để hoàn tất đơn hàng | Gherkin (Given order Pending → When payment mock → Then status → Paid) | 3 |
| `SF-5` Delivery Status | Là Khách hàng, tôi muốn xem trạng thái giao hàng, để không phải gọi hỏi | Checklist (hiển thị timeline, trạng thái rõ, mobile) | 3 |
| `SF-6` Manage Stock | Là Nhân viên kho, tôi muốn xem và cập nhật tồn kho, để biết chính xác hàng còn bao nhiêu | Gherkin (Given inventory → When nhập/xuất → Then available = on_hand − reserved) | 5 |
| `SF-7` Receive Stock | Là Nhân viên kho, tôi muốn ghi nhận nhập hàng từ supplier, để stock trong hệ thống khớp thực tế | Gherkin (Given supplier giao → When kiểm và nhập → Then stock tăng + audit trail) | 3 |
| `SF-8` Process Return | Là Chủ shop, tôi muốn xử lý hoàn hàng, để cập nhật stock và trả tiền cho khách | Gherkin (Given order Delivered → When return approved → Then stock restock + payment refund) | 5 |
| `SF-9` Low Stock Alert | Là Chủ shop, tôi muốn nhận cảnh báo khi sắp hết hàng, để kịp nhập thêm | Checklist (threshold configurable, hiển thị badge, không spam) | 2 |

**Ví dụ AC của `SF-3` (Gherkin):**

```gherkin
Given Khách hàng đã đăng nhập và có 2 sản phẩm trong giỏ
When Khách hàng bấm "Đặt hàng"
Then Hệ thống kiểm tra availableStock của từng item trong một transaction
  And Nếu tất cả item có availableStock >= quantity, tạo order với status Pending Payment
  And Nếu bất kỳ item nào thiếu, reject toàn bộ order với message "Sản phẩm [tên] chỉ còn [availableStock]"
```

**Split story thực tế:** `SF-3` ban đầu là "Tạo order và thanh toán" — 8 điểm,
quá lớn. BA split thành `SF-3` Create Order (5 điểm) + `SF-4` Simulate Payment
(3 điểm). Lý do: thanh toán có thể mock, không cần làm cùng sprint với order.

**Bài học:** Nếu một story > 8 điểm, đừng cố nhồi vào sprint. Split theo
workflow step hoặc actor. `SF-5` Delivery Status có thể làm độc lập với `SF-4`
Payment — đừng tạo dependency giả.

## Anti-patterns

| Anti-pattern | Vì sao nguy hiểm | Cách sửa |
|---|---|---|
| Story là mô tả màn hình | khóa solution, bỏ lỡ cách implement tốt hơn | mô tả actor + goal + value, để dev chọn cách |
| AC chỉ có happy path | sót exception, lộ ra khi test/UAT | thêm ít nhất 1 failure scenario cho mỗi story |
| Trộn Gherkin + checklist trong cùng story | rối reviewer, khó automate test | chọn 1 style, giữ nhất quán |
| Story quá lớn (> 8 điểm) | không hoàn thành trong sprint, thành mini-waterfall | split theo workflow/actor/data type |
| "AC sẽ viết sau" | story vào sprint không có DoR, dev đoán | AC phải có trước refinement |
| Thiếu "để..." trong story | không biết value → ưu tiên sai | luôn kết thúc story bằng "để `<value>`" |

## Checklist nhanh

- Story có đủ role, objective và value (để...) không?
- AC dùng một style nhất quán (Gherkin hoặc checklist)?
- Có ít nhất 1 failure/exception scenario trong AC không?
- Story pass INVEST không? Nếu không, tiêu chí nào fail?
- Story có cần split không (quá 8 điểm)?
- Mỗi AC có observable/testable không? Tester có viết được test case không?

## References

- [Scrum Guide](https://scrumguides.org/) — định nghĩa Product Backlog Item và vai trò của PO trong quản lý backlog.
- [Atlassian — User Stories](https://www.atlassian.com/agile/project-management/user-stories) — hướng dẫn viết user story với ví dụ và template.
- [Cucumber — Gherkin Reference](https://cucumber.io/docs/gherkin/reference/) — syntax chuẩn cho Gherkin Given/When/Then.

## Related

- [[agile-concepts-for-ba|Agile Concepts cho BA]]
- [[backlog-refinement|Backlog Refinement cho BA]]
- [[requirement-elicitation|Requirement Elicitation]]
- [[requirement-quality-and-validation|Requirement Quality & Validation]]
