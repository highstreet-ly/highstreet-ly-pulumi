CREATE TABLE "public"."AspNetRoles" (
    "Id" uuid NOT NULL,
    "ConcurrencyStamp" text NULL,
    "Name" varchar(256) NULL,
    "NormalizedName" varchar(256) NULL,
    "Privileged" bool NULL,
    CONSTRAINT "PK_AspNetRoles" PRIMARY KEY ("Id")
);

CREATE TABLE "public"."AspNetUsers" (
    "Id" uuid NOT NULL,
    "AccessFailedCount" int4 NOT NULL,
    "ConcurrencyStamp" text NULL,
    "FirstName" varchar(256) NULL,
    "LastName" varchar(256) NULL,
    "Email" varchar(256) NULL,
    "EmailConfirmed" bool NOT NULL,
    "LockoutEnabled" bool NOT NULL,
    "LockoutEnd" timestamptz NULL,
    "NormalizedEmail" varchar(256) NULL,
    "NormalizedUserName" varchar(256) NULL,
    "PasswordHash" text NULL,
    "PhoneNumber" text NULL,
    "PhoneNumberConfirmed" bool NOT NULL,
    "SecurityStamp" text NULL,
    "TwoFactorEnabled" bool NOT NULL,
    "UserName" varchar(256) NULL,
    CONSTRAINT "PK_AspNetUsers" PRIMARY KEY ("Id")
);

CREATE TABLE "public"."Permissions" (
    "Id" uuid NOT NULL,
    "Description" text NULL,
    CONSTRAINT "PK_Permissions" PRIMARY KEY ("Id")
);

CREATE TABLE "public"."AspNetRoleClaims" (
    "Id" uuid NOT NULL,
    "ClaimType" text NULL,
    "ClaimValue" text NULL,
    "RoleId" uuid NOT NULL,
    CONSTRAINT "PK_AspNetRoleClaims" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_AspNetRoleClaims_AspNetRoles_RoleId" FOREIGN KEY ("RoleId") REFERENCES "AspNetRoles" ("Id") ON DELETE CASCADE
);

CREATE TABLE "public"."AspNetUserClaims" (
    "Id" serial NOT NULL,
    "ClaimType" text NULL,
    "ClaimValue" text NULL,
    "UserId" uuid NOT NULL,
    CONSTRAINT "PK_AspNetUserClaims" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_AspNetUserClaims_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE
);

CREATE TABLE "public"."AspNetUserLogins" (
    "LoginProvider" text NOT NULL,
    "ProviderKey" text NOT NULL,
    "ProviderDisplayName" text NULL,
    "UserId" uuid NOT NULL,
    CONSTRAINT "PK_AspNetUserLogins" PRIMARY KEY ("LoginProvider", "ProviderKey"),
    CONSTRAINT "FK_AspNetUserLogins_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE
);

CREATE TABLE "public"."AspNetUserRoles" (
    "UserId" uuid NOT NULL,
    "RoleId" uuid NOT NULL,
    CONSTRAINT "PK_AspNetUserRoles" PRIMARY KEY ("UserId", "RoleId"),
    CONSTRAINT "FK_AspNetUserRoles_AspNetRoles_RoleId" FOREIGN KEY ("RoleId") REFERENCES "AspNetRoles" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_AspNetUserRoles_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE
);

CREATE TABLE "public"."AspNetUserTokens" (
    "UserId" uuid NOT NULL,
    "LoginProvider" text NOT NULL,
    "Name" text NOT NULL,
    "Value" text NULL,
    CONSTRAINT "PK_AspNetUserTokens" PRIMARY KEY ("UserId", "LoginProvider", "Name"),
    CONSTRAINT "FK_AspNetUserTokens_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE
);

