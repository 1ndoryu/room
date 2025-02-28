// utils/validation.js

export const roomSchema = (data) => {
    const errors = {};

    if (!data.address.trim()) errors.address = "Address is required";
    if (data.rent <= 0) errors.rent = "Rent must be greater than 0";
    if (data.security_deposit < 0)
        errors.security_deposit = "Security deposit must be 0 or greater";
    if (!data.available_on)
        errors.available_on = "Availability date is required";
    if (data.bedrooms < 1) errors.bedrooms = "Bedrooms must be 1 or greater";
    if (data.bathrooms < 1) errors.bathrooms = "Bathrooms must be 1 or greater";
    if (data.roomies < 1) errors.roomies = "Roomies must be 1 or greater";
    if (data.description.length < 75)
        errors.description = "Description must have more than 75 characteres";
    if (data.roomies_description.length < 75)
        errors.roomies_description =
            "Description must have more than 75 characteres";

    const MAX_IMAGES = 8;
    const MAX_FILE_SIZE_MB = 3;
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
    if (data.images.length > MAX_IMAGES) {
        errors.images = `You can upload a maximum of ${MAX_IMAGES} images`;
    } else {
        for (const image of data.images) {
            if (image.size > MAX_FILE_SIZE_BYTES) {
                errors.images = `Each image must be less than ${MAX_FILE_SIZE_MB}MB`;
                break;
            }
            if (
                ![
                    "image/jpeg",
                    "image/png",
                    "image/gif",
                    "image/webp",
                ].includes(image.type)
            ) {
                errors.images =
                    "Only JPEG, PNG, GIF, and WEBP formats are allowed";
                break;
            }
        }
    }

    return {
        values: Object.keys(errors).length === 0 ? data : {},
        errors,
    };
};
