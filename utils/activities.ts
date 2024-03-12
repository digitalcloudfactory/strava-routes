import type { Filters } from '~/stores/activities';
import type { ActivityFormatted } from '~/types/activities';

export function dateFormater(date: string, option: Intl.DateTimeFormatOptions = {}) {
	return new Date(date).toLocaleDateString("fr", option);
}

function totalTimeFormater(totalSeconds: number): string {
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

function totalDistanceFormater(meters: number) {
	return (meters / 1000).toLocaleString('fr', { maximumFractionDigits: 2 });
}

export function typeFormater(type: string) {
	return type === "Run" ? "icon-run" : type;
}

export function getActivityFormatted(activity: Activity, apiMapboxToken: string): ActivityFormatted {
	return {
		id: activity.id,
		type: typeFormater(activity.type),
		name: activity.name,
		date: dateFormater(activity.start_date),
		moving_time: totalTimeFormater(activity.moving_time),
		average_speed: averageSpeedFormater(activity.average_speed),
		distance: totalDistanceFormater(activity.distance),
		map_preview: apiMapboxToken.length ? getStaticMapURL(activity.map.summary_polyline, apiMapboxToken) : "",
		total_elevation_gain: activity.total_elevation_gain,
		// data possibly missing
		kudo_count: activity.kudos_count || 0,
		average_heartrate: activity.average_heartrate || 0,
		calories: activity.calories || 0,

	}
}

export function getActivitiesFormatted(activities: Activities, apiMapboxToken: string): ActivityFormatted[] {
	return activities.map(activity => getActivityFormatted(activity, apiMapboxToken));
}

export function getActivitiesSorted(activities: Activities, sortBy: Sorts, asc: boolean) {
	return activities
		.sort((a, b) => {
			switch (sortBy) {
				case "date":
					return asc ? new Date(a.start_date).getTime() - new Date(b.start_date).getTime() : new Date(b.start_date).getTime() - new Date(a.start_date).getTime();
				case "distance":
					return asc ? a.distance - b.distance : b.distance - a.distance;
				case "duration":
					return asc ? a.moving_time - b.moving_time : b.moving_time - a.moving_time;
				case "elevation":
					return asc ? a.total_elevation_gain - b.total_elevation_gain : b.total_elevation_gain - a.total_elevation_gain;
				default:
					return 0;
			}
		})
}

export function getActivitiesFiltered(activities: Activities, filters: Filters) {
	return activities
		.filter(activity => ((activity.type === "Run")))
		// filter by year
		.filter(activity => new Date(activity.start_date).getFullYear() === Number(filters.year))
		// filter by month
		.filter(activity => new Date(activity.start_date).getMonth() + 1 === Number(filters.month))
}

export function getCurrentActivitiesSummary(activities: Activities) {
	return {
		total: activities.length.toString().padStart(2, '0'),
		distance: totalDistanceFormater(activities.reduce((acc, activity) => acc + activity.distance, 0)),
		time: totalTimeFormater(activities.reduce((acc, activity) => acc + activity.moving_time, 0)),
		averageSpeed: averageSpeedFormater(activities.reduce((acc, activity) => acc + activity.average_speed, 0) / activities.length)
	}
}
