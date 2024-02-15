<script setup>
const config = useRuntimeConfig();

const data = await getActivitiesFormated(config.public.apiMapboxToken)

const sortValues = ["date", "distance", "time", "elevation"]
const sortValue = ref(null)
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
			<ActivityCard v-if="data" v-for="run in data" :run="run" />
			<div v-else>Chargement...</div>
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

		div {
			display: block;
		}
	}
}
</style>