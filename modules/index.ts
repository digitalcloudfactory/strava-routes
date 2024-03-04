import { addComponent, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
	setup() {
		// import { MyComponent as MyAutoImportedComponent } from 'my-npm-package'
		addComponent({
			name: 'MapboxMap',
			export: 'MapboxMap',
			filePath: '@studiometa/vue-mapbox-gl',
		})
		addComponent({
			name: 'MapboxSource',
			export: 'MapboxSource',
			filePath: '@studiometa/vue-mapbox-gl',
		})
		addComponent({
			name: 'MapboxLayer',
			export: 'MapboxLayer',
			filePath: '@studiometa/vue-mapbox-gl',
		})
	},
})
