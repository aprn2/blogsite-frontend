import { useRef } from "react";

export const FileField = ({ onBlur, multiple, name, className, id, onChange, ...inputProps}) => {

    const inputRef = useRef(null);

    const handleImage = (event) => {

        const blogImages = [];

        for(let file of event.target.files) {
            const url = URL.createObjectURL(file);
            blogImages.push({url: url, file: file});
        }

        if(! multiple) {
            onChange(blogImages[0])
        } else {
            onChange(blogImages);
        }
    };

    return <>
        <button
            id={id}
            className={className}
            onClick={(event) => {
                event.preventDefault();
                inputRef.current.click();
            }}
            onBlur={onBlur}
        >
            Choose images
        </button>
        <input
            {...inputProps}
            multiple={multiple}
            aria-hidden
            name={name}
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleImage}
        />
    </>
}
