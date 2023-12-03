import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavorites() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favoriteLists = await prisma.listing.findMany({
      where: {
        id: { in: [...(currentUser.favoriteIds || [])] },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safefavoriteLists = favoriteLists.map((list) => ({
      ...list,
      createdAt: list.createdAt.toString(),
    }));

    return safefavoriteLists;
  } catch (error: any) {
    throw new Error(error);
  }
}
