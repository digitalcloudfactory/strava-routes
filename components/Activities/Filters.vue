<script setup lang="ts">

const activitiesStore = useActivitiesStore();

const { year, month } = toRefs(activitiesStore.filters)

const years = new Array(3).fill(0).map((_, i) => new Date().getFullYear() - i)

const months = computed(() =>
	new Array(12).fill(0).map((_, i) => ({
		value: i + 1,
		label: new Date(0, i).toLocaleString('default', { month: 'long' }).replace(/^\w/, c => c.toUpperCase()),
		disabled: year.value === new Date().getFullYear() && i + 1 > new Date().getMonth() + 1
	}))
)

watch([year, month], () => {
	// if the selected month is disabled, we select the first available month
	if (months.value.find(m => m.value === month.value)?.disabled) {
		month.value = months.value.find(m => !m.disabled)!.value
	}

	activitiesStore.setFilters({
		year: year.value,
		month: month.value
	})
})

</script>

<template>
	<ClientOnly>
		<div class="selects">
			<USelectMenu v-model="year" :options="years" class="w-auto" size="md" />
			<USelectMenu v-model="month" :options="months" value-attribute="value" option-attribute="label" class="w-32"
				size="md" />
		</div>
	</ClientOnly>
</template>

<style scoped>
.selects {
	display: flex;
	gap: .5rem;
}
</style>