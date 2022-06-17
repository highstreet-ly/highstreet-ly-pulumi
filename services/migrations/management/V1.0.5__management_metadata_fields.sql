alter TABLE "Management"."TicketType"
ADD COLUMN "Metadata" jsonb not null default '[{}]'::jsonb;

alter TABLE "Management"."EventOrganiser"
ADD COLUMN "Metadata" jsonb not null default '[{}]'::jsonb;

alter TABLE "Management"."EventSeries"
ADD COLUMN "Metadata" jsonb not null default '[{}]'::jsonb;

alter TABLE "Management"."EventInstance"
ADD COLUMN "Metadata" jsonb not null default '[{}]'::jsonb;

alter TABLE "Management"."Order"
ADD COLUMN "Metadata" jsonb not null default '[{}]'::jsonb;

alter TABLE "Management"."TicketTypeConfiguration"
ADD COLUMN "Metadata" jsonb not null default '[{}]'::jsonb;
