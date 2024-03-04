<script setup lang="ts">
import mapboxgl from "mapbox-gl";

const props = defineProps<{
	polyline: string;
	center: number[];
}>()

const config = useRuntimeConfig();
mapboxgl.accessToken = config.public.apiMapboxToken;

const map = ref(null);
const mapContainer = ref(null)

const geoJSON = {
	"type": "FeatureCollection",
	"features": [
		{
			"type": "Feature",
			"properties": {},
			"geometry": {
				"type": "LineString",
				"coordinates": polyline.toGeoJSON(props.polyline).coordinates
			}
		}]
}
onMounted(() => {
	console.log(`the component is now mounted.`)

	const coordinates = geoJSON.features[0].geometry.coordinates;

	map.value = new mapboxgl.Map({
		container: mapContainer.value,
		style: "mapbox://styles/mapbox/outdoors-v11",
		center: [props.center[1], props.center[0]],
		zoom: 13.5,
	});

	map.value.on("load", () => {
		console.log(`the map has loaded.`)

		map.value.addSource("line", {
			type: "geojson",
			data: geoJSON
		});

		map.value.addLayer({
			id: "line",
			type: "line",
			source: "line",
			layout: {
				"line-join": "round",
				"line-cap": "round",
			},
			paint: {
				"line-color": "black",
				"line-width": 3,
			},
		});

		map.value.addSource("start", {
			type: "geojson",
			data: {
				type: "FeatureCollection",
				features: [{
					type: "Feature",
					geometry: {
						type: "Point",
						coordinates: coordinates[0]
					},
					properties: {
						type: "start"
					}
				}]
			}

		});

		map.value.addSource("end", {
			type: "geojson",
			data: {
				type: "FeatureCollection",
				features: [{
					type: "Feature",
					geometry: {
						type: "Point",
						coordinates: coordinates[coordinates.length - 1]
					},
					properties: {
						type: "end"
					}
				}]
			}
		});

		map.value.addLayer({
			id: "start",
			type: "symbol",
			source: "start",
			layout: {
				"text-field": "Départ",
				"text-size": 12,
			},
		});
		map.value.addLayer({
			id: "end",
			type: "symbol",
			source: "end",
			layout: {
				"text-field": "Arrivée",
				"text-size": 12,
			},
		});

		centerMap(coordinates, map.value);
		map.value.setMinZoom(11.25);
	})
})

onUnmounted(() => {
	console.log(`the component is now unmounted.`);

	map.value.remove();
	map.value = null;
})
</script>

<template>
	<div class="map-wrapper">
		<div ref="mapContainer" class="map-container"></div>
	</div>
</template>

<style scoped>
.map-wrapper {
	position: relative;
	height: clamp(20rem, 60vh, 40rem);
	border-radius: 0.5rem;
	overflow: hidden;
}

.map-container {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
}
</style>
