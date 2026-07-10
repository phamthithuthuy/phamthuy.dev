---
title: "Survey cho BA"
pubDatetime: 2026-07-10T03:46:44+00:00
description: "Note này giúp BA dùng survey để đo prevalence, segment signal và kiểm tra hypothesis trên sample lớn — sau khi exploratory research đã xác định được dimension…"
tags: ["ba", "discovery-and-requirements"]
draft: false
---
> Note này giúp BA dùng survey để đo prevalence, segment signal và kiểm tra
> hypothesis trên sample lớn — sau khi exploratory research đã xác định được
> dimension cần đo. Survey không thay thế interview; nó bổ sung khi cần con số.

## Note này dùng để làm gì

Mở note khi bạn đã có hypothesis từ interview/observation và cần kiểm tra "bao
nhiêu người gặp vấn đề này", hoặc khi cần ưu tiên feature dựa trên tín hiệu từ
population thay vì opinion vài người. Đọc
[Elicitation Technique Selection](/posts/discovery-and-requirements/elicitation-technique-selection) trước.

## 1. Khi nào dùng và không dùng

| Dùng khi | Không dùng khi |
|---|---|
| đã biết dimension cần đo (từ exploratory interview) | chưa biết câu hỏi nào quan trọng (dùng interview trước) |
| cần con số (prevalence, distribution, ranking) | cần hiểu sâu motivation/context (dùng interview) |
| population đủ lớn để sample có ý nghĩa (≥ 30) | population nhỏ (< 15 người) |
| stakeholder cần evidence định lượng để quyết định | cần quan sát hành vi thực tế (dùng observation) |

**Weakness chính:** wording bias (câu hỏi dẫn dắt), sample bias (chỉ người quan
tâm mới trả lời), non-response bias (người không trả lời có thể là segment quan
trọng nhất), và social desirability bias. Bù bằng pilot survey + triangulate
với interview.

## 2. Các loại câu hỏi survey

| Loại | Dùng để | Ví dụ (ShopFlow) | Tránh |
|---|---|---|---|
| **Behavior** (tần suất, thói quen) | đo hành vi thực tế | "Trong tháng qua, bạn gọi điện hỏi trạng thái đơn hàng bao nhiêu lần?" | "Bạn có thường xuyên gọi điện không?" (mơ hồ) |
| **Preference** (lựa chọn) | ưu tiên giữa các option | "Bạn thích xem trạng thái đơn qua: (a) Web, (b) App, (c) SMS?" | "Bạn muốn xem trạng thái đơn chứ?" (leading) |
| **Pain/Importance** (rating) | đo mức độ đau/ưu tiên | "Việc không biết đơn hàng tới đâu gây khó chịu thế nào? (1–5)" | "Bạn có thấy khó chịu khi không biết trạng thái không?" (yes-biased) |
| **Open-ended** (text) | phát hiện điều chưa nghĩ tới | "Điều gì làm bạn khó chịu nhất khi mua hàng online?" | "Bạn có góp ý gì không?" (quá mở, thường bị bỏ trống) |

## 3. Mười câu hỏi tối đa

Survey dài → tỉ lệ bỏ cuộc cao. Quy tắc: **≤ 10 câu, ≤ 5 phút.**

| Phần | Số câu | Nội dung |
|---|---|---|
| Context/segment | 2–3 | phân loại người trả lời (vai trò, tần suất mua, kênh quen dùng) |
| Behavior/pain | 3–4 | câu hỏi chính cần đo |
| Priority/preference | 2–3 | ranking, lựa chọn |
| Open feedback | 1 | "Điều gì quan trọng nhất chúng tôi chưa hỏi?" |

## 4. Pilot trước khi gửi

Trước khi gửi survey cho population thật:
- Đưa 3–5 người (không phải stakeholder chính) làm thử.
- Đo thời gian, kiểm tra câu nào bị hiểu sai.
- Sửa wording, rút gọn, đóng câu hỏi mở không cần thiết.

### Running case: ShopFlow

**Mục tiêu survey:** chủ shop muốn biết "bao nhiêu khách hàng muốn tự xem trạng
thái đơn hàng qua web, thay vì gọi điện". BA thiết kế survey sau khi đã
interview 3 khách quen (exploratory).

**Survey (8 câu, gửi 30 khách hàng qua Zalo, Google Form):**

