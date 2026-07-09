# Solution Options và Business Case cho BA

> Note này giúp BA so sánh các phương án sau khi problem và future capability đã
> đủ rõ. Option analysis phải bao gồm “không làm gì”, evidence, trade-off và mức
> confidence; weighted score không phải đáp án toán học.

## Note này dùng để làm gì

Mở note khi cần recommendation ở cuối discovery. Nếu objective/current/future
state còn mơ hồ, quay lại [[problem-framing-and-business-objectives]] và
[[current-state-and-future-state-analysis]].

## 1. Điều kiện bắt đầu

Cần có problem statement, objective/measure, current/future capability, scope,
constraint, stakeholder/decision owner và các assumption lớn. Nếu chưa có, option
analysis chỉ hợp thức hóa solution yêu thích.

## 2. Tạo option set thật

Luôn cân nhắc:

1. **Do nothing / accept risk:** baseline để thấy cost of change có đáng không.
2. **Process/policy change:** sửa handoff, role, rule, training.
3. **Enhance existing tool:** cấu hình/workflow/report có sẵn.
4. **Buy/integrate:** dùng product/service ngoài.
5. **Build:** tạo capability riêng khi option khác không đáp ứng.

Option có thể kết hợp, nhưng phải nói rõ boundary và dependency.

## 3. Decision matrix

### Running case: ShopFlow

Áp option set (§2) cho bài toán "shop cần hệ thống quản lý bán hàng + tồn kho":

| # | Option | Mô tả | Trade-off chính |
|---|---|---|---|
| 1 | **Do nothing** | giữ nguyên sổ giấy + điện thoại + chat | không tốn chi phí; vẫn bán vượt stock 3 lần/tháng, mất khách |
| 2 | **Process change only** | chuẩn hóa quy trình kiểm kho trước khi nhận order (checklist giấy) | nhanh, không cần code; không scale được, vẫn phụ thuộc trí nhớ |
| 3 | **Buy: dùng POS có sẵn** | cài POS tool có sẵn (KiotViet, Sapo…) | nhanh có inventory; không customize được flow return `SF-8`, alert `SF-9` theo đúng ý chủ shop |
| 4 | **Build MVP** | tự xây web với 8 luồng `SF-2..SF-9` như Epic `SF-1` | đúng nhu cầu; tốn thời gian dev; cần maintain |

**Decision matrix ShopFlow (§3):**

| Criterion | Weight | Option 1: Do nothing | Option 2: Process fix | Option 3: Buy POS | Option 4: Build MVP |
|---|---|---|---:|---:|---:|---:|
| Outcome fit (cover 8 flows) | 25 | 1 | 2 | 3 | 5 |
| Time to value | 20 | 5 | 5 | 4 | 2 |
| Cost/effort (MVP 2 sprint) | 20 | 5 | 4 | 3 | 1 |
| Customizability (return rule, alert) | 15 | 1 | 1 | 2 | 5 |
| Operational support (shop tự maintain) | 10 | 5 | 3 | 2 | 2 |
| Learning/reversibility | 10 | 5 | 5 | 3 | 4 |

**Recommendation (theo §4):** Option 4 (Build MVP) vì (1) outcome fit tuyệt đối — 8 luồng thiết kế riêng cho shop nhỏ, (2) customizability cho return rule + low stock alert là khác biệt chính so với POS có sẵn, (3) trade-off lớn nhất là time to value thấp (2 sprint) — chấp nhận được vì MVP chỉ xây core flow `SF-2`, `SF-3`, `SF-6` ở Sprint 1. **Revisit trigger:** sau Sprint 2, nếu adoption < 50% hoặc POS tool chứng minh đủ nhu cầu → xem xét pivot sang Option 3.

**Business case tối thiểu cho ShopFlow MVP:**

| Thành phần | ShopFlow |
|---|---|
| Problem | 3 lần/tháng order vượt stock, mỗi lần mất ~45 phút và 1 khách cancel |
| Expected benefit | giảm order vượt stock xuống 0; giảm thời gian xử lý đơn từ ~15 phút xuống < 2 phút |
| Cost | 2 sprint MVP (Sprint 1: `SF-2`, `SF-3`, `SF-6`; Sprint 2: phần còn lại) |
| Payback | đo adoption sau 8 tuần; nếu ≥ 50% khách quen dùng web → ROI dương |
| Risk chính | khách không quen dùng web, vẫn gọi điện → cần survey sau 2 tuần |

## 5. Anti-patterns

| Anti-pattern | Cách sửa |
|---|---|
| chỉ có option sponsor thích | thêm do-nothing và ít nhất một non-build option |
| score chính xác giả | ghi range, confidence và rationale |
| tiêu chí được chọn sau khi thấy option | chốt objective/criteria trước scoring |
| benefit không có baseline/owner | định nghĩa measure và realization owner |
| bỏ operational/adoption cost | thêm support, training, migration, change impact |

## 6. Checklist nhanh

- Problem/objective và future capability đủ rõ chưa?
- Có do-nothing, process, reuse/buy/build option chưa?
- Criteria trace về objective/constraint không?
- Score có evidence/confidence hay chỉ opinion?
- Assumption, dependency và risk có owner không?
- Recommendation có trade-off/revisit trigger không?
- Decision/version/date được lưu chưa?

## References

- [IIBA — BABOK Guide](https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/) — solution scope/options, risk và change strategy trong Strategy Analysis.
- [UK Government Green Book](https://www.gov.uk/government/publications/the-green-book-appraisal-and-evaluation-in-central-government) — nguồn chính thức về appraisal option và business case; áp dụng theo context tổ chức.

## Related

- [[problem-framing-and-business-objectives|Problem Framing & Business Objectives]]
- [[current-state-and-future-state-analysis|Current & Future State Analysis]]
- [[scope-assumptions-constraints|Scope, Assumptions & Constraints]]
- [[requirement-quality-and-validation|Requirement Quality & Validation]]

