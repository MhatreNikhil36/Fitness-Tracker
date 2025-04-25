#!/bin/sh

# Check for axios and install if not present
if ! npm list axios >/dev/null 2>&1; then
  echo "Installing axios..."
  npm install --save axios
fi

# Start the application
npm start
