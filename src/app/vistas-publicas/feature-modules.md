# Módulos de características ( _Feature modules_ )

Se plantea la siguiente estructura de archivos para las vistas que se creen para mantener un orden general en la estructura del proyecto, aparte de poder facilitar la aplicación del _lazy load_ a las rutas de manera más fácil. El _lazy load_ es una técnica, y una buena práctica, que reducirá el tamaño total del bundle que se desplegará en el servidor, y reducirá el tiempo de carga inicial de la página para los usuarios.
<br>
En la carpeta _**src/docs**_ puede encontrar un poco de información respecto a ésta técnica.

## Estructura planteada

Una de las buenas prácticas que se platea es los módulos de características que se creen sean **independientes** de los demás, es decir, si se va a agregar una vista que corresponda a _vistas-publicas_, se debe crear un módulo para dicha vista, y los componentes, interfaces, clases, etc. que pertenezcan a dicha vista deben estar encapsulados su módulo.
<br>
Se ejemplificará lo dicho anteriormente usando una ruta cualquiera llamada _user_ en la siguiente estructura de carpetas:
<br>

```bash
## Estructura de carpetas.
├── vistas-publicas
│   ├── user
│   │   ├── components
│   │   ├── interfaces
│   │   ├── pages
│   │   │   ├── iniciar-sesion
│   │   │   │   ├── components
│   │   │   │   ├── iniciar-sesion.component.html
│   │   │   │   ├── iniciar-sesion.component.scss
│   │   │   │   ├── iniciar-sesion.component.ts
│   │   │   │   ├── iniciar-sesion.module.ts
│   │   │   │   ├── iniciar-sesion-routing.module.ts
│   │   ├── user.component.css
│   │   ├── user.component.html
│   │   ├── user.component.ts
│   │   ├── user.module.ts
│   │   ├── user-routing.module.ts
```

<br>
