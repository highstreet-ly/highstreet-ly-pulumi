ALTER TABLE "Management"."TicketType"
    ADD COLUMN "Period"  int4 NULL;

ALTER TABLE "Management"."TicketTypeConfiguration"
    ADD COLUMN "Period"  int4 NULL;

ALTER TABLE "Management"."ProductExtra"
    ADD COLUMN "Period"  int4 NULL;

ALTER TABLE "Management"."ProductExtraGroup"
    ADD COLUMN "Period"  int4 NULL;