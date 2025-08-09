export default function PostPage() {
    return <>
        <div className="mb-8 mt-3 flex flex-col gap-1">
            <h1 className="text-3xl font-bold">{'Title of the article, lol'}</h1>
            <h2 className="text-gray-600"><a href="">{'authorUserName'}</a> | {'May 2 2021'}</h2>
            <hr className="text-stone-400"></hr>
        </div>

        <div className='relative w-3/4 m-auto'>
            <img src='./public/postimg.jpg' alt="postimg" />
            <div className="inset-0 bg-gradient-to-b from-85% to-black  absolute">
                <p className="w-full text-white absolute bottom-1 left-2">
                    image description
                    Lo
                </p>
            </div>

        </div>

        <p className="text-lg indent-8 text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae eveniet aspernatur nobis quisquam, laudantium, hic velit repellat ea in temporibus quasi commodi ipsa quos recusandae voluptates maiores laboriosam, quis aut?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil incidunt laudantium aliquam asperiores excepturi aperiam. Tempore numquam vitae ea qui doloremque, quod nulla rerum totam neque ullam, dolorum molestias reprehenderit.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas nesciunt sunt, esse unde earum dicta quasi eaque ullam. Temporibus atque blanditiis minima, facilis officia aspernatur. Quae modi quia iusto mollitia.
        </p>
        <br></br>
        <p className="text-lg indent-8 text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae eveniet aspernatur nobis quisquam, laudantium, hic velit repellat ea in temporibus quasi commodi ipsa quos recusandae voluptates maiores laboriosam, quis aut?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil incidunt laudantium aliquam asperiores excepturi aperiam. Tempore numquam vitae ea qui doloremque, quod nulla rerum totam neque ullam, dolorum molestias reprehenderit.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas nesciunt sunt, esse unde earum dicta quasi eaque ullam. Temporibus atque blanditiis minima, facilis officia aspernatur. Quae modi quia iusto mollitia.
        </p>
    </>
}
