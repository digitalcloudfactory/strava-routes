<script setup lang="ts">
const config = useRuntimeConfig();
const accessToken = useCookie("accessToken");

const activitiesStore = useActivitiesStore();

const filters = computed(() => activitiesStore.filters);

const { data, pending } = await useLazyAsyncData(
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
			per_page: 50,
		}
	}) as Promise<Activities>, {}
);

const activities = computed(() => {
	const filtered = getActivitiesFiltered(data.value as Activities, filters.value)
	const sorted = getActivitiesSorted(filtered);
	const formatted = getActivitiesFormatted(sorted, config.public.apiMapboxToken);

	activitiesStore.setActivities(filtered);

	return formatted;
});

</script>

<template>
	<main>
		<div class="title">
			<h1>Activités</h1>
			<ActivitiesSort />
		</div>
		<div class="activities">
			<ActivityCard v-if="pending" v-for="i in 5" :key="i" :skeleton="pending" />
			<ActivityCard v-else-if="!activities.length" :empty="true" />
			<ActivityCard v-else v-for="run in activities" :key="run.id" :run="run" />
		</div>
	</main>
</template>

<style scoped lang="scss">
main {
	.title {
		margin-bottom: .75rem;
	}

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