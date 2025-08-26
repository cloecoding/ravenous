// src/util/Yelp.js
// Cliente para el endpoint serverless /api/yelp-search (Vercel)
// No expone la API key en el navegador y evita CORS.

const getSuggestions = async (keyword, location, sort) => {
  const qs = new URLSearchParams({ term: keyword, location, sortBy: sort });
  const endpoint = `/api/yelp-search?${qs.toString()}`;

  try {
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(`API error: ${res.status}`);

    const data = await res.json();

    // Soporta tanto la respuesta mapeada de nuestra función serverless
    // como la respuesta "raw" de Yelp (por si la función devolviera los campos originales).
    const items = (data.businesses || data || []).map((b) => {
      const image = b.imageSrc || b.image_url;
      const addr1 =
        b.address ||
        b.location?.address1 ||
        b.location?.display_address?.[0] ||
        '';
      const city = b.city || b.location?.city || '';
      const state = b.state || b.location?.state || '';
      const zip = b.zipCode || b.location?.zip_code || '';

      const addressStr = [
        addr1,
        [city, state].filter(Boolean).join(', '),
        zip,
      ]
        .filter(Boolean)
        .join(' ')
        .trim();

      const category = b.category || b.categories?.[0]?.title || '';
      const reviewCount = b.reviewCount ?? b.review_count ?? 0;

      return {
        id: b.id,
        img: image,
        name: b.name,
        address: addressStr,
        category,
        rating: b.rating,
        reviews: reviewCount,
        url: b.url,
      };
    });

    return items;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export default getSuggestions;
