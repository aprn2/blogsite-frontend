import { ErrorMessage } from "formik";

export default function FormErrorMessage({name}) {
    return <ErrorMessage name={name}>
        {message => <div className="font-bold text-red-200 text-sm">{message}</div>}
    </ErrorMessage>
}
