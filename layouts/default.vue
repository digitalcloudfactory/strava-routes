<template>
	<main>
		<Navbar />
		<slot />
	</main>
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
	max-width: 800px;
	margin: 0 auto;
	padding: 1rem;
}
</style>