import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"

import type { ErrorResponse } from "@/shared/types"

const app = new Hono()

app
  .get("/", (c) => {
    return c.text("Hello Hono!")
  })
  .get("/error", (c) => {
    throw new HTTPException(404, {
      message: "Request Not Found",
      cause: { form: true },
    })
  })

app.onError((error, c) => {
  if (error instanceof HTTPException) {
    const errorResponse =
      error.res ??
      c.json<ErrorResponse>(
        {
          success: false,
          message: error.message,
          isFormError:
            error.cause &&
            typeof error.cause === "object" &&
            "form" in error.cause
              ? error.cause.form === true
              : false,
        },
        error.status
      )
    return errorResponse
  }

  console.error(error)
  return c.json<ErrorResponse>(
    {
      success: false,
      message:
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : (error.stack ?? error.message),
    },
    500
  )
})

export default app
