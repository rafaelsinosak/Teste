# XML to JSON Service

This service fetches XML data from given endpoints, transforms it into JSON format, and provides a GraphQL endpoint to access the transformed data.

## Requirements

- NestJS
- Docker
- Tests

## Setup

1. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

2. Create a `.env` file with the following content:
   \`\`\`
   DB_TYPE=mysql
   DB_HOST=db
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=root
   DB_DATABASE=test
   \`\`\`

3. Run the application:
   \`\`\`
   npm run start:dev
   \`\`\`

4. Run the application with Docker:
   \`\`\`
   docker-compose up --build
   \`\`\`

## Additional Information

Wait the app fetch and transform the XML data and save it to the database. When the database is ready, you will be able to access the GraphQL endpoint and fetch the transformed data.

This project uses Docker to run both the application and the MySQL database. The Docker setup ensures that the application waits for the database to be ready before starting.

### Configuration

The application configuration is managed using environment variables. These variables are loaded from the \`.env\` file. Ensure the \`.env\` file is placed at the root of the project with the correct database credentials.

### GraphQL Endpoint

Once the application is running, you can access the GraphQL endpoint at \`http://localhost:3000/graphql\`.
