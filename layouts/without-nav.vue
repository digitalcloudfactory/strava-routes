<template>
	<slot />
</template>

<style>
*,
*::before,
*::after {
	box-sizing: border-box;
}

html {
	font-family: sans-serif;
}

body {
	margin: 0;
	padding: 0;
}

main {
	margin: 2rem auto;
	max-width: 800px;
	display: flex;
	flex-direction: column;
	gap: 1.125rem;
}

a {
	color: inherit;
	text-decoration: none;
	margin: 0;
	padding: 0;
}
</style>