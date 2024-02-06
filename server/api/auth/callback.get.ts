export default defineEventHandler(async (event) => {

	const config = useRuntimeConfig()

	const code = getQuery(event).code?.toLocaleString()

	if (!code) {
		return {
			error: "Required query parameter 'code' is missing.",
			event: code
		}
	}

	const params = new URLSearchParams();
	params.append('client_id', config.public.apiClientID);
	params.append('client_secret', config.apiClientSecret);
	params.append('code', code);
	params.append('grant_type', 'authorization_code');

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		body: params.toString()
	}

	const data = await fetch('https://www.strava.com/oauth/token', options).then(res => res.json())

	if (data.errors) {
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