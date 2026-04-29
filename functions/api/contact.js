// Cloudflare Pages Function: handles contact form submissions at /api/contact.
// This keeps the demo lightweight while making the project dynamic on Cloudflare.

const services = new Set([
  "Security Assessment",
  "Cloud Architecture",
  "Compliance Readiness",
  "Incident Response"
]);

export async function onRequestPost({ request }) {
  try {
    const contentType = request.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      return sendJson({ ok: false, message: "Please send JSON data." }, 415);
    }

    const body = await request.json();
    const submission = {
      name: cleanText(body.name, 80),
      email: cleanText(body.email, 120),
      service: cleanText(body.service, 80),
      message: cleanText(body.message, 1000)
    };

    const errors = validateSubmission(submission);

    if (Object.keys(errors).length > 0) {
      return sendJson({ ok: false, errors }, 400);
    }

    const requestId = crypto.randomUUID();
    const receivedAt = new Date().toISOString();

    // In a real project, connect this function to Email Routing, D1, KV, R2, or a CRM.
    // For now, the submission is validated server-side and logged without the full message.
    console.log("SecureTech contact request", {
      requestId,
      receivedAt,
      name: submission.name,
      email: submission.email,
      service: submission.service,
      messageLength: submission.message.length
    });

    return sendJson({
      ok: true,
      requestId,
      receivedAt,
      message: "Thanks. Your request reached the Cloudflare Function successfully."
    });
  } catch (error) {
    console.error("Contact function error", error);
    return sendJson({ ok: false, message: "The request could not be processed." }, 500);
  }
}

export function onRequestGet() {
  return sendJson({ ok: false, message: "Use POST to submit the contact form." }, 405);
}

function validateSubmission(submission) {
  const errors = {};

  if (!submission.name) {
    errors.name = "Name is required.";
  }

  if (!submission.email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!submission.service) {
    errors.service = "Select a service.";
  } else if (!services.has(submission.service)) {
    errors.service = "Select one of the listed services.";
  }

  if (!submission.message) {
    errors.message = "Project details are required.";
  } else if (submission.message.length < 10) {
    errors.message = "Please add a little more detail.";
  }

  return errors;
}

function cleanText(value, maxLength) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function sendJson(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "cache-control": "no-store"
    }
  });
}
