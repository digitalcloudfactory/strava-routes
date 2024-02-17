function flipped(coords: number[][]) {
	var flipped = [];
	for (var i = 0; i < coords.length; i++) {
		var coord = coords[i].slice();
		flipped.push([coord[1], coord[0]]);
	}
	return flipped;
}

/**
 * 
 * @see https://github.com/mapbox/polyline/blob/master/src/polyline.js
 */
export const polyline = {
	decode(str: string, precision: number = 5) {
		var index = 0,
			lat = 0,
			lng = 0,
			coordinates = [],
			shift = 0,
			result = 0,
			byte = null,
			latitude_change,
			longitude_change,
			factor = Math.pow(10, Number.isInteger(precision) ? precision : 5);

		// Coordinates have variable length when encoded, so just keep
		// track of whether we've hit the end of the string. In each
		// loop iteration, a single coordinate is decoded.
		while (index < str.length) {

			// Reset shift, result, and byte
			byte = null;
			shift = 1;
			result = 0;

			do {
				byte = str.charCodeAt(index++) - 63;
				result += (byte & 0x1f) * shift;
				shift *= 32;
			} while (byte >= 0x20);

			latitude_change = (result & 1) ? ((-result - 1) / 2) : (result / 2);

			shift = 1;
			result = 0;

			do {
				byte = str.charCodeAt(index++) - 63;
				result += (byte & 0x1f) * shift;
				shift *= 32;
			} while (byte >= 0x20);

			longitude_change = (result & 1) ? ((-result - 1) / 2) : (result / 2);

			lat += latitude_change;
			lng += longitude_change;

			coordinates.push([lat / factor, lng / factor]);
		}

		return coordinates;
	},
	toGeoJSON(str: string, precision?: number) {
		var coords = polyline.decode(str, precision);
		return {
			type: 'LineString',
			coordinates: flipped(coords)
		};
	},
}