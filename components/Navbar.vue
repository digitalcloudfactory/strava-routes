<template>
	<nav>
		<NuxtLink to="/">Home</NuxtLink>
		<NuxtLink to="/fetchAPI">FetchAPI</NuxtLink>
		<NuxtLink to="/login">Login</NuxtLink>
	</nav>
</template>

<style scoped>
nav {
	display: flex;
	margin: 1rem;
	gap: 1rem;
	border-bottom: 1px solid #000;
	padding: 1rem 0;
}

a {
	text-decoration: none;
	color: #000;

	&:hover {
		text-decoration: underline;
	}

	&.router-link-exact-active {
		color: blueviolet;
	}
}
</style>