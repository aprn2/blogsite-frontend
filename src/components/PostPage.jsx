export default function PostPage() {

    const subHeadings = ['thss is awesome', 'thats horrble', 'my bvd ll', 'gg good games'];

    return <div
        className='flex-1 flex container mx-auto'
    >
        <aside
            className='w-80 pl-10 text-xl pt-10'
        >
            <nav>
                <ol
                    className='flex flex-col gap-2'
                >
                {subHeadings.map((heading, index) => 
                    <li>
                    <a
                        key={heading}
                    >
                        {index + 1}. {heading}

                    </a>
                    </li>

                )}
                
                </ol>
            </nav>
        </aside>
        <section
            className='flex-1 pt-10 overflow-y-scroll'
        >
            <div className="mb-8 mt-3 flex flex-col gap-1">
                <h1 className="text-5xl font-bold">{'Title of the article, lol'}</h1>
                <h2 className="text-indigo-50"><a href="">{'authorUserName'}</a> | {'May 2 2021'}</h2>
                <hr className="text-indigo-300"></hr>
            </div>

            <div className='relative w-3/4 m-auto'>
                <img src='/public/postimg.jpg' alt="postimg" />
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
            <p className="text-lg indent-8 text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae eveniet aspernatur nobis quisquam, laudantium, hic velit repellat ea in temporibus quasi commodi ipsa quos recusandae voluptates maiores laboriosam, quis aut?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil incidunt laudantium aliquam asperiores excepturi aperiam. Tempore numquam vitae ea qui doloremque, quod nulla rerum totam neque ullam, dolorum molestias reprehenderit.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas nesciunt sunt, esse unde earum dicta quasi eaque ullam. Temporibus atque blanditiis minima, facilis officia aspernatur. Quae modi quia iusto mollitia.
            </p>
        </section>
    </div>
}
