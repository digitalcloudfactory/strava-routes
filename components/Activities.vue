<script setup lang="ts">
const config = useRuntimeConfig();
const accessToken = useCookie("accessToken");

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
			per_page: 10,
		}
	}) as Promise<Activities>, {}
);

const formatedData = getActivitiesFormated(data.value || [], config.public.apiMapboxToken);

const sortValues = ["date", "distance", "time", "elevation"]
const sortValue = ref(undefined)
</script>

<template>
	<main>
		<div class="title">
			<h1>Activités</h1>
			<div>
				<USelect v-model="sortValue" :options="sortValues" variant="none" placeholder="Trier par...">
					<template #trailing>
						<UIcon name="" />
					</template>
				</Uselect>
				<UButton icon="i-heroicons-arrow-up-20-solid" size="sm" color="primary" square variant="solid" />
			</div>

		</div>
		<div class="activities">
			<ActivityCard v-if="pending" v-for="i in 5" :key="i" :skeleton="pending" />
			<ActivityCard v-else v-for="run in formatedData" :key="run.id" :run="run" />
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