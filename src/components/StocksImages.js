import { useMemo } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useFirestoreContext } from "../context/FirestoreContext";
import List from "./List";

const StockImages = () => {
  const { state } = useFirestoreContext();
  const { currentUser } = useAuthContext();

  const items = useMemo(() => {
    const filtered = state.items.filter((item) => {
      const username = currentUser?.displayName.split(" ").join("");
      return item.user === username.toLowerCase();
    });

    return currentUser ? filtered : [];
  }, [state.items, currentUser]);

  return (
    <>
      <h1>My Stock Images</h1>
      <List items={items} />
    </>
  );
};
export default StockImages;
