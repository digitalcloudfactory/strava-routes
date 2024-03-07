import type { StravaTokenResponse } from "~/types/stravaApi";

export default defineEventHandler(async (event) => {

	const config = useRuntimeConfig();

	const refresh_token = parseCookies(event).refresh_token

	if (!refresh_token) {
		throw createError({
			statusCode: 400,
			statusMessage: "Required cookie 'refresh_token' is missing."
		})
	};

	const params = new URLSearchParams();
	params.append('client_id', config.public.apiClientID);
	params.append('client_secret', config.apiClientSecret);
	params.append('grant_type', 'refresh_token');
	params.append('refresh_token', refresh_token);

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
			statusMessage: "Failed to fetch refresh token."
		})
	}

	setCookie(event, "access_token", data.access_token, {
		httpOnly: false,
		secure: true,
		sameSite: 'strict',
		maxAge: data.expires_in
	})

	await sendRedirect(event, "/");
})