import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingsById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingsById(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <div>
        <EmptyState />
      </div>
    );
  }

  return (
    <div>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </div>
  );
};

export default ListingPage;