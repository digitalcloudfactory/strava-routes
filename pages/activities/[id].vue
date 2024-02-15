<script setup>
definePageMeta({
	middleware: ["auth"]
});

const data = await getActivity();

</script>
<template>
	<h1>{{ data.name }}</h1>
	<p> {{ data.description || "Pas de description" }}</p>
	<pre>
		{{ data }}
	</pre>
</template>