| # | Câu hỏi | Loại | Lý do |
|---|---|---|---|
| 1 | Bạn mua hàng ở shop bao lâu một lần? (Hàng tuần / Hàng tháng / Thỉnh thoảng) | Segment | Phân loại khách quen vs vãng lai |
| 2 | Lần gần nhất bạn mua hàng, bạn đặt qua kênh nào? (Gọi điện / Chat Zalo / Facebook) | Behavior | Kênh quen dùng |
| 3 | Bạn có từng gọi điện hỏi "đơn tới đâu chưa" không? (Có / Không) | Behavior | Đo prevalence |
| 4 | Nếu có, bao nhiêu lần trong tháng qua? (1 / 2–3 / > 3) | Behavior | Tần suất |
| 5 | Bạn thấy việc không biết trạng thái đơn gây khó chịu thế nào? (1: Không quan tâm → 5: Rất khó chịu) | Pain rating | Đo mức độ |
| 6 | Bạn thích xem trạng thái đơn qua đâu? (Web trên điện thoại / Tin nhắn tự động / Vẫn gọi như cũ) | Preference | Chọn kênh |
| 7 | Nếu shop có web, bạn có sẵn sàng đặt hàng qua web thay vì gọi/chat không? (Có / Không / Cần thử mới biết) | Behavior intent | Adoption hypothesis |
| 8 | Điều gì quan trọng nhất với bạn khi mua hàng online? (Open) | Open-ended | Phát hiện unexpected |

**Kết quả (20/30 trả lời, tỉ lệ 67%):**

| Phát hiện | Data | Decision |
|---|---|---|
| 13/20 (65%) từng gọi hỏi trạng thái, trung bình 2–3 lần/tháng | Prevalence confirmed | Có evidence cho `SF-5` Delivery Status |
| Rating khó chịu trung bình 3.8/5 | Trên ngưỡng "cần giải quyết" | Priority: High |
| 14/20 (70%) chọn "Web trên điện thoại", 4/20 chọn "Vẫn gọi", 2/20 chọn SMS | Mobile-first | Xác nhận mobile-responsive cho `SF-5` |
| 12/20 "Cần thử mới biết" cho adoption | Chưa chắc chắn | Cần đo adoption sau Sprint 1 (không assume) |
| Open: "muốn biết phí ship trước khi đặt" (3 người) | Unexpected need | Ghi open question cho Sprint 2 |

**Bài học:** Survey xác nhận `SF-5` Delivery Status priority High dựa trên
prevalence (65%) và pain rating (3.8/5). Nhưng survey cũng lộ ra "cần thử mới
biết" (60% chưa chắc chắn về adoption) và unexpected need (phí ship) — tức là
không nên assume survey = cam kết. Triangulate với observation post-launch.

## Anti-patterns

| Anti-pattern | Vì sao nguy hiểm | Cách sửa |
|---|---|---|
| Survey khi chưa biết gì (exploratory) | câu hỏi sai → data vô nghĩa | interview trước, survey sau |
| Câu hỏi leading ("Bạn muốn X chứ?") | data confirm bias của BA, không phải nhu cầu thật | dùng câu hỏi neutral, behavior-based |
| Gửi survey cho sai sample | chỉ nghe từ người dễ tiếp cận, không representative | xác định segment, chọn sample có chủ đích |
| Không pilot | câu hỏi mơ hồ, dài, bị hiểu sai → low response rate | pilot 3–5 người, sửa trước gửi thật |
| Tự suy diễn từ open-ended | đọc 3 câu giống nhau → "mọi người đều muốn X" | đếm frequency, trích quote, không phóng đại |

## Checklist nhanh

- Đã có hypothesis từ exploratory research chưa? Biết cần đo gì?
- Population có đủ lớn không (≥ 30)? Sample có representative không?
- Survey ≤ 10 câu, ≤ 5 phút? Đã pilot chưa?
- Có câu hỏi nào leading, ambiguous, hoặc double-barrel không?
- Kết quả có phân biệt được segment (khách quen vs vãng lai)?
- Đã triangulate với interview/observation chưa?

## References

- [SurveyMonkey — Survey Best Practices](https://www.surveymonkey.com/mp/survey-best-practices/) — hướng dẫn viết câu hỏi survey và tránh bias.
- [Nielsen Norman Group — Surveys](https://www.nngroup.com/articles/survey-methods/) — khi nào dùng survey trong UX research.

## Related

- [Elicitation Technique Selection](/posts/discovery-and-requirements/elicitation-technique-selection)
- [Stakeholder Interview](/posts/discovery-and-requirements/stakeholder-interview)
- [Requirement Elicitation](/posts/discovery-and-requirements/requirement-elicitation)

