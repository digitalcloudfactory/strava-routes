<script setup lang="ts">
const { splits, id } = defineProps<{
	splits: Activity["splits_metric"],
	id: string
}>()

const averageSpeed = computed(() => {
	return splits.map((split) => split.average_speed)
})

const series = ref([{
	name: "Allure moyenne",
	data: averageSpeed.value
}])

const options = ref({
	chart: {
		id: `splits-${id}`,
		type: "bar",
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
			horizontal: false,
			barHeight: '100%',
			columnWidth: '90%',
		},
	},
	theme: {
		monochrome: {
			enabled: true,
			color: constants.colors.primary,
			shadeTo: 'light',
			shadeIntensity: 0.65
		}
	},
	xaxis: {
		categories: splits.map((split) => split.split),
		labels: {
			show: true
		},
		tooltip: {
			enabled: false
		}
	},
	yaxis: {
		labels: {
			formatter: (value: number) => averageSpeedFormater(value),
		},
		//min offset to avoid the lowest value to be at the bottom of the chart
		min: Math.min(...averageSpeed.value) - 0.15,
		max: Math.max(...averageSpeed.value) + 0.15,

	},
	dataLabels: {
		enabled: false
	},
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
	},
	tooltip: {
		custom: function ({ dataPointIndex }: { dataPointIndex: number }) {
			return `
			<div class="chart-tooltip">
				<div class="title">Split ${splits[dataPointIndex].split}</div>
				<div class=items>
					<div class="item">Distance : <b>${splits[dataPointIndex].distance}m</b></div>
					<div class="item">Allure moyenne : <b>${averageSpeedFormater(splits[dataPointIndex].average_speed)}</b></div>
					<div class="item">Dénivelé : <b>${splits[dataPointIndex].elevation_difference}m</b></div>
					<div class="item">FC Moyenne : <b>${Math.round(splits[dataPointIndex].average_heartrate)}bpm</b></div>
				</div>
			</div>
			`
		},
		marker: {
			show: false,
		},
	},
	markers: {
		size: 4,
	},
	legend: {
		show: false
	},
	responsive: [{
		breakpoint: 1000,
		options: {
			chart: {
				height: splits.length * 35,
			},
			plotOptions: {
				bar: {
					horizontal: true,
					barHeight: '90%',
					columnWidth: '100%',

				}
			},
			yaxis: {
				labels: {},
			},
			xaxis: {
				labels: {
					formatter: (value: number) => averageSpeedFormater(value),
				},
				min: Math.min(...averageSpeed.value) - 0.15,
				max: Math.max(...averageSpeed.value) + 0.15,
			},
			grid: {
				yaxis: {
					lines: {
						show: false
					}
				},
				xaxis: {
					lines: {
						show: true
					}
				},
			}
		}
	}]
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