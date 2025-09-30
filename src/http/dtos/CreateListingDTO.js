export class CreateListingDTO {
  constructor({
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
    this.title = title;
    this.price = price;
    this.description = description;
    this.location = location;
    this.bedrooms = bedrooms;
    this.bathrooms = bathrooms;
    this.squareMeters = squareMeters;
    this.ownerContact = ownerContact;
    this.url = url;
  }
}
