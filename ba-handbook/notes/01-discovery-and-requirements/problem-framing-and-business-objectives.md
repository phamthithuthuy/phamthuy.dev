# Problem Framing và Business Objectives cho BA

> Note này giúp BA đi từ symptom hoặc feature request tới problem statement và
> objective có thể đo. Mục tiêu là điều tra đúng bài toán trước khi đặc tả một
> solution rất chi tiết nhưng không tạo outcome.

## Note này dùng để làm gì

Mở note khi stakeholder bắt đầu bằng “hãy làm tính năng X”, các bên mô tả vấn đề
khác nhau, hoặc project chưa có tiêu chí thành công. Đọc tiếp
[[current-state-and-future-state-analysis|Current/Future State]] và
[[scope-assumptions-constraints|Scope, Assumptions & Constraints]].

## 1. Tách sáu lớp thông tin

| Lớp | Ý nghĩa | Ví dụ |
|---|---|---|
| Symptom | dấu hiệu quan sát được | nhân viên hỏi trạng thái nhiều lần |
| Evidence | dữ liệu/quan sát có nguồn | 18/50 yêu cầu phải hỏi lại trong mẫu tháng trước |
| Cause hypothesis | nguyên nhân có thể, chưa chắc đúng | email phân tán làm mất visibility |
| Problem statement | ai gặp vấn đề gì, trong context nào, impact gì | người gửi không biết yêu cầu đang ở bước nào nên làm gián đoạn Procurement |
| Objective | thay đổi mong muốn ở outcome | giảm yêu cầu phải hỏi lại trạng thái |
| Solution idea | một cách có thể giải quyết | dashboard theo dõi |

```plantuml Problem Framing — từ symptom tới objective có measure
@startuml
left to right direction
rectangle "Observed\nsymptom" as S
rectangle "Evidence\n+ source" as E
rectangle "Cause\nhypotheses" as C #LightYellow
rectangle "Problem\nstatement" as P
rectangle "Business\nobjective" as O
rectangle "Baseline · Target\nTime · Owner" as M
S --> E : kiểm tra
E --> C : giải thích có thể
C --> E : tìm evidence phản chứng
E --> P : chốt impact có cơ sở
P --> O : outcome cần đổi
O --> M : làm đo được
note bottom of C
Hypothesis chưa phải fact.
Giữ nhiều giả thuyết đến khi có evidence.
end note
@enduml
```

Flow có vòng phản chứng: đừng chạy 5 Whys rồi tuyên bố câu trả lời cuối là root
cause. Kết quả của phân tích nguyên nhân ban đầu vẫn là hypothesis cho tới khi có
evidence đủ mạnh.

## 2. Viết problem statement

Một problem statement hữu ích trả lời:

> **[Actor]** trong **[context]** gặp **[vấn đề quan sát được]**, dẫn tới
> **[impact có evidence]**. Hiện chưa chắc **[cause hypothesis/open question]**.

Ví dụ:

> Nhân viên gửi yêu cầu mua thiết bị qua email không biết yêu cầu đang ở bước nào
> hoặc ai cần hành động. Trong mẫu 50 yêu cầu tháng trước, 18 yêu cầu phát sinh ít
> nhất một lượt hỏi trạng thái, làm ngắt việc của Procurement. Cần xác minh nguyên
> nhân chính là thiếu dữ liệu trạng thái hay SLA phê duyệt không rõ.

Statement này không chứa “xây dashboard”. Nó để nhiều option còn mở.

## 3. Objective phải có cách nhận biết thành công

| Thành phần | Câu hỏi |
|---|---|
| Baseline | hiện tại metric là bao nhiêu, đo từ đâu? |
| Target | mức thay đổi nào đủ tạo giá trị? |
| Time horizon | khi nào đánh giá? |
| Segment/context | áp dụng cho ai, loại case nào? |
| Owner | ai chịu trách nhiệm outcome và chấp nhận trade-off? |

Ví dụ objective giả định: “Trong 8 tuần sau rollout, giảm tỷ lệ yêu cầu mua thiết
bị phải hỏi trạng thái từ baseline 36% xuống dưới 10%, đo trên ticket đã đóng,
owner là Head of Procurement.” Target này cần stakeholder xác nhận; nó không tự
động trở thành fact chỉ vì được viết cụ thể.

## 4. Khi dùng công cụ tìm nguyên nhân

- **5 Whys:** nhanh để mở rộng probing; không chứng minh causal chain.
- **Cause map/fishbone:** giữ nhiều nhóm hypothesis; dễ thành brainstorming thiếu evidence.
- **Process/data analysis:** tốt khi có event/log; không cho biết đầy đủ động cơ con người.
- **Interview/observation:** cho context; dễ chịu recall/observer bias.

Kết hợp ít nhất hai loại evidence khi quyết định nguyên nhân ảnh hưởng scope lớn.

## 5. Anti-patterns

| Anti-pattern | Cách sửa |
|---|---|
| problem statement là “chưa có dashboard” | mô tả actor, context, impact trước solution |
| objective là “triển khai hệ thống” | chuyển output thành outcome đo được |
| KPI có target nhưng không baseline/source | định nghĩa cách đo trước khi cam kết |
| một lời phàn nàn đại diện mọi user | kiểm tra prevalence và segment |
| root cause được chốt trong workshop | giữ nhãn hypothesis và kế hoạch kiểm chứng |

## 6. Checklist nhanh

- Symptom có evidence và source không?
- Cause nào là fact, cause nào mới là hypothesis?
- Problem có actor, context và impact không?
- Objective mô tả outcome thay vì feature không?
- Baseline, target, thời hạn và owner đã rõ chưa?
- Solution space còn ít nhất hai option khả dĩ không?

## References

- [IIBA — BABOK Guide](https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/) — nền tham chiếu cho Strategy Analysis và đánh giá business need.
- [UK Government Service Manual — Discovery phase](https://www.gov.uk/service-manual/agile-delivery/how-the-discovery-phase-works) — cách discovery tập trung vào problem, user và constraint trước khi xây solution.

## Related

- [[requirement-elicitation|Requirement Elicitation]]
- [[current-state-and-future-state-analysis|Current & Future State Analysis]]
- [[solution-options-and-business-case|Solution Options & Business Case]]
- [[scope-assumptions-constraints|Scope, Assumptions & Constraints]]

