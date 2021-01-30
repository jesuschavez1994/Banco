# Página: "Cuenta". Ruta: "/account"

La idea de esta carpeta es contener todos los layouts (o páginas/vistas) que compongan la ruta principal "/account", y todas sus rutas hijas.
<br />
Se plantea la siguiente estructura de carpetas dado que una buena manera de implementar esta vista (debido a que posee una barra de navegacion lateral) es con rutas hijas. Y así se mantiene un orden lógico.
<br />
<br />

```bash
## Estructura de carpetas.
├── account
│   ├── pages
│   │   ├── settings
│   │   │   ├── routing
│   │   │   ├── views
│   │   │   │   ├── my-account
│   │   │   │   ├── plans
│   │   │   │   │   ├── components
│   │   │   │   │   ├── models
│   │   │   │   ├── Archivos HTML | CSS | TS
│   │   ├──	modulo-de-rutas.ts
│   │   ├──	modulo-principal.ts
│   │   ├──	settings.component.html
│   │   ├──	settings.component.css
│   │   ├──	settings.component.ts
├── README.md
├── settings.component.css
├── settings.component.html
├── settings.component.spec.ts
├── settings.component.ts
```

Ahora, una pequeña explicación de la funcionalidad de cada carpeta, y qué archivos van en ellas:

- pages: En esta carpeta ubicaremos todos los layouts de las rutas hijas de "/account". Lo que se mostrará e dicha ruta, en esencia. Se recomienda que cada carpeta que se cree tenga su propio módulo y enrutador, así es posible aplicar el método de lazy-loading.

  - settings: Este es un ejemplo de lo mencionado anteriormente. En la carpeta "settings" iran ubicados los layouts principales de las vistas que se mostrarán en las rutas hijas. Una manera de ubicarse con esto es el sidebar que se muestra en la ruta "/account/settings", todos los layouts que estén relacionados con las rutas en ese sidebar deberian ir dentro de ésta carpeta.

    - routing: Se deja esta carpeta dado que puede ser usada para guardar archivos referentes a animaciones de las rutas exclusivas de éste modulo, así será mas facil encontrarlas.
    - views: Cada página puede tener una o más vistas dentro de su layout propio, en ésta carpeta se ubican estas vistas.

      - Dentro de la carpeta de cada vista se pueden ubicar sus carpetas contenedoras de componentes y modelos exclusivos, en caso de ser necesarios.

El archivo "settings.component.html" contiene el layout principal de toda la página, en caso de ser necesaria una modificación.
