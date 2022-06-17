const k8s = require("@pulumi/kubernetes");
const fs = require("fs");
const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config("sonaticket");
const postgresCon = config.require("postgres");
const postgresSystemUser = config.require("postgresApplicationUser");
const postgresSystemPass = config.require("postgresApplicationPass");
const inClusterDb = config.requireBoolean("inClusterDb");


function getMigrations(dir) {

	const files = fs.readdirSync(`services/migrations/${dir}`)
	let data = {};

	for (const file of files) {
		data[file] = fs
			.readFileSync(
				`services/migrations/${dir}/${file}`
			)
			.toString()
	}

	return data;
}

module.exports = (ns, pgsql) => {

	let nsdb = ns.replace('-', '_')

	var postgresPassSecret = new k8s.core.v1.Secret(`postgress-pass-secret-${ns}`, {
		metadata: {
			namespace: ns,
		},
		type: 'Opaque',
		stringData: {
			'password': `${postgresSystemPass.toString("base64")}`
		}
	})

	let schedulerMigrations = new k8s.core.v1.ConfigMap(
		"postgresmigrationsconfig-scheduler",
		{
			metadata: {
				namespace: ns
			},
			data: getMigrations('scheduler')
		}
	);

	let reservationsMigrations = new k8s.core.v1.ConfigMap(
		"postgresmigrationsconfig-reservations",
		{
			metadata: {
				namespace: ns
			},
			data: getMigrations('reservations')
		}
	);

	let managementMigrations = new k8s.core.v1.ConfigMap(
		"postgresmigrationsconfig-management",
		{
			metadata: {
				namespace: ns
			},
			data: getMigrations('management')
		}
	);

	let paymentMigrations = new k8s.core.v1.ConfigMap(
		"postgresmigrationsconfig-payments",
		{
			metadata: {
				namespace: ns
			},
			data: getMigrations('payments')
		}
	);

	let idsMigrations = new k8s.core.v1.ConfigMap(
		"postgresmigrationsconfig-ids",
		{
			metadata: {
				namespace: ns
			},
			data: getMigrations('ids')
		}
	);

	let schedulerMigration = new k8s.batch.v1.Job(
		"sonaticket-scheduler-dbupdater-job",
		{
			metadata: {
				namespace: ns
			},
			spec: {
				template: {
					metadata: {
						name: "sonaticket-scheduler-dbupdater"
					},
					spec: {
						containers: [
							{
								name: "db-updater",
								image: "sonatribe/flyway:latest-arm-64",
								args: ['info', 'repair', 'migrate', 'info'],
								volumeMounts: [
									{
										name: "sql-configmap-volume",
										mountPath: "/flyway/sql"
									}
								],
								env: [
									{
										name: "FLYWAY_USER",
										value: 'sonatribe'
									},
									{
										name: "FLYWAY_PASSWORD",
										value: "Sonatribe2020"
									},
									{
										name: "FLYWAY_URL",
										value: `jdbc:postgresql://${postgresCon}:5432/${nsdb}_scheduler`
									}
								]
							}
						],
						restartPolicy: "Never",
						volumes: [
							{
								name: "sql-configmap-volume",
								configMap: {
									name: schedulerMigrations.metadata.apply(m => m.name)
								}
							}
						]
					}
				}
			}
		}, {
		dependsOn: [pgsql]
	});

	let reservationsMigration = new k8s.batch.v1.Job(
		"sonaticket-reservations-dbupdater-job",
		{
			metadata: {
				namespace: ns
			},
			spec: {
				template: {
					metadata: {
						name: "sonaticket-reservations-dbupdater"
					},
					spec: {
						containers: [
							{
								name: "db-updater",
								image: "sonatribe/flyway:latest-arm-64",
								args: ['info', 'repair', 'migrate', 'info'],
								volumeMounts: [
									{
										name: "sql-configmap-volume",
										mountPath: "/flyway/sql"
									}
								],
								env: [
									{
										name: "FLYWAY_USER",
										value: 'sonatribe'
									},
									{
										name: "FLYWAY_PASSWORD",
										value: "Sonatribe2020"
									},
									{
										name: "FLYWAY_URL",
										value: `jdbc:postgresql://${postgresCon}:5432/${nsdb}_ticket_reservations`
									}
								]
							}
						],
						restartPolicy: "Never",
						volumes: [
							{
								name: "sql-configmap-volume",
								configMap: {
									name: reservationsMigrations.metadata.apply(m => m.name)
								}
							}
						]
					}
				}
			}
		}, {
		dependsOn: [pgsql]
	});

	let managementMigration = new k8s.batch.v1.Job(
		"sonaticket-management-dbupdater-job",
		{
			metadata: {
				namespace: ns
			},
			spec: {
				template: {
					metadata: {
						name: "sonaticket-management-dbupdater"
					},
					spec: {
						containers: [
							{
								name: "db-updater",
								image: "sonatribe/flyway:latest-arm-64",
								args: ['info', 'repair', 'migrate', 'info'],
								volumeMounts: [
									{
										name: "sql-configmap-volume",
										mountPath: "/flyway/sql"
									}
								],
								env: [
									{
										name: "FLYWAY_USER",
										value: 'sonatribe'
									},
									{
										name: "FLYWAY_PASSWORD",
										value: "Sonatribe2020"
									},
									{
										name: "FLYWAY_URL",
										value: `jdbc:postgresql://${postgresCon}:5432/${nsdb}_ticket_management`
									}
								]
							}
						],
						restartPolicy: "Never",
						volumes: [
							{
								name: "sql-configmap-volume",
								configMap: {
									name: managementMigrations.metadata.apply(m => m.name)
								}
							}
						]
					}
				}
			}
		}, {
		dependsOn: [pgsql]
	});

	let paymentsMigration = new k8s.batch.v1.Job(
		"sonaticket-payments-dbupdater-job",
		{
			metadata: {
				namespace: ns
			},
			spec: {
				template: {
					metadata: {
						name: "sonaticket-payments-dbupdater"
					},
					spec: {
						containers: [
							{
								name: "db-updater",
								image: "sonatribe/flyway:latest-arm-64",
								args: ['info', 'repair', 'migrate', 'info'],
								volumeMounts: [
									{
										name: "sql-configmap-volume",
										mountPath: "/flyway/sql"
									}
								],
								env: [
									{
										name: "FLYWAY_USER",
										value: 'sonatribe'
									},
									{
										name: "FLYWAY_PASSWORD",
										value: "Sonatribe2020"
									},
									{
										name: "FLYWAY_URL",
										value: `jdbc:postgresql://${postgresCon}:5432/${nsdb}_payments`
									}
								]
							}
						],
						restartPolicy: "Never",
						volumes: [
							{
								name: "sql-configmap-volume",
								configMap: {
									name: paymentMigrations.metadata.apply(m => m.name)
								}
							}
						]
					}
				}
			}
		}, {
		dependsOn: [pgsql]
	});


	let idsMigration = new k8s.batch.v1.Job(
		"sonaticket-ids-dbupdater-job",
		{
			metadata: {
				namespace: ns
			},
			spec: {
				template: {
					metadata: {
						name: "sonaticket-ids-dbupdater"
					},
					spec: {
						containers: [
							{
								name: "db-updater",
								image: "sonatribe/flyway:latest-arm-64",
								args: ['info', 'repair', 'migrate', 'info'],
								volumeMounts: [
									{
										name: "sql-configmap-volume",
										mountPath: "/flyway/sql"
									}
								],
								env: [
									{
										name: "FLYWAY_USER",
										value: 'sonatribe'
									},
									{
										name: "FLYWAY_PASSWORD",
										value: "Sonatribe2020"
									},
									{
										name: "FLYWAY_URL",
										value: `jdbc:postgresql://${postgresCon}:5432/${nsdb}_ids`
									}
								]
							}
						],
						restartPolicy: "Never",
						volumes: [
							{
								name: "sql-configmap-volume",
								configMap: {
									name: idsMigrations.metadata.apply(m => m.name)
								}
							}
						]
					}
				}
			}
		}, {
		dependsOn: [pgsql]
	});
}