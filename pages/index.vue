<script setup lang="ts">

definePageMeta({
	middleware: ["auth"]
});

</script>

<template>
	<header>
		<div class="wrapper">

			<ActivitiesFilters />
			<div class="distance"><span>123,23</span><span>km</span></div>
			<div class="stats">
				<div>
					<span>11</span>
					<span>Courses</span>
				</div>
				<div>
					<span>5’22”</span>
					<span>Allure moy.</span>
				</div>
				<div>
					<span>1:02:23</span>
					<span>Temps</span>
				</div>
			</div>
		</div>
	</header>
	<Activities />
</template>

<style scoped lang="scss">
.selects {
	display: flex;
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