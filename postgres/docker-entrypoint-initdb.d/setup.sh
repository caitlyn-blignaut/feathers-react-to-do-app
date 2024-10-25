(
  sleep 5

  #create database
  psql -tc "SELECT FROM pg_database WHERE datname = 'to_do';" | grep -q 1 || psql -tc "CREATE DATABASE to_do;"
)&
