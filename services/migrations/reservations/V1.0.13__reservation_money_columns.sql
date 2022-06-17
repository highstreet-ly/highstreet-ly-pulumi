alter TABLE "Reservation"."PricedOrder"
ALTER COLUMN "Total"
TYPE NUMERIC(10,2);

alter TABLE "Reservation"."PricedOrder"
ALTER COLUMN "PaymentPlatformFees"
TYPE NUMERIC(10,2);

alter TABLE "Reservation"."PricedOrder"
ALTER COLUMN "PlatformFees"
TYPE NUMERIC(10,2);

alter TABLE "Reservation"."PricedOrder"
ALTER COLUMN "DeliveryFee"
TYPE NUMERIC(10,2);

alter TABLE "Reservation"."PricedOrderLine"
ALTER COLUMN "LineTotal"
TYPE NUMERIC(10,2);

alter TABLE "Reservation"."PricedOrderLine"
ALTER COLUMN "UnitPrice"
TYPE NUMERIC(10,2);