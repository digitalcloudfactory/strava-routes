export default defineNuxtRouteMiddleware((to, from) => {

	const access_token = useCookie('accessToken');

	// is auth
	if (access_token.value) {

		if (to.path === '/login') {
			return navigateTo('/')
		}

		// next auth route
		return;
	}

	// no auth
	if (!access_token.value) {

		// refresh token ?
		const refresh_token = useCookie('refreshToken');

		if (refresh_token.value) {
			// refresh token
			return navigateTo({
				path: '/api/auth/refresh',
				query: {
					refresh_token: refresh_token.value
				},
				replace: true
			})
		}

		// it is important to check `to.path` before redirecting or you might get an infinite redirect loop
		if (to.path !== '/login') {
			return navigateTo('/login')
		}

		// next no auth route
		return;
	}

})