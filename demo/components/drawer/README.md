## Usage

The `mcw-drawer` component implements permanent, persistent, and temporary drawers.
By default the drawer component is responsive and will switch from temporary to persistent design according to viewport width.

```html
<mcw-drawer
  ref="drawer"
  v-model="open"
  modal
  class="primary-drawer"
  toolbar-spacer
>
  <mcw-drawer-header></mcw-drawer-header>
  <mcw-drawer-list dense>
    <mcw-drawer-item to="/">Home</mcw-drawer-item>
    <mcw-drawer-item to="/docs/getting-started"
      >Getting Started</mcw-drawer-item
    >
    <mcw-drawer-divider />
    <mcw-drawer-item v-for="link in links" :key="link.id" :to="link.to"
      >{{ link.name }}</mcw-drawer-item
    >
  </mcw-drawer-list>
</mcw-drawer>
```

### Drawer

| prop               | Type    | Default   | Description                                        |
| ------------------ | ------- | --------- | -------------------------------------------------- |
| `toolbar-spacer`   | Boolean | undefined | add a toolbar spacer                               |
| `open`             | Boolean | false     | optional v-model when true opens drawer            |
| `toggle-on`        | String  | undefined | optional toggle event to listen on                 |
| `toggle-on-source` | Object  | vm.\$root | optional toggle event source, defaults to root bus |
| `open-on`          | String  | undefined | optional open event to listen on                   |
| `open-on-source`   | Object  | vm.\$root | optional open event source, defaults to root bus   |
| `close-on`         | String  | undefined | optional close event to listen on                  |
| `close-on-source`  | Object  | vm.\$root | optional close event source, defaults to root bus  |

> (\*) drawer is responsive if `drawer-type` undefined: temporary on mobile breakpoint and persistent otherwise.

| event         | args    | Description                                             |
| ------------- | ------- | ------------------------------------------------------- |
| `@change`     | Boolean | notify v-model/listeners that drawer state has changed. |
| `@open`       |         | triggered on drawer open                                |
| `@close`      |         | triggered on drawer close                               |
| `@vma:layout` | Boolean | notify listeners that screen layout has changed.        |

### Drawer Items

| prop                 | Type           | Default                  | Description                                                            |
| -------------------- | -------------- | ------------------------ | ---------------------------------------------------------------------- |
| `start-icon`         | String         | undefined                | material start icon                                                    |
| `modal-close`        | Boolean        | true                     | whether temporary drawer closes on click                               |
| `event`              | String         | undefined                | optional event to emit on click                                        |
| `event-target`       | Object         | vm.\$root                | optional event target, defaults to root bus                            |
| `event-args`         | Array          | []                       | optional event args                                                    |
| `to`                 | String, Object | undefined                | router-link property _(\*)_                                            |
| `replace`            | Boolean        | false                    | router-link property _(\*)_                                            |
| `append`             | Boolean        | false                    | router-link property _(\*)_                                            |
| `exact`              | Boolean        | false                    | router-link property _(\*)_                                            |
| `active-class`       | String         | router-link-active       | router-link property _(\*)_                                            |
| `exact-active-class` | String         | router-link-exact-active | router-link property _(\*)_                                            |
| `activated`          | Boolean        | undefined                | whether this item is selected (not needed if router-link mode is used) |

> _(\*)_ Requires [vue-router](https://router.vuejs.org)
> If the `to` property is defined, the item behaves as a
> [router-link](https://router.vuejs.org/en/api/router-link.html)

### Item usage

- A simple link

```html
<mcw-drawer-item href="#">Inbox</mcw-drawer-item>
```

- With vue-router

```html
<mcw-drawer-item to="/path">Inbox</mcw-drawer-item>
<mcw-drawer-item :to="folder" append>Inbox</mcw-drawer-item>
```

> Customize the active links style with vue-router active or exact-active classes:

```css
.mcw-drawer-item.router-link-exact-active {
  color: red;
}
```

- Trigger an event

```html
<mcw-drawer-item event="my-event">Inbox</mcw-drawer-item>
```

- Click handler

```html
<mcw-drawer-item @click="handler">Inbox</mcw-drawer-item>
```

### Reference

- <https://material.io/components/web/catalog/drawers>
