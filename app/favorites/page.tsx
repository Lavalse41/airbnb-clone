import EmptyState from "@/app/components/EmptyState";

import getCurrentUser from "@/app/actions/getCurrentUser";
//getFavorites

import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  //   const reservations = await getReservations({ authorId: currentUser.id });

  if (favorite.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorites on your properties."
      />
    );
  }

  return (
    <FavoritesClient reservations={reservations} currentUser={currentUser} />
  );
};

export default FavoritesPage;
