# Página de configuraciones.

La idea de esta carpeta es contener todos los layouts (o páginas/vistas) que compongan la vista principal "Configuraciones", la cual está encargada de la ruta '/#/settings'.
<br />
Se plantea la siguiente esttructura de carpetas dado que una buena manera de implementar esta vista (debido a que posee una barra de navegacion lateral) es con rutas hijas. Y así se mantiene un orden lógico.
<br />
<br />

```bash
## Estructura de carpetas.
├── account-settings
│   ├── pages
│   │   ├── my-account
│   │   ├── plans
│   │   │   ├── components
│   │   │   ├── models
│   │   │   ├── Main component files (CSS | HTML | TS)
│   │   ├── franchises
├── README.md
├── settings.component.css
├── settings.component.html
├── settings.component.spec.ts
├── settings.component.ts
```

Donde:

- "/pages": La carpeta donde irá el layout correspondiente a cada ruta hija que componga la ruta principal.
- "/pages/my-layout/components/": Carpeta donde se ubicarán los componentes exclusivos de cada layout.
- "/pages/my-layout/models/": Carpeta con los modelos de datos que sean exclusivos del layout que se está usando. Si el modelo de datos se usa en otras vistas | componentes, se puede considerar exportarlo a los modelos globales.

El archivo "settings.component.html" contiene el layout principal de toda la vista, en caso de ser necesaria una modificación.
