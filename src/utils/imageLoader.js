export function getEventImageUrl(userId, imageName) {
  if (!userId || !imageName) {
    return null; // Replace with a placeholder image path
  }

  return `https://pub-d667a4b6b3234b3da35d82684d8c7b7e.r2.dev/${userId}/${imageName}`;
}
