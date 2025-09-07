# Gunakan PHP 8.2 dengan Apache
FROM php:8.2-apache

# Install dependency sistem + ekstensi PHP (gd, pdo, mbstring, dll)
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    curl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql mbstring exif pcntl bcmath xml

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy semua file project
COPY . .

# Install dependency Laravel
RUN composer install --optimize-autoloader --no-dev

# Set permissions (supaya storage & bootstrap/cache bisa ditulis Laravel)
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Enable Apache mod_rewrite untuk Laravel routing
RUN a2enmod rewrite

# Expose port 8080 (Railway default)
EXPOSE 8080

# Start Apache
CMD ["apache2-foreground"]
