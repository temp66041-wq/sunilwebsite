// Cloudflare Pages Function: simple dynamic health check at /api/status.

export function onRequestGet({ request }) {
  return sendJson({
    ok: true,
    service: "SecureTech Solutions dynamic API",
    runtime: "Cloudflare Pages Functions",
    serverTime: new Date().toISOString(),
    colo: request.cf?.colo || "local"
  });
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
