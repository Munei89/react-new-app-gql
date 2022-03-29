import React from 'react';
import { useQuery, gql, useMutation } from "@apollo/client";
import Button from '@mui/material/Button';
import moment from "moment";


interface INewsDetailsProps {
    id: string | number;
    handlePostDelete: () => void;
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

const ADD_LIKE_MUTATION = gql`
mutation addLike($uuid: String!) {
  like(uuid: $uuid) {
    uuid
  }
}
`;

const DISLIKE_MUTATION = gql`
mutation dislike($dislikeUuid2: String!) {
  dislike(uuid: $dislikeUuid2) {
    uuid
  }
}
`;

const DELETE_POST_MUTATION = gql`
mutation deletePost($deleteUuid2: String!) {
  delete(uuid: $deleteUuid2) {
    uuid
  }
}
`;

const NewsDetail: React.FC<INewsDetailsProps> = ({id, handlePostDelete}) => {
    const { data, error, loading, refetch } = useQuery(SINGLE_NEWS_QUERY, {
        variables: { uuid: String(id) },
    });
    const [like] = useMutation(ADD_LIKE_MUTATION);
    const [dislike] = useMutation(DISLIKE_MUTATION);
    const [deletePost] = useMutation(DELETE_POST_MUTATION);

    React.useEffect(() => {
        refetch({ uuid: String(id) });
    }, [refetch, id]);

    const handleLike = (id: string) => {
        like({ variables: { uuid: String(id) } });
        refetch({ uuid: String(id) });
    }

     const handleDislike = (id: string) => {
        dislike({ variables: { dislikeUuid2: String(id) } });
        refetch({ uuid: String(id) });
    }

     const handleDelete = (id: string) => {
        deletePost({ variables: { deleteUuid2: String(id) } });
        refetch({ uuid: String(id) });
        handlePostDelete();
    }

    if (loading) return <p>Loading...</p>;
    if (error ) return <pre>{error.message}</pre>;

  return (
    <div>
      <h1>News Detail</h1>
      {data && data?.singleNews ? (
        <div> 
            <h5>
                {data?.singleNews.title}
            </h5>
             <p>{moment(data?.singleNews.date).format('ll')}</p>
             <p>
                {data?.singleNews.likes}
            </p>   
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleLike(data?.singleNews.uuid)}
                >
                
                    Like
            </Button>
            <Button 
                onClick={() => handleDislike(data?.singleNews.uuid)}
                variant="contained"
                color="secondary"
                size="small"
            >
                dislike
            </Button>
            <p>
                {data?.singleNews.text}
            </p>
            <p>
               Author: {data?.singleNews.author}
            </p>
            <button onClick={() => handleDelete(data?.singleNews.uuid)}> 
                Delete
            </button>
        </div>
      )
        :
        <p>
            No post found
        </p>
    }
    </div>
  );

}


export default NewsDetail;