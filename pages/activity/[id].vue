<script setup lang="ts">
definePageMeta({
	middleware: ["auth"],
	name: "activity"
});

const id = useRoute().params.id;
const accessToken = useCookie("accessToken");

const { data, pending } = await useAsyncData(
	`activity-${id}`,
	() => $fetch(`https://www.strava.com/api/v3/activities/${id}`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${accessToken.value}`
		}
	}) as Promise<Activity>, {}
)

const activityFormatted = computed(() => {
	if (data.value) {
		return getActivityFormatted(data.value, "")
	}
})

</script>

<template>
	<template v-if="pending">
		Chargement...
	</template>

	<template v-else-if="data">
		<main class="wrapper">
			<NuxtLink to="/" class="back">
				<svg class="icon" aria-hidden="true">
					<use href="#icon-back"></use>
				</svg>
				<span>
					Retour aux courses
				</span>
			</NuxtLink>

			<ActivityHeader :data="data" />

			<ActivityMap :center="data.start_latlng" :polyline="data.map.polyline" />

			<ActivityStats v-if="activityFormatted" :activity="activityFormatted" />

			<div class="description" v-if="data.description">
				<h2>Description</h2>
				<p> {{ data.description }}</p>
			</div>

			<!-- <textarea name="" id="" cols="100" rows="5">
					{{ JSON.stringify(data, null, 2) }}
				</textarea> -->
		</main>

	</template>
</template>

<style scoped lang="scss">
main {
	gap: 1.125rem;
	margin-bottom: 4rem;

}

.back {
	display: flex;
	font-size: 1.125rem;
	align-items: center;
	gap: 1rem;
}

.description {

	h2 {
		font-size: 1rem;
		text-transform: uppercase;
		color: var(--gray);

	}

	p {
		font-size: 1.125rem;
	}

}
</style>