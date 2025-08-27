module.exports = {
	apps: [
		{
			name: "canary",
			script: "node.js",
			cwd: "./-/",
			args: "port=9090",
			autorestart: true,
			env: {
				"TELEGRAM_TOKEN": ""
			},
		},
	],
};
