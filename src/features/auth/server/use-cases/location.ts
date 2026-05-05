import { headers } from "next/headers";
import { isIP } from "net";

const IP_HEADER_PRIORITY = [
  "cf-connecting-ip",
  "x-client-ip",
  "x-forwarded-for",
  "x-real-ip",
  "x-cluster-client-ip",
  "forwarded-for",
  "forwarded",
];

function extractIP(value: string | null) {
  if (!value) return null;

  // Handle: "for=1.2.3.4" (Forwarded header)
  const forwardedMatch = value.match(/for=([^;,\s]+)/i);
  if (forwardedMatch) {
    value = forwardedMatch[1];
  }

  // Handle multiple IPs: "1.2.3.4, 5.6.7.8"
  const ip = value.split(",")[0].trim();

  // Remove IPv6 prefix (::ffff:127.0.0.1)
  const cleanedIP = ip.replace(/^::ffff:/, "");

  return isIP(cleanedIP) ? cleanedIP : null;
}

export async function getIPAddress() {
  const headersList = await headers();

  for (const header of IP_HEADER_PRIORITY) {
    const value = headersList.get(header);
    const ip = extractIP(value);

    if (ip) return ip;
  }

  // Fallbacks (useful in local dev)
  return "127.0.0.1";
}
