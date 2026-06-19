# BA Handbook Note Guidelines

File này là **single source of truth** để viết, sửa, review, và verify mọi note trong BA handbook. Nó là canonical standard cho cả note thực hành trong `notes/` lẫn note bám source trong `library/<module>/note/`.

Đây cũng là hướng dẫn làm việc cho các agent đến sau. Trước khi thêm hoặc sửa bất kỳ note nào, đọc file này trước.

Mục tiêu không chỉ là "viết cho đủ section", mà là tạo ra tài liệu:

- dễ học lại
- dễ tra cứu
- dễ mở rộng khi thêm chủ đề mới
- đủ đúng về mặt nghiệp vụ BA
- grounded in evidence, không phải best practice chung chung
- nhất quán giữa các batch note viết ở thời điểm khác nhau

---

## 1. Phạm vi áp dụng

Áp dụng cho toàn bộ thư mục:

```text
ba-handbook
```

Hiện áp dụng trực tiếp cho:

- `notes/` — note thực hành tổng hợp (synthesized practical notes)
- `library/<module>/note/` — note bám một source cụ thể (source-derived lesson notes)

Không áp dụng cho:

- file PDF trong `library/` và `collections/` — đó là source canonical, không phải note. Quy tắc xử lý chúng nằm ở [[../mapping/README|mapping/README]].
- `pipelines/` — đó là công cụ sinh note, có guideline riêng bên trong.

---

## 2. Phân tầng guideline (đọc kỹ trước khi viết)

Handbook có **3 tầng quy tắc**. Tầng dưới chỉ được **mở rộng hoặc siết chặt** tầng trên; khi mâu thuẫn, **tầng trên thắng**.

| Tầng | File | Phạm vi | Nói về |
|---|---|---|---|
| 1 | `~/.claude/CLAUDE.md` | mọi project | hành vi agent, nguyên tắc làm việc chung |
| 2 | **file này** (`notes/note-guidelines.md`) | toàn bộ ba-handbook | cách viết note: genre, naming, quality bar, section template |
| 3 | `notes/<folder>/_conventions.md` | riêng một nhóm chủ đề | convention cục bộ: notation, format, độ sâu, từ vựng nhóm |

Quy tắc chống drift (bắt buộc):

