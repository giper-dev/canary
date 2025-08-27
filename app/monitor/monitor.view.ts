namespace $.$$ {
	$hyoo_crus_yard.masters = [
		$mol_dom_context.document.location.origin +'/',
	]

	export class $hd_canary_app_monitor extends $.$hd_canary_app_monitor {

		status_total() {
			return this.home().Sites(null)!.remote_list().every( key => key.last_ping_status()?.val() == true) ? "🟢" : "🔴"
		}

		target_status( prop: $hd_canary_app_home_site ) {
			return prop.last_ping_status()?.val() ? "🟢" : "🔴"
		}
		target_title(prop: $hd_canary_app_home_site) {
			return prop.title()!.val() as string
		}
		target_url(prop: $hd_canary_app_home_site) {
			return prop.url()!.val() as string;
		}
		target_moment(prop: $hd_canary_app_home_site) {
			return ((prop.last_ping_time()?.val() as $mol_time_moment) ?? "planed ping").toString('YYYY-MM-DD hh:mm:ss')// ?? prop.ref().description! as any
		}

		target_list() {
			return this.home().Sites(null)!.remote_list().map( key => this.Target( key ) ) ?? []
		}

		is_valid_http_url(string: string) {
			let url;
			try {
			  url = new URL(string);
			} catch (_) {
			  return false;
			}
			return url.protocol === "http:" || url.protocol === "https:";
		}

		add_submit() {
			const url = this.add_url().trim()
			if (url == "") throw "Empty url!"
			if (this.is_valid_http_url(url) == false) throw "Not valid url!"
			

			let title = this.add_title().trim()
			if (title == "") title = url.replace(/(^https?:\/\/)|(\/+$)/g, '');

			this.add_site(url, title)

			this.add_url('');
			this.add_title('');
		}

		@$mol_action
		add_site(url: string, title: string) {
			const new_site = this.home().Sites(null)!.make(null)
			new_site.land().give(null, $hyoo_crus_rank_rule)
			
			new_site.url(null)!.val(url)
			new_site.title(null)!.val(title)
		}

		
		Target_remove(prop: $hd_canary_app_home_site) {
			if (this.can_access()) {
				return super.Target_remove(prop)
			}
			return null as any
		}

		target_remove(prop: $hd_canary_app_home_site) {
			this.home().Sites(null)!.cut(prop.ref())
		}

		// наш id клиента
		my_key() {
			return this.$.$hyoo_crus_auth.current().lord().description!
		}

		@ $mol_mem
		users() {
			const ref = $hyoo_crus_ref( this.$.$mol_fetch.text( $hyoo_crus_yard.masters[0] + 'join' ) )
			return this.$.$hyoo_crus_glob.Node( ref,  $hd_canary_app_server ).Users(null)!
		}

		selected_panel( next?: string | null ) {
			return this.$.$mol_state_arg.value( 'panel', next ) ?? null
		}

		panel() {
			const panel = this.selected_panel()
			this.can_access(panel == null)
			if(panel == null)
				return this.$.$hyoo_crus_glob.home( $hd_canary_app_home )

			const ref = $hyoo_crus_ref(panel)
			if(this.$.$hyoo_crus_glob.home( $hd_canary_app_home ).SharedPresets(null)!.has(ref) == false) {
				this.$.$hyoo_crus_glob.home( $hd_canary_app_home ).SharedPresets(null)!.add(ref)
			}
			return this.$.$hyoo_crus_glob.Node( ref,  $hd_canary_app_home )
		}

		Add() {
			if(this.can_access())
				return super.Add()
			return this.Home_button()
		}

		go_to_home() {
			this.$.$mol_state_arg.value( 'panel', null )
		}

		panel_title() {
			if(this.can_access())
				return super.panel_title()

			return "Пользователь: " +this.shared_user_title()
		}
		
		shared_user_title() {
			if(this.panel().title() != "")
				return this.panel().title()
			return this.panel().land_ref().description
		}


		@$mol_mem
		can_access( next?: boolean) {
			return next ?? false
		}

		@ $mol_mem
		home() {
			// берем свой уголок
			let home = this.panel()//this.$.$hyoo_crus_glob.home( $hd_canary_app_home )

			if(this.can_access()){
				home.land().give(null, $hyoo_crus_rank_read)
				// проверяем есть ли он в базе
				if (this.users().has(home.ref()) == false) {

					// даем серверу права на запись
					const ref = $hyoo_crus_ref( this.$.$mol_fetch.text( $hyoo_crus_yard.masters[0] + 'ref' ) )
					home.land().give(ref, $hyoo_crus_rank_post("just"))

					// и заносим это в глобальную базу
					this.users().add(home.ref())

				}
			}

			return home
		}

		@$mol_action
		bulk_add(sites_input: string) {
			const sites = sites_input.split(/\r?\n/).map( site => site.trim()).filter(site => site != "")
			for (const site of sites) {
				this.add_site(site, site.replace(/(^https?:\/\/)|(\/+$)/g, ''))
			}
		}
	}
}