CREATE TABLE "public"."ApplicationRolePermission" (
    "ApplicationRoleId" uuid NOT NULL,
    "PermissionId" uuid NOT NULL,
    "Id" uuid NOT NULL,
    CONSTRAINT "PK_ApplicationRolePermission" PRIMARY KEY ("ApplicationRoleId", "PermissionId"),
    CONSTRAINT "AK_ApplicationRolePermission_Id" UNIQUE ("Id"),
    CONSTRAINT "FK_ApplicationRolePermission_AspNetRoles_ApplicationRoleId" FOREIGN KEY ("ApplicationRoleId") REFERENCES "AspNetRoles" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_ApplicationRolePermission_Permissions_PermissionId" FOREIGN KEY ("PermissionId") REFERENCES "Permissions" ("Id") ON DELETE CASCADE
);

CREATE INDEX "IX_ApplicationRolePermission_PermissionId" ON "public"."ApplicationRolePermission" ("PermissionId");

CREATE INDEX "IX_AspNetRoleClaims_RoleId" ON "public"."AspNetRoleClaims" ("RoleId");

CREATE UNIQUE INDEX "RoleNameIndex" ON "public"."AspNetRoles" ("NormalizedName");

CREATE INDEX "IX_AspNetUserClaims_UserId" ON "public"."AspNetUserClaims" ("UserId");

CREATE INDEX "IX_AspNetUserLogins_UserId" ON "public"."AspNetUserLogins" ("UserId");

CREATE INDEX "IX_AspNetUserRoles_RoleId" ON "public"."AspNetUserRoles" ("RoleId");

CREATE INDEX "EmailIndex" ON "public"."AspNetUsers" ("NormalizedEmail");

CREATE UNIQUE INDEX "UserNameIndex" ON "public"."AspNetUsers" ("NormalizedUserName");



CREATE TABLE "public"."ApiResources" (
    "Id" SERIAL,
    "Enabled" boolean NOT NULL,
    "Name" varchar(200) NOT NULL,
    "DisplayName" varchar(200) NULL,
    "Description" varchar(1000) NULL,
    "Created" timestamp without time zone NOT NULL,
    "Updated" timestamp without time zone NULL,
    "LastAccessed" timestamp without time zone NULL,
    "NonEditable" boolean NOT NULL,
    CONSTRAINT "PK_ApiResources" PRIMARY KEY ("Id")
);

CREATE TABLE "public"."Clients" (
    "Id" SERIAL,
    "Enabled" boolean NOT NULL,
    "ClientId" varchar(200) NOT NULL,
    "ProtocolType" varchar(200) NOT NULL,
    "RequireClientSecret" boolean NOT NULL,
    "ClientName" varchar(200) NULL,
    "Description" varchar(1000) NULL,
    "ClientUri" varchar(2000) NULL,
    "LogoUri" varchar(2000) NULL,
    "RequireConsent" boolean NOT NULL,
    "AllowRememberConsent" boolean NOT NULL,
    "AlwaysIncludeUserClaimsInIdToken" boolean NOT NULL,
    "RequirePkce" boolean NOT NULL,
    "AllowPlainTextPkce" boolean NOT NULL,
    "AllowAccessTokensViaBrowser" boolean NOT NULL,
    "FrontChannelLogoutUri" varchar(2000) NULL,
    "FrontChannelLogoutSessionRequired" boolean NOT NULL,
    "BackChannelLogoutUri" varchar(2000) NULL,
    "BackChannelLogoutSessionRequired" boolean NOT NULL,
    "AllowOfflineAccess" boolean NOT NULL,
    "IdentityTokenLifetime" integer NOT NULL,
    "AccessTokenLifetime" integer NOT NULL,
    "AuthorizationCodeLifetime" integer NOT NULL,
    "ConsentLifetime" integer NULL,
    "AbsoluteRefreshTokenLifetime" integer NOT NULL,
    "SlidingRefreshTokenLifetime" integer NOT NULL,
    "RefreshTokenUsage" integer NOT NULL,
    "UpdateAccessTokenClaimsOnRefresh" boolean NOT NULL,
    "RefreshTokenExpiration" integer NOT NULL,
    "AccessTokenType" integer NOT NULL,
    "EnableLocalLogin" boolean NOT NULL,
    "IncludeJwtId" boolean NOT NULL,
    "AlwaysSendClientClaims" boolean NOT NULL,
    "ClientClaimsPrefix" varchar(200) NULL,
    "PairWiseSubjectSalt" varchar(200) NULL,
    "Created" timestamp without time zone NOT NULL,
    "Updated" timestamp without time zone NULL,
    "LastAccessed" timestamp without time zone NULL,
    "UserSsoLifetime" integer NULL,
    "UserCodeType" varchar(100) NULL,
    "DeviceCodeLifetime" integer NOT NULL,
    "NonEditable" boolean NOT NULL,
    CONSTRAINT "PK_Clients" PRIMARY KEY ("Id")
);

