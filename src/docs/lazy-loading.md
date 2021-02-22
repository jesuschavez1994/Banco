# Lazy loading

Se crea éste archivo con la finalidad de explicar en qué consiste el método de lazy-loading, y como aplicarlo en las vistas que sea necesario.

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Tabla de contenidos</summary>
  <ol>
    <li>
      <a href="#lazy-loading">¿Qué es "lazy-load"?</a>
			<ul>
				<li>
				<a href="#ejemplo">Ejemplo de aplicabilidad</a>
				</li>
			</ul>
    <li>
      <a href="#how-to">¿Cómo aplicar "lazy-load"?</a>
    </li>
        <li>
      <a href="#how-to">Consideraciones</a>
    </li>
  </ol>
</details>

<br/>

## ¿Qué es "lazy-loading"?

Para empezar, al aplicar ésta técnica, Angular usa una caracteristica de Webpack llamada ["code splitting"](https://webpack.js.org/guides/code-splitting/), la cual, en esencia, lo que hace es dividir el bundle (archivo que contiene todo el código de la app) final del código en pequeños trozos, cada uno correspondiente al modulo en el cual se aplicó la técnica.
<br />
La ventaja de hacer ésto radica en reducir el tamaño final del bundle, y, aparte de ésto, permitirle al servidor no cargar vistas o funcionalidades que no son necesarias en primera instancia, así se reduce el tiempo de carga de la página.
<br />
<br />

### Ejemplo de aplicabilidad

Supongamos que nuestra app tiene, aparte de muchas otras vistas, una vista principal, y otra con los detalles del usuario registrado. Podemos asumir que dependiendo del tipo de app que estemos desarrollando no todos los usuarios iniciarán sesión en ella, es decir, un usuario no registrado no puede ver la página (o vista) con los detalles de su cuenta, entonces, no es necesario que el código relacionado a esa vista se cargue la primera vez que cargue la página. Ésto puede ayudar a reducir de manera apreciable la velocidad de carga de la app, siendo la desventaja que por supuesto, si el usuario inicia sesión y se dirige a la página correspondiente para ver los detalles de su cuenta, ésta tardaría un poco más en cargar.
<br />
<br />

## ¿Cómo aplicar "lazy-loading"?

Para empezar, son necesarios un módulo principal para la característica y un módulo de rutas asociado a dicho módulo principal. Veamos el siguiente ejemplo de un módulo de rutas hijas preparado para éste fin:

```TypeScript
const routes: Routes = [
  {
    path: '',
    component: UserAreaComponent,
    children: [
			{
				path: 'login',
				component: LoginComponent
			}
		],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountSettingsRoutingModule {}
```

<br />
En este caso, dado que nos estamos usando a un módulo específico para rutas hijas, el parámetro "path" en dicho archivo se deja en blanco, ya que a dicha ruta se hace referencia en el módulo encargado de cargar el módulo de rutas hijas, en el cual sólo debemos hacer lo siguiente para aplicar el lazy-load:
<br />
<br />

```TypeScript
{
  path: 'user-area',
  loadChildren: () =>
 	import('./direccion-del-modulo-a-importar/user.module').then((module) => module.UserModule,
}
```

<br />
Ya con esto, la próxima vez que compilemos el proyecto se notará los trozos (chunks) referentes a cada módulo ser generados aparte.
<br />
<br />

## Consideraciones

- Los módulos de características (o feature modules, como se pueden encontrar en inglés) a los cuáles se les vaya a aplicar la técnica deben ser módulos independientes, es decir, su módulo principal **sólo** debe ser importado mediante el _loadChildren_.
- Extendiendo lo dicho anteriormente, si se le va a aplicar lazy load a un módulo, ni dicho módulo, ni su módulo de rutas deben ser importados en otros módulos.
- Es importante tener cuidado con la propiedad _pathMatch_. Si la ruta en la cual estamos aplicando el lazy load es una ruta base, por ejemplo, _/#/users_, se debe especificar el _pathMatch:_ **full** para que la ruta se pueda activar.
