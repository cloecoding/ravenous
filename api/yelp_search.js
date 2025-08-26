// api/yelp-search.js
export default async function handler(req, res) {
  const { term = 'pizza', location = 'Santiago', sortBy = 'best_match' } = req.query || {};
  const url = new URL('https://api.yelp.com/v3/businesses/search');
  url.searchParams.set('term', term);
  url.searchParams.set('location', location);
  url.searchParams.set('sort_by', sortBy);
  url.searchParams.set('limit', '20');

  try {
    const r = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}` },
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json(data);

    const businesses = (data.businesses || []).map(b => ({
      id: b.id,
      imageSrc: b.image_url,
      name: b.name,
      address: b.location?.address1,
      city: b.location?.city,
      state: b.location?.state,
      zipCode: b.location?.zip_code,
      category: b.categories?.[0]?.title,
      rating: b.rating,
      reviewCount: b.review_count,
      url: b.url,
    }));

    res.status(200).json({ businesses });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
