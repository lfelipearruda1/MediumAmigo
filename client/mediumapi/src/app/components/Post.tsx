interface IPost{
    id: number,
    post_desc: string,
    img: string,
    username: string,
    userImg: string
}

function Post(props:{post:IPost}){

    const {post_desc, img, username, userImg} = props.post

    return (  
        <div>
            <header>
                <img 
                    src={
                        userImg
                            ? userImg
                            : "https://png.pngtree.com/background/20230408/original/pngtree-natural-landscape-in-the-forest-with-waterfall-flowing-through-picture-image_2337676.jpg"
                    } 
                    alt= "Imagem do usuário que fez o post."
                />
                <div>
                    <span>{username}</span>
                    <span>06/01/2023</span>
                </div>

                {post_desc && (
                    <div> 
                        <span>{post_desc}</span>
                    </div>
                )}
                {img &&<img src={img} alt="Imagem do Post."/>}

            </header>
        </div>
    );
}

export default Post;