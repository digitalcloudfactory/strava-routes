<template>
	<div class="title">
		<UIcon name="i-heroicons-exclamation-circle" class="h-6 w-6" />
		<h1>Cette activité n'existe pas</h1>
	</div>
	<p>Il est possible que l'activité ait été supprimée ou que vous n'ayez pas les droits pour la voir.</p>
</template>

<style scoped lang="scss">
h1 {
	font-size: 1.5rem;
}

.title {
	display: flex;
	align-items: center;
	gap: 0.5em;
}

p {
	font-size: 1.125rem;
}
</style>