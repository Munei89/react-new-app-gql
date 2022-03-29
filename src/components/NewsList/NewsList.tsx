import React from "react";
import { useQuery, gql } from "@apollo/client";


 interface INewsListInterFace { 
    title: string;
    date: string;
    author: string;
    likes: number;
    uuid: string;
    text: string;  
}
const NEWS_QUERY = gql`
  query news {
    news {
        uuid,
        title,
        date,
        author,
        likes,
        text,
    }
  }
`;

const NewsList = () => { 
    const { data, loading, error } = useQuery(NEWS_QUERY);

    if (loading) return <p>"Loading..."</p>;
    if (error) return <pre>{error.message}</pre>

    return (
        <div>
            <h1>News</h1>
            <div>
                {data?.news.map((item:INewsListInterFace) => (
                    <div key={item.uuid}>
                        <h2>{item.title} -  <span>{item.date}</span></h2>
                        <span>
                            likes: {item.likes}
                        </span>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default NewsList;
