
ALTER TABLE "Management"."EventInstance"
ADD COLUMN "PaymentPlatformFeePaidBy" int4  NULL;

ALTER TABLE "Management"."EventInstance"
ADD COLUMN "PlatformFeePaidBy" int4  NULL;