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
		<h1>You must be logged in !</h1>
		<p>This app uses your account to retrieve data via API, please login using the link below and accept the requested
			information</p>
		<a :href="href">Login with Strava
			<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none">
				<path
					d="m19.893 22.88 2.44-4.84h3.6L19.92 30l-6.093-11.96h3.6l2.466 4.84Zm-5.72-11.333-3.266 6.52h-4.84L14.147 2l8.173 16.067h-4.84l-3.307-6.52Z"
					fill="#fff" />
			</svg>
		</a>
	</main>
</template>

<style scoped lang="scss">
main {
	align-items: center;
	gap: 1.125rem;
	text-align: center;
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
	padding: 0.625rem 1.25rem;
	background: #FC4C02;
	color: #fff;
	gap: 0.625rem;
	border-radius: 1.25rem;

	@include after(sm) {
		padding: 0.75rem 1.8rem;
	}

	&:hover {
		background: #d04513;
	}
}

svg {
	width: 2rem;
	height: 2rem;
}
</style>