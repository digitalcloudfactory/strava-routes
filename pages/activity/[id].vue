<script setup lang="ts">
definePageMeta({
	middleware: ["auth"],
	name: "activity"
});

const id = useRoute().params.id;
const accessToken = useCookie("accessToken");

const { data, pending } = await useAsyncData(
	`activity-${id}`,
	() => $fetch(`https://www.strava.com/api/v3/activities/${id}`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${accessToken.value}`
		}
	}) as Promise<Activity>, {}
)
</script>

<template>
	<template v-if="pending">
		Chargement...
	</template>
	<template v-else>
		<h1>{{ data.name }}</h1>
		<p> {{ data.description || "Pas de description" }}</p>
	</template>
</template>