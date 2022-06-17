ALTER TABLE "Reservation"."DraftOrder" ALTER COLUMN "Metadata" DROP NOT NULL;
ALTER TABLE "Reservation"."MyOrders" ALTER COLUMN "Metadata" DROP NOT NULL;
ALTER TABLE "Reservation"."PricedOrder" ALTER COLUMN "Metadata" DROP NOT NULL;