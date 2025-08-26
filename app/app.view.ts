namespace $.$$ {
	export class $hd_canary_app extends $.$hd_canary_app {
		// override key_public() {
		// 	return this.$.$hyoo_crus_auth.current().public().toString()
		// }

		@$mol_mem
		share_link() {
			return this.$.$mol_state_arg.link({
				panel: this.$.$hyoo_crus_glob.home($hd_canary_app_home).land_ref().description!,
			})
		}
		
		// эту логику я бы добавил в какой нибудь из корневых компонентов или 
		// как плагин, что бы можно было во вью три передать иконку для сайта
		Favicon() {
			this.apply_favicon()
			return super.Favicon()
		}

		@$mol_mem
		favicon_data() {
			const path = new $.$mol_icon_bird().path()
			const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${path}"/></svg>`
			return 'data:image/svg+xml,' + encodeURIComponent(svg)
		}

		@$mol_mem
		apply_favicon() {
			this.$.$mol_state_time.now(0)

			const doc = this.$.$mol_dom_context.document
			let link = doc.querySelector('link[rel="icon"]') as HTMLLinkElement | null
			if (!link) {
				link = doc.createElement('link')
				link.rel = 'icon'
				doc.head.appendChild(link)
			}
			link.type = 'image/svg+xml'
			link.href = this.favicon_data()
			return null as any
		}
	}
}
