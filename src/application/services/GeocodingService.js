export default class GeocodingService {
  static async getCoordinates(city, neighborhood, region, country) {
    const addressParts = [neighborhood, city, region, country].filter(Boolean);
    const address = addressParts.join(', ');

    if (!address) {
      return { latitude: null, longitude: null };
    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'PalazzoApp',
      },
    });

    if (!response.ok) {
      return { latitude: null, longitude: null };
    }

    const data = await response.json();

    if (data && data.length > 0) {
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon),
      };
    }

    return { latitude: null, longitude: null };
  }
}
