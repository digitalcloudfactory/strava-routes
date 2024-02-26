import { defineStore } from 'pinia'

export const useActivitiesStore = defineStore({
	id: 'activities',
	state: () => ({
		filters: {
			year: new Date().getFullYear(),
			month: new Date().getMonth(),
		},
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