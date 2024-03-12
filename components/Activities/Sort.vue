<script setup lang="ts">
const activitiesStore = useActivitiesStore();

const { by, asc } = toRefs(activitiesStore.sorts)

const sortValues = [
	{ value: "date", label: "Date" },
	{ value: "distance", label: "Distance" },
	{ value: "duration", label: "Temps" },
	{ value: "elevation", label: "Dénivelé" }
] as { value: Sorts, label: string }[]

const invertSortOrder = () => asc.value = !asc.value

watch([asc, by], () => {
	activitiesStore.setSorts({
		by: by.value,
		asc: asc.value
	})
})
</script>

<template>
	<ClientOnly>
		<div class="sort">
			<USelectMenu v-model="by" variant="outline" :options="sortValues" size="md" placeholder="Trier par..."
				value-attribute="value" option-attribute="label" class="w-36" trailing>
				<template #trailing>
					<UIcon name="i-heroicons-arrow-up-20-solid" :class="{ 'rotate-180': asc }"
						class="transition-transform" />
				</template>
			</USelectMenu>
			<UTooltip text="Inverser l'ordre de tri">
				<UButton size="md" color="white" icon="i-heroicons-arrows-up-down-solid" @click="invertSortOrder" />
			</UTooltip>
		</div>
	</ClientOnly>
</template>

<style scoped>
.sort {
	display: flex;
	gap: .5rem;
}
</style>