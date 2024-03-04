<script setup lang="ts">
const accessToken = useCookie("accessToken")

const athlete = await useLazyAsyncData(
	'profil',
	() => $fetch("https://www.strava.com/api/v3/athlete", {

		method: "GET",
		headers: {
			Authorization: `Bearer ${accessToken.value}`
		}
	}) as Promise<Athlete>, {}
)
</script>

<template>
	<nav>
		<NuxtLink to="/">MyMetrics</NuxtLink>
		<NuxtLink to="/stats">Stats</NuxtLink>
		<div class="profile" v-if="athlete.data.value">
			<span>@{{ athlete.data.value?.username }}</span>
			<img :src="athlete.data.value?.profile_medium" :alt="`Photo de ${athlete.data.value?.username}`">
		</div>
	</nav>
</template>

<style scoped lang="scss">
nav {
	display: flex;
	align-items: center;
	gap: 1rem;
	border-bottom: 1px solid var(--black);
	background-color: var(--white);
	padding: 1rem 1.5rem;
}

a {
	color: var(--gray);

	&:hover {
		text-decoration: underline;
	}

	&.router-link-exact-active {
		color: var(--black);
	}
}

.profile {
	display: flex;
	margin-left: auto;
	align-items: center;
	flex-direction: row;
	gap: 1rem;

	img {
		width: 2.25rem;
		height: 2.25rem;
		object-fit: cover;
		border-radius: 100%;
	}
}
</style>