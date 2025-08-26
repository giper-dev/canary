/** @jsx $mol_jsx */
namespace $ {
	$hyoo_crus_yard.masters = [
		"http://localhost:9090/"
		// "http://127.0.0.1:9090/"
		// $mol_dom_context.document.location.origin +'/',
	]

	// используем hyoo_crus_app_node чтобы сразу иметь крас ноду
	export class $hd_canary extends $hyoo_crus_app_node {
		// Функция для отправки данных в Telegram
		
		@$mol_action
		hd_canary_alert_to_telegram( message: string ) {
			const $hd_canary_telegram_token = process.env.TELEGRAM_TOKEN || ""
			console.log({$hd_canary_telegram_token})
			if($hd_canary_telegram_token == "")
				return;
			const chatId = '466661457' // ID получателя (пользователя)
			const apiUrl = `https://api.telegram.org/bot${ $hd_canary_telegram_token }/sendMessage` // URL для отправки сообщения


			// Параметры, которые будем отправлять
			const params = {
				chat_id: chatId, // ID чата
				text: message, // Текст сообщения
				parse_mode: 'HTML' // Режим парсинга HTML
			}

			// Отправляем данные с помощью fetch API
			return $mol_fetch.json( apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify( params )
			} )
		}


		@ $mol_mem
		_stat_update() {
			this.$.$mol_log3_done({
				place: this,
				message: "_stat_update",
				...{action:"tick", url: "_stat_update", title: "_stat_update" }
			});
			this.hd_canary_alert_to_telegram("restart node")

			this.alerting()

			this.ping_sites_loop()

		}

		@ $mol_mem
		alerting() {
			const home_land = this.$.$hyoo_crus_glob.home().land()
			const list = home_land.Node( $hd_canary_app_server ).Item('').Users(null)!

			for (const ref of list.items()) {
				try {
					const user = this.$.$hyoo_crus_glob.Node((ref as $hyoo_crus_ref), $hd_canary_app_home )
					for (const site of user.Sites(null)?.remote_list() ?? []) { 

						// ALERT о падении
						if(site.last_ping_status(null)!.val() == false && (site.sended_alert(null)!.val() == false || site.sended_alert(null)!.val() == null)) {
							this.hd_canary_alert_to_telegram(JSON.stringify({action:"site_down", url: site.url(null)!.val() }))

							this.$.$mol_log3_fail({
								place: this,
								message: "ALERT",
								...{action:"down_site", url: site.url(null)!.val() }
							});

							site.sended_alert(null)!.val(true)
						}

						// ALERT о поднятии
						if(site.last_ping_status(null)!.val() == true && site.sended_alert(null)!.val() == true) {
							this.hd_canary_alert_to_telegram(JSON.stringify({action:"site_up", url: site.url(null)!.val() }))

							this.$.$mol_log3_fail({
								place: this,
								message: "ALERT",
								...{action:"down_up", url: site.url(null)!.val() }
							});

							site.sended_alert(null)!.val(false)
						}

					}
				} catch( error ) {
					$mol_fail_log( error )
					continue;
				}
			}
		}

		@ $mol_mem
		ping_sites_loop() {
			const home_land = this.$.$hyoo_crus_glob.home().land()
			const list = home_land.Node( $hd_canary_app_server ).Item('').Users(null)!

			for (const ref of list.items()) {
				try {
					const user = this.$.$hyoo_crus_glob.Node((ref as $hyoo_crus_ref), $hd_canary_app_home )
					for (const site of user.Sites(null)?.remote_list() ?? []) { 
						site.tick()
					}
				} catch( error ) {
					$mol_fail_log( error )
					continue;
				}
			}
		}

		@ $mol_memo.method
		join() {
			return new $hd_canary_join
		}
	}



	export class $hd_canary_join extends $mol_rest_resource {
		
		GET( msg: $mol_rest_message ) {

			const home_land = this.$.$hyoo_crus_glob.home().land()
			home_land.give(null, $hyoo_crus_rank_rule)

			const list = home_land.Node( $hd_canary_app_server ).Item('')

			msg.reply( list.ref().description! )
		}
		
	}
}

$.$hd_canary.serve()

/*
npm start
+ hd/canary port=9090
*/
