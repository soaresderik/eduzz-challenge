SELECT 'CREATE DATABASE eduzz'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'eduzz')\gexec