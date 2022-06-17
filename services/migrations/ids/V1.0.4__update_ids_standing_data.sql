update "ClientRedirectUris" set "RedirectUri" = 'https://sonaticket.com:4200/callback' where "RedirectUri" = 'https://dev.sonaticket.com:4200/callback';
update "ClientRedirectUris" set "RedirectUri" = 'https://dashboard.sonaticket.com:4201/callback' where "RedirectUri" = 'https://dev.dashboard.sonaticket.com:4201/callback';
update "ClientRedirectUris" set "RedirectUri" = 'https://dashboard.sonaticket.com/callback' where "RedirectUri" = 'https://dev.dashboard.sonaticket.com/callback';
update "ClientCorsOrigins" set "Origin" = 'https://sonaticket.com:4200' where "Origin" = 'https://dev.sonaticket.com:4200';
update "ClientCorsOrigins" set "Origin" = 'https://dashboard.sonaticket.com:4201' where "Origin" = 'https://dev.dashboard.sonaticket.com:4201';