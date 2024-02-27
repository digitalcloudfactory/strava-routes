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
			month: new Date().getMonth() + 1,
		} as Filters,
	}),
	getters: {
		month: (state) => state.filters.month,
		year: (state) => state.filters.year,
	},
	actions: {
		setFilters(filters: { year: number; month: number }) {
			this.filters = filters
		},
	},
})