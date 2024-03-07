
export default defineNuxtRouteMiddleware((to, from) => {

	const access_token = useCookie('access_token').value
	const refresh_token = useCookie('refresh_token').value

	if (!access_token && !refresh_token && to.path !== '/login') {
		return navigateTo('/login')
	}

	if (refresh_token && !access_token) {
		return navigateTo('/auth/refresh', { external: true })
	}

	if (access_token && to.path === '/login') {
		return navigateTo('/')
	}

	return;
})