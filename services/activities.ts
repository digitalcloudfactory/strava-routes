import type { ActivityFormated } from '~/types/activities';

export function dateFormater(date: string) {
	return new Date(date).toLocaleDateString("fr", {});
}

export function totalTimeFormater(totalSeconds: number): string {
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	return [hours, minutes, seconds].map(component => component.toString().padStart(2, '0')).join(':');
}

export function averageSpeedFormater(speedInMetersPerSecond: number): string {
	const timePerKilometerInMinutes = 60 / (speedInMetersPerSecond * (3600 / 1000));

	const formattedMinutes = Math.floor(timePerKilometerInMinutes).toString().padStart(2, '0');
	const formattedSeconds = Math.round((timePerKilometerInMinutes % 1) * 60).toString().padStart(2, '0');

	return `${formattedMinutes}'${formattedSeconds}''`;
}

export function totalDistanceFormater(meters: number) {
	return (meters / 1000).toLocaleString('fr', { maximumFractionDigits: 2 });
}

export function typeFormater(type: string) {
	return type === "Run" ? "run-icon" : type;
}

export function getActivitiesFormated(activities: Activities | [], apiMapboxToken: string): ActivityFormated[] {

	return (activities.filter(activity => activity.type === "Run").map(activity => ({
		id: activity.id,
		type: activity.type,
		name: activity.name,
		date: dateFormater(activity.start_date),
		moving_time: totalTimeFormater(activity.moving_time),
		average_speed: averageSpeedFormater(activity.average_speed),
		distance: totalDistanceFormater(activity.distance),
		map_preview: getStaticMapURL(activity.map.summary_polyline, apiMapboxToken)
	})) || [])
}