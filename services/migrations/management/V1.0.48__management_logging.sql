CREATE TABLE "Management"."LogEntries" (
    "Id" SERIAL,
  
    "CallSite" text NULL,
    "Date" text NULL,
    "Exception" text NULL,
    "Level" text NULL,
    "Logger" text NULL,
    "MachineName" text NULL,
    "Message" text NULL,
    "StackTrace" text NULL,
    "Thread" text NULL,
    "Username" text NULL,
    
    CONSTRAINT "PK_LogEntries" PRIMARY KEY ("Id")
);