#!/bin/bash

echo "Installing missing dependencies in frontend container..."
docker-compose exec frontend npm install --save axios

echo "Done! Your containers should now be ready to use." 
