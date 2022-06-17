const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");
const domain = config.require("aRecord");
const domainTld = config.require("domainTld");
const k8s = require('@pulumi/kubernetes');
const postgres = config.require("postgres");
const stripeApiKey = config.require("stripeApiKey")
const stripeWhSecret = config.require("stripeWhSecret")
const postgresApplicationUser = config.require("postgresApplicationUser");
const postgresApplicationPass = config.require("postgresApplicationPass");
const chargeBeeKey = config.require("chargeBeeApiKey");
const chargeBeeSite = config.require("chargeBeeSite");
const rmqConnection = config.require("rmqConnection");
const twilioAccountSid = config.require("twilioAccountSid");
const twilioAuthToken = config.require("twilioAuthToken");
const slackEnabled = config.require("slackEnabled");
const slackToken = config.require("slackToken");

module.exports = function (ns, devNamespace) {

 let  nsdb = ns.replace('-','_')

  return new k8s.core.v1.ConfigMap('sharedsettings', {
    metadata: {
      namespace: ns,
    },
    data: {
      "sharedsettings.json": JSON.stringify({
        "vault": {
          "VaultUri": "http://vault-service:8200",
          "RoleId": "318a5993-0ac4-060c-1583-d2c77fab3f89",
          "SecretPath": "myapp/config"
        },
        "Slack":{
          "SlackEnabled": slackEnabled,
          "SlackToken": slackToken
        },
        "serviceDirectory": {
          "IdentityServer": `https://ids.${domain}.${domainTld}`,
          "PaymentsApi": "http://sonatribe-payments-api",
          "TicketManagementApi": "http://sonatribe-ticketmanagement-api",
          "TicketReservationsApi": "http://sonatribe-ticketreservations-api",
          "PermissionsApi": "http://sonatribe-permissions-api"
        },
        "ServiceBus": {
          "Url": rmqConnection,
          "User": "sonatribe",
          "Password": "sonatribe"
        },
        "Twilio":{
          "Sid" : twilioAccountSid,
          "AuthToken" : twilioAuthToken
        },
        "EmailTemplate": {
          "Registration": "d-2c26df73b12b49d38fb0835b015ee171",
          "MagicLink": "d-73d78db3ed3e4914b92cdeb274c8f4c4",
          "NoMagicLink": "d-73d78db3ed3e4914b92cdeb274c8f4c4",
          "ForgotPassword": "d-73d78db3ed3e4914b92cdeb274c8f4c4",
          "OrderInTheBag": "d-8843f98002e44985a0e58f5e3df0214b",
          "OrderInTheBagOperator": "d-85aa11bdc4364d02a8bd436116af90c6",
          "OrderProcessingComplete": "d-9fd20b95b6e042138b5f9b2a44a7cde1",
          "OrderRefunded": "d-97d853d02b2b4009a493f8b66cdcde54",
          "OrderProcessing": "d-43e29c5c3eb94e3cbeac05564345ff97",
          "Generic": "d-73d78db3ed3e4914b92cdeb274c8f4c4"
        },
        "ConnectionStrings": {
          "AuditConnection": "User ID=" + postgresApplicationUser + ";Password=" + postgresApplicationPass + ";Host=" + postgres + "; Port=5432; Database=" + nsdb + "_message_audit;",
          "IdsConnection": "User ID=" + postgresApplicationUser + ";Password=" + postgresApplicationPass + ";Host=" + postgres + "; Port=5432; Database=" + nsdb + "_ids;",
          "PaymentsConnection": "User ID=" + postgresApplicationUser + ";Password=" + postgresApplicationPass + ";Host=" + postgres + "; Port=5432; Database=" + nsdb + "_payments;",
          "TicketManagementConnection": "User ID=" + postgresApplicationUser + ";Password=" + postgresApplicationPass + ";Host=" + postgres + "; Port=5432; Database=" + nsdb + "_ticket_management;",
          "TicketreservationsConnection": "User ID=" + postgresApplicationUser + ";Password=" + postgresApplicationPass + ";Host=" + postgres + "; Port=5432; Database=" + nsdb + "_ticket_reservations;",
          "PermissionsConnection": "User ID=" + postgresApplicationUser + ";Password=" + postgresApplicationPass + ";Host=" + postgres + "; Port=5432; Database=" + nsdb + "_ids;",
          "VaultConnection": "User ID=" + postgresApplicationUser + ";Password=" + postgresApplicationPass + ";Host=" + postgres + "; Port=5432; Database=" + nsdb + "_vault;",
          "SchedulerConnection": "User ID=" + postgresApplicationUser + ";Password=" + postgresApplicationPass + ";Host=" + postgres + "; Port=5432; Database=" + nsdb + "_scheduler;"
        },
        "Stripe":{
            "WebHookSecret": stripeWhSecret,
            "ApiKey": stripeApiKey,
        },
        "ChargeBeeSite": `${chargeBeeSite}`,
        "ChargeBeeKey": `${chargeBeeKey}`,
        
        "Ssl": {
          "Path": "/etc/ssl/sonaticket-certs/"
        }
      })
    }
  }, {
    dependsOn: [devNamespace]
});
}


