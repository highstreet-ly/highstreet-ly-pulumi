DROP TABLE IF EXISTS "Management"."SeriLog";


CREATE TABLE "public"."logs" (
	"Id" serial NOT NULL,
    "message" text NULL,
    "message_template" text NULL,
    "level" VARCHAR NULL,

	"raise_date" timestamp NOT NULL,

    "exception" VARCHAR NULL,

    "properties" jsonb not null default '{}'::jsonb,
    "props_test" jsonb not null default '{}'::jsonb,

    "machine_name" text NULL,
	
	 CONSTRAINT "PK_logs" PRIMARY KEY ("Id")
);