CREATE TABLE "public"."IdentityResources" (
    "Id" SERIAL,
    "Enabled" boolean NOT NULL,
    "Name" varchar(200) NOT NULL,
    "DisplayName" varchar(200) NULL,
    "Description" varchar(1000) NULL,
    "Required" boolean NOT NULL,
    "Emphasize" boolean NOT NULL,
    "ShowInDiscoveryDocument" boolean NOT NULL,
    "Created" timestamp without time zone NOT NULL,
    "Updated" timestamp without time zone NULL,
    "NonEditable" boolean NOT NULL,
    CONSTRAINT "PK_IdentityResources" PRIMARY KEY ("Id")
);

CREATE TABLE "public"."ApiClaims" (
    "Id" SERIAL,
    "Type" varchar(200) NOT NULL,
    "ApiResourceId" integer NOT NULL,
    CONSTRAINT "PK_ApiClaims" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_ApiClaims_ApiResources_ApiResourceId" FOREIGN KEY ("ApiResourceId") REFERENCES "ApiResources" ("Id") ON DELETE CASCADE
);

CREATE TABLE "public"."ApiProperties" (
    "Id" SERIAL,
    "Key" varchar(250) NOT NULL,
    "Value" varchar(2000) NOT NULL,
    "ApiResourceId" integer NOT NULL,
    CONSTRAINT "PK_ApiProperties" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_ApiProperties_ApiResources_ApiResourceId" FOREIGN KEY ("ApiResourceId") REFERENCES "ApiResources" ("Id") ON DELETE CASCADE
);

CREATE TABLE "public"."ApiScopes" (
    "Id" SERIAL,
    "Name" varchar(200) NOT NULL,
    "DisplayName" varchar(200) NULL,
    "Description" varchar(1000) NULL,
    "Required" boolean NOT NULL,
    "Emphasize" boolean NOT NULL,
    "ShowInDiscoveryDocument" boolean NOT NULL,
    "ApiResourceId" integer NOT NULL,
    CONSTRAINT "PK_ApiScopes" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_ApiScopes_ApiResources_ApiResourceId" FOREIGN KEY ("ApiResourceId") REFERENCES "ApiResources" ("Id") ON DELETE CASCADE
);

CREATE TABLE "public"."ApiSecrets" (
    "Id" SERIAL,
    "Description" varchar(1000) NULL,
    "Value" varchar(4000) NOT NULL,
    "Expiration" timestamp without time zone NULL,
    "Type" varchar(250) NOT NULL,
    "Created" timestamp without time zone NOT NULL,
    "ApiResourceId" integer NOT NULL,
    CONSTRAINT "PK_ApiSecrets" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_ApiSecrets_ApiResources_ApiResourceId" FOREIGN KEY ("ApiResourceId") REFERENCES "ApiResources" ("Id") ON DELETE CASCADE
);

