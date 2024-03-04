<script setup lang="ts">
const { data } = defineProps<{
	data: Activity
}>()

const formattedDate = computed(() => {
	return dateFormater(data.start_date_local,
		{
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric"
		});
});

const formattedLocation = computed(() => {
	return [data.location_city, data.location_state, data.location_country].filter(Boolean).join(", ");
});

</script>

<template>
	<div>
		<h1>
			<span class="icon" :class="typeFormater(data.type)"></span>
			<span>{{ data.name }}</span>
		</h1>
		<p>{{ formattedDate }} &bull; {{ formattedLocation }}</p>
	</div>
</template>

<style scoped lang="scss">
div {
	display: flex;
	flex-direction: column;
	gap: 0.4375em;
}

h1 {
	font-size: 1.5rem;
	display: flex;
	align-items: center;
	gap: 0.4375em;
}

p {
	font-size: 1rem;
	color: var(--gray);
}
</style>