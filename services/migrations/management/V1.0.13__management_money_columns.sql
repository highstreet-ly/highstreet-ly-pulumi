alter TABLE "Management"."EventOrganiser"
ALTER COLUMN "PlatformFee"
TYPE NUMERIC(10,2);

alter TABLE "Management"."EventInstance"
ALTER COLUMN "NationalDeliveryFlatFee"
TYPE NUMERIC(10,2);

alter TABLE "Management"."EventInstance"
ALTER COLUMN "NationalDeliveryFlatFeeFreeAfter"
TYPE NUMERIC(10,2);

alter TABLE "Management"."Order"
ALTER COLUMN "TotalAmount"
TYPE NUMERIC(10,2);

alter TABLE "Management"."TicketTypeConfiguration"
ALTER COLUMN "Price"
TYPE NUMERIC(10,2);

alter TABLE "Management"."TicketType"
ALTER COLUMN "Price"
TYPE NUMERIC(10,2);

alter TABLE "Management"."TicketType"
ALTER COLUMN "Price"
TYPE NUMERIC(10,2);