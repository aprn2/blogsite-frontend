import { useRef } from "react";
import { IoCloseSharp } from "react-icons/io5";

export default function SectionForm({ value, onValueChange}) {

    const chooseImageRef = useRef(null);

    const addImages = (e) => {
        let newContents = [];
        [...e.target.files].forEach((file) => {
            const url = URL.createObjectURL(file);
            newContents.push({type: 'image', url: url});
        });
        onValueChange({...value, contents: [...value.contents, ...newContents]});
    };
    const addParagraph = (event) => {
        event.preventDefault();
        onValueChange({...value, contents: [...value.contents, {type: 'paragraph', text: ''}]});
    };
    const onChangeParagraph = (index, newText) => {
        const contents = [...value.contents];
        contents[index] = {...value.contents[index], text: newText}
        onValueChange({...value, contents: contents});
    };
    const removeContent = (event, contentIndex) => {
        event.preventDefault();
        const contents = value.contents.filter((el, elIndex) => elIndex !== contentIndex);
        onValueChange({...value, contents: contents});
    };

    return <div className='flex flex-col p-3 gap-3'>
        <div className='flex flex-col justify-between'>
            <label
                htmlFor='sub-heading'
            >
                Sub heading:
            </label>
            <input
                className='p-2 outline-1 bg-white outline-black-800 focus:outline-2 focus:outline-indigo-500 h-10'
                id='sub-heading'
                value={value.subHeading}
                onChange={(e) => {
                    onValueChange({...value, subHeading: e.target.value});
                }}
            />
        </div>
        <div className='flex flex-col justify-between'>
            <label
                htmlFor='contents'
            >
                contents:
            </label>
            <div className='outline-1 flex flex-col gap-3 bg-white p-3'>
                {
                    value.contents.map((content, contentIndex) => {
                        if(content.type === 'image') {
                            return<div
                                className='relative h-40 bg-indigo-50 flex flex-col justify-center p-4'
                            > 
                                <img 
                                    className='w-1/3 h-full object-cover'
                                    src={content.url}
                                />
                                <button
                                    className="p-1 absolute top-1 right-1 bg-red-500 hover:scale-150 transition-transform duration-200"
                                    onClick={(event) => removeContent(event, contentIndex)}
                                >
                                    <IoCloseSharp />
                                </button>
                            </div>
                        }
                        if(content.type === 'paragraph') {
                            return <div
                                className='relative h-40 bg-indigo-50 flex flex-col justify-center p-4'
                            >
                                <textarea
                                    className="p-2 outline-1 outline-black focus:outline-2 focus:outline-indigo-500 w-full h-full"
                                    value={content.text}
                                    onChange={(e) => onChangeParagraph(contentIndex, e.target.value)}
                                />
                                <button
                                    className="p-1 absolute top-1 right-1 bg-red-500 hover:scale-150 transition-transform duration-200"
                                    onClick={(event) => removeContent(event,contentIndex)}
                                >
                                    <IoCloseSharp />
                                </button>
                            </div>
                        }
                    })
                }

                <div className="flex gap-3 justify-end">
                    <button
                        className="hover:bg-violet-300 cursor-pointer bg-green-300 border-1 border-black px-2 py-1"
                        onClick={(event) => {
                            event.preventDefault();
                            chooseImageRef.current.click();
                        }}
                    >
                        Add Image
                    </button>
                    <input
                        ref={chooseImageRef}
                        type="file"
                        accept='image/*'
                        className="hidden"
                        onChange={addImages}
                        multiple
                    />
                    <button
                        className="hover:bg-violet-300 cursor-pointer bg-green-300 border-1 border-black px-2 py-1"
                        onClick={addParagraph}
                    >
                        Add Paragraph
                    </button>
                </div>
            </div>
        </div>
    </div>
}

class SectionState{
    constructor(){
        this.subHeading= ''
        this.contents= []
    }
}
export {SectionState};
