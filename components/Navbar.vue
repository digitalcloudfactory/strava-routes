<template>
	<nav>
		<NuxtLink to="/">Home</NuxtLink>
		<NuxtLink to="/hello">Hello</NuxtLink>
	</nav>
</template>

<style scoped>
nav {
	display: flex;
	gap: 1rem;
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