#!/bin/bash

echo "Setting up database for Inventaris WIT..."

# Run migrations
echo "Running migrations..."
php artisan migrate:fresh

# Run seeders
echo "Running seeders..."
php artisan db:seed

echo "Database setup complete!"
echo ""
echo "Default users created:"
echo "Admin: admin@wit.id / password123"
echo "Staff: staff@wit.id / password123"
echo ""
echo "You can now test the login functionality."
