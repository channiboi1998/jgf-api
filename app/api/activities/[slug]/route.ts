import activities from '@/public/data/activities.json'

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  // Find the activity with the given slug
  const activity = activities.find((item) => item.slug === slug);

  if (!activity) {
    // If the activity doesn't exist, return a 404 response
    return new Response(JSON.stringify({ error: 'Activity not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // If the activity exists, return it as a JSON response
  return new Response(JSON.stringify(activity), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
