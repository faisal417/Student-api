export const generateSlug = (name) => {
  // Convert the name to lowercase
  let slug = name.toLowerCase();

  // Replace spaces with hyphens and remove special characters
  slug = slug.replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  return slug;
};
