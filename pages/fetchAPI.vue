<script setup lang="ts">

definePageMeta({
	middleware: ["auth"]
})

const accessToken = useCookie("accessToken")

const { refresh, pending, data: activities } = await useLazyAsyncData(
	'activities',
	() => $fetch("https://www.strava.com/api/v3/athlete/activities", {

		method: "GET",
		headers: {
			Authorization: `Bearer ${accessToken.value}`
		},
		query: {
			before: null,
			after: null,
			page: 1,
			per_page: 3,
		}
	}) as Promise<Activities>, {}
)

</script>

<template>
	<div>
		<h1>Fetch API</h1>
		<button @click="refresh()">Refresh</button>

		<section v-if="pending">
			Loading...
		</section>
		<section v-else>
			<ul>
				<li v-for="activity in activities" :key="activity.id">
					{{ activity.name }} /
					{{ activity.distance }}m /
					{{ activity.start_date }}
				</li>
			</ul>
		</section>



	</div>
</template>
