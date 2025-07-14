import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  createSafeActionClient,
} from "next-safe-action";
import { getAuthSession } from "./auth";

class ServerError extends Error {}

export const action = createSafeActionClient({
  handleServerError(error) {
    if (error instanceof ServerError) {
      return {
        serverError: error.message,
      };
    }
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

export const authRequiredAction = action.use(async ({ next }) => {
  console.log("AUTH_ACTION_MIDDLEWARE");

  const session = await getAuthSession();
  const user = session?.user;

  if (!user) {
    throw new ServerError(
      "Server error occured, please login before performing this action"
    );
  }

  return next({
    ctx: {
      userId: user?.id,
      user,
    },
  });
});
