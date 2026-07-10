# Tư duy phản biện & Có cấu trúc cho BA

> Note này giúp BA xây dựng khung tư duy để phân tích thông tin trước khi chốt
> thành requirement: 5W1H, phân biệt fact/assumption/opinion, hypothesis vs
> causal chain, và pyramid principle. Đây là kỹ năng nền — rèn xuyên suốt, không
> "học một lần là xong".

## Note này dùng để làm gì

Mở note khi bạn bắt đầu elicitation và cần khung để không bị cuốn theo lời
stakeholder, khi requirement mâu thuẫn nhau, hoặc khi team nhảy vào solution
mà chưa kiểm chứng problem. Đọc trước khi vào nhóm 01 (elicitation).

## 1. 5W1H: sáu câu hỏi trước mọi phân tích

Trước khi viết một dòng requirement, trả lời sáu câu:

| Câu hỏi | Ý nghĩa trong BA | Ví dụ (ShopFlow) |
|---|---|---|
| **Who** | ai gặp vấn đề? ai quyết định? ai bị ảnh hưởng? | Chủ shop (gặp), Khách hàng (bị ảnh hưởng) |
| **What** | vấn đề/hành vi/nhu cầu cụ thể là gì? | Không biết stock thực tế khi nhận order qua điện thoại |
| **When** | xảy ra khi nào? tần suất? trigger? | Trong giờ bán hàng (9h–18h), ~3 lần/tháng |
| **Where** | xảy ra ở đâu trong process? boundary? | Ở bước nhận order — sau khi khách chốt món, trước khi hẹn giao |
| **Why** | vì sao là vấn đề? hậu quả? evidence? | Mỗi lần mất ~15 phút gọi xin lỗi + 1 khách cancel |
| **How** | hiện đang xử lý thế nào? workaround? | Chủ shop chạy ra kho đếm thủ công, gọi lại nếu thiếu |

5W1H buộc BA nghĩ trước khi viết requirement. Không có 5W1H → requirement
thường thiếu actor ("hệ thống phải..."), thiếu context ("lúc nào?"), hoặc thiếu
evidence ("vì sao cần?").

## 2. Phân biệt fact, assumption và opinion

Đây là kỹ năng quan trọng nhất của BA trong elicitation. Trộn ba thứ này →
requirement sai.

| Loại | Định nghĩa | Cách nhận biết | Ví dụ |
|---|---|---|---|
| **Fact** | điều có thể kiểm chứng bằng evidence | có nguồn (quan sát, log, document) | "Tháng 6 có 3 order vượt stock" (nguồn: sổ ghi chép) |
| **Assumption** | điều đang tin nhưng chưa kiểm chứng | có thể đúng hoặc sai, cần validation | "Stock database luôn đồng bộ với thực tế" — chưa kiểm |
| **Opinion** | niềm tin cá nhân, không có evidence | thường bắt đầu bằng "Tôi nghĩ...", "Theo tôi..." | "Khách hàng sẽ không dùng web đâu, họ quen gọi điện rồi" |

Bài tập thực hành: mỗi khi stakeholder nói một câu, BA tự hỏi: "Đây là fact,
assumption hay opinion?" Nếu là assumption → ghi vào assumption register. Nếu
là opinion → tìm evidence.

### Cặp câu nên nói / câu nên tránh

| Tình huống | Câu nên tránh | Câu nên nói |
|---|---|---|
| Stakeholder nói "hệ thống phải nhanh" | "Dạ, em ghi 'hệ thống phải nhanh' ạ." | "Nhanh cụ thể là bao nhiêu giây? Có tình huống nào chị thấy chậm không ạ?" |
| Stakeholder đưa solution "làm cái dashboard đi" | "Dạ, để em báo team làm dashboard." | "Dashboard sẽ giúp chị trả lời câu hỏi gì ạ? Hiện tại chị đang thiếu thông tin nào?" |
| Dev nói "cái này không làm được" | "Sao không làm được? Khách cần mà." | "Vướng ở đâu ạ? Có cách nào đạt outcome tương tự không?" |

## 3. Hypothesis vs causal chain

Khi tìm nguyên nhân của vấn đề, BA thường dừng ở hypothesis đầu tiên. Giữ
nhiều hypothesis đến khi có evidence.

```plantuml Từ hypothesis tới root cause — giữ nhiều hypothesis tới khi có evidence
@startuml
skinparam defaultFontSize 15
rectangle "Symptom:\norder vượt stock 3 lần/tháng" as Symptom #LightGray
rectangle "Hypothesis 1:\nkhông biết stock\nthực tế khi nhận order" as H1 #LightYellow
rectangle "Hypothesis 2:\nkhách không thấy\nsản phẩm còn/hết" as H2 #LightYellow
rectangle "Hypothesis 3:\nquy trình ghi sổ\nchậm hơn bán hàng" as H3 #LightYellow
rectangle "Evidence:\nkiểm tra observation\n+ document analysis" as Evidence #LightBlue

Symptom --> H1
Symptom --> H2
Symptom --> H3
H1 --> Evidence
H2 --> Evidence
H3 --> Evidence

note right of Evidence
  Không chốt hypothesis nào
  cho tới khi có evidence
  ủng hộ hoặc bác bỏ.
end note
@enduml
```

Quy tắc: **không chốt root cause trong cùng một buổi phát hiện symptom.**
Workshop có thể sinh hypothesis, nhưng validation cần evidence từ observation,
document analysis hoặc data.

## 4. Pyramid principle: kết luận trước, bằng chứng sau

Khi trình bày cho stakeholder bận rộn (sponsor, PO, manager):

