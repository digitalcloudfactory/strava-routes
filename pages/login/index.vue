<script setup lang="ts">
definePageMeta({
	layout: "without-nav",
	middleware: ["auth"]
})

const config = useRuntimeConfig()
const href = `https://www.strava.com/oauth/authorize?client_id=${config.public.apiClientID}&response_type=code&redirect_uri=${config.public.apiRedirectURI}&approval_prompt=force&scope=activity:read_all,read_all`

</script>

<template>
	<main>
		<div class="wrapper">
			<h1>You must be logged in !</h1>
			<p>This app uses your account to retrieve data via API, please login using the link below and accept the
				requested
				information</p>
			<a :href="href" nofollow noindex>
				<span>Login with Strava</span>
				<span class="icon icon-strava"></span>
			</a>
		</div>
	</main>
</template>

<style scoped lang="scss">
main {
	display: flex;
	min-height: 60vh;
	justify-content: center;
}

.wrapper {
	display: flex;
	text-align: center;
	flex-direction: column;
	align-items: center;
	gap: 1.125rem;
}

h1 {
	font-size: 2rem;
	font-weight: 400;

	@include after(sm) {
		font-size: 3rem;
	}
}

p {
	text-align: center;

	@include after(sm) {
		font-size: 1.25rem;
	}
}

a {
	display: flex;
	justify-content: center;
	align-items: center;
	width: fit-content;
	padding: 0.625rem 1.25rem;
	background: #FC4C02;
	color: #fff;
	gap: 0.625rem;
	border-radius: 1.25rem;
	margin-top: 1.25rem;

	@include after(sm) {
		padding: 0.75rem 1.8rem;
	}

	&:hover {
		background: #d04513;
	}
}

.icon {
	width: 1.25rem;
	height: 1.25rem;
	background: var(--c-white);
}
</style>