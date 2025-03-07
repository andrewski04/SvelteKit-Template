import type { LayoutServerLoad } from './$types';
import { authProviderMap } from '../auth';

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.auth();
	return {
		session,
		authProviderMap
	};
};
