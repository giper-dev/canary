namespace $.$$ {
	export class $giper_canary extends $.$giper_canary {
		
		override targets( next?: Record< string, { title: string } > ) {
			return this.$.$mol_state_local.value( 'targets', next ) ?? {}
		}
		
		override target_list() {
			return Object.keys( this.targets() ).reverse().map( url => this.Target( url ) )
		}
		
		override target_url( url: string ) {
			return url
		}
		
		override add_submit() {
			
			this.targets({
				... this.targets(),
				[ this.add_url() ]: { title: this.add_title() },
			})
			
			this.add_url('')
			this.add_title('')
			
		}
		
		@ $mol_mem
		checking() {
			
			this.$.$mol_state_time.now( 5 * 60 * 1000 )
			
			const targets = Object.keys( this.targets() ).reverse()
			
			for( const target of targets ) {
				this.target_result( target, 1 )
			}
			
			for( const target of targets ) {
				
				try {
					
					const resp = this.$.$mol_fetch.json( `https://whateverorigin.org/get?url=${ encodeURIComponent( target ) }` ) as any
					
					const ok = Math.floor( resp.status.http_code / 100 ) === 2
					this.target_result( target, ok ? 0 : 2 )
					this.target_message( target, ok ? '' : `${ resp.status.http_code }` )
					
					this.target_moment( target, new $mol_time_moment().toString( 'YYYY-MM-DD hh:mm:ss' ) )
					
				} catch( error: unknown ) {
					
					if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
					this.target_result( target, 3 )
					
					if( error instanceof Error ) {
						this.target_message( target, error.message )
					}
					
					this.target_moment( target, new $mol_time_moment().toString( 'YYYY-MM-DD hh:mm:ss' ) )
					
				}
				
			}
			
		}
		
		@ $mol_mem_key
		target_rows( url: string ) {
			return [
				this.Target_main( url ),
				... this.target_message( url ) ? [ this.Target_message( url ) ] : [],
				this.Target_moment( url ),
			]
		}
		
		@ $mol_mem
		override status_total() {
			const result = Object.keys( this.targets() ).reduce( ( max, url )=> Math.max( max, this.target_result( url ) ), 0 )
			return [ '🟢', '🟡', '🟠', '🔴' ][ result ]
		}
		
		@ $mol_mem_key
		override target_status( url: string ) {
			if( this.target_result( url ) === 1 ) this.checking()
			return [ '🟢', '🟡', '🟠', '🔴' ][ this.target_result( url ) ]
		}
		
		@ $mol_mem_key
		override target_title( url: string ) {
			return this.targets()[ url ].title || url.replace( /(^https?:\/\/)|(\/+$)/g, '' )
		}
		
		override target_remove( url: string ) {
			const targets = { ... this.targets() }
			delete targets[ url ]
			this.targets( targets )
		}
		
	}
}
