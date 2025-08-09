export default function Drawer({ children, closeCb }) {
    return <div className="absolute inset-0 top-10 backdrop-brightness-50" onClick={() => closeCb()}>
        <div className="bg-emerald-50 absolute top-0 bottom-0 right-0 left-10" onClick={(e) => e.stopPropagation()}>
            {children}
        </div>
    </div>
}