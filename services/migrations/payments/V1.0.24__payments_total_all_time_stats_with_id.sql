DROP VIEW if exists amount_captured__all_time_by_event_instance;


CREATE VIEW amount_captured__all_time_by_event_instance AS
select 
uuid_generate_v4() as "Id",
p."EventInstanceId",
sum (c."AmountCaptured") as "AmountCaptured",
sum (r."Amount") as "AmountRefunded"
from "TicketedEventPayments"."Payments" p 
    join "TicketedEventPayments"."Charges" c on p."Id" = c."PaymentId"
    left outer join "TicketedEventPayments"."Refunds" r ON r."ChargeId" = c."Id"
    where c."Refunded" = 'f'
    group by p."EventInstanceId"