UPDATE "Management"."Order" SET "PaymentPlatformFees" = 0;
ALTER TABLE "Management"."Order" ALTER COLUMN "PaymentPlatformFees" SET DEFAULT 0;

UPDATE "Management"."Order" SET "PlatformFees" = 0;
ALTER TABLE "Management"."Order" ALTER COLUMN "PlatformFees" SET DEFAULT 0;