export class UpdateListingDTO {
  constructor({
    id,
    title,
    price,
    description,
    location,
    bedrooms,
    bathrooms,
    square_meters,
    owner_contact,
    url,
  }) {
    this.id = id;
    this.title = title ?? undefined;
    this.price = price ?? undefined;
    this.description = description ?? undefined;
    this.location = location ?? undefined;
    this.bedrooms = bedrooms ?? undefined;
    this.bathrooms = bathrooms ?? undefined;
    this.square_meters = square_meters ?? undefined;
    this.owner_contact = owner_contact ?? undefined;
    this.url = url ?? undefined;
  }
}
