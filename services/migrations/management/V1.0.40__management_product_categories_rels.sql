alter TABLE "Management"."TicketType"
    ADD COLUMN "ProductCategoryId" uuid  NULL;

alter TABLE "Management"."TicketType"
    ADD CONSTRAINT "FK_TicketType_ProductCategory_ProductCategoryId" 
        FOREIGN KEY ("ProductCategoryId")   
        REFERENCES "Management"."ProductCategory" ("Id") ON DELETE CASCADE;


alter TABLE "Management"."TicketTypeConfiguration"
    ADD COLUMN "ProductCategoryId" uuid  NULL;

alter TABLE "Management"."TicketTypeConfiguration"
    ADD CONSTRAINT "FK_TicketTypeConfiguration_ProductCategory_ProductCategoryId" 
        FOREIGN KEY ("ProductCategoryId")   
        REFERENCES "Management"."ProductCategory" ("Id") ON DELETE CASCADE;