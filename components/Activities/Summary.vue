<script setup lang="ts">

const activitiesStore = useActivitiesStore();

const { currentActivities } = storeToRefs(activitiesStore);

const defaultValues = {
	total: 0,
	distance: "--",
	time: "--:--:--",
	averageSpeed: "--'--''"
}

const summary = ref(defaultValues)

watch(currentActivities, () => {
	if (currentActivities.value.length === 0) {
		summary.value = defaultValues;
		return;
	}
	summary.value = getCurrentActivitiesSummary(currentActivities.value);
})

</script>

<template>
	<header>
		<div class="wrapper">
			<ActivitiesFilters />
			<div class="distance"><span>{{ summary.distance }}</span><span>km</span></div>
			<div class="stats">
				<div>
					<span>{{ summary.total }}</span>
					<span>Courses</span>
				</div>
				<div>
					<span>{{ summary.averageSpeed }}</span>
					<span>Allure moy.</span>
				</div>
				<div>
					<span>{{ summary.time }}</span>
					<span>Temps</span>
				</div>
			</div>
		</div>
	</header>
</template>

<style scoped lang="scss">
.stats {
	display: flex;
	max-width: 21.125rem;
	align-items: flex-start;
	gap: 2.125rem;

	&>div {
		display: flex;
		flex-direction: column;


		span {
			color: var(--gray);
			font-size: 0.875rem;
		}

		span:first-child {
			color: var(--black);
			font-size: 1.25rem;
			font-weight: 500;
		}
	}
}

header {
	background: var(--white);

	.wrapper {
		display: flex;
		max-width: 800px;
		margin-inline: auto;

		flex-direction: column;
		gap: 1rem;
		padding: 1.75rem 1.5rem 3.25rem;
	}

	.distance {
		display: inline-flex;
		align-items: baseline;
		gap: 0.375rem;

		span:first-child {
			font-size: 2.5rem;
		}

		span {
			font-size: 1rem;
		}
	}
}
</style>