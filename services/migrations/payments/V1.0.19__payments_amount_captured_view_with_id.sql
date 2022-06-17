DROP VIEW if exists amount_captured_by_day_event_instance;


CREATE VIEW amount_captured_by_day_event_instance AS
SELECT 
    uuid_generate_v4() as "Id",
    p."EventInstanceId",
    sum(c."AmountCaptured") AS "AmountCaptured",
    d.day AS "DateCaptured"
FROM (
        SELECT generate_series(
                date_trunc('day', NOW() - interval '1 year'),
                CURRENT_DATE + INTERVAL '1 day',
                interval '1 day'
            )::TIMESTAMP
    ) d(day)
    LEFT JOIN "TicketedEventPayments"."Charges" c ON EXTRACT(
        DAY
        from c."DateCreated"
    ) = EXTRACT(
        DAY
        from d.day
    )
    and EXTRACT(
        MONTH
        from c."DateCreated"
    ) = EXTRACT(
        MONTH
        from d.day
    )
    left join "TicketedEventPayments"."Payments" p on p."Id" = c."PaymentId"
GROUP BY p."EventInstanceId",
    d.day
ORDER BY d.day;