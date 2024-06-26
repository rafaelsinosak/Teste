
# XML to JSON Service

This service fetches XML data from given endpoints, transforms it into JSON format, and provides a GraphQL endpoint to access the transformed data.

## Requirements

- Node.js
- Docker
- MySQL

## Setup

1. Install dependencies:
\`\`\`
npm install
\`\`\`

2. Create a `.env` file with the following content:
\`\`\`
DB_HOST=localhost
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
docker build -t xml-json-service .
docker run -p 3000:3000 xml-json-service
\`\`\`
