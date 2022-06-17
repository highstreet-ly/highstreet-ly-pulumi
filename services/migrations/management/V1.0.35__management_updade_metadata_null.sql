ALTER TABLE "Management"."EventInstance" ALTER COLUMN "Metadata" DROP NOT NULL;
ALTER TABLE "Management"."EventOrganiser" ALTER COLUMN "Metadata" DROP NOT NULL;
ALTER TABLE "Management"."EventSeries" ALTER COLUMN "Metadata" DROP NOT NULL;
ALTER TABLE "Management"."Order" ALTER COLUMN "Metadata" DROP NOT NULL;
ALTER TABLE "Management"."Plan" ALTER COLUMN "Metadata" DROP NOT NULL;
ALTER TABLE "Management"."TicketType" ALTER COLUMN "Metadata" DROP NOT NULL;
ALTER TABLE "Management"."TicketTypeConfiguration" ALTER COLUMN "Metadata" DROP NOT NULL;