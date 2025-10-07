import MDEditor from "@uiw/react-md-editor"
import { useEffect, useState } from "react"
import { createImage, createPost, editPost, getPostById } from "../utils/apiCalls";
import { FileField } from "./FileField";
import { CgSpinner } from "react-icons/cg";
import { MdOutlineErrorOutline, MdOutlineDownloadDone } from "react-icons/md";
import { editPostValidator } from "../utils/validators";
import toast from "../utils/toast";
import { useFormik } from "formik";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

export const EditPost = () => {
    
    const [extraImagesF, setExtraImagesF] = useState([]); // same
    const [extraImages, setExtraImages] = useState([]); // same

    const { id } = useParams();

    const {data, error, isLoading} = useQuery({
        queryKey: ['postContent', id],
        queryFn: () => getPostById(id),
        refetchOnWindowFocus: false
    });

    const formik = useFormik({
        initialValues:{
            body: ''
        },
        validationSchema: editPostValidator,
        onSubmit: async (val) => {
            try{
                const res = await editPost(id, val);
                toast({title: 'Post updated', description: 'done'});
            }catch(e) {
                console.log(e);
                toast({title: 'Post not updated', description: e.message, type: 'error'});
            }
        },
    });

    useEffect(() => {
        if(error) {
            formik.setFieldValue('body', error.message);
        }
        if(isLoading) {
            formik.setFieldValue('body', 'Loading....bro... wait');
        }
        if(data) {
            formik.setFieldValue('body', data.body);
        }
    }, [data, error, isLoading]);



    useEffect(() => {
        setExtraImages(pre => [...pre, ...extraImagesF]);
        extraImagesF.forEach(image => {
            const form = new FormData();
            form.append('image', image.file);
            createImage(form)
                .then(resImg => setExtraImages(pre => pre.map(img => {
                        if(img.url === image.url) {
                            return {...img, isUploaded: 0, source: resImg.id};
                        }
                        return img;
                    })
                ))
                .catch(_e => {
                    toast({title: 'Upload failed', description: 'file is not uploaded', type: 'error'});
                    setExtraImages(pre => pre.map(img => {
                        if(img.url === image.url) {
                            return {...img, isUploaded: 1};
                        }
                        return img;
                    })
                    )}
                )
        });
    }, [extraImagesF]);

    return (
        <section className="container mx-auto flex gap-1 flex flex-col justify-center pt-10">
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-20 p-2 grid grid-rows-4 grid-cols-[10rem_1fr] grid-rows-[auto_auto_auto_auto] gap-4">
                    {
                        // row one completed
                    }

                    {
                        // row two completed
                    }
                    {
                        // 3
                    }

                    <label htmlFor="extraImages">
                        Extra Image
                    </label>
                    <div
                        className="flex-grow-1 flex flex-col gap-2"
                    >
                        <FileField 
                            className='w-full h-20 outline-1 font-semibold px-2 py-1 rounded-sm hover:bg-gray-300 hover:text-black transition-all duration-100'
                            id='extraImages'
                            name='extraImages'
                            multiple
                            accept='image/*'
                            onChange={setExtraImagesF}
                        />
                        <div
                            id='extra-image-container'
                            className="w-full overflow-y-scroll flex gap-2 justify-end"
                        >
                            {
                                extraImages.map((blogImage) => <div key={blogImage.url} className="relative"> 
                                    <img src={blogImage.url} className='max-w-32 min-w-32 h-20' />
                                    <div
                                        className="absolute inset-0 bg-black/60"
                                    >
                                    </div>
                                    {blogImage.isUploaded === undefined &&
                                        <CgSpinner className='text-3xl absolute animate-spin top-6 left-12' />
                                    }
                                    { blogImage.isUploaded === 0 &&
                                        <MdOutlineDownloadDone className='text-green-400 text-3xl absolute top-6 left-12' />
                                    }
                                    { blogImage.isUploaded === 1 &&
                                        <MdOutlineErrorOutline className='text-red-400 text-3xl absolute top-6 left-12' />
                                    }
                                    <button
                                        className="absolute inset-0"
                                        type="button"
                                        onClick={() => {
                                            if(blogImage.isUploaded === 0) {
                                                const imgServerUrl = `http://localhost:3000/image/${blogImage.source}`;
                                                navigator.clipboard.writeText(imgServerUrl);
                                                toast({title: 'Copied', description: 'image source copied to clipboard'});
                                            }else {
                                                toast({title: 'Cant copy', description: 'image failed to upload', type: 'error'});
                                            }
                                        }}
                                    >
                                    </button>
                                </div>
                                )
                            }
                        </div>
                    </div>
                    <MDEditor
                        height={300}
                        className="col-span-2"
                        value={formik.values.body} 
                        onChange={val => formik.handleChange({target: {name: 'body', value: val}})}
                    />
                    {formik.errors.body && formik.touched.body && (
                        <div className="col-span-2 text-right text-red-400 text-right">{formik.errors.body}</div>
                    )}

                    <button
                        className="col-span-2 w-30 ml-auto border border-white rounded-sm py-2 px-3 hover:bg-cyan-700 text-white"
                        type='button'
                        onClick={formik.handleSubmit}
                    >
                        submit
                    </button>
                </div>
            </form>
        </section>
    )
}

