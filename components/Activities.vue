<script setup lang="ts">
const config = useRuntimeConfig();
const accessToken = useCookie("access_token");

const activitiesStore = useActivitiesStore();

const { sortAsc, sortBy, filters } = storeToRefs(activitiesStore)

const { data, pending } = useLazyAsyncData(
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
			per_page: 200,
		}
	}) as Promise<Activities>, {}
);

const activities = computed(() => {
	if (!data.value) return [];

	const filtered = getActivitiesFiltered(data.value, filters.value);
	const sorted = getActivitiesSorted(filtered, sortBy.value, sortAsc.value);
	const formatted = getActivitiesFormatted(sorted, config.public.apiMapboxToken);

	activitiesStore.setActivities(filtered);

	return formatted;
});

</script>

<template>
	<main class="wrapper">
		<template v-if="activities.length >= 1">
			<div class="title">
				<h1>Activités</h1>
				<ActivitiesSort />
			</div>
			<div class="activities">
				<ActivityCard v-for="run in activities" :key="run.id" :run="run" :skeleton="pending" />
			</div>
		</template>
		<ActivitiesNotFound v-else />
	</main>
</template>

<style scoped lang="scss">
main {
	gap: 1.125rem;

	h1 {
		font-size: 0.875rem;
		font-weight: 500;
	}

	div {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.activities {
		display: flex;
		flex-direction: column;
		align-items: normal;
		justify-content: normal;
		gap: 1rem;
	}
}
</style>