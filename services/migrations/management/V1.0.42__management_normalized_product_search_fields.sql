alter TABLE "Management"."TicketType" ADD COLUMN "NormalizedName" text  NULL;
UPDATE "Management"."TicketType" SET "NormalizedName" = upper("Name");

alter TABLE "Management"."TicketTypeConfiguration" ADD COLUMN "NormalizedName" text  NULL;
UPDATE "Management"."TicketTypeConfiguration" SET "NormalizedName" = upper("Name");

alter TABLE "Management"."EventInstance" ADD COLUMN "NormalizedName" text  NULL;
UPDATE "Management"."EventInstance" SET "NormalizedName" = upper("Name");

alter TABLE "Management"."EventSeries" ADD COLUMN "NormalizedName" text  NULL;
UPDATE "Management"."EventSeries" SET "NormalizedName" = upper("Name");

alter TABLE "Management"."EventOrganiser" ADD COLUMN "NormalizedName" text  NULL;
UPDATE "Management"."EventOrganiser" SET "NormalizedName" = upper("Name");

alter TABLE "Management"."AddOn" ADD COLUMN "NormalizedName" text  NULL;
UPDATE "Management"."AddOn" SET "NormalizedName" = upper("Name");

alter TABLE "Management"."Feature" ADD COLUMN "NormalizedName" text  NULL;
UPDATE "Management"."Feature" SET "NormalizedName" = upper("Name");

alter TABLE "Management"."Plan" ADD COLUMN "NormalizedName" text  NULL;
UPDATE "Management"."Plan" SET "NormalizedName" = upper("Name");

alter TABLE "Management"."ProductCategory" ADD COLUMN "NormalizedName" text  NULL;
UPDATE "Management"."ProductCategory" SET "NormalizedName" = upper("Name");

alter TABLE "Management"."ProductExtra" ADD COLUMN "NormalizedName" text  NULL;
UPDATE "Management"."ProductExtra" SET "NormalizedName" = upper("Name");

alter TABLE "Management"."ProductExtraGroup" ADD COLUMN "NormalizedName" text  NULL;
UPDATE "Management"."ProductExtraGroup" SET "NormalizedName" = upper("Name");