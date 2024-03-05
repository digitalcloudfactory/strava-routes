<script setup lang="ts">
import 'mapbox-gl/dist/mapbox-gl.css'

const props = defineProps<{
	polyline: string;
	center: number[];
}>()

const config = useRuntimeConfig();

const mapboxMap = ref();
const map = computed(() => mapboxMap.value.map);

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
const coordinates = geoJSON.features[0].geometry.coordinates;

const bounds = centerMap(coordinates);

onMounted(() => {
	map.value.on('load', () => {
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
	})
})

</script>

<template>
	<div class="map">
		<MapboxMap :access-token="config.public.apiMapboxToken" ref="mapboxMap" style="height: 100%;"
			map-style="mapbox://styles/mapbox/outdoors-v12" :zoom="1" :minZoom="11.25" :bounds="bounds"
			:fitBoundsOptions="{ padding: 20 }" :cooperativeGestures="true">
		</MapboxMap>
	</div>
</template>

<style scoped>
.map {
	width: 100%;
	height: clamp(20rem, 60vh, 40rem);
	border-radius: 0.5rem;
	overflow: hidden;
}
</style>
