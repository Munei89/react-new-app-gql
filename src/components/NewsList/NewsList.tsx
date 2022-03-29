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

interface IProps {
    handleIdChange: (newId: string | number) => void;
    postDelete: boolean;
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

const NewsList: React.FC<IProps> = ({
    handleIdChange,
    postDelete,
}) => { 
    const { data, loading, error, refetch } = useQuery(NEWS_QUERY);

    React.useEffect(() => {
        refetch();
    } , [refetch, postDelete]);

    if (loading) return <p>"Loading..."</p>;
    if (error) return <pre>{error.message}</pre>

    return (
        <div>
            <h1>News</h1>
            <div>
                {data?.news.map((item:INewsListInterFace) => (
                    <div key={item.uuid}
                        onClick={() => handleIdChange(item.uuid)}
                    >
                        <h2>{item.title} -  <span>{item.date}</span></h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NewsList;
