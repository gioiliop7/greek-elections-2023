import { GetServerSideProps } from "next";

interface Props {
  data: any;
}

export default function Ep({ data }: Props) {
  return (
    <div>
      <h1>Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const id = query.id;

  if (!id) {
    return {
      notFound: true,
    };
  }

  if (isNaN(Number(id))) {
    return {
      notFound: true,
    };
  }

  const dev = process.env.NODE_ENV !== "production";
  const server = dev ? "http://localhost:3000" : process.env.EKLOGES_PUBLIC_URL;

  const response = await fetch(`${server}/api/party`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  const data = await response.json();

  return {
    props: {
      data,
    },
  };
};