CREATE TABLE "public"."ClientClaims" (
    "Id" SERIAL,
    "Type" varchar(250) NOT NULL,
    "Value" varchar(250) NOT NULL,
    "ClientId" integer NOT NULL,
    CONSTRAINT "PK_ClientClaims" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_ClientClaims_Clients_ClientId" FOREIGN KEY ("ClientId") REFERENCES "Clients" ("Id") ON DELETE CASCADE
);

CREATE TABLE "public"."ClientCorsOrigins" (
    "Id" SERIAL,
    "Origin" varchar(150) NOT NULL,
    "ClientId" integer NOT NULL,
    CONSTRAINT "PK_ClientCorsOrigins" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_ClientCorsOrigins_Clients_ClientId" FOREIGN KEY ("ClientId") REFERENCES "Clients" ("Id") ON DELETE CASCADE
);

CREATE TABLE "public"."ClientGrantTypes" (
    "Id" SERIAL,
    "GrantType" varchar(250) NOT NULL,
    "ClientId" integer NOT NULL,
    CONSTRAINT "PK_ClientGrantTypes" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_ClientGrantTypes_Clients_ClientId" FOREIGN KEY ("ClientId") REFERENCES "Clients" ("Id") ON DELETE CASCADE
);

CREATE TABLE "public"."ClientIdPRestrictions" (
    "Id" SERIAL,
    "Provider" varchar(200) NOT NULL,
    "ClientId" integer NOT NULL,
    CONSTRAINT "PK_ClientIdPRestrictions" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_ClientIdPRestrictions_Clients_ClientId" FOREIGN KEY ("ClientId") REFERENCES "Clients" ("Id") ON DELETE CASCADE
);

CREATE TABLE "public"."ClientPostLogoutRedirectUris" (
    "Id" SERIAL,
    "PostLogoutRedirectUri" varchar(2000) NOT NULL,
    "ClientId" integer NOT NULL,
    CONSTRAINT "PK_ClientPostLogoutRedirectUris" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_ClientPostLogoutRedirectUris_Clients_ClientId" FOREIGN KEY ("ClientId") REFERENCES "Clients" ("Id") ON DELETE CASCADE
);

CREATE TABLE "public"."ClientProperties" (
    "Id" SERIAL,
    "Key" varchar(250) NOT NULL,
    "Value" varchar(2000) NOT NULL,
    "ClientId" integer NOT NULL,
    CONSTRAINT "PK_ClientProperties" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_ClientProperties_Clients_ClientId" FOREIGN KEY ("ClientId") REFERENCES "Clients" ("Id") ON DELETE CASCADE
);

CREATE TABLE "public"."ClientRedirectUris" (
    "Id" SERIAL,
    "RedirectUri" varchar(2000) NOT NULL,
    "ClientId" integer NOT NULL,
    CONSTRAINT "PK_ClientRedirectUris" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_ClientRedirectUris_Clients_ClientId" FOREIGN KEY ("ClientId") REFERENCES "Clients" ("Id") ON DELETE CASCADE
);

CREATE TABLE "public"."ClientScopes" (
    "Id" SERIAL,
    "Scope" varchar(200) NOT NULL,
    "ClientId" integer NOT NULL,
    CONSTRAINT "PK_ClientScopes" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_ClientScopes_Clients_ClientId" FOREIGN KEY ("ClientId") REFERENCES "Clients" ("Id") ON DELETE CASCADE
);

CREATE TABLE "public"."ClientSecrets" (
    "Id" SERIAL,
    "Description" varchar(2000) NULL,
    "Value" varchar(4000) NOT NULL,
    "Expiration" timestamp without time zone NULL,
    "Type" varchar(250) NOT NULL,
    "Created" timestamp without time zone NOT NULL,
    "ClientId" integer NOT NULL,
    CONSTRAINT "PK_ClientSecrets" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_ClientSecrets_Clients_ClientId" FOREIGN KEY ("ClientId") REFERENCES "Clients" ("Id") ON DELETE CASCADE
);

