BEGIN;

-- Add New Tables


-- Add ApiResourceScopes

CREATE TABLE "ApiResourceScopes" (
    "Id" integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "Scope" character varying(200) NOT NULL,
    "ApiResourceId" integer NOT NULL,
    CONSTRAINT "PK_ApiResourceScopes" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_ApiResourceScopes_ApiResources_ApiResourceId" FOREIGN KEY ("ApiResourceId") REFERENCES "ApiResources" ("Id") ON DELETE CASCADE
);

CREATE INDEX "IX_ApiResourceScopes_ApiResourceId" ON "ApiResourceScopes" ("ApiResourceId");



-- Add ApiScopeProperties

CREATE TABLE "ApiScopeProperties" (
    "Id" integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "Key" character varying(250) NOT NULL,
    "Value" character varying(2000) NOT NULL,
    "ScopeId" integer NOT NULL,
    CONSTRAINT "PK_ApiScopeProperties" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_ApiScopeProperties_ApiScopes_ScopeId" FOREIGN KEY ("ScopeId") REFERENCES "ApiScopes" ("Id") ON DELETE CASCADE
);

CREATE INDEX "IX_ApiScopeProperties_ScopeId" ON "ApiScopeProperties" ("ScopeId");



-- Add Renamed Tables

-- ApiResourceClaims

CREATE TABLE "ApiResourceClaims" (
    "Id" integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "Type" character varying(200) NOT NULL,
    "ApiResourceId" integer NOT NULL,
    CONSTRAINT "PK_ApiResourceClaims" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_ApiResourceClaims_ApiResources_ApiResourceId" FOREIGN KEY ("ApiResourceId") REFERENCES "ApiResources" ("Id") ON DELETE CASCADE
);

CREATE INDEX "IX_ApiResourceClaims_ApiResourceId" ON "ApiResourceClaims" ("ApiResourceId");



-- ApiResourceProperties

CREATE TABLE "ApiResourceProperties" (
    "Id" integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "Key" character varying(250) NOT NULL,
    "Value" character varying(2000) NOT NULL,
    "ApiResourceId" integer NOT NULL,
    CONSTRAINT "PK_ApiResourceProperties" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_ApiResourceProperties_ApiResources_ApiResourceId" FOREIGN KEY ("ApiResourceId") REFERENCES "ApiResources" ("Id") ON DELETE CASCADE
);

CREATE INDEX "IX_ApiResourceProperties_ApiResourceId" ON "ApiResourceProperties" ("ApiResourceId");



-- Add ApiResourceSecrets

CREATE TABLE "ApiResourceSecrets" (
    "Id" integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "Description" character varying(1000) NULL,
    "Value" character varying(4000) NOT NULL,
    "Expiration" timestamp without time zone NULL,
    "Type" character varying(250) NOT NULL,
    "Created" timestamp without time zone NOT NULL,
    "ApiResourceId" integer NOT NULL,
    CONSTRAINT "PK_ApiResourceSecrets" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_ApiResourceSecrets_ApiResources_ApiResourceId" FOREIGN KEY ("ApiResourceId") REFERENCES "ApiResources" ("Id") ON DELETE CASCADE
);

CREATE INDEX "IX_ApiResourceSecrets_ApiResourceId" ON "ApiResourceSecrets" ("ApiResourceId");



-- IdentityResourceClaims

CREATE TABLE "IdentityResourceClaims" (
    "Id" integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "Type" character varying(200) NOT NULL,
    "IdentityResourceId" integer NOT NULL,
    CONSTRAINT "PK_IdentityResourceClaims" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_IdentityResourceClaims_IdentityResources_IdentityResourceId" FOREIGN KEY ("IdentityResourceId") REFERENCES "IdentityResources" ("Id") ON DELETE CASCADE
);

CREATE INDEX "IX_IdentityResourceClaims_IdentityResourceId" ON "IdentityResourceClaims" ("IdentityResourceId");



-- IdentityResourceProperties

CREATE TABLE "IdentityResourceProperties" (
    "Id" integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "Key" character varying(250) NOT NULL,
    "Value" character varying(2000) NOT NULL,
    "IdentityResourceId" integer NOT NULL,
    CONSTRAINT "PK_IdentityResourceProperties" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_IdentityResourceProperties_IdentityResources_IdentityResour~" FOREIGN KEY ("IdentityResourceId") REFERENCES "IdentityResources" ("Id") ON DELETE CASCADE
);

