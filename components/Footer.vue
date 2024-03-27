<template>
	<footer>
		<p>Powered by <a href="https://strava.com" target="_blank">Strava</a></p>
		<p>View this project on <a href="https://github.com/baptistejouin/my-strava-metrics" target="_blank">GitHub</a>
		</p>
		<p>© {{ new Date().getFullYear() }} Baptiste Jouin</p>
	</footer>
</template>

<style scoped>
footer {
	font-size: 12px;
	color: var(--c-gray);
	margin-block: 2em;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 1em;
}

a:hover {
	text-decoration: underline;
}
</style>