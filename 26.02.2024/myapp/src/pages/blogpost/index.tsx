import { useParams } from "react-router-dom"
import { usePost } from "../../service/usePost"

export default function BlogPost(){
    const { id } = useParams<{id: string}>()
    
    /*
    const [post, setPost] = useState<Post | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if(!id){
            setPost(null)
        }
        else if(isNaN(Number(id))){
            setPost(null)
        }
        else{
            setLoading(true)
            fetch('https://jsonplaceholder.typicode.com/posts')
            .then((res) => res.json() as Promise<Post | null>)
            .then((data) => {
                setPost(data)
            })
            .catch(error => {
                setError(error.message)
            })
            .finally(() => {
                setLoading(false)
            })
        }
    }, [id])
    */
    const {data: post, isLoading: loading, error} = usePost(Number(id))

    return(
        <div>
            {
                loading
                ? <p>Loading...</p>
                : (error
                    ? <p>Błąd</p>
                    : post
                        ? (
                            <div key={post.id}>
                                <h2>{post.title}</h2>
                                <p>{post?.body}</p>
                            </div>
                        )
                        : <p>Post not found</p>
                    )
            }
        </div>
    )
}