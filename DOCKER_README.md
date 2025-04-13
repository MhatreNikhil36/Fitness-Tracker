# Fitness Tracker Docker Setup

This document explains how to run the Fitness Tracker application using Docker Compose, which will start the frontend, backend server, and MySQL database all at once.

## Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) installed on your system
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)

## Running the Application

1. Clone the repository
2. Navigate to the project root directory
3. Run the following command:

```bash
docker-compose up --build
```

The `--build` flag ensures that Docker builds fresh images with all required dependencies.

This will:
- Build and start the React frontend (available at http://localhost:3000)
- Build and start the Node.js backend server (available at http://localhost:5000)
- Start a MySQL database with persistent storage

4. If you see dependency errors (like missing axios), run the provided script:

```bash
# Make the script executable
chmod +x install-dependencies.sh

# Run the script to install missing dependencies
./install-dependencies.sh
```

## Accessing the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Database: MySQL running on port 3306 (accessible from within the Docker network)

## API Configuration

The frontend API configuration has been centralized in `src/api/config.js` to ensure consistent API endpoints across all components. This file uses the environment variable `REACT_APP_API_URL` which is set in the docker-compose.yml file.

Inside Docker containers, the frontend refers to the backend using the service name `http://server:5000` rather than `localhost`. This is important because in the Docker network, each service has its own network namespace.

## Stopping the Application

To stop all services:

```bash
# If running in foreground (with logs showing)
Press CTRL+C

# Or from another terminal
docker-compose down
```

## Troubleshooting

If you encounter dependency issues:

1. Fix dependencies manually:
   ```bash
   # Install axios in the frontend container
   docker-compose exec frontend npm install --save axios
   ```

2. For a complete rebuild:
   ```bash
   # Stop containers and remove volumes
   docker-compose down -v
   
   # Rebuild without using cache
   docker-compose build --no-cache
   
   # Start containers
   docker-compose up
   
   # Then run the dependency installation script
   ./install-dependencies.sh
   ```

3. If the issue persists, check node_modules volume:
   ```bash
   # Stop the containers
   docker-compose down
   
   # Remove the node_modules volume
   docker volume rm fitness-tracker_node_modules
   
   # Rebuild and start
   docker-compose up --build
   ```

4. If you see the error "getaddrinfo ENOTFOUND db":
   ```bash
   # This indicates the frontend is trying to connect directly to the database
   # The fix is to ensure all API calls use the API_BASE_URL from src/api/config.js
   # and never try to access the database directly
   ```

## Data Persistence

The MySQL database data is stored in a named volume `mysql_data`, which persists across container restarts. This ensures your database data is not lost when containers are stopped or removed.

## Environment Variables

The application uses the following environment variables:

### Frontend
- `REACT_APP_API_URL`: URL of the backend API (set to http://server:5000 in Docker)

### Backend
- `DB_HOST`: Database hostname (set to 'db' in Docker)
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name
- `DB_PORT`: Database port
- `JWT_SECRET`: Secret key for JWT token generation

These are already configured in the docker-compose.yml file and the .env file. 