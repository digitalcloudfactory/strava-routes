<script setup lang="ts">
const years = ['2021', '2022', '2023', '2024']
const months = [{
	value: 1,
	label: "Janvier"
}, {
	value: 2,
	label: "Février"
}, {
	value: 3,
	label: "Mars"
}, {
	value: 4,
	label: "Avril"
}, {
	value: 5,
	label: "Mai"
}, {
	value: 6,
	label: "Juin"
}, {
	value: 7,
	label: "Juillet"
}, {
	value: 8,
	label: "Août"
}, {
	value: 9,
	label: "Septembre"
}, {
	value: 10,
	label: "Octobre"
}, {
	value: 11,
	label: "Novembre"
}, {
	value: 12,
	label: "Décembre"
}
]

const activitiesStore = useActivitiesStore();

const { year, month } = toRefs(activitiesStore.filters)

watch([year, month], () => {
	activitiesStore.setFilters({
		year: year.value,
		month: month.value
	})
})


</script>

<template>
	<div>
		<USelect v-model="year" :options="years" />
		<USelect v-model="month" :options="months" option-attribute="label" />
	</div>
</template>

<style scoped>
div {
	display: flex;
	gap: .5rem;
}
</style>