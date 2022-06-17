DROP TABLE "Management"."LogEntries" ;


CREATE TABLE "Management"."SeriLog" (
    "Id" SERIAL,
  
    "Message" text NULL,
    "MessageTemplate" text NULL,
    "Level" text NULL,
    "TimeStamp" text NULL,
    "Exception" text NULL,
    "Properties" text NULL,
    "LogEvent" text NULL,
    
    CONSTRAINT "PK_LogEntries" PRIMARY KEY ("Id")
);