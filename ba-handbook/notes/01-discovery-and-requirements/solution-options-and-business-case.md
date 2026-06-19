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

Running case, score chỉ minh họa và phải được decision owner chốt weight:

| Criterion | Weight | Process + shared tracker | Configure current tool | Build portal |
|---|---:|---:|---:|---:|
| Outcome fit | 25 | 3 | 4 | 5 |
| Time to value | 20 | 5 | 4 | 2 |
| Cost/effort | 15 | 5 | 4 | 1 |
| Security/compliance | 15 | 3 | 4 | 3 |
| Operational support | 15 | 2 | 4 | 3 |
| Reversibility/learning | 10 | 5 | 4 | 2 |

Mỗi score phải có rationale/evidence/confidence. Không cộng số nếu scale và weight
chưa thống nhất; matrix trước hết là công cụ làm lộ trade-off.

## 4. Business case tối thiểu

- problem/objective và baseline;
- option, including do-nothing;
- benefit/outcome hypothesis và cách đo;
- cost/effort range, dependency, constraint;
- risk, assumption và confidence;
- recommendation + rejected options + rationale;
- decision owner, date và revisit trigger.

Ví dụ recommendation: timebox 4 tuần cấu hình tool hiện tại để kiểm chứng khả năng
giảm status inquiry; chỉ build portal nếu audit/access hoặc workflow exception
không đáp ứng. Đây là staged decision, không phải cam kết kiến trúc.

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

