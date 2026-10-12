"use server";

export async function getVisitorsCount() {
  try {
    if (process.env.NODE_ENV === 'development') {
      return 1
    }
    // Use server-side environment variable (no NEXT_PUBLIC_ prefix)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/visitors`;

    const res = await fetch(apiUrl);

    if (!res.ok) {
      console.error(`Failed to fetch visitors count: ${res.status} ${res.statusText}`);
      throw new Error(`HTTP ${res.status}: Failed to fetch visitors count`);
    }

    const data = await res.json();
    console.log(data)
    if (typeof data?.activeCount !== 'number') {
      throw new Error('Invalid response format: count is not a number');
    }

    const { activeCount }: { activeCount: number } = data;

    return activeCount;
  } catch (error) {
    console.error('Error in getVisitorsCount:', error);
    return 0;
  }
}
