<script setup lang="ts">

definePageMeta({
	middleware: ["auth"]
});

useHead({
	title: 'My Activities',
})

</script>

<template>
	<ActivitiesSummary />
	<Activities />
</template>
