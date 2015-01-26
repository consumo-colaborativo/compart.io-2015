-------------------------------------------------------------
-- Info by Magda extracted from drywall proyect 18-10-2014 --
-------------------------------------------------------------
# NOTAS IMPORTANTES:
    - /config.js no está en github ya que tiene datos sensibles, hay que enviarlo a parte al grupo compartio, y en caso de cambios no olvidar avisar!!
    -
    -
    -
    -
    -

# ARCHIVOS EN ROOT
## APP.JS
    - app.use, app.config, app.server, app.utility …
## CONFIG.JS
    - exports.oauth, exports.port, exports.mongodb, exports.smtp …
## MODELS.JS
    - all the schemas are included here with module.exports
## PASSPORT.JS
    - configure passport.use, app.config.oauth …
## ROUTES.JS
    - app.get, app.post, app.delete, app.put, app.all …

# ESTRUCTURA DE DIRECTORIOS

## bower_components/ and node_modules/
Módulos o librerías externas.
bower.json y package.json son los archivos de configuración que especifican que módulos (dependencias) a instalar.
    - Bower instala paquetes y librerías del front-end (jQuery, AngularJS, underscore).
    - NPM instala paquetes y librerías para el desarrollador (back-end).

## LAYOUTS/ (.JADE)
Es donde están todas las plantillas base comunes para varias vistas (en views/) y que se incluirán con el comando “extend”.

## VIEWS/ (.JADE .JS)
Aquí están los JADEs de cada vista, cada una se basa en una de las vistas "padre" localizadas en /layout/.

Para cada vista hay varios archivos:
    - /views/admin/categories/index.jade: plantilla JADE
    - /views/admin/categories/index.js: contains all of our CRUD (create, read, update and delete) methods. CLIENT-SIDE JAVASCRIPT
    - /views/admin/categories/details.js:

                    ./views/about
                    ./views/account
                    ./views/account/settings
                    ./views/account/verification
                    ./views/admin
                    ./views/admin/accounts
                    ./views/admin/admin-groups
                    ./views/admin/administrators
                    ./views/admin/categories
                    ./views/admin/search
                    ./views/admin/statuses
                    ./views/admin/users
                    ./views/contact
                    ./views/http
                    ./views/login
                    ./views/login/forgot
                    ./views/login/reset
                    ./views/logout
                    ./views/signup

## PUBLIC/ CLIENT-SIDE Javascript
Contains all static content (images, style-sheets, client-side JavaScript)

### public/layouts (.JS .LESS plantillas base comunes)
.JS y .LESS for every layout.

### public/less (.LESS)
.LESS for every vendor javascript library.

### public/media

### public/vendor (.JS)
.JS for every vendor javascript client-side library.

                        .//public/vendor
                        .//public/vendor/backbone
                        .//public/vendor/bootstrap
                        .//public/vendor/bootstrap/js
                        .//public/vendor/bootstrap/less
                        .//public/vendor/font-awesome
                        .//public/vendor/font-awesome/fonts
                        .//public/vendor/font-awesome/less
                        .//public/vendor/html5shiv
                        .//public/vendor/jquery
                        .//public/vendor/jquery.cookie
                        .//public/vendor/momentjs
                        .//public/vendor/respond
                        .//public/vendor/underscore

### public/views (.JS .LESS each view is based on a parent layout)
.JS y .LESS for every view.
                        .//public/views
                        .//public/views/about
                        .//public/views/account
                        .//public/views/account/settings
                        .//public/views/account/verification
                        .//public/views/admin
                        .//public/views/admin/accounts
                        .//public/views/admin/admin-groups
                        .//public/views/admin/administrators
                        .//public/views/admin/categories
                        .//public/views/admin/statuses
                        .//public/views/admin/users
                        .//public/views/contact
                        .//public/views/login
                        .//public/views/login/forgot
                        .//public/views/login/reset
                        .//public/views/signup

## SCHEMA/ (.JS)
Schema definition for each document or entity.

### schema/plugins/

## UTIL/ (.JS)
Server Side Javascript Libraries.
.//util
.//util/sendmail
.//util/slugify
.//util/workflow