1. **Kết luận trước:** "Em đề xuất hoãn integration payment thật sang sau MVP."
2. **Lý do chính (3 điểm):** "Vì (1) lead time VNPay sandbox 2 tuần, (2) không
   block core flow, (3) constraint Epic `SF-1` đã ghi rõ mock."
3. **Evidence cho từng điểm:** data, quote, observation.

Đừng kể chuyện theo trình tự thời gian ("Đầu tiên em phỏng vấn chủ shop, rồi em
quan sát nhân viên kho, rồi em đọc sổ ghi chép...") — stakeholder quyền lực
**không có thời gian nghe hành trình của bạn.** Họ cần kết luận và lý do.

### Running case: ShopFlow

Áp 5W1H cho vấn đề trung tâm của ShopFlow:

| W | Trả lời |
|---|---|
| Who | Chủ shop (gặp vấn đề), Khách hàng (chịu hậu quả) |
| What | Nhận order nhưng không biết stock thực tế, dẫn tới bán vượt stock |
| When | Trong giờ bán hàng, trung bình 3 lần/tháng (evidence: sổ ghi chép tháng 6) |
| Where | Ở bước nhận order — giữa lúc khách chốt món và lúc hẹn giao |
| Why | Mỗi lần mất ~15 phút gọi xin lỗi + ~1 khách cancel (impact ~45 phút/tháng + mất khách) |
| How | Hiện tại: chạy ra kho đếm thủ công. Workaround: gọi supplier gấp, giao bù, hoặc hủy |

**Áp fact/assumption/opinion trong một buổi elicitation thực tế:**

Chủ shop nói: "Tôi nghĩ khách hàng sẽ không chịu dùng web đâu, họ quen gọi
điện rồi. Với lại hệ thống phải nhanh, chứ chậm là tôi không dùng."

| Phát biểu | Phân loại | BA xử lý |
|---|---|---|
| "Khách hàng sẽ không chịu dùng web đâu" | **Opinion** — không có evidence | Ghi nhận, chuyển thành hypothesis: "Adoption web có thể thấp" → kiểm bằng survey 10 khách |
| "Họ quen gọi điện rồi" | **Assumption** — có thể kiểm chứng | Kiểm: survey + observation post-launch. Kết quả: 70% khách survey nói "sẵn sàng thử web" → assumption bị bác bỏ |
| "Hệ thống phải nhanh, chứ chậm là tôi không dùng" | **Opinion** + requirement ẩn | BA probe: "Nhanh là bao nhiêu giây ạ? Có tình huống nào chị thấy chậm không?" → Chủ shop: "Như lúc mở app ngân hàng, chắc 2–3 giây" → BA chuyển thành NFR: "Tạo order < 3 giây p95" |

**Áp pyramid principle khi trình bày cho chủ shop về việc không nên tích hợp
payment thật trong MVP:**

> **Kết luận:** Em đề xuất giữ mock payment cho MVP, không tích hợp VNPay thật.
>
> **Ba lý do chính:**
> 1. **Constraint Epic `SF-1`** đã ghi rõ "không tích hợp payment gateway thật" — đây là quyết định từ đầu dự án.
> 2. **Lead time VNPay** mất 1–2 tuần chỉ để có tài khoản test — sẽ delay Sprint 2 ít nhất 1 tuần.
> 3. **Không block core flow** — mock payment vẫn cho phép test toàn bộ flow order → paid → delivery.
>
> **Đề xuất:** Sau MVP 4 tuần, nếu adoption > 50%, tạo Epic mới cho payment thật.

**Bài học:** BA không cần phải là "người thông minh nhất phòng". BA cần là
người **phân biệt được fact, assumption và opinion** và **trình bày kết luận
có cấu trúc**. Hai kỹ năng này quan trọng hơn mọi kỹ thuật elicitation cụ thể.

## Anti-patterns

| Anti-pattern | Vì sao nguy hiểm | Cách sửa |
|---|---|---|
| Chốt root cause trong buổi họp đầu | chưa có evidence, chỉ là opinion của người nói to nhất | giữ hypothesis, xác nhận bằng evidence |
| Trộn fact và assumption trong requirement | requirement dựa trên assumption → sai | ghi nhãn, assumption register riêng |
| Trình bày theo hành trình thay vì kết luận | stakeholder mất kiên nhẫn, bỏ lỡ điểm chính | pyramid principle: kết luận → lý do → evidence |
| 5W1H bị bỏ qua vì "ai cũng biết rồi" | requirement thiếu actor, context, evidence | bắt buộc trả lời 5W1H trước khi viết requirement đầu tiên |
| Opinion của stakeholder quyền lực thành requirement | solution bị bias, không dựa trên evidence | phân loại fact/assumption/opinion, tìm evidence bổ sung |

## Checklist nhanh

- Với mỗi requirement, tôi đã trả lời được 5W1H chưa?
- Tôi có đang gọi assumption là fact không? Tôi có evidence cho claim này không?
- Hypothesis nào đã được kiểm chứng? Hypothesis nào vẫn đang open?
- Tôi có đang trình bày theo kiểu kể chuyện thời gian, hay pyramid (kết luận trước)?
- Khi stakeholder nói "Tôi nghĩ..." hay "Theo tôi...", tôi có hỏi "evidence đâu?" không?

## References

- [The Pyramid Principle — Barbara Minto](https://www.barbaraminto.com/) — nền tảng của structured thinking và cách trình bày kết luận trước.
- [IIBA — BABOK Guide](https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/) — critical thinking trong business analysis.

## Related

- [[requirement-elicitation|Requirement Elicitation]]
- [[stakeholder-analysis-and-engagement|Stakeholder Analysis & Engagement]]
- [[problem-framing-and-business-objectives|Problem Framing & Business Objectives]]
- [[scope-negotiation-for-ba|Đàm phán scope cho BA]]
