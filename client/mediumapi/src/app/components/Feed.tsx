import { useQuery } from "@tanstack/react-query";
import Post from "./Post";
import { makeRequest } from "../../../axios";
import Share from "./Share";

interface IPost {
  id: number;
  post_desc: string;
  img: string;
  username: string;
  userImg: string;
  created_at: string;
}

function Feed() {
  const { data, isLoading, error } = useQuery<IPost[]>({
    queryKey: ["posts"],
    queryFn: () =>
      makeRequest.get("post/").then((res) => {
        return res.data.data;
      }),
  });

  if (error) {
    console.log(error);
  }

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <Share />
      {isLoading ? (
        <span>Carregando...</span>
      ) : (
        <div className="w-full flex flex-col gap-5 items-center">{
          data?.map((post, id) => (
            <Post post={post} key={id} />
          ))
          }</div>
      )}
    </div>
  );
}

export default Feed;