CREATE TABLE "public"."IdentityClaims" (
    "Id" SERIAL,
    "Type" varchar(200) NOT NULL,
    "IdentityResourceId" integer NOT NULL,
    CONSTRAINT "PK_IdentityClaims" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_IdentityClaims_IdentityResources_IdentityResourceId" FOREIGN KEY ("IdentityResourceId") REFERENCES "IdentityResources" ("Id") ON DELETE CASCADE
);

CREATE TABLE "public"."IdentityProperties" (
    "Id" SERIAL,
    "Key" varchar(250) NOT NULL,
    "Value" varchar(2000) NOT NULL,
    "IdentityResourceId" integer NOT NULL,
    CONSTRAINT "PK_IdentityProperties" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_IdentityProperties_IdentityResources_IdentityResourceId" FOREIGN KEY ("IdentityResourceId") REFERENCES "IdentityResources" ("Id") ON DELETE CASCADE
);

CREATE TABLE "public"."ApiScopeClaims" (
    "Id" SERIAL,
    "Type" varchar(200) NOT NULL,
    "ApiScopeId" integer NOT NULL,
    CONSTRAINT "PK_ApiScopeClaims" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_ApiScopeClaims_ApiScopes_ApiScopeId" FOREIGN KEY ("ApiScopeId") REFERENCES "ApiScopes" ("Id") ON DELETE CASCADE
);

CREATE INDEX "IX_ApiClaims_ApiResourceId" ON "public"."ApiClaims" ("ApiResourceId");

CREATE INDEX "IX_ApiProperties_ApiResourceId" ON "public"."ApiProperties" ("ApiResourceId");

CREATE UNIQUE INDEX "IX_ApiResources_Name" ON "public"."ApiResources" ("Name");

CREATE INDEX "IX_ApiScopeClaims_ApiScopeId" ON "public"."ApiScopeClaims" ("ApiScopeId");

CREATE INDEX "IX_ApiScopes_ApiResourceId" ON "public"."ApiScopes" ("ApiResourceId");

CREATE UNIQUE INDEX "IX_ApiScopes_Name" ON "public"."ApiScopes" ("Name");

CREATE INDEX "IX_ApiSecrets_ApiResourceId" ON "public"."ApiSecrets" ("ApiResourceId");

CREATE INDEX "IX_ClientClaims_ClientId" ON "public"."ClientClaims" ("ClientId");

CREATE INDEX "IX_ClientCorsOrigins_ClientId" ON "public"."ClientCorsOrigins" ("ClientId");

CREATE INDEX "IX_ClientGrantTypes_ClientId" ON "public"."ClientGrantTypes" ("ClientId");

CREATE INDEX "IX_ClientIdPRestrictions_ClientId" ON "public"."ClientIdPRestrictions" ("ClientId");

CREATE INDEX "IX_ClientPostLogoutRedirectUris_ClientId" ON "public"."ClientPostLogoutRedirectUris" ("ClientId");

CREATE INDEX "IX_ClientProperties_ClientId" ON "public"."ClientProperties" ("ClientId");

CREATE INDEX "IX_ClientRedirectUris_ClientId" ON "public"."ClientRedirectUris" ("ClientId");

CREATE UNIQUE INDEX "IX_Clients_ClientId" ON "public"."Clients" ("ClientId");

CREATE INDEX "IX_ClientScopes_ClientId" ON "public"."ClientScopes" ("ClientId");

CREATE INDEX "IX_ClientSecrets_ClientId" ON "public"."ClientSecrets" ("ClientId");

CREATE INDEX "IX_IdentityClaims_IdentityResourceId" ON "public"."IdentityClaims" ("IdentityResourceId");

CREATE INDEX "IX_IdentityProperties_IdentityResourceId" ON "public"."IdentityProperties" ("IdentityResourceId");

CREATE UNIQUE INDEX "IX_IdentityResources_Name" ON "public"."IdentityResources" ("Name");

