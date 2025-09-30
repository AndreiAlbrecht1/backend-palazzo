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
    ownerContact,
    url,
  }) {
    this.id = id;
    this.title = title ?? undefined;
    this.price = price ?? undefined;
    this.description = description ?? undefined;
    this.location = location ?? undefined;
    this.bedrooms = bedrooms ?? undefined;
    this.bathrooms = bathrooms ?? undefined;
    this.squareMeters = squareMeters ?? undefined;
    this.ownerContact = ownerContact ?? undefined;
    this.url = url ?? undefined;
  }
}
