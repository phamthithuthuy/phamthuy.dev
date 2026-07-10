---
title: "Prototype cho Elicitation"
pubDatetime: 2026-07-09T22:37:09.080Z
description: "Note này giúp BA dùng prototype để khai thác feedback về flow và interaction trước khi dev build. Prototype là công cụ elicitation, không phải UI design — mục…"
tags: ["ba", "discovery-and-requirements"]
draft: false
---
> Note này giúp BA dùng prototype để khai thác feedback về flow và interaction
> trước khi dev build. Prototype là công cụ elicitation, không phải UI design —
> mục tiêu không phải đẹp, mà là phát hiện gap sớm.

## Note này dùng để làm gì

Mở note khi bạn có requirement nhưng chưa chắc flow sẽ hoạt động trong thực tế,
hoặc khi stakeholder khó hình dung interaction nếu không có gì để "sờ". Đọc
sau [Elicitation Technique Selection](/posts/discovery-and-requirements/elicitation-technique-selection).

Quan trọng: note này nói về prototype **cho elicitation** (khám phá nhu cầu).
Wireframe cho specification thuộc nhóm 02. Không trộn hai mục đích.

## 1. Khi nào dùng và không dùng

| Dùng khi | Không dùng khi |
|---|---|
| cần feedback sớm về flow/interaction trước khi code | problem chưa rõ (dùng interview/observation trước) |
| stakeholder khó diễn đạt nhu cầu bằng lời | đã có wireframe/spec đầy đủ từ designer (lúc đó không cần prototype thô nữa) |
| cần kiểm tra hypothesis "liệu user có hiểu flow này không?" | cần chốt UI aesthetic (màu sắc, font) — đó là mockup, không phải prototype |
| muốn phát hiện missing step, confusion sớm | cần đo performance với real data (dùng pilot/MVP) |

**Weakness chính:** anchoring bias (stakeholder tưởng prototype = sản phẩm cuối,
chỉ góp ý về màu sắc thay vì flow), và premature solution lock (BA/team yêu
prototype quá, bỏ qua option khác). Bù bằng: ghi rõ fidelity/hypothesis, dùng
paper prototype cho flow, để UI cho giai đoạn sau.

## 2. Fidelity levels

| Mức | Làm bằng gì | Dùng khi | Không dùng khi |
|---|---|---|---|
| **Paper / Whiteboard** | giấy, bút, sticky note | khám phá flow tổng quan, chưa biết màn hình nào cần | cần test mobile interaction thực tế |
| **Low-fi wireframe** | Balsamiq, PlantUML Salt, vẽ tay scan | cần feedback về bố cục và luồng, chưa quan tâm UI | stakeholder chỉ quan tâm "nó phải đẹp" |
| **Clickable prototype** | Figma, Penpot (chỉ link màn hình) | cần test interaction "bấm vào đây → ra gì" | chưa có flow rõ (lãng phí thời gian dựng) |
| **Hi-fi mockup** | Figma với real UI | cần test phản ứng với giao diện thật | đây là UI design, không còn là elicitation nữa |

Quy tắc: **thấp nhất có thể để trả lời câu hỏi.** Giấy → wireframe → clickable.
Đừng nhảy lên Figma hi-fi nếu câu hỏi chỉ là "có cần màn hình X không?"

## 3. Prototype plan

| Thành phần | Câu hỏi cần trả lời |
|---|---|
| **Hypothesis** | "Tôi tin rằng nếu có màn hình X với flow Y, user sẽ làm được Z" |
| **Fidelity** | paper, wireframe, hay clickable? Vì sao chọn mức này? |
| **Scenario** | user sẽ làm gì với prototype? (task cụ thể, không phải "nhìn đi") |
| **Feedback cần thu** | flow nào gây confused? step nào thiếu? user mong đợi gì mà không thấy? |
| **Không feedback về** | màu sắc, font, animation (trừ khi đang test hi-fi mockup) |

## 4. Dẫn prototype session

1. **Nói rõ đây là prototype:** "Đây là bản phác, chưa có code, chưa có màu thật."
2. **Đưa task, không đưa tour:** "Bạn hãy thử đặt một món hàng" — đừng "Bạn bấm vào đây, rồi bấm vào đây..."
3. **Quan sát, không giải thích:** nếu user bối rối, hỏi "Bạn đang tìm gì?" — đừng "À, nút đó ở đây nè."
4. **Ghi nhận:** chỗ nào user dừng, chỗ nào user hỏi, chỗ nào user làm khác dự đoán.
5. **Kết thúc bằng câu hỏi mở:** "Còn thiếu gì? Bạn mong thấy gì mà không có?"

