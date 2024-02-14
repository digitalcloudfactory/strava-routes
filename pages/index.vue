<script setup lang="ts">

definePageMeta({
	middleware: ["auth"]
});

const config = useRuntimeConfig();

const data = await getActivitiesFormated(config.public.apiMapboxToken)

</script>

<template>
	<header>
		<div class="wrapper">

			<div class="selects">
				<div class="select">
					<select name="year" id="year-select">
						<option value="2021">2021</option>
						<option value="2022">2022</option>
						<option value="2023">2023</option>
					</select>
				</div>
				<div class="select">
					<select name="month" id="month-select">
						<option value="1">Janvier</option>
						<option value="2">Février</option>
						<option value="3">Mars</option>
						<option value="4">Avril</option>
						<option value="5">Mai</option>
						<option value="6">Juin</option>
						<option value="7">Juillet</option>
						<option value="8">Août</option>
						<option value="9">Septembre</option>
						<option value="10">Octobre</option>
						<option value="11">Novembre</option>
						<option value="12">Décembre</option>
					</select>
				</div>
			</div>
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
	<main>
		<div class="title">
			<h1>Activités</h1>
			<div class="select">
				<select name="sortBy" id="sortBy-select">
					<option value="date">Date</option>
					<option value="distance">Distance</option>
					<option value="time">Temps</option>
					<option value="elevation">Dénivelé</option>
				</select>
			</div>
		</div>
		<div class="activities">
			<ActivityCard v-if="data" v-for="run in data" :run="run" />
			<div v-else>Chargement...</div>

		</div>
	</main>
</template>

<style scoped lang="scss">
.selects {
	display: flex;
	gap: .5rem;
}

.select {
	position: relative;
	display: inline-flex;
	align-items: center;

	select {
		padding-left: 1.5rem;
	}

	&:before {
		display: block;
		content: "";
		background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M12 15L7 10H17L12 15Z' fill='currentColor' /%3E%3C/svg%3E") no-repeat;
		background-size: 1.5rem 1.5rem;
		width: 1.5rem;
		height: 1.5rem;
		position: absolute;
		left: 0;
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

main {
	.select:before {
		background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M11 18V9.825L7.4 13.4L6 12L12 6L18 12L16.6 13.4L13 9.825V18H11Z' fill='black'/%3E%3C/svg%3E") no-repeat;
	}

	h1 {
		font-size: 0.875rem;
		font-weight: 500;
	}

	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.activities {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
}
</style>