namespace $.$$ {
	export class $hd_canary_app_bar extends $.$hd_canary_app_bar {

		users() {
			const presets = this.$.$hyoo_crus_glob.home( $hd_canary_app_home ).SharedPresets(null)!
			return presets.items().map( key => this.Panel( key ) )
		}

		selected_home(ref : $hyoo_crus_ref) {
			return this.$.$hyoo_crus_glob.Node( ref,  $hd_canary_app_home )
		}

		panel_title(ref : $hyoo_crus_ref) {
			if(this.selected_home(ref).title() != "")
				return this.selected_home(ref).title()

			return this.selected_home(ref).land_ref().description!
		}
	}
}
