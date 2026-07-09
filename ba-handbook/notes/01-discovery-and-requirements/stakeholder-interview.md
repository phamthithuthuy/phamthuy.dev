# Stakeholder Interview cho BA

> Note này giúp BA thực hiện interview tạo evidence, không chỉ đọc một danh sách
> câu hỏi. Interview hợp để hiểu context, example và chủ đề khó nói trước nhóm;
> nó không tự chứng minh mức độ phổ biến của vấn đề.

## Note này dùng để làm gì

Mở note khi cần khai thác workflow, pain point, rule hoặc exception từ một
stakeholder. Cần có objective và participant rationale trước khi đặt lịch.

## 1. Khi nào dùng và không dùng

| Dùng khi | Không dùng một mình khi |
|---|---|
| cần context/experience cá nhân | cần quan sát thao tác thực tế |
| topic nhạy cảm hoặc có power imbalance | cần ra decision nhiều bên ngay |
| cần probe example và exception | cần đo prevalence trên population |
| SME khó cùng lịch | source of truth là policy/log có thể kiểm tra |

Weakness chính: recall bias, social desirability, leading question và
interpretation của interviewer. Bù bằng artifact/log, observation và playback.

## 2. Chuẩn bị interview package

- research objective và 3–5 unknown quan trọng;
- participant rationale: người này có evidence gì;
- consent, recording, confidentiality và cách dùng dữ liệu;
- question guide theo topic, không phải script cứng;
- note-taking role, nơi lưu evidence và cách follow-up.

```plantuml Stakeholder Interview — question funnel từ context tới xác nhận
@startuml
start
:Mở đầu: purpose, consent, thời lượng;
:Warm-up: role và context;
:Mở rộng: kể lần gần nhất;
repeat
  :Probe behavior, evidence, exception, consequence;
repeat while (Còn gap quan trọng?) is (Có)
-> Không;
:Playback fact, interpretation và open question;
:Participant sửa hoặc xác nhận;
:Chốt next step và follow-up;
stop
@enduml
```

Funnel mở rộng trước để tránh áp framing, rồi hẹp dần vào evidence và xác nhận.

## 3. Câu hỏi tốt bám behavior

| Tránh | Hỏi lại |
|---|---|
| “Anh thấy quy trình chậm không?” | “Lần gần nhất anh gửi yêu cầu là khi nào? Mỗi bước mất bao lâu?” |
| “Dashboard giải quyết được không?” | “Khi cần biết trạng thái, anh làm gì? Điều gì xảy ra tiếp?” |
| “Finance luôn duyệt sau Manager?” | “Ai duyệt trong ba case gần nhất? Có exception nào?” |
| “Anh muốn notification thế nào?” | “Thông tin nào giúp anh hành động, ở thời điểm nào?” |

Probe bằng “ví dụ gần nhất”, “điều gì xảy ra nếu”, “dựa vào đâu để quyết định”
và “trường hợp nào không theo flow”.

## 4. Ghi note có provenance

| Quote/observation | Interpretation | Assumption | Follow-up |
|---|---|---|---|
| “Tôi thường hỏi Finance qua chat” | handoff thiếu visibility | chat là kênh duy nhất | kiểm sample artifact có consent |

Quote là evidence participant đã nói câu đó, chưa phải fact của toàn population.

### Running case: ShopFlow

Interview chủ shop cho story `SF-3 Create Customer Order` — áp funnel §2:

**Interview package tối thiểu:**
- Objective: hiểu cách chủ shop xử lý order hiện tại, xác nhận rule stock validation, phát hiện exception
- Participant rationale: chủ shop là người duy nhất biết rule "khi nào từ chối order" và hậu quả của bán vượt stock
- Question guide: mở bằng "kể lần gần nhất có khách order mà kho không đủ hàng", probe "lúc đó chị làm gì?", "có trường hợp nào vẫn bán dù thiếu một mục không?"

**Output sau synthesis (theo taxonomy §4):**

| Loại | Ghi nhận |
|---|---|
| Quote | "Có lần khách order 5 món, kho còn 3, tui phải gọi nói thiếu 2 món — khách cancel luôn" |
| Fact | 3 lần/tháng xảy ra order vượt stock; mỗi lần mất ~15 phút gọi điện |
| Pain point | mất đơn vì không biết stock thực tế lúc nhận order |
| Requirement candidate | hệ thống phải check stock real-time và reject nếu thiếu (`SF-11`) |
| Business rule | nếu một item thiếu → reject toàn bộ order, không bán lẻ từng món (`SF-3` AC) |
| Solution idea | "cho cái đèn xanh/đỏ cạnh mỗi món hàng" |
| Assumption | stock database luôn khớp stock thực tế |
| Open question | nhân viên kho có được phép override stock validation không? — Owner: chủ shop, hạn trước Sprint 1 planning |

**So sánh câu hỏi tốt vs câu hỏi yếu (§3) trong interview này:**

| Tránh (hỏi opinion) | Hỏi lại (bám behavior) |
|---|---|
| "Chị muốn hệ thống quản lý order thế nào?" | "Lần gần nhất chị nhận order qua điện thoại, chị ghi vào đâu? Mất bao lâu?" |
| "Có cần kiểm tra tồn kho không?" | "Có lần nào chị nhận order xong mới biết thiếu hàng không? Lúc đó chị xử lý ra sao?" |
| "Chị muốn giao diện tạo đơn thế nào?" | "Chị cần biết thông tin gì trước khi nói 'ok' với khách?" |

## 5. Anti-patterns

| Anti-pattern | Cách sửa |
|---|---|
| hỏi opinion chung chung | yêu cầu example gần nhất và artifact |
| đọc script, không probe | giữ objective, linh hoạt theo evidence |
| mọi câu nói thành requirement | phân loại quote/fact/need/idea |
| không nói cách dùng recording | xin consent và nêu retention/access |
| gửi raw transcript để confirm | gửi synthesis ngắn, đánh dấu điểm cần sửa |

## 6. Checklist nhanh

- Objective/unknown và participant rationale đã rõ chưa?
- Đã xử lý consent/confidentiality chưa?
- Câu hỏi có neutral và bám behavior không?
- Đã hỏi exception, consequence và source chưa?
- Fact, interpretation và assumption có tách không?
- Playback/follow-up có owner không?

## References

- [IIBA — BABOK Guide](https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/) — interview trong elicitation and collaboration.
- [UK Government Service Manual — User research](https://www.gov.uk/service-manual/user-research) — nguyên tắc làm việc với participant và evidence hành vi.

## Related

- [[requirement-elicitation|Requirement Elicitation]]
- [[elicitation-technique-selection|Elicitation Technique Selection]]
- [[stakeholder-analysis-and-engagement|Stakeholder Analysis & Engagement]]
- [[requirement-quality-and-validation|Requirement Quality & Validation]]

