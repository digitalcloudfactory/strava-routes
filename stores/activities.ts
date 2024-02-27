import { defineStore } from 'pinia'

export type Filters = {
	year: number
	month: number
}

export enum Sorts {
	Distance,
	Time,
	Speed,
	Elevation
}

export const useActivitiesStore = defineStore({
	id: 'activities',
	state: () => ({
		filters: {
			year: new Date().getFullYear(),
			month: new Date().getMonth(),
		} as Filters,
		currentActivities: [] as Activities
	}),
	getters: {
		month: (state) => state.filters.month,
		year: (state) => state.filters.year,
		activities: (state) => state.currentActivities,
	},
	actions: {
		setFilters(filters: { year: number; month: number }) {
			this.filters = filters
		},
		setActivities(activities: Activities) {
			this.currentActivities = activities
		},
	},
})