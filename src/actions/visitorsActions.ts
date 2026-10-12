"use server";

export async function getVisitorsCount() {
  // Use server-side environment variable (no NEXT_PUBLIC_ prefix)
  const baseUrl = "http://localhost:3000";
  const apiUrl = `${baseUrl}/api/visitors`;

  const res = await fetch(apiUrl);

  if (!res.ok) {
    console.log(`Failed to fetch visitors count: ${res.status} ${res.statusText}`);
    console.error(`Failed to fetch visitors count: ${res.status} ${res.statusText}`);
    throw new Error(`HTTP ${res.status}: Failed to fetch visitors count`);
  }

  const data = await res.json();
  if (typeof data?.activeCount !== 'number') {
    throw new Error('Invalid response format: count is not a number');
  }

  const { activeCount }: { activeCount: number } = data;
  console.log(activeCount)
  console.log(typeof activeCount)
  return activeCount;
}
