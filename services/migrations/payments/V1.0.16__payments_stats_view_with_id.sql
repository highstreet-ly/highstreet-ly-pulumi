DROP VIEW if exists stats_by_event_instance;

CREATE VIEW stats_by_event_instance AS
select uuid_generate_v4() as Id,
	p."EventInstanceId",
	SUM(c."AmountCaptured") as Charged,
	SUM(r."Amount") as Refunded
from "TicketedEventPayments"."Payments" p
	join "TicketedEventPayments"."Charges" c ON c."PaymentId" = p."Id"
	left outer join "TicketedEventPayments"."Refunds" r ON r."ChargeId" = c."Id"
GROUP BY p."EventInstanceId";