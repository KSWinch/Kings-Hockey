# DB

- Make a .env file in the root level directory with the following line: DATABASE_URL="mysql://username:password@your-db-instance.rds.amazonaws.com:3306/your-database-name""
- If any changes are made to the schema of existing tables or if new tables are created, use this command to run the migrations `npx prisma migrate dev --name init`

# Install Dependencies

- npm i
- npx prisma generate

# Run Node

- node ./src/server.js
