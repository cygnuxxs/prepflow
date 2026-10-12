"use server";

export async function getVisitorsCount() {
  // Use server-side environment variable (no NEXT_PUBLIC_ prefix)
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const apiUrl = `${baseUrl}/api/visitors`;

  try {
    const res = await fetch(apiUrl);

    if (!res.ok) {
      console.error(`Failed to fetch visitors count: ${res.status} ${res.statusText}`);
      return null;
    }

    const data = await res.json();
    if (typeof data?.activeCount !== 'number') {
      console.error("Failed to fetch visitors count: invalid response format");
      return null;
    }

    return data.activeCount;
  } catch (error) {
    console.error("Failed to fetch visitors count:", error);
    return null;
  }
}
