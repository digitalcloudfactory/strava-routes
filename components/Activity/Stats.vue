<script setup lang="ts">

const { activity } = defineProps<{
	activity: ActivityFormatted
}>()

</script>

<template>
	<div class="grid">
		<div class="tile">
			<span class="title">Temps</span>
			<span class="value">{{ activity.moving_time }}</span>
		</div>
		<div class="tile primary">
			<span class="title">Distance</span>
			<span class="value">{{ activity.distance }}</span>
		</div>
		<div class="tile">
			<span class="title">Kudo</span>
			<span class="value">{{ activity.kudo_count }}</span>
		</div>
		<div class="tile">
			<span class="title">FC Moyenne</span>
			<span class="value">{{ activity.average_heartrate }}</span>
		</div>
		<div class="tile">
			<span class="title">Calories</span>
			<span class="value">{{ activity.calories }}</span>
		</div>
		<div class="tile">
			<span class="title">Dénivelé</span>
			<span class="value">+{{ activity.total_elevation_gain }}</span>
		</div>
		<div class="tile">
			<span class="title">Allure</span>
			<span class="value">{{ activity.average_speed }}</span>
		</div>
	</div>
</template>

<style scoped lang="scss">
.grid {
	display: grid;
	gap: 0.6875rem;
	grid-template-rows: repeat(3, 1fr);
	grid-template-columns: repeat(3, 1fr);
}

.tile {
	display: flex;
	flex-direction: column;
	text-align: center;
	border-radius: .5rem;
	padding: .5rem;
	background: var(--white);

	&.primary {
		background: var(--primary);
		color: var(--white);
	}

	.title {
		text-transform: uppercase;
		font-size: .875rem;

	}

	.value {
		font-size: 1.5rem;
		font-weight: 500;
	}
}
</style>