import { defineStore } from 'pinia'

export type Filters = {
	year: number
	month: number
}

export type Sorts = "date" | "distance" | "duration" | "elevation"

export const useActivitiesStore = defineStore({
	id: 'activities',
	state: () => ({
		filters: {
			year: new Date().getFullYear(),
			month: new Date().getMonth() + 1,
		} as Filters,
		sorts: {
			by: "date",
			asc: true
		} as { by: Sorts; asc: boolean },
		currentActivities: [] as Activities
	}),
	getters: {
		month: (state) => state.filters.month,
		year: (state) => state.filters.year,
		sortBy: (state) => state.sorts.by,
		sortAsc: (state) => state.sorts.asc,
		activities: (state) => state.currentActivities
	},
	actions: {
		setFilters(filters: { year: number; month: number }) {
			this.filters = filters
		},
		setActivities(activities: Activities) {
			this.currentActivities = activities
		},
		setSorts(sorts: { by: Sorts; asc: boolean }) {
			this.sorts = sorts
		}
	},
})