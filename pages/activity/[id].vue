<script setup lang="ts">
definePageMeta({
	middleware: ["auth"],
	name: "activity"
});

const id = useRoute().params.id as string;
const accessToken = useCookie("access_token");

const { data, error } = await useAsyncData(
	`activity-${id}`,
	() => $fetch(`https://www.strava.com/api/v3/activities/${id}`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${accessToken.value}`
		}
	}) as Promise<Activity>, {}
)


useHead({
	title: data.value?.name || "Activity",
})

const activityFormatted = computed(() => {
	if (data.value) {
		return getActivityFormatted(data.value, "")
	}
})
</script>

<template>
	<main class="wrapper">
		<NuxtLink to="/" class="back">
			<span class="icon icon-arrow-left" aria-hidden="true"></span>
			<span>Retour aux courses</span>
		</NuxtLink>

		<ActivityNotFound v-if="error" />

		<template v-else-if="data">

			<ActivityHeader :data="data" />

			<ActivityMap :polyline="data.map.polyline" />

			<div class="description" v-if="data.description">
				<h2>Description</h2>
				<p> {{ data.description }}</p>
			</div>

			<ActivityStats v-if="activityFormatted" :activity="activityFormatted" />

			<ActivitySplits v-if="data" :splits="data.splits_metric" :id="id" />

			<a class="strava" :href="`https://www.strava.com/activities/${id}`" target="_blank"
				rel="noopener nofollow noindex">Voir
				sur
				Strava</a>
		</template>
	</main>

</template>

<style scoped lang="scss">
main {
	gap: 1.125rem;
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
		color: var(--c-gray);
		margin-bottom: 0.5rem;
	}

	p {
		font-size: 1.125rem;
	}

}

.strava {
	color: var(--c-gray);
	font-size: 14px;
	text-align: center;
	text-decoration: underline;
}
</style>