CREATE VIEW logs_materialized AS 
    SELECT  properties -> 'Properties'->>'Application' as Application, * from logs;