CREATE INDEX "IX_IdentityResourceProperties_IdentityResourceId" ON "IdentityResourceProperties" ("IdentityResourceId");



-- Migrate Existing Data

--ApiClaims -> ApiResourceClaims

INSERT INTO "ApiResourceClaims"
 ("Id", "Type", "ApiResourceId")
SELECT 
 "Id", "Type", "ApiResourceId"
FROM "ApiClaims";



--ApiProperties -> ApiResourceProperties

INSERT INTO "ApiResourceProperties"
 ("Id", "Key", "Value", "ApiResourceId")
SELECT 
 "Id", "Key", "Value", "ApiResourceId"
FROM "ApiProperties";



--ApiSecrets -> ApiResourceSecrets

INSERT INTO "ApiResourceSecrets"
 ("Id", "Description", "Value", "Expiration", "Type", "Created", "ApiResourceId")
SELECT 
 "Id", "Description", "Value", "Expiration", "Type", "Created", "ApiResourceId"
FROM "ApiSecrets";



--IdentityClaims -> IdentityResourceClaims

INSERT INTO "IdentityResourceClaims"
 ("Id", "Type", "IdentityResourceId")
SELECT 
 "Id", "Type", "IdentityResourceId"
FROM "IdentityClaims";



--IdentityProperties -> IdentityResourceProperties

INSERT INTO "IdentityResourceProperties"
 ("Id", "Key", "Value", "IdentityResourceId")
SELECT 
 "Id", "Key", "Value", "IdentityResourceId"
FROM "IdentityProperties";



-- ApiScopes -> ApiResourceScopes
INSERT INTO "ApiResourceScopes"
 ("Scope", "ApiResourceId")
SELECT 
 "Name", "ApiResourceId"
FROM "ApiScopes";

-- Alter Existing Tables

-- ApiResources

ALTER TABLE "ApiResources"
	ADD "AllowedAccessTokenSigningAlgorithms" character varying (100)
	NULL;
	
ALTER TABLE "ApiResources"
	ADD "ShowInDiscoveryDocument" BOOLEAN
	NULL;
	
UPDATE "ApiResources" SET "ShowInDiscoveryDocument" = FALSE;

ALTER TABLE "ApiResources"
	ALTER COLUMN "ShowInDiscoveryDocument" SET NOT NULL;
	
	

-- ApiScopeClaims

ALTER TABLE "ApiScopeClaims"
	DROP CONSTRAINT "FK_ApiScopeClaims_ApiScopes_ApiScopeId";
	
DROP INDEX "IX_ApiScopeClaims_ApiScopeId";
		
ALTER TABLE "ApiScopeClaims" RENAME "ApiScopeId" TO "ScopeId";

CREATE INDEX "IX_ApiScopeClaims_ScopeId" ON "ApiScopeClaims" ("ScopeId");

ALTER TABLE "ApiScopeClaims"
	ADD CONSTRAINT "FK_ApiScopeClaims_ApiScopes_ScopeId" 
	FOREIGN KEY ("ScopeId") REFERENCES "ApiScopes" ("Id") ON DELETE CASCADE;
	

	
-- ApiScopes

ALTER TABLE "ApiScopes"
	DROP CONSTRAINT "FK_ApiScopes_ApiResources_ApiResourceId";
	
DROP INDEX "IX_ApiScopes_ApiResourceId";

ALTER TABLE "ApiScopes"
	ADD "Enabled" BOOLEAN NULL;

UPDATE "ApiScopes" SET "Enabled" = TRUE;

ALTER TABLE "ApiScopes"
	ALTER COLUMN "Enabled" SET NOT NULL;
	
ALTER TABLE "ApiScopes"
	DROP COLUMN "ApiResourceId";
	
-- Clients

ALTER TABLE "Clients"
	ADD "AllowedIdentityTokenSigningAlgorithms" character varying(100) NULL;
	
ALTER TABLE "Clients"
	ADD "RequireRequestObject" BOOLEAN NULL;
	
UPDATE "Clients" SET "RequireRequestObject" = FALSE;
	
ALTER TABLE "Clients"
	ALTER COLUMN "RequireRequestObject" SET NOT NULL;



-- Delete Old Tables

-- DROP TABLE "ApiClaims";
-- DROP TABLE "ApiProperties";
-- DROP TABLE "ApiSecrets";
-- DROP TABLE "IdentityClaims";
-- DROP TABLE "IdentityProperties";

COMMIT;