export class CreateListingDTO {
  constructor({
    title,
    price,
    description,
    location,
    bedrooms,
    bathrooms,
    squareMeters,
    images,
  }) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.location = {
      city: location.city,
      neighborhood: location.neighborhood,
      region: location.region,
      country: location.country,
    };
    this.bedrooms = bedrooms;
    this.bathrooms = bathrooms;
    this.squareMeters = squareMeters;
    this.images = images;
  }
}
