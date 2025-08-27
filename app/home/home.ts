namespace $ {

	export class $hd_canary_app_server extends $hyoo_crus_dict.with({
		Users: $hyoo_crus_list_ref_to( () => $hyoo_crus_atom_ref ),
	}) {}
	
	export class $hd_canary_app_home extends $hyoo_crus_home.with({
		Sites: $hyoo_crus_list_ref_to( ()=> $hd_canary_app_home_site ),
		SharedPresets: $hyoo_crus_list_ref_to( () => $hyoo_crus_ref ),
	}) {}

	export class $hd_canary_app_home_site extends $hyoo_crus_dict.with( {
		/** Type of value */
		url: $hyoo_crus_atom_str,
		title: $hyoo_crus_atom_str,
		
		last_ping_time: $hyoo_crus_atom_time,
		last_ping_status: $hyoo_crus_atom_bool,
		
		sended_alert: $hyoo_crus_atom_bool,
	}) {

		@ $mol_mem
		tick() {
			
			this.$.$mol_state_time.now( 5000 )

			this.$.$mol_log3_done({
				place: this,
				message: this.land().ref().description!,
			});

			if(this.can_change()) {
				const url = this.url()!.val() as string
				const title = this.title()!.val() as string
// console.log({url, title})
				this.$.$mol_log3_done({
					place: this,
					message: this.land().ref().description!,
					...{action:"tick", url, title, last_ping_status: this.last_ping_status(null)!.val() }
				});

				const request = $mol_fetch.response(url)

				this.last_ping_status(null)!.val( request.code() == 200)
				// if(this.last_ping_status(null)!.val())
					// this.sended_alert(null)!.val( false )
				
				this.last_ping_time(null)!.val( new $mol_time_moment)
				// console.log({status: request.code()})

			}

		}
	}
	
}
