alter TABLE "Management"."Image"
ADD COLUMN "ProductCategoryId" uuid  NULL;

alter TABLE "Management"."Image"
ADD CONSTRAINT "FK_Image_ProductCategory_ProductCategoryId" FOREIGN KEY ("ProductCategoryId") REFERENCES "Management"."ProductCategory" ("Id") ON DELETE CASCADE;