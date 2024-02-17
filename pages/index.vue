<script setup lang="ts">

definePageMeta({
	middleware: ["auth"]
});

</script>

<template>
	<ActivitiesSummary />
	<Activities />
</template>
