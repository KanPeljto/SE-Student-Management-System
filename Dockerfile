FROM php:8.0-apache
WORKDIR /var/www/html


COPY . .


# Common extensions
RUN apt update
RUN apt install zip libzip-dev -y
RUN docker-php-ext-install pdo_mysql zip


# Enable mod_rewrite for images with apache
RUN if command -v a2enmod >/dev/null 2>&1; then \
       a2enmod rewrite headers \
       ;fi


       # Composer install
       COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
       COPY composer.json composer.json
       RUN composer install --no-dev
       
       # Copy custom Apache config
       COPY 000-default.conf /etc/apache2/sites-available/000-default.conf

       # Ensure Apache uses the custom config
       RUN a2ensite 000-default.conf

       EXPOSE 80
       EXPOSE 443