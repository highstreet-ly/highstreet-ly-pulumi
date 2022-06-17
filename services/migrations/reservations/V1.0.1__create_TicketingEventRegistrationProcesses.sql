CREATE SCHEMA IF NOT EXISTS "TicketingEventRegistrationProcesses";

CREATE TABLE "TicketingEventRegistrationProcesses"."RegistrationProcess" (
    "Id" uuid NOT NULL,
    "Completed" bool NOT NULL,
    "ExpirationCommandId" uuid NOT NULL,
    "OrderId" uuid NOT NULL,
    "ReservationAutoExpiration" timestamp NULL,
    "ReservationId" uuid NOT NULL,
    "StateValue" int4 NOT NULL,
    "EventInstanceId" uuid NOT NULL,
    "TicketReservationCommandId" uuid NOT NULL,
    "TimeStamp" bytea NULL,
    CONSTRAINT "PK_RegistrationProcess" PRIMARY KEY ("Id")
);

CREATE TABLE "TicketingEventRegistrationProcesses"."UndispatchedMessages" (
    "Id" uuid NOT NULL,
    "Commands" text NULL,
    CONSTRAINT "PK_UndispatchedMessages" PRIMARY KEY ("Id")
);
