<script setup lang="ts">
const sortValues = ["date", "distance", "time", "elevation"]
const sortValue = ref(undefined)
</script>

<template>
	<div>
		<USelect v-model="sortValue" :options="sortValues" variant="none" placeholder="Trier par...">
			<template #trailing>
				<UIcon name="" />
			</template>
		</Uselect>
		<UButton icon="i-heroicons-arrow-up-20-solid" size="sm" color="primary" square variant="solid" />
	</div>
</template>