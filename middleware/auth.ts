export default defineNuxtRouteMiddleware((to, from) => {

	const access_token = useCookie('accessToken');

	if (to.path === '/login' && access_token.value) {
		return navigateTo('/')
	}

	// it is important to check `to.path` before redirecting or you might get an infinite redirect loop
	if (!access_token.value && to.path !== '/login') {
		return navigateTo('/login')
	}

	return;
})