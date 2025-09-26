export class CreateListingDTO {
  constructor({
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
    this.title = title;
    this.price = price;
    this.description = description;
    this.location = location;
    this.bedrooms = bedrooms;
    this.bathrooms = bathrooms;
    this.square_meters = square_meters;
    this.owner_contact = owner_contact;
    this.url = url;
  }
}
