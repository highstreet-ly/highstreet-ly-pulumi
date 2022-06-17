CREATE VIEW stats_by_event_instance AS
select p."EventInstanceId",
	SUM(c."AmountCaptured") as charged,
	SUM(r."Amount") as refunded
from "TicketedEventPayments"."Payments" p
	join "TicketedEventPayments"."Charges" c ON c."PaymentId" = p."Id"
	left outer join "TicketedEventPayments"."Refunds" r ON r."ChargeId" = c."Id"
GROUP BY p."EventInstanceId";