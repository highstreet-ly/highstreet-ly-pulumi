
CREATE TABLE "DeviceCodes" (
    "DeviceCode" varchar(200) NOT NULL,
    "UserCode" varchar(200) NOT NULL,
    "SubjectId" varchar(200) NULL,
    "ClientId" varchar(200) NOT NULL,
    "CreationTime" timestamp without time zone NOT NULL,
    "Expiration" timestamp without time zone NOT NULL,
    "Data" varchar(50000) NOT NULL,
    CONSTRAINT "PK_DeviceCodes" PRIMARY KEY ("UserCode")
);

CREATE TABLE "PersistedGrants" (
    "Key" varchar(200) NOT NULL,
    "Type" varchar(50) NOT NULL,
    "SubjectId" varchar(200) NULL,
    "ClientId" varchar(200) NOT NULL,
    "CreationTime" timestamp without time zone NOT NULL,
    "Expiration" timestamp without time zone NULL,
    "Data" varchar(50000) NOT NULL,
    CONSTRAINT "PK_PersistedGrants" PRIMARY KEY ("Key")
);

CREATE UNIQUE INDEX "IX_DeviceCodes_DeviceCode" ON "DeviceCodes" ("DeviceCode");

CREATE INDEX "IX_PersistedGrants_SubjectId_ClientId_Type" ON "PersistedGrants" ("SubjectId", "ClientId", "Type");
