# Student Management Backend

## Database Migrations

This project uses [Knex.js](https://knexjs.org/guide/) for database migrations.
The following commands are available for managing database migrations:

### Creating a New Migration

To create a new migration file:

```bash
docker-compose exec api npm run migrate:create -- <migration-name>
```

Example:

```bash
docker-compose exec api npm run migrate:create -- add_email_to_students
```

### Running Migrations

To run all pending migrations:

```bash
docker-compose exec api npm run migrate:latest
```

To run the next pending migration:

```bash
docker-compose exec api npm run migrate:up
```

To rollback the last migration:

```bash
docker-compose exec api npm run migrate:down
```

To rollback all migrations:

```bash
docker-compose exec api npm run migrate:rollback
```

### Running Seed Data

To run seed data:

```bash
docker-compose exec api npm run seed
```

## Development

The backend server runs in development mode with hot-reloading enabled.
Any changes to the source code will automatically restart the server.
