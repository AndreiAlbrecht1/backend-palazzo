export class UpdateListingDTO {
  constructor({
    id,
    title,
    price,
    description,
    location,
    bedrooms,
    bathrooms,
    squareMeters,
    newImages,
  }) {
    this.id = id;
    this.title = title ?? undefined;
    this.price = price ?? undefined;
    this.description = description ?? undefined;
    this.location = location
      ? {
          city: location.city,
          neighborhood: location.neighborhood,
          region: location.region,
          country: location.country,
        }
      : undefined;
    this.bedrooms = bedrooms ?? undefined;
    this.bathrooms = bathrooms ?? undefined;
    this.squareMeters = squareMeters ?? undefined;
    this.url = url ?? undefined;
    this.newImages = newImages || [];
  }
}
