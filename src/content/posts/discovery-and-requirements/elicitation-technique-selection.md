---
title: "Chọn kỹ thuật Elicitation cho BA"
pubDatetime: 2026-06-19T07:11:15+00:00
description: "Note này giúp BA chọn kỹ thuật theo unknown và evidence cần lấy, thay vì mặc định tổ chức meeting. Không có kỹ thuật tốt nhất; mỗi kỹ thuật tạo một loại signal…"
tags: ["ba", "discovery-and-requirements"]
draft: false
---
> Note này giúp BA chọn kỹ thuật theo unknown và evidence cần lấy, thay vì mặc
> định tổ chức meeting. Không có kỹ thuật tốt nhất; mỗi kỹ thuật tạo một loại
> signal và bias khác nhau.

## Note này dùng để làm gì

Mở note khi lập elicitation plan hoặc khi technique đã dùng nhưng output vẫn mơ
hồ. Đọc [Requirement Elicitation](/posts/discovery-and-requirements/requirement-elicitation) trước.

## 1. Bắt đầu bằng câu hỏi cần trả lời

“Tìm hiểu quy trình duyệt” còn quá rộng. Hãy tách thành unknown: workflow thực tế
khác tài liệu ở đâu, rule nào gây tranh luận, exception nào phổ biến, và pain
point thuộc toàn population hay chỉ một segment.

```plantuml Elicitation Technique Selection — cây quyết định chọn nhóm kỹ thuật
@startuml
start
if (Cần thấy hành vi thực tế?) then (Có)
  :Observation / contextual inquiry;
elseif (Cần tạo đồng thuận nhiều bên?) then (Có)
  :Facilitated workshop;
elseif (Chủ đề cá nhân hoặc nhạy cảm?) then (Có)
  :1:1 interview;
elseif (Cần kiểm tra signal trên mẫu lớn?) then (Có)
  :Survey sau exploratory research;
else
  :Document analysis + interview/prototype;
endif
:Triangulate bằng nguồn thứ hai;
stop
@enduml
```

Cây là shortcut cho vài tiêu chí chi phối. Matrix dưới đây mới là artifact
canonical vì context thực tế có nhiều tiêu chí cùng lúc.

## 2. Decision matrix

| Technique | Hợp khi | Không hợp khi | Bias/điểm yếu | Output |
|---|---|---|---|---|
| Interview | cần context, experience, topic nhạy cảm | cần consensus tức thời | recall, interviewer, social desirability | quote, example, hypothesis |
| Workshop | cần shared model/decision | power conflict chưa kiểm soát | groupthink, loudest voice | agreed flow/rule, dissent |
| Observation | cần hiểu behavior/workaround | activity hiếm hoặc quá nhạy cảm | observer effect, sample nhỏ | observed step/exception |
| Document analysis | có policy, form, log, spec | tài liệu không owner/version | outdated artifact | rule, term, discrepancy |
| Survey | đã biết dimension, cần sample lớn | discovery còn exploratory | wording/sample/non-response | distribution, segment signal |
| Prototype | cần feedback flow/concept | problem chưa rõ | anchoring vào solution | usability issue, open question |

## 3. Tám tiêu chí lựa chọn

Xét knowledge type, số participant, conflict/sensitivity, quyền access, maturity
của discovery, time/cost, decision cần tạo và mức confidence cần có. Technique
chính phải được bù bias bằng nguồn thứ hai.

### Running case: ShopFlow

Áp decision matrix (§2) cho các unknown của ShopFlow `SF-1`:

| Unknown | Technique chính | Lý do chọn | Nguồn bù / triangulate |
|---|---|---|---|
| 8 luồng nghiệp vụ của shop là gì? | **Workshop** với chủ shop | cần shared model về toàn bộ flow bán hàng + tồn kho | document analysis: sổ ghi chép order của chủ shop |
| Nhân viên kho thực tế nhập hàng ra sao? | **Observation** 1 buổi sáng lúc nhận supplier | behavior thật khác quy trình được kể (§1) — chủ shop nói "nhập hàng đơn giản" nhưng observation lộ ra supplier giao thiếu/muộn | interview nhân viên kho sau observation |
| Stock validation rule: reject toàn bộ hay từng phần? | **1:1 Interview** chủ shop | quyết định kinh doanh nhạy cảm, không nên thảo luận trước nhân viên | document analysis: sổ ghi chép 3 tháng gần nhất để kiểm pattern |
| Bao nhiêu khách hàng muốn tự xem trạng thái đơn? | **Survey** (sau exploratory) | cần đo prevalence — không phải mọi khách đều muốn tự check | sample interview 3-5 khách quen để thiết kế câu survey |
| Payment mock flow có đủ cho MVP? | **Prototype** (low-fi wireframe `SF-38`) | cần feedback sớm về flow trước khi dev | workshop playback với chủ shop + 1 nhân viên kho |

**Ví dụ áp cây quyết định (§1) cho `SF-7 Receive Supplier Stock`:**

1. "Cần thấy hành vi thực tế?" → Có → **Observation** (nhân viên kho nhận hàng supplier)
2. Triangulate: **Interview** nhân viên kho sau observation để hiểu exception (hàng hỏng, thiếu, sai mã)
3. Output: workflow thực tế có bước kiểm hàng + đối chiếu bill — flow này không có trong mô tả ban đầu của chủ shop

Bài học: nếu chỉ workshop với chủ shop, BA sẽ bỏ sót bước "kiểm hàng" trong `SF-7` vì chủ shop không trực tiếp làm. Observation + triangulate interview phát hiện exception "hàng hỏng khi nhận" → thêm AC vào `SF-7`.

## 4. Anti-patterns

| Anti-pattern | Cách sửa |
|---|---|
| mọi unknown đều giải bằng meeting | chọn theo knowledge type/source |
| survey khi chưa biết option trả lời | exploratory interview trước |
| workshop cho chủ đề nhạy cảm | 1:1 trước, workshop tổng hợp sau |
| interview thay observation | hỏi example rồi quan sát/sample artifact |
| prototype được hiểu là commitment | ghi hypothesis và fidelity rõ |

## 5. Checklist nhanh

- Unknown đã thành câu hỏi cụ thể chưa?
- Source nào gần evidence nhất?
- Khi nào dùng, không dùng và weakness của technique là gì?
- Nguồn nào bù bias?
- Output giúp ra decision/handoff nào?
- Sample có đủ diversity và authority không?

## References

- [IIBA — BABOK Guide](https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/) — danh mục technique và context dùng trong business analysis.
- [UK Government Service Manual — User research](https://www.gov.uk/service-manual/user-research) — thực hành chọn method và participant theo câu hỏi nghiên cứu.

## Related

- [Requirement Elicitation](/posts/discovery-and-requirements/requirement-elicitation)
- [Stakeholder Interview](/posts/discovery-and-requirements/stakeholder-interview)
- [Requirements Workshop](/posts/discovery-and-requirements/requirements-workshop)
- [Stakeholder Analysis & Engagement](/posts/discovery-and-requirements/stakeholder-analysis-and-engagement)


