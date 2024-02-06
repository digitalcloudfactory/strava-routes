<script setup lang="ts">

const route = useRoute()

const accessToken = await useFetch("/api/exchange_token",
	{
		method: "GET",
		params: {
			code: route.query.code
		}
	}
)

</script>

<template>
	<main>
		<pre>
			{{ accessToken.data }}
		</pre>
	</main>
</template>
