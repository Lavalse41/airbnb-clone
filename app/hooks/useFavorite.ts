import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const LoginModal = useLoginModal();

  //1.check if listingId has favorited (this function controls the Heart Button fill)
  const hasFavorited = useMemo(() => {
    let list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser?.favoriteIds, listingId]);

  //2.toggle favorite function (controlled by onClick)
  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      //3.if currenrUser doesn't exist (not log in). Open login modal
      if (!currentUser) {
        return LoginModal.onOpen();
      }

      //4.check if hasFavorited is true, if not, send request to delete listingId
      //if true, post listingId
      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        //5. execute request
        await request();
        //6. refresh page
        router.refresh();
        //7. toast success
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong.");
      }
    },
    [currentUser, hasFavorited, listingId, LoginModal, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
