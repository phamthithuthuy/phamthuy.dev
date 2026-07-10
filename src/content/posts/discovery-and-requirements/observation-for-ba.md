---
title: "Observation & Contextual Inquiry cho BA"
pubDatetime: 2026-07-09T22:37:09.080Z
description: "Note này giúp BA dùng observation để thấy hành vi thực tế — \"work-as-done\" — khác với quy trình được kể trong interview. Observation không phải \"ngồi nhìn\"; nó…"
tags: ["ba", "discovery-and-requirements"]
draft: false
---
> Note này giúp BA dùng observation để thấy hành vi thực tế — "work-as-done" —
> khác với quy trình được kể trong interview. Observation không phải "ngồi nhìn";
> nó là kỹ thuật thu thập evidence có hệ thống với câu hỏi, capture và playback.

## Note này dùng để làm gì

Mở note khi quy trình được kể khác với thực tế (stakeholder nói "nhập hàng đơn
giản" nhưng thực tế có 5 bước không ai nhắc tới), hoặc khi bạn cần evidence về
workaround, exception và pain point mà interview không lộ ra. Đọc
[Elicitation Technique Selection](/posts/discovery-and-requirements/elicitation-technique-selection) để chọn đúng
technique trước khi quan sát.

## 1. Khi nào dùng và không dùng

| Dùng khi | Không dùng khi |
|---|---|
| cần thấy hành vi thực tế (work-as-done) | activity hiếm hoặc quá nhạy cảm (ví dụ: xử lý incident bảo mật) |
| workflow phức tạp, nhiều bước ngầm, shortcut | cần ý kiến chủ quan, motivation (dùng interview) |
| interview mâu thuẫn với evidence | sample quá nhỏ để khái quát (dùng survey) |
| cần phát hiện workaround, exception, error handling | participant không đồng ý bị quan sát |

**Weakness chính:** observer effect (người bị quan sát thay đổi hành vi), sample
nhỏ (chỉ thấy một ngày/người), và interpretation bias của observer. Bù bằng
triangulate interview + artifact/log + nhiều session.

## 2. Các mức độ observation

| Mức | BA làm gì | Khi dùng | Sample size |
|---|---|---|---|
| **Passive** | ngồi im, ghi chép, không can thiệp | cần thấy flow tự nhiên nhất | 2–3 session |
| **Active / Contextual Inquiry** | vừa quan sát vừa hỏi "vì sao làm vậy?", "lúc nãy có step khác không?" | cần hiểu lý do sau hành vi | 2–3 session |
| **Participant** | BA tự làm workflow | cần hiểu cảm giác/phức tạp thực sự | 1–2 lần |

## 3. Observation plan tối thiểu

| Thành phần | Câu hỏi cần trả lời |
|---|---|
| Objective | tôi cần biết điều gì mà interview chưa cho tôi? |
| Actor/task | quan sát ai, làm task gì, khi nào? |
| Evidence cần thu | step sequence, tool/artifact dùng, exception, workaround, thời gian |
| Consent | đã xin phép chưa? participant biết tôi đang ghi gì? |
| Sample | bao nhiêu session, thời điểm nào (sáng/chiều, ngày thường/cuối tuần)? |
| Triangulation | dùng gì để bù bias? (artifact check, interview playback, log) |

## 4. Capture: ghi gì trong observation

| Ghi | Đừng ghi |
|---|---|
| "9:15 — nhân viên kho mở cửa, nhận bill từ supplier, đối chiếu từng dòng với hàng thật (5 phút)" | "Nhập hàng chậm" |
| "9:20 — phát hiện thiếu 2 món so với bill, gọi điện cho supplier (3 phút)" | "Supplier hay giao thiếu" |
| "9:25 — ghi vào sổ: 'nhận 8/10, thiếu 2, chờ giao bổ sung'" | "Sổ sách lộn xộn" |

Quy tắc: **timestamp + hành vi cụ thể + artifact.** Interpretation để riêng cột
(xem §5). Đừng ghi opinion như fact.

## 5. Synthesis: từ observation ra requirement

Sau observation, BA synthesize với taxonomy giống như interview:

| Loại | Ghi nhận |
|---|---|
| Observed step | supplier giao → nhân viên kho kiểm bill → đối chiếu → gọi nếu thiếu → vào sổ |
| Artifact | bill giấy từ supplier, sổ ghi chép tay |
| Exception | 2/10 món thiếu → gọi supplier → supplier hẹn giao bổ sung "cuối tuần" |
| Workaround | ghi tạm vào sổ, không có hệ thống track "đã gọi, đang chờ bổ sung" |
| Pain point | không biết supplier nào thường xuyên giao thiếu, không có dữ liệu |
| Requirement candidate | `SF-7` Receive Stock: cần ghi nhận expected quantity vs actual quantity, tạo alert khi chênh lệch |

### Running case: ShopFlow

Observation nhân viên kho trong 1 buổi sáng lúc nhận hàng supplier cho `SF-7`:

**Objective:** hiểu workflow nhập hàng thực tế — chủ shop nói "nhập hàng đơn
giản, kiểm rồi cho lên kệ" nhưng interview không rõ bước kiểm.

**Observation (passive, 8h–10h sáng thứ Ba):**

| Thời gian | Hành vi quan sát | Artifact |
|---|---|---|
| 8:05 | Nhân viên kho nhận bill từ supplier (2 tờ A4) | Bill supplier |
| 8:10 | Mở kho, xếp hàng mới ra bàn, đối chiếu từng dòng bill → hàng thật | Bill + hàng thật |
| 8:25 | Phát hiện 2 món thiếu, 1 món sai mã — gọi supplier (3 phút) | Điện thoại |
| 8:30 | Supplier hẹn "cuối tuần giao bù" — nhân viên ghi vào sổ tay: "thiếu X, Y, sai Z — hẹn T7" | Sổ tay |
| 8:35 | Tiếp tục nhập 8 món còn lại lên kệ | — |
| 9:00 | Xong — không có bước cập nhật hệ thống vì chưa có hệ thống | — |

**Phát hiện từ observation mà interview không lộ ra:**
- Có bước "gọi supplier" → cần audit trail trong `SF-7` (ai gọi, khi nào, kết quả).
- Có "hàng sai mã" ngoài "thiếu" → AC của `SF-7` phải có trường "wrong item", không chỉ "missing".
- Sổ tay là single point of failure — nếu mất sổ, không biết đã gọi supplier chưa.

**Synthesis thành requirement cho `SF-7`:**
- `SF-7` Receive Stock phải cho phép nhập expected quantity (từ bill) vs actual quantity (từ kiểm thực tế).
- Nếu chênh lệch → tạo alert "Supplier X giao thiếu Y món ngày Z" (`SF-21` — bổ sung từ observation).
- Audit trail: ghi nhận ai gọi supplier, thời gian, kết quả.

**Bài học:** Nếu chỉ làm interview với chủ shop (người không trực tiếp nhận hàng),
BA sẽ thiết kế `SF-7` chỉ có "nhập số lượng" — bỏ qua bước đối chiếu bill, gọi
supplier, và xử lý hàng sai mã. Observation phát hiện work-as-done mà
work-as-described không có.

## Anti-patterns

| Anti-pattern | Vì sao nguy hiểm | Cách sửa |
|---|---|---|
| Observation không có objective | ghi lan man, không synthesize được | xác định câu hỏi cụ thể trước |
| Một session = kết luận | sample quá nhỏ, thiên lệch ngày/người | ít nhất 2–3 session, thời điểm khác nhau |
| Ghi interpretation như observation | mất ranh giới fact/assumption | tách cột: observed behavior | interpretation |
| Không playback với participant | BA hiểu sai hành vi, participant không có cơ hội giải thích | playback trong vòng 24h |
| Bỏ qua artifact | workflow không có artifact = không có evidence | ghi tên, chụp ảnh (có consent), mô tả artifact |

## Checklist nhanh

- Objective của observation đã rõ chưa? Cần biết gì mà interview không cho?
- Đã chọn mức observation (passive/active/participant) phù hợp chưa?
- Consent đã có chưa? Participant biết mình đang bị quan sát?
- Đã lên kế hoạch sample (bao nhiêu session, thời điểm nào)?
- Ghi observation có tách timestamp + hành vi + artifact không?
- Synthesis có tách observed behavior, interpretation và requirement không?
- Đã playback với participant trong 24h chưa?

## References

- [IIBA — BABOK Guide](https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/) — observation và contextual inquiry trong elicitation and collaboration.
- [Nielsen Norman Group — Contextual Inquiry](https://www.nngroup.com/articles/contextual-inquiry/) — hướng dẫn thực hành contextual inquiry.

## Related

- [Elicitation Technique Selection](/posts/discovery-and-requirements/elicitation-technique-selection)
- [Stakeholder Interview](/posts/discovery-and-requirements/stakeholder-interview)
- [Requirement Elicitation](/posts/discovery-and-requirements/requirement-elicitation)

