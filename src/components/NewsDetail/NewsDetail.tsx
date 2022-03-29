import React from 'react';
import { useQuery, gql } from "@apollo/client";


interface INewsDetailsProps {
    id: string | number;
}

const SINGLE_NEWS_QUERY = gql`
query singleNews($uuid: String!) {
  singleNews(uuid: $uuid) {
    uuid,
    title,
    date,
    author,
    likes,
    text,
  }
}
`;

const NewsDetail: React.FC<INewsDetailsProps> = ({id}) => {
    const { data, error, loading, refetch } = useQuery(SINGLE_NEWS_QUERY, {
        variables: { uuid: String(id) },
    });
    React.useEffect(() => {
        refetch({ uuid: String(id) });
    }, [refetch, id]);

    if (loading) return <p>"Loading..."</p>;
    if (error) return <pre>{error.message}</pre>

  return (
    <div>
      <h1>News Detail</h1>
      {data && data?.singleNews && (
        <div> 
            <h2>
                {data?.singleNews.title} -  <span>{data?.singleNews.date}</span>
            </h2>
            <p>
                likes: {data?.singleNews.likes}
            </p>
            <p>
                {data?.singleNews.text}
            </p>
            <p>
                {data?.singleNews.author}
            </p>
        </div>
      )}
    </div>
  );

}


export default NewsDetail;