### Running case: ShopFlow

BA dùng low-fi wireframe để khai thác feedback cho `SF-3` Create Order trước
khi dev bắt đầu Sprint 1.

**Prototype plan:**

| Thành phần | Nội dung |
|---|---|
| Hypothesis | "Nếu khách hàng thấy catalog → bấm Đặt hàng → thấy form xác nhận → bấm OK, họ sẽ không cần gọi điện nữa" |
| Fidelity | Low-fi wireframe (`SF-38` Sketch trên giấy, scan) |
| Scenario | "Bạn là khách hàng, hãy thử đặt 2 món hàng từ catalog" |
| Participant | 3 khách quen (đã interview trước đó) |

**Kết quả session (Khách A, nữ, 28t, hay mua hàng qua Zalo):**

| Quan sát | Interpretation | Impact |
|---|---|---|
| Khách A bấm vào ảnh sản phẩm (không thấy nút "Đặt hàng") | Mong đợi bấm vào ảnh = xem chi tiết → thêm vào giỏ. Wireframe hiện tại chỉ có nút nhỏ dưới ảnh | `SF-2` Browse Catalog: thêm "bấm vào ảnh → trang chi tiết sản phẩm" |
| Tới form xác nhận, khách A hỏi "tiền ship đâu?" | Wireframe không có field phí ship | Open question: "Có cần hiển thị phí ship không? Ai tính? Mock hay thật?" → ghi cho Sprint 2 |
| Khách A bấm "Đặt hàng" xong, hỏi "vậy giờ sao?" | Thiếu feedback sau khi đặt — không có màn hình "Đặt hàng thành công, mã đơn XYZ" | `SF-3` AC bổ sung: "Sau khi order tạo thành công, hiển thị order ID và trạng thái Pending Payment" |

**Sửa prototype sau session 1:** thêm màn hình "Order Confirmation" với order ID
+ trạng thái → test với Khách B và C → confirmed.

**Bài học:** Prototype phát hiện 2 gap không có trong AC ban đầu (thiếu trang
chi tiết sản phẩm, thiếu feedback sau order) và 1 unexpected need (phí ship).
Cả 3 đều không lộ ra trong interview vì khách không biết "cái gì có thể có" cho
tới khi thấy prototype. Đây chính là sức mạnh của prototype: **làm cho cái
thiếu trở nên nhìn thấy được.**

## Anti-patterns

| Anti-pattern | Vì sao nguy hiểm | Cách sửa |
|---|---|---|
| Prototype quá đẹp quá sớm | stakeholder chỉ góp ý màu sắc, không góp ý flow | giữ low-fi tới khi flow confirmed |
| Coi prototype = commitment | stakeholder nói "tôi tưởng đây là app thật" | mở đầu session: "Đây là bản phác, chưa có code" |
| Không có hypothesis rõ ràng | session không có focus, feedback lan man | ghi hypothesis trước: "Tôi tin X, tôi cần kiểm tra Y" |
| BA tự làm prototype, không cho team xem | prototype không reflect feasibility | dev xem prototype trước khi test với user |
| Test với sai người | feedback từ người không phải user thật | test với actual user hoặc ít nhất SME |
| Prototype không để lại artifact | mất evidence, không trace được requirement | lưu ảnh/scan prototype + ghi observation |

## Checklist nhanh

- Hypothesis cần kiểm tra là gì? Tôi tin điều gì, tôi cần biết điều gì?
- Fidelity đã đủ thấp để trả lời câu hỏi chưa? (paper trước wireframe trước clickable)
- Participant là actual user hay proxy?
- Đã nói rõ "đây là prototype" trước khi bắt đầu chưa?
- Đã đưa task cụ thể (không phải tour) chưa?
- Observation đã được ghi (chỗ dừng, chỗ hỏi, chỗ làm khác dự đoán)?
- Requirement mới / AC thay đổi đã được cập nhật từ prototype feedback chưa?

## References

- [Nielsen Norman Group — Paper Prototyping](https://www.nngroup.com/articles/paper-prototyping/) — hướng dẫn dùng paper prototype để test interaction sớm.
- [UK Government Service Manual — Using prototypes](https://www.gov.uk/service-manual/design/using-prototypes) — cách dùng prototype để khám phá nhu cầu trong discovery.

## Related

- [Elicitation Technique Selection](/posts/discovery-and-requirements/elicitation-technique-selection)
- [Stakeholder Interview](/posts/discovery-and-requirements/stakeholder-interview)
- [Requirement Elicitation](/posts/discovery-and-requirements/requirement-elicitation)

