import mapboxgl from "mapbox-gl";

export function getStaticMapURL(polyline: string, apiMapboxToken: string) {
	return `https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/static/path-5+000-0.5(${encodeURIComponent(polyline)})/auto/300x300?access_token=${apiMapboxToken}`
}

export const centerMap = (coordinates: number[][]) => coordinates.reduce((bounds, coord) => bounds.extend(coord), new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));