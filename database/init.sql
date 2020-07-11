SELECT 'CREATE DATABASE eduzz'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'eduzz')\gexec

SELECT 'CREATE DATABASE eduzz_test'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'eduzz_test')\gexec