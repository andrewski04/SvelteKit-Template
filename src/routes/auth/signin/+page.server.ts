import { signIn } from '../../../auth';
import type { Actions } from './$types';
export const actions: Actions = { default: signIn };

// this contains the server-side action for signing in, see auth/login for the client login page
