<script setup lang="ts">
const { data } = await useFetch('https://my-json-server.typicode.com/typicode/demo/db')
</script>

<template>
	<div>
		<pre>
			{{ data }}
		</pre>
	</div>
</template>
