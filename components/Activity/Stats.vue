<script setup lang="ts">

const { activity } = defineProps<{
	activity: ActivityFormatted
}>()

</script>

<template>
	<div class="stats">
		<h2>Statistique</h2>
		<div class="grid">
			<div class="tile">
				<span class="title">Temps</span>
				<span class="value">{{ activity.moving_time }}</span>
			</div>
			<div class="tile primary">
				<span class="title">Distance</span>
				<div class="value"><span>{{ activity.distance }}</span><sub>km</sub>
				</div>
			</div>
			<div class="tile row-span-2">
				<span class="title">Allure</span>
				<span class="value">{{ activity.average_speed }}</span>
			</div>
			<div class="tile row-span-1 col-span-1">
				<span class="title">Kudo</span>
				<span class="value">{{ activity.kudo_count }}</span>
			</div>
			<div class="tile col-span-3">
				<span class="title">Dénivelé</span>
				<div class="value"><span>+{{ activity.total_elevation_gain }}</span><sub>m</sub></div>
			</div>
			<div class="tile col-span-3">
				<span class="title">Calories</span>
				<span class="value">{{ activity.calories }}</span>
			</div>
			<div class="tile col-span-3" v-if="activity.average_heartrate">
				<span class="title">FC Moyenne</span>
				<div class="value"><span>{{ activity.average_heartrate }}</span><sub>BPM</sub></div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
h2 {
	font-size: 1rem;
	text-transform: uppercase;
	color: var(--c-gray);
	margin-bottom: 0.5rem;
}

.grid {
	display: grid;
	gap: 0.6875rem;
	grid-template-columns: repeat(6, 1fr);
}

.tile {
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	border-radius: .5rem;
	padding: .5rem;
	background: var(--c-light);
	transition: background 150ms;
	grid-column-start: span 2;
	cursor: default;

	&:hover {
		background: var(--c-primary);
		color: var(--c-light);
	}

	.title {
		text-transform: uppercase;
		font-size: .875rem;

	}

	.value {
		font-size: 1.5rem;
		font-weight: 500;
	}

	&.col-span-1 {
		grid-column-start: span 1;
	}

	&.row-span-1 {
		grid-row-start: span 1;
	}

	&.col-span-2 {
		grid-column-start: span 2;
	}

	&.row-span-2 {
		grid-row-start: span 2;
	}

	&.col-span-3 {
		grid-column-start: span 3;
	}

	&.row-span-3 {
		grid-row-start: span 3;
	}
}

sub {
	text-transform: uppercase;
	margin-inline-start: .25em;
	font-size: .875rem;
	vertical-align: .25em;
}
</style>