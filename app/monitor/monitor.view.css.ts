namespace $.$$ {
	$mol_style_define($.$hd_canary_app_monitor, {
		Add: {
			flex: {
				shrink: 1,
			},
		},
		Body_content: {
			gap: $mol_gap.block,
		},
		Target: {
			margin: $mol_gap.block,
			padding: $mol_gap.block,
			flex: {
				basis: `15rem`,
				grow: 1,
			},
			background: {
				color: $mol_theme.card,
			},
			border: {
				radius: $mol_gap.round,
			},
			box: {
				shadow: [{
						x: 0,
						y: 0,
						blur: 0,
						spread: `1px`,
						color: $mol_theme.line,
					}],
			},
		},
		Target_main: {
			align: {
				items: 'flex-start',
			},
		},
		Status_total: {
			width: `2.5rem`,
			height: `2.5rem`,
			padding: `.5rem`,
			justify: {
				content: 'center',
			},
		},
		Target_status: {
			width: `2.5rem`,
			height: `2.5rem`,
			padding: `.5rem`,
			justify: {
				content: 'center',
			},
		},
		Target_url: {
			flex: {
				grow: 1,
				shrink: 1,
			},
		},
		Target_moment: {
			padding: $mol_gap.text,
			color: $mol_theme.shade,
		},
		Target_message: {
			padding: $mol_gap.text,
			color: $mol_theme.focus,
		},
	});
}
