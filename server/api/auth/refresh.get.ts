export default defineEventHandler(async (event) => {

	const config = useRuntimeConfig()

	const refresh_token = getQuery(event).refresh_token?.toLocaleString()

	if (!refresh_token) {
		return {
			error: "Required query parameter 'refresh_token' is missing.",
			event: refresh_token
		}
	}

	const params = new URLSearchParams();
	params.append('client_id', config.public.apiClientID);
	params.append('client_secret', config.apiClientSecret);
	params.append('grant_type', 'refresh_token');
	params.append('refresh_token', refresh_token);

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		body: params.toString()
	}

	const data = await fetch('https://www.strava.com/oauth/token', options).then(res => res.json())

	if (data.errors) {
		// force remove refreshToken
		setCookie(event, "refreshToken", '', {
			httpOnly: false,
			secure: true,
			sameSite: 'strict',
			maxAge: 0
		})

		return {
			data
		}
	}

	setCookie(event, "accessToken", data.access_token, {
		httpOnly: false,
		secure: true,
		sameSite: 'strict',
		maxAge: data.expires_in
	})

	await sendRedirect(event, '/', 200)
})