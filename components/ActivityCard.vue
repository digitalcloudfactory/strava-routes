<script setup lang="ts">
defineProps<{
	run: ActivityFormated
}>()
</script>

<template>
	<article>
		<div class="header">
			<div class="map">
				<img :src="run.map_preview" alt="" />
			</div>
			<div class="header">
				<div class="info">
					<span>{{ run.type }}</span>
					<span>{{ run.date }}</span>
				</div>
				<div class="name">
					{{ run.name }}
				</div>
			</div>
		</div>
		<div class="stats">
			<div>
				<span>{{ run.distance }}</span>
				<span>km</span>
			</div>
			<div>
				<span>{{ run.average_speed }}</span>
				<span>Allure moy.</span>
			</div>
			<div>
				<span>{{ run.moving_time }}</span>
				<span>Temps</span>
			</div>
		</div>
	</article>
</template>

<style scoped lang="scss">
article {
	display: flex;
	background: var(--white);
	padding: 1rem 1.05rem;
	flex-direction: column;
	align-items: flex-start;
	border-radius: 0.5rem;
	gap: 1.25rem;

	.header {
		display: flex;
		width: 100%;
		gap: 1rem;

		.map {
			max-width: 6rem;
			border-radius: 0.5rem;
			overflow: hidden;

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		.header {
			flex-direction: column;

			gap: 0.25rem;
		}

		.info {
			display: flex;
			gap: 0.5rem;
		}

		.name {
			font-size: 0.875rem;
			color: var(--gray);
		}
	}
}

.stats {
	display: flex;
	width: 21.125rem;
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
</style>