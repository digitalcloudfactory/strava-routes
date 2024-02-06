<script setup lang="ts">

definePageMeta({
	middleware: ["auth"]
});

</script>

<template>
	<main>

		<h1>Welcome to the homepage</h1>
		<div>
			This is the index
		</div>
	</main>
</template>