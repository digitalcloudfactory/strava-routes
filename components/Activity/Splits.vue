<script setup lang="ts">
const { splits, id } = defineProps<{
	splits: Activity["splits_metric"],
	id: string
}>()

const averageSpeed = computed(() => {
	return splits.map((split) => split.average_speed)
})

const series = ref([
	{
		name: "Allure moyenne",
		data: averageSpeed.value,
		type: "column"
	},
	{
		name: "BPM",
		data: splits.map((split) => Math.round(split.average_heartrate)),
		type: "line",
	},
	{
		name: "Variation d'altitude",
		data: splits.map((split) => Math.round(split.elevation_difference)),
		type: "line",
	}
])

const options = ref({
	chart: {
		id: `splits-${id}`,
		type: "line",
		height: 400,
		toolbar: {
			tools: {
				download: false,
				selection: false,
				zoom: true,
				zoomin: false,
				zoomout: false,
				pan: false,
				reset: true
			}
		},
	},
	plotOptions: {
		bar: {
			borderRadius: 3,
			borderRadiusApplication: 'around',
			columnWidth: '90%',
			horizontal: false,
		}
	},
	stroke: {
		width: [0, 4, 3],
		curve: 'smooth'
	},
	dataLabels: {
		enabled: true,
		enabledOnSeries: [1],
		formatter: (value: number) => Math.round(value)
	},
	colors: ["#1ebeff", "#ff4560", "#000"],
	xaxis: {
		tooltip: {
			enabled: false
		}
	},
	yaxis: [
		{
			title: {
				text: "Allure moyenne"
			},
			labels: {
				formatter: (value: number) => averageSpeedFormater(value)
			},
			min: Math.min(...averageSpeed.value) - 0.15,
			max: Math.max(...averageSpeed.value) + 0.15,
		},
		{
			show: false,
			title: {
				text: "BPM"
			},
			labels: {
				formatter: (value: number) => `${Math.round(value)} bpm`
			},
			min: Math.min(...splits.map((split) => split.average_heartrate)) - 5,
			max: Math.max(...splits.map((split) => split.average_heartrate)) + 5,


		},
		{
			decimalsInFloat: false,
			opposite: true,
			title: {
				text: "Variation d'altitude"
			},
			labels: {
				formatter: (value: number) => `${Math.round(value)} m`
			},
			min: Math.min(...splits.map((split) => split.elevation_difference)) - 10,
			max: Math.max(...splits.map((split) => split.elevation_difference)) + 10,

		},
	],
	grid: {
		show: true,
		strokeDashArray: 3,
		yaxis: {
			lines: {
				show: true
			}
		},
		padding: {
			top: 12,
			bottom: 12,
			right: 24,
			left: 24
		}
	}
})

</script>

<template>
	<div class="splits">
		<h2>Splits</h2>
		<ClientOnly>
			<apexchart class="chart" :key="series" :options="options" :series="series" width="100%">
			</apexchart>
		</ClientOnly>
	</div>
</template>

<style scoped lang="scss">
.splits {
	display: none;

	@include after(sm) {
		display: block;
	}
}

h2 {
	font-size: 1rem;
	text-transform: uppercase;
	color: var(--c-gray);
	margin-bottom: 0.5rem;
}

.chart {
	background: var(--c-light);
	border-radius: .5rem;

}
</style>

<style lang="scss">
.chart-tooltip {
	background-color: var(--c-light);
	color: var(--c-dark);
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 0.5rem 0rem 0.25rem;

	.title {
		border-bottom: 1px solid var(--c-gray);
		padding: 0 0.5rem 0.25rem;
	}

	.items {
		display: flex;
		flex-direction: column;
		padding-inline: 0.5rem;
	}
}
</style>