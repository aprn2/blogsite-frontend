import { useRef, useState } from 'react'
import SectionForm, { SectionState } from './SectionForm';

export default function AddPost() {

    const [formState, setFormState] = useState({
        title: '',
        description: '',
        postImg: '',
        sections: [new SectionState()]
    });

    console.log(formState);

    const addSection = () => {
        setFormState({...formState, sections: [...formState.sections, new SectionState()]});
    };
    const sectionChangeHandler = (index, newValue) => {
        const sections = [...formState.sections];
        sections[index] = newValue;
        setFormState({...formState, sections: sections});
        //const sections = formState.sections.filter((section, sectionIndex) => sectionIndex !== index);
        //setFormState({...formState, sections: [...sections, newValue]});
    };

    const chooseFileRef = useRef(null);


    return <main className="container mx-auto w-full bg-gray-100 px-6">
        <form
            className="flex flex-col gap-2 p-4"
        >
            <h2 className="text-3xl mb-10 font-bold">Add Post</h2>
            <div className="flex justify-between gap-2">
                <label htmlFor="title"
                    className=""
                >
                    Title
                </label>
                <input
                    type="text"
                    id='title'
                    className="w-3/4 outline-1 font-semibold px-2 py-1 rounded-sm focus:bg-cyan-200 focus:outline-2 transition-all duration-100"
                    value={formState.title}
                    onChange={(event) => setFormState({ ...formState, title: event.target.value })}
                />
            </div>
            <div className="flex justify-between gap-2">
                <label htmlFor="desciption"
                    className=""
                >
                    description
                </label>
                <input
                    type="text"
                    id='description'
                    className="w-3/4 outline-1 font-semibold px-2 py-1 rounded-sm focus:bg-cyan-200 focus:outline-2 transition-all duration-100"
                    value={formState.description}
                    onChange={(event) => setFormState({ ...formState, description: event.target.value })}
                />
            </div>
            <div className="flex justify-between gap-2">
                <label htmlFor="postimg"
                    className=""
                >
                    Cover Image
                </label>

                <div className='w-3/4 flex flex-col gap-2 items-center'>
                    <button
                        id='description'
                        className='w-full outline-1 font-semibold px-2 py-1 rounded-sm focus:bg-cyan-200 focus:outline-2 transition-all duration-100'
                        onClick={(event) => {
                            event.preventDefault();
                            chooseFileRef.current.click();
                        }}
                    >
                        Choose File
                    </button>
                    <input
                        ref={chooseFileRef}
                        type="file"
                        accept='image/*'
                        className="hidden"
                        onChange={(event) => {
                            const file = event.target.files[0];
                            const url = URL.createObjectURL(file);
                            setFormState({ ...formState, postImg: url });
                            console.log(url);
                        }}
                    />
                    <img src={formState.postImg} className='max-w-32 min-w-32' />
                </div>
            </div>
            <div
                className='flex flex-col gap-3'
            >
                <label >
                    Sections:
                </label>
                <div className='flex flex-col gap-3'>
                    {
                        formState.sections.map((section, sectionIndex) => {
                            return<div
                                className='flex flex-col gap-3 border-1 border-black p-2 bg-gray-300'
                            > 
                                <label >
                                    Section {sectionIndex + 1}:
                                </label>
                                <SectionForm
                                    value={formState.sections[sectionIndex]}
                                    onValueChange={(newValue) => sectionChangeHandler(sectionIndex, newValue)}
                                >
                                </SectionForm>
                            </div>
                        })
                    }
                </div>
                <button
                        className="hover:bg-violet-300 cursor-pointer bg-green-300 border-1 border-black px-2 py-1"
                    type='button'
                    onClick={addSection}
                >
                    New Section
                </button>
            </div>
        </form>
    </main>
}
