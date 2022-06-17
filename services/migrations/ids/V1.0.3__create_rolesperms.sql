

insert into "public"."AspNetRoles" ("Id", "Name", "NormalizedName", "Privileged") VALUES ('82e436c0-6901-4902-b7d0-ebc1c13047f8', 'Admin', 'ADMIN', TRUE);

insert into "public"."AspNetRoles" ("Id", "Name", "NormalizedName", "Privileged")  VALUES ('ea7432d8-4b44-4473-af16-b8af1b060224', 'EventOrganiser', 'EVENTORGANISER', TRUE);

insert into "public"."AspNetRoles" ("Id", "Name", "NormalizedName", "Privileged")  VALUES ('c8b789b4-5423-40ad-b04b-173e78e2d275', 'DashUser', 'DASHUSER', FALSE);

insert into "public"."AspNetRoles" ("Id", "Name", "NormalizedName", "Privileged")  VALUES ('b77be92d-a385-42f2-a04e-a6bedaa436cb', 'Operator', 'OPERATOR', FALSE);

insert into "public"."Permissions" ("Id", "Description") VALUES ('d69e2338-2e54-4e4e-aed3-224c55585600', 'ReadUsersOrders');

insert into "public"."ApplicationRolePermission" ("Id", "ApplicationRoleId", "PermissionId") values('565b9eeb-4d7b-4e8f-93af-14a0b87063ca', '82e436c0-6901-4902-b7d0-ebc1c13047f8', 'd69e2338-2e54-4e4e-aed3-224c55585600');


