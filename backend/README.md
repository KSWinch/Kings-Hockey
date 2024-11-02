# DB Changes

- Make a .env file with the following line: DATABASE_URL="mysql://username:password@your-db-instance.rds.amazonaws.com:3306/your-database-name""
- To apply changes to the DB use the command npx prisma migrate dev --name init

# Install Dependencies

- npm i

# Run Node

- node server.js

# Database Config File

- Make dbConfig.js file with follow keys
- const dbConfig = {\
   host: "", // database host\
   user: "", // database username\
   password: "", // database password\
   database: "", // database name\
   port: , // database port\
  };
