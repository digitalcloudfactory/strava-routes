<script setup lang="ts">

defineProps<{
	run?: ActivityFormated,
	skeleton?: boolean
}>()
</script>

<template>
	<template v-if="skeleton">
		<div class="article skeleton">
			<div class="header">
				<div class="map">
					<span class="skeleton-img"></span>
				</div>
				<div class="header">
					<div class="info">
						<div class="skeleton-text"></div>
						<div class="skeleton-text"></div>
					</div>
					<div class="name">
						<div class="skeleton-text"></div>
					</div>
				</div>
			</div>
			<div class="stats">
				<div>
					<div class="skeleton-text"></div>
					<div class="skeleton-text"></div>
				</div>
				<div>
					<div class="skeleton-text"></div>
					<div class="skeleton-text"></div>
				</div>
				<div>
					<div class="skeleton-text"></div>
					<div class="skeleton-text"></div>
				</div>
			</div>
		</div>

	</template>
	<NuxtLink v-else-if="run" class="article" :to="{
		name: 'activity',
		params: {
			id: run.id
		}
	}">
		<div class="header">
			<div class="map">
				<img :src="run.map_preview" alt="" />
			</div>
			<div class="header">
				<div class="info">
					<span class="icon" :class="run.type"></span>
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
	</NuxtLink>
</template>

<style scoped lang="scss">
.article {
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
			align-items: center;
			gap: 0.5rem;
		}

		.name {
			font-size: 0.875rem;
			color: var(--gray);
		}
	}

	&.skeleton {
		.skeleton-img {
			border-radius: 0.5rem;
			display: block;
			width: 6rem;
			height: 6rem;


		}

		.skeleton-text {
			display: block;
			width: 10ch;
			margin: 0.25rem;
			height: 1em;

			border-radius: 0.25rem;
		}

		.skeleton-img,
		.skeleton-text {
			background: var(--gray);
		}


		.map {
			overflow: visible;

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