- File `_conventions.md` ở tầng 3 **chỉ chứa luật cục bộ** của nhóm đó. Nếu một luật đúng cho mọi nhóm, nó thuộc về file này (tầng 2), **không** được sao chép xuống tầng 3.
- File `_conventions.md` **không được mâu thuẫn** file này. Nếu cần lệch, ghi rõ lý do trong chính file `_conventions.md` và xem lại liệu luật chung có cần sửa không. Không tạo exception âm thầm.
- Mỗi folder note có đúng một `_conventions.md`. Danh sách đăng ký ở [§3.1](#31-đăng-ký-_conventionsmd).

---

## 3. Mô hình thư mục và cách mở rộng

`notes/` được tổ chức theo **nhóm chủ đề bám workflow của BA**, không để phẳng. Mỗi nhóm là một folder đánh số có `README.md` (Current + Planned scope) và `_conventions.md` (luật cục bộ).

Taxonomy hiện tại bám vòng đời phân tích nghiệp vụ:

| Folder | Chủ đề | Đặt note nào vào đây |
|---|---|---|
| `00-foundations/` | nền tảng nghề BA | vai trò BA, SDLC/Agile vs Waterfall, hệ tài liệu BA, BABOK overview |
| `01-discovery-and-requirements/` | khai thác & làm rõ yêu cầu | elicitation, stakeholder interview, NFR |
| `02-system-analysis-and-design/` | phân tích & thiết kế hệ thống | FDD, MoSCoW, nguyên tắc chung, CRUD, Use Case, modeling diagrams, so sánh công cụ |
| `03-specification/` | đặc tả & truy vết yêu cầu | SRS/FRS, BRD, NFR spec, RTM (traceability matrix) |
| `04-agile-delivery/` | biến requirement thành backlog & giao giá trị | Agile concepts, story/AC, refinement, change request, estimation |
| `05-domain-knowledge/` | kiến thức nghiệp vụ theo domain | e-commerce, banking, logistics… (đặc thù dự án) |
| `06-soft-skills/` | kỹ năng mềm của BA | giao tiếp, facilitation, đàm phán scope, viết rõ ràng |
| `07-tools/` | công cụ & literacy kỹ thuật | Jira, Confluence, Figma, draw.io, SQL cho BA, security awareness |
| `08-templates/` | template copy-ready | artifact templates, SRS template |

Khi thêm nội dung mới, giữ đúng mô hình này thay vì tạo lớp mới tuỳ hứng:

- **Note thực hành mới** → xác định nó thuộc nhóm nào, đặt `.md` vào folder nhóm đó, thêm dòng vào bảng của nhóm trong `notes/README.md` và vào `README.md` của nhóm.
- **Không rõ thuộc nhóm nào** → ưu tiên nhóm theo *mục đích sử dụng* của note (BA mở nó ở bước nào trong công việc), không theo từ khóa kỹ thuật.
- **Source mới (PDF khóa học)** → thêm vào đúng module trong `library/<NN-module>/`, cập nhật `mapping/README.md`, rồi nếu cần thì sinh lesson note vào `library/<NN-module>/note/`.
- **Nhóm chủ đề lớn hoàn toàn mới** → chỉ tạo folder nhóm mới khi đã có từ 3–4 note cùng nhóm. Đừng tạo file rỗng trước.

Nguyên tắc: **một note = một mục đích rõ ràng**. Nếu một note đang cố làm hai việc (vừa dạy concept vừa làm template), tách nó.

### 3.1 Đăng ký _conventions.md

Mỗi folder dưới `notes/` có một `_conventions.md`. Đây là danh sách canonical — khi thêm folder mới, đăng ký vào đây:

- `00-foundations/_conventions.md`
- `01-discovery-and-requirements/_conventions.md`
- `02-system-analysis-and-design/_conventions.md`
- `03-specification/_conventions.md`
- `04-agile-delivery/_conventions.md`
- `05-domain-knowledge/_conventions.md`
- `06-soft-skills/_conventions.md`
- `07-tools/_conventions.md`
- `08-templates/_conventions.md`

### Current vs Planned scope

Trong mọi README, phân biệt rõ:

- **Current scope** — folder/note đã tồn tại thật trên filesystem.
- **Planned scope** — roadmap đã định nghĩa nhưng chưa viết.

Planned scope không phải lỗi cấu trúc. Nó để khi bắt đầu batch mới thì note đi đúng guideline ngay. Đừng tạo file rỗng chỉ để "có chỗ".

---

## 4. Naming convention

- File note thực hành: `kebab-case.md`, tiếng Anh, mô tả đúng nội dung (ví dụ `backlog-refinement.md`). Đây là basename mà wiki-link `[[backlog-refinement]]` resolve tới, nên **đổi tên file = phải sửa mọi link trỏ tới nó**. Đổi *số thứ tự folder* không gãy link (Obsidian resolve theo basename), nhưng đổi basename thì gãy.
- Mỗi folder note có một `README.md` (index) và một `_conventions.md` (luật cục bộ). Prefix `_` đẩy conventions lên đầu khi sort và phân biệt nó với note nội dung.
- File PDF trong `library/`/`collections/`: **không tự ý đổi tên**. Chúng giữ tên gốc theo source và đã được map trong `mapping/README.md`.
- Lesson note trong `library/<module>/note/` có thể giữ tên tiếng Việt mô tả bài học, vì chúng bám 1-1 với một source.

---

## 5. Ngôn ngữ và giọng viết

- Viết giải thích chính bằng **tiếng Việt**.
- Giữ nguyên thuật ngữ tiếng Anh phổ biến của nghề BA khi bản tiếng Anh rõ và dễ nhận diện hơn: `requirement`, `elicitation`, `backlog`, `user story`, `acceptance criteria`, `refinement`, `change request`, `stakeholder`, `epic`, `sprint`, `DoR`, `DoD`.
- Dịch sang tiếng Việt tự nhiên các từ không phải thuật ngữ kỹ thuật.
- Ưu tiên giọng trực tiếp, như đang giải thích cho chính mình trong tương lai. Tránh văn phong textbook.
- Mỗi đoạn tập trung một ý.
- Khi có thể, giải thích bằng mental model hoặc ví dụ trước, sau đó mới tới rule.

### Quy tắc cực quan trọng

- Đừng hy sinh độ đúng nghiệp vụ để lấy một câu gọn nhưng sai.
- Đừng dạy "best practice" như chân lý tuyệt đối. BA practice phụ thuộc context (domain, team, regulation). Note phải nêu phạm vi áp dụng.
- Nếu đơn giản hoá, đơn giản hoá có kiểm soát và nói rõ khi nào nó không còn đúng.

---

## 6. Handbook quality bar

Một note đạt mức handbook khi nó giúp người đọc **ra quyết định hoặc dự đoán điều gì sẽ xảy ra**, không chỉ nhắc lại định nghĩa.

Checklist tối thiểu cho mọi note:

- [ ] có một câu chốt rõ note dùng để làm gì và khi nào mở
- [ ] nêu được hiểu nhầm hoặc anti-pattern phổ biến của chủ đề
- [ ] có ví dụ cụ thể hoặc scenario đủ chi tiết, không chung chung
- [ ] có rule thực dụng: khi nào dùng, khi nào không, khi nào cẩn thận
- [ ] có `References` (nguồn ngoài) hoặc `Internal Sources` (PDF trong handbook) cho claim quan trọng
- [ ] có `Related` link tới note liên quan để giữ graph kết nối
- [ ] phân biệt rõ hard rule, default convention, và exception (nếu là note convention/quy trình)
- [ ] để lộ gap thay vì lấp bằng best practice chung (nếu là source-derived note)

---

## 7. Hai loại note và section template

Handbook này có đúng hai genre note. Xác định đúng genre trước khi viết, vì section template và evidence rule khác nhau.

### 7.1 Synthesized practical note (`notes/`)

Mục tiêu: giúp BA **ra quyết định hoặc tạo artifact** trong tình huống thật, tổng hợp từ nhiều source chứ không bám một video.

Đặc điểm: viết theo hướng "mở ra là làm được việc"; bắt buộc có phần mở đầu nói rõ note dùng để làm gì và khi nào mở; ưu tiên bảng quyết định, checklist, anti-pattern, template; mỗi rule kèm "khi nào dùng / khi nào không / khi nào cẩn thận"; claim nghiệp vụ quan trọng phải dẫn được về `References` hoặc `Internal Sources`.

```markdown
# <Tên note> cho BA

> 1–3 câu: note này giúp giải quyết vấn đề gì.

## Note này dùng để làm gì
- mở note khi nào
- đọc kèm note nào ([[...]])

## 1..N. <Các phần nội dung>
nội dung chính, ưu tiên bảng / checklist / ví dụ

## Anti-patterns
bảng: anti-pattern | vì sao nguy hiểm | cách sửa

## Checklist nhanh
câu hỏi cần trả lời được trước khi coi là xong

## References
nguồn ngoài, mỗi link kèm 1 câu vì sao đáng đọc

## Internal Sources
[[collections/...]] hoặc [[library/...]] liên quan

## Related
[[note khác]]
```

### 7.2 Source-derived lesson note (`library/<module>/note/`)

Mục tiêu: ghi lại đúng những gì **một source cụ thể** (video, slide, transcript) trình bày, tách bạch fact với suy luận. Nếu source chưa đủ evidence, để lộ gap thay vì tự lấp. Thường được sinh qua `pipelines/`.

```markdown
## Source basis
source nào, loại gì (video/slide/transcript)

## What the lesson is about
## What is directly stated or shown   <- fact từ source
## BA concepts, artifacts, or process steps
## Examples or scenarios from the lesson
## What is inferred                   <- suy luận, đánh dấu rõ
## Open questions / needs verification <- gap còn thiếu
## Source notes
```

Không bắt buộc khớp từng chữ, nhưng phải giữ được sự tách bạch **stated vs inferred vs missing**.

---

## 8. Decision priority

Khi các nguồn guidance không giống nhau, ưu tiên theo thứ tự:

1. evidence trực tiếp từ source đang note (với source-derived note)
2. chuẩn nghiệp vụ được công nhận rộng: IIBA BABOK, Scrum Guide, chuẩn của domain đang làm
3. convention của team/dự án thật đang làm việc
4. `_conventions.md` của nhóm (tầng 3)
5. file này (tầng 2)
6. sở thích cá nhân

Nếu lệch khỏi rule trong handbook, ghi rõ lý do ngay trong note. Không tạo exception âm thầm.

---

## 9. Review checklist

Khi review một note, kiểm tra theo thứ tự:

1. **Correctness** — claim nghiệp vụ có đúng và có nguồn không
2. **Scope** — note có đúng một mục đích, hay đang ôm đồm
3. **Evidence** — fact và suy luận có tách bạch không; gap có bị lấp ẩu không
4. **Conventions** — có tuân `_conventions.md` của nhóm không
5. **Example** — ví dụ có đủ cụ thể để áp dụng không
6. **Decision value** — note có giúp ra quyết định, hay chỉ định nghĩa lại
7. **Links** — `References`, `Internal Sources`, `Related` có đầy đủ và resolve được không
8. **Wording** — cuối cùng mới tới câu chữ

Nếu một note chỉ liệt kê rule mà chưa giúp quyết định trong tình huống thật, nâng nó bằng decision matrix, exception, hoặc anti-pattern trước khi coi là đạt.

---

## 10. Link hygiene

- Wiki-link ưu tiên dạng `[[basename|alias]]`. Obsidian resolve theo basename nên di chuyển file giữa các folder không làm gãy link; **đổi basename mới làm gãy**.
- Khi đổi tên hoặc xoá một note, grep toàn vault tìm link trỏ tới nó trước khi commit thay đổi.
- Mọi note nên có ít nhất một `Related` link để không bị mồ côi trong graph view.

## Related

- [[README|BA Handbook Notes]]
- [[../README|BA Handbook]]
- [[../glossary|Glossary]]
- [[../mapping/README|Study Map & Source Mapping]]
- [[../pipelines/course-video-to-handbook-guidelines|Course video to handbook guidelines]]
</content>
</invoke>
