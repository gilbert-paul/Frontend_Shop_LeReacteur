import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import useProductQuery from "../../actions/querys/useProductQuery";

const Product = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useProductQuery(id?.toString() || "");

  if (isLoading || !data) {
    return <Loader />;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return <div>{data.title}</div>;
};

export { Product };
