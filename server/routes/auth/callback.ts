import type { StravaTokenResponse } from "~/types/stravaApi";

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

	const data = await $fetch('https://www.strava.com/oauth/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: params.toString()
	}) as StravaTokenResponse

	if (!data || data.errors) {
		throw createError({
			statusCode: 500,
			statusMessage: "Failed to fetch access token."
		})
	}

	setCookie(event, "access_token", data.access_token, {
		httpOnly: false,
		secure: true,
		sameSite: 'strict',
		maxAge: data.expires_in
	})

	setCookie(event, "refresh_token", data.refresh_token, {
		httpOnly: false,
		secure: true,
		sameSite: 'strict',
		maxAge: 2592000 // 30 days
	})

	await sendRedirect(event, "/")
})