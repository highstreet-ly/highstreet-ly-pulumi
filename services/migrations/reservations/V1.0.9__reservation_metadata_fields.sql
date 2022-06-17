alter TABLE "Reservation"."DraftOrder"
ADD COLUMN "Metadata" jsonb not null default '[{}]'::jsonb;

alter TABLE "Reservation"."MyOrders"
ADD COLUMN "Metadata" jsonb not null default '[{}]'::jsonb;

alter TABLE "Reservation"."PricedOrder"
ADD COLUMN "Metadata" jsonb not null default '[{}]'::jsonb;