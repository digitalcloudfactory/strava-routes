<script setup lang="ts">
const accessToken = useCookie("accessToken")

const { data: athlete } = await useLazyAsyncData(
	'activities',
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

		<div class="profile">
			<img v-if="athlete" :src="athlete.profile_medium" alt="">
			<span v-else class="placeholder"></span>
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
	margin-left: auto;
	width: 2.25rem;
	height: 2.25rem;

	span,
	img {
		object-fit: cover;
		border-radius: 100%;
	}
}

.placeholder {
	display: block;
	width: 100%;
	height: 100%;
	background: #bbbbbb;
}
</style>