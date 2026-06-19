# Glossary

> Từ điển thuật ngữ và viết tắt dùng trong BA handbook. Mục đích là chốt một nghĩa nhất quán cho mỗi thuật ngữ, để các note không định nghĩa lại mỗi nơi một kiểu. Khi một note dùng thuật ngữ lần đầu và nghĩa không hiển nhiên, link về đây thay vì giải thích lại.

## Cách dùng

- Giữ định nghĩa **ngắn, 1–2 câu**, đủ để nhận diện; phần sâu để ở note chuyên đề và link sang.
- Sắp xếp theo bảng chữ cái trong mỗi mục. Viết tắt để ở mục riêng cuối file.
- Khi thêm thuật ngữ mới: thêm đúng một dòng, kèm link tới note giải thích sâu nếu có.

---

## Thuật ngữ

| Thuật ngữ | Nghĩa ngắn | Note liên quan |
|---|---|---|
| Acceptance Criteria (AC) | Điều kiện cụ thể, kiểm chứng được, để xác nhận một user story đã hoàn thành đúng. | [[user-story-and-acceptance-criteria\|User Story & AC]] |
| Agile | Cách làm phát triển lặp & tăng dần: yêu cầu tiến hoá, giao giá trị theo từng vòng. | [[agile-vs-waterfall-for-ba\|Agile vs Waterfall]] |
| Assumption | Điều tạm được tin là đúng để tiếp tục phân tích nhưng chưa đủ evidence; cần owner và cách kiểm chứng. | [[scope-assumptions-constraints\|Scope, Assumptions & Constraints]] |
| Backlog | Danh sách work item đã sắp ưu tiên, chờ được làm. | [[agile-concepts-for-ba\|Agile cho BA]] |
| Backlog Refinement | Hoạt động làm rõ, chia nhỏ, ước lượng backlog item trước khi đưa vào sprint. | [[backlog-refinement\|Backlog Refinement]] |
| BRD (Business Requirements Document) | Tài liệu mô tả yêu cầu ở mức nghiệp vụ/mục tiêu, trước khi đi vào chi tiết hệ thống. | [[ba-documentation-types\|Hệ tài liệu BA]] |
| Business Analyst (BA) | Người cân đối yêu cầu giữa các stakeholder dưới ràng buộc kỹ thuật/nguồn lực/pháp lý, rồi chuyển thành tài liệu cho đội phát triển. | [[ba-role-and-sdlc\|Vai trò BA]] |
| Business Objective | Outcome nghiệp vụ mong muốn, có baseline/target, thời hạn và owner khi có thể. | [[problem-framing-and-business-objectives\|Problem Framing]] |
| Change Request (CR) | Đề nghị thay đổi requirement/scope sau khi đã chốt, cần phân tích impact. | [[change-request-and-impact-analysis\|Change Request & Impact]] |
| CRUD | Bốn thao tác dữ liệu nền: Create, Read, Update, Delete; dùng để soát đủ case khi bóc tính năng. | [[crud-operations\|CRUD cho BA]] |
| Constraint | Giới hạn có nguồn hoặc authority mà phân tích/solution phải tôn trọng. | [[scope-assumptions-constraints\|Scope, Assumptions & Constraints]] |
| Current State | Cách people, process, information, technology và rule đang vận hành, dựa trên evidence hiện có. | [[current-state-and-future-state-analysis\|Current & Future State]] |
| Definition of Done (DoD) | Tập điều kiện một item phải đạt để coi là "xong". | [[agile-concepts-for-ba\|Agile cho BA]] |
| Definition of Ready (DoR) | Tập điều kiện một item phải đạt để được đưa vào sprint. | [[backlog-refinement\|Backlog Refinement]] |
| Elicitation | Hoạt động khơi gợi và thu thập requirement từ stakeholder, tài liệu, quan sát. | [[requirement-elicitation\|Requirement Elicitation]] |
| Evidence | Dữ liệu, observation, artifact hoặc phát biểu có provenance dùng để hỗ trợ hay phản bác một claim. | [[requirement-elicitation\|Requirement Elicitation]] |
| Epic | Khối công việc lớn, gom nhiều story liên quan; chưa đủ nhỏ để làm trong một sprint. | [[agile-concepts-for-ba\|Agile cho BA]] |
| FDD (Functional Decomposition Diagram) | Cây phân rã hệ thống thành các nhóm chức năng và tính năng con. | [[functional-decomposition-diagram\|FDD]] |
| Future State | Capability và outcome mong muốn sau thay đổi, chưa đồng nghĩa một solution cụ thể. | [[current-state-and-future-state-analysis\|Current & Future State]] |
| Impact Analysis | Phân tích ảnh hưởng của một thay đổi tới scope, thời gian, hệ thống, tài liệu. | [[change-request-and-impact-analysis\|Change Request & Impact]] |
| MoSCoW | Khung ưu tiên: Must / Should / Could / Won't have. | [[moscow-prioritization\|MoSCoW cho BA]] |
| NFR (Non-functional Requirement) | Yêu cầu về quality attribute hoặc ràng buộc vận hành trong context đo được, không mô tả chức năng chính. | [[non-functional-requirements-for-ba\|NFR cho BA]] |
| Open Question | Điều chưa rõ cần được xác nhận, có owner và thời hạn thay vì để BA tự suy đoán. | [[requirement-elicitation\|Requirement Elicitation]] |
| RTM (Requirements Traceability Matrix) | Bảng truy vết requirement ↔ use case ↔ test case, để không sót và biết cái gì ảnh hưởng cái gì. | — (Planned) |
| Requirement | Biểu đạt một nhu cầu, capability, quality hoặc constraint cần đáp ứng; phải tách khỏi solution idea cụ thể. | [[requirement-elicitation\|Requirement Elicitation]] |
| SDLC | Vòng đời phát triển phần mềm: chuỗi pha từ khởi tạo → phân tích → thiết kế → build → test → vận hành. | [[ba-role-and-sdlc\|Vai trò BA & SDLC]] |
| Solution Requirement | Yêu cầu mô tả hệ thống phải làm gì (chức năng + NFR) để đáp ứng nhu cầu; nhóm tài liệu BA làm chủ. | [[ba-documentation-types\|Hệ tài liệu BA]] |
| SRS (Software Requirements Specification) | Tài liệu đặc tả yêu cầu phần mềm ở mức chi tiết. | [[ba-artifact-templates\|BA Artifact Templates]] |
| Stakeholder | Bất kỳ ai có lợi ích hoặc ảnh hưởng tới dự án/sản phẩm. | [[requirement-elicitation\|Requirement Elicitation]] |
| Validation | Kiểm tra requirement/solution direction có đáp ứng đúng need và outcome trong context hay không. | [[requirement-quality-and-validation\|Requirement Quality & Validation]] |
| Verification | Kiểm tra requirement được mô tả đủ rõ, nhất quán, khả thi và testable hay chưa. | [[requirement-quality-and-validation\|Requirement Quality & Validation]] |
| Story Point | Đơn vị ước lượng tương đối độ lớn/độ khó của một item. | [[agile-concepts-for-ba\|Agile cho BA]] |
| Use Case | Mô tả kịch bản tương tác giữa actor và hệ thống để đạt một mục tiêu. | [[use-case-diagram\|Use Case cho BA]] |
| User Story | Mô tả ngắn một nhu cầu từ góc nhìn người dùng, dạng "Là… tôi muốn… để…". | [[user-story-and-acceptance-criteria\|User Story & AC]] |
| Waterfall | Mô hình phát triển tuyến tính: chốt yêu cầu đầy đủ trước, rồi mới thiết kế/build/test theo cột mốc. | [[agile-vs-waterfall-for-ba\|Agile vs Waterfall]] |

## Viết tắt

| Viết tắt | Đầy đủ |
|---|---|
| AC | Acceptance Criteria |
| BA | Business Analyst |
| BABOK | Business Analysis Body of Knowledge (IIBA) |
| BRD | Business Requirements Document |
| CR | Change Request |
| DoD | Definition of Done |
| DoR | Definition of Ready |
| FDD | Functional Decomposition Diagram |
| FRD | Functional Requirements Document |
| FRS | Functional Requirements Specification |
| ITBA | IT Business Analyst |
| MRD | Market Research Document |
| NFR | Non-functional Requirement |
| NFRS | Non-functional Requirements Specification |
| PRD | Product Requirements Document |
| RTM | Requirements Traceability Matrix |
| SDLC | Software Development Life Cycle |
| SRS | Software Requirements Specification |
| UAT | User Acceptance Testing |
| UML | Unified Modeling Language |
| URD | User Requirements Document |

## Related

- [[README|BA Handbook]]
- [[notes/README|BA Handbook Notes]]
- [[notes/note-guidelines|Note guidelines]]
