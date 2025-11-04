export class CreateListingDTO {
  constructor({
    title,
    price,
    description,
    city,
    neighborhood,
    region,
    country,
    bedrooms,
    bathrooms,
    squareMeters,
    images,
    contactPhone,
    contactEmail,
  }) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.city = city;
    this.neighborhood = neighborhood;
    this.region = region;
    this.country = country;
    this.bedrooms = bedrooms;
    this.bathrooms = bathrooms;
    this.squareMeters = squareMeters;
    this.images = images;
    this.contactPhone = contactPhone;
    this.contactEmail = contactEmail;
  }
}
