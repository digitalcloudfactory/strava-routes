<script setup lang="ts">
const years = ['2021', '2022', '2023', '2024']
const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

const year = ref(years[0])
const month = ref(months[0])
</script>

<template>
	<div>
		<USelect v-model="year" :options="years" />
		<USelect v-model="month" :options="months" />
	</div>
</template>

<style scoped>
div {
	display: flex;
	gap: .5rem;
}
</style>