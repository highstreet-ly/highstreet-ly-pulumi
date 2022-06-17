alter TABLE "Management"."TicketType"
drop COLUMN "ScheduleStartDate";

alter TABLE "Management"."TicketType"
drop COLUMN "ScheduleEndDate";

alter TABLE "Management"."TicketTypeConfiguration"
drop COLUMN "ScheduleStartDate";

alter TABLE "Management"."TicketTypeConfiguration"
drop COLUMN "ScheduleEndDate";