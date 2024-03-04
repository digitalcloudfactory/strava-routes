import mapboxgl from "mapbox-gl";

export function getStaticMapURL(polyline: string, apiMapboxToken: string) {
	return `https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/static/path-5+000-0.5(${encodeURIComponent(polyline)})/auto/300x300?access_token=${apiMapboxToken}`
}

export function centerMap(coordinates: number[][], map: mapboxgl.Map) {
	const bounds = coordinates.reduce((bounds, coord) => {
		return bounds.extend(coord);
	}, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

	map.fitBounds(bounds, {
		padding: 20,
		duration: 0
	});
}