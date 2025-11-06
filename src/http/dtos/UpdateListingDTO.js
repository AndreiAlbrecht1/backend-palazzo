export class UpdateListingDTO {
  constructor({
    id,
    title,
    type,
    price,
    description,
    city,
    neighborhood,
    region,
    country,
    bedrooms,
    bathrooms,
    squareMeters,
    newImages,
    imagesToDelete,
    contactPhone,
    contactEmail,
  }) {
    this.id = id;
    this.title = title ?? undefined;
    this.type = type ?? undefined;
    this.price = price ?? undefined;
    this.description = description ?? undefined;
    this.city = city ?? undefined;
    this.neighborhood = neighborhood ?? undefined;
    this.region = region ?? undefined;
    this.country = country ?? undefined;
    this.bedrooms = bedrooms ?? undefined;
    this.bathrooms = bathrooms ?? undefined;
    this.squareMeters = squareMeters ?? undefined;
    this.contactPhone = contactPhone ?? undefined;
    this.contactEmail = contactEmail ?? undefined;
    this.newImages = newImages ?? undefined;
    this.imagesToDelete = imagesToDelete ?? undefined;
  